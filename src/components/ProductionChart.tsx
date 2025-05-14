import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Title, Loader, Center, Text } from '@mantine/core';
import type { DailyProduction } from '../data/mockData';

interface ProductionChartProps {
  selectedMachine: string | null;
  dateRange: [Date | null, Date | null];
}

// Fetch data from Mocky.io
const fetchProductionData = async (): Promise<DailyProduction[]> => {
  const response = await fetch('https://run.mocky.io/v3/35c6f587-0e86-41cb-a138-4575fe1d97bb');
  if (!response.ok) {
    throw new Error('Failed to fetch production data');
  }
  return response.json();
};

export default function ProductionChart({ selectedMachine, dateRange }: ProductionChartProps) {
  const { t } = useTranslation();
  const { data, isLoading, error } = useQuery({
    queryKey: ['productionData', selectedMachine, dateRange],
    queryFn: fetchProductionData,
  });

  if (isLoading) {
    return (
      <Center h={400}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h={400}>
        <Text color="red">Error loading production data</Text>
      </Center>
    );
  }

  // Filter data based on date range
  const filteredData = data?.filter((item) => {
    const itemDate = new Date(item.date);
    const [startDate, endDate] = dateRange;
    
    // If no dates are selected, show all data
    if (!startDate && !endDate) return true;
    
    // Set time to start of day for proper date comparison
    const itemDateStart = new Date(itemDate.setHours(0, 0, 0, 0));
    const startDateStart = startDate ? new Date(startDate.setHours(0, 0, 0, 0)) : null;
    const endDateEnd = endDate ? new Date(endDate.setHours(23, 59, 59, 999)) : null;
    
    if (!startDateStart) return itemDateStart <= (endDateEnd || new Date());
    if (!endDateEnd) return itemDateStart >= startDateStart;
    
    return itemDateStart >= startDateStart && itemDateStart <= endDateEnd;
  });

  // If machine is selected, adjust the counts (this is a mock adjustment)
  const adjustedData = selectedMachine
    ? filteredData?.map(item => ({
        ...item,
        count: Math.round(item.count * (selectedMachine.includes('CNC') ? 0.6 : 0.4))
      }))
    : filteredData;

  return (
    <>
      <Title order={2} mb="md">
        {t('chart.title')}
        {selectedMachine && ` - ${selectedMachine}`}
      </Title>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={adjustedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              label={{ value: t('chart.xAxisLabel'), position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              label={{
                value: t('chart.yAxisLabel'),
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip />
            <Bar dataKey="count" fill="#228be6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
} 
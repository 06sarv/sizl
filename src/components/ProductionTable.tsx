import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Table, Title, Loader, Center, Text, Badge } from '@mantine/core';
import type { ProductionData } from '../data/mockData';

// Fetch data from Mocky.io
const fetchTableData = async (): Promise<ProductionData[]> => {
  const response = await fetch('https://run.mocky.io/v3/ef420ec5-95d5-40c0-a6ef-20a98cae2715');
  if (!response.ok) {
    throw new Error('Failed to fetch table data');
  }
  return response.json();
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'green';
    case 'idle':
      return 'yellow';
    case 'maintenance':
      return 'red';
    default:
      return 'gray';
  }
};

export default function ProductionTable() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useQuery({
    queryKey: ['tableData'],
    queryFn: fetchTableData,
  });

  if (isLoading) {
    return (
      <Center h={200}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h={200}>
        <Text color="red">Error loading table data</Text>
      </Center>
    );
  }

  return (
    <>
      <Title order={2} mb="md">
        {t('table.machineName')}
      </Title>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>{t('table.machineName')}</th>
            <th style={{ textAlign: 'left' }}>{t('table.status')}</th>
            <th style={{ textAlign: 'right' }}>{t('table.output')}</th>
            <th style={{ textAlign: 'left' }}>{t('table.lastUpdated')}</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row) => (
            <tr key={row.machineName}>
              <td style={{ textAlign: 'left' }}>{row.machineName}</td>
              <td style={{ textAlign: 'left' }}>
                <Badge color={getStatusColor(row.status)}>
                  {t(`table.status${row.status.charAt(0).toUpperCase() + row.status.slice(1)}`)}
                </Badge>
              </td>
              <td style={{ textAlign: 'right' }}>{row.output.toLocaleString()}</td>
              <td style={{ textAlign: 'left' }}>{new Date(row.lastUpdated).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
} 
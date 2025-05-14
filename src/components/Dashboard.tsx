import { Container, Title, Paper, Select, Button, Group, Stack } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ProductionChart from './ProductionChart';
import ProductionTable from './ProductionTable';
import { machines } from '../data/mockData';

interface DashboardProps {
  onLanguageToggle: () => void;
  currentLanguage: string;
}

export default function Dashboard({ onLanguageToggle, currentLanguage }: DashboardProps) {
  const { t } = useTranslation();
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const handleApplyFilters = () => {
    // The filters are already applied through the state
    // This function can be used to trigger additional actions if needed
    console.log('Filters applied:', { selectedMachine, dateRange });
  };

  return (
    <Container size="xl" py="xl">
      <Group justify="space-between" mb="xl">
        <Title order={1}>{t('pageTitle')}</Title>
        <Button variant="light" onClick={onLanguageToggle}>
          {currentLanguage === 'en' ? '한국어' : 'English'}
        </Button>
      </Group>

      <Paper p="md" mb="xl" withBorder>
        <Stack>
          <Group grow>
            <Select
              label={t('filters.machineName')}
              placeholder={t('filters.machineName')}
              data={machines}
              value={selectedMachine}
              onChange={setSelectedMachine}
              clearable
            />
            <DatePickerInput
              type="range"
              label={t('filters.dateRange')}
              placeholder={t('filters.dateRange')}
              value={dateRange}
              onChange={(value) => setDateRange(value as [Date | null, Date | null])}
              clearable
            />
          </Group>
          <Button onClick={handleApplyFilters}>{t('filters.apply')}</Button>
        </Stack>
      </Paper>

      <Stack gap="xl">
        <Paper p="md" withBorder>
          <ProductionChart 
            selectedMachine={selectedMachine} 
            dateRange={dateRange} 
          />
        </Paper>

        <Paper p="md" withBorder>
          <ProductionTable />
        </Paper>
      </Stack>
    </Container>
  );
} 
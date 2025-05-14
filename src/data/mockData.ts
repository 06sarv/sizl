export interface ProductionData {
  machineName: string;
  status: 'active' | 'idle' | 'maintenance';
  output: number;
  lastUpdated: string;
}

export interface DailyProduction {
  date: string;
  count: number;
}

export const machines = [
  'CNC-001',
  'CNC-002',
  'CNC-003',
  'Assembly-001',
  'Assembly-002',
];

export const productionData: ProductionData[] = [
  {
    machineName: 'CNC-001',
    status: 'active',
    output: 150,
    lastUpdated: '2024-03-20T10:30:00Z',
  },
  {
    machineName: 'CNC-002',
    status: 'idle',
    output: 0,
    lastUpdated: '2024-03-20T10:25:00Z',
  },
  {
    machineName: 'CNC-003',
    status: 'maintenance',
    output: 0,
    lastUpdated: '2024-03-20T09:15:00Z',
  },
  {
    machineName: 'Assembly-001',
    status: 'active',
    output: 75,
    lastUpdated: '2024-03-20T10:28:00Z',
  },
  {
    machineName: 'Assembly-002',
    status: 'active',
    output: 82,
    lastUpdated: '2024-03-20T10:29:00Z',
  },
];

export const dailyProduction: DailyProduction[] = [
  { date: '2024-03-14', count: 1200 },
  { date: '2024-03-15', count: 1350 },
  { date: '2024-03-16', count: 1100 },
  { date: '2024-03-17', count: 950 },
  { date: '2024-03-18', count: 1400 },
  { date: '2024-03-19', count: 1300 },
  { date: '2024-03-20', count: 1250 },
]; 
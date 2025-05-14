import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      pageTitle: 'Production Monitoring',
      filters: {
        machineName: 'Machine Name',
        dateRange: 'Date Range',
        apply: 'Apply Filters',
      },
      table: {
        machineName: 'Machine Name',
        status: 'Status',
        output: 'Output',
        lastUpdated: 'Last Updated',
        statusActive: 'Active',
        statusIdle: 'Idle',
        statusMaintenance: 'Maintenance',
      },
      chart: {
        title: 'Daily Production',
        yAxisLabel: 'Production Count',
        xAxisLabel: 'Date',
      },
      language: {
        en: 'English',
        ko: 'Korean',
      },
    },
  },
  ko: {
    translation: {
      pageTitle: '생산 모니터링',
      filters: {
        machineName: '기계 이름',
        dateRange: '날짜 범위',
        apply: '필터 적용',
      },
      table: {
        machineName: '기계 이름',
        status: '상태',
        output: '생산량',
        lastUpdated: '마지막 업데이트',
        statusActive: '가동 중',
        statusIdle: '대기 중',
        statusMaintenance: '유지보수 중',
      },
      chart: {
        title: '일일 생산량',
        yAxisLabel: '생산 수량',
        xAxisLabel: '날짜',
      },
      language: {
        en: '영어',
        ko: '한국어',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 
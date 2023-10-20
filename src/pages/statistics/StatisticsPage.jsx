import { Typography } from '@mui/material';
import CountryPieChart from './CountryPieChart';

import styles from './statistics.module.css';

function StatisticsPage() {
  return (
    <div className={styles.pageRoot}>
      <Typography variant="h4" sx={{ display: 'block' }}>
        StatisticsPage
      </Typography>
      <CountryPieChart />
    </div>
  );
}

export default StatisticsPage;

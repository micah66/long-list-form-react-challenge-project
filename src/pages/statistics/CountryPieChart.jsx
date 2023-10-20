import { Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

import { useUsersContext } from '../../context/usersContext';

export default function CountryPieChart() {
  const { usersData } = useUsersContext();
  const countryCount = usersData.reduce((acc, user) => {
    acc[user.country] = acc[user.country] + 1 || 1;

    return acc;
  }, {});

  return (
    <>
      <Typography variant="h6" sx={{ marginBlock: '16px' }}>
        Countries
      </Typography>
      <PieChart
        series={[
          {
            data: Object.entries(countryCount).map(([id, value]) => ({
              id,
              value,
              label: id,
            })),
          },
        ]}
        sx={{ '& tspan': { fill: 'white' } }}
      />
    </>
  );
}

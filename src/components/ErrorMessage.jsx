import { Typography } from '@mui/material';

export default function ErrorMessage({ message }) {
  return (
    <Typography variant="span" sx={{ color: 'red' }}>
      {message}
    </Typography>
  );
}

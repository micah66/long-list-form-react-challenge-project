import { Grid } from '@mui/material';
import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';
import styles from '../users.module.css';

// user country must be one of those - for select/autocomplete implementation
import countryOptions from '../../../data/countries.json';

const UserRow = ({ user }) => {
  return (
    <Grid container className={styles.userRow}>
      {/* Render each user row inputs and trash icon at the end of each row */}
      <InputField name="name" value={user.name} placeholder="User Name" />
      <InputField name="country" value={user.country} placeholder="Country" />
      <InputField name="email" value={user.email} placeholder="Email" />
      <InputField name="phone" value={user.phone} placeholder="Phone Number" />
      <TrashIconButton />
    </Grid>
  );
};

export default UserRow;

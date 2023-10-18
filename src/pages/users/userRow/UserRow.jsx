import { Grid } from '@mui/material';
import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';
import styles from '../users.module.css';

// user country must be one of those - for select/autocomplete implementation
import countryOptions from '../../../data/countries.json';

const UserRow = ({ user }) => {
  return (
    <Grid container className={styles.userRow} columnGap={1}>
      {/* Render each user row inputs and trash icon at the end of each row */}
      <Grid item xs>
        <InputField name="name" value={user.name} placeholder="User Name" />
      </Grid>
      <Grid item xs>
        <InputField name="country" value={user.country} placeholder="Country" />
      </Grid>
      <Grid item xs>
        <InputField name="email" value={user.email} placeholder="Email" />
      </Grid>
      <Grid item xs>
        <InputField name="phone" value={user.phone} placeholder="Phone Number" />
      </Grid>
      <Grid item xs="auto">
        <TrashIconButton />
      </Grid>
    </Grid>
  );
};

export default UserRow;

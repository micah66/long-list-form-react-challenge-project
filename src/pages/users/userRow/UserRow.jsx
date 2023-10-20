import { useReducer } from 'react';
import { Autocomplete, Grid } from '@mui/material';
import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';
import styles from '../users.module.css';

// user country must be one of those - for select/autocomplete implementation
import countryOptions from '../../../data/countries.json';
import { useUsersContext } from '../../../context/usersContext';

const UserRow = ({ user, handleEditUser, handleDeleteUser = () => {}, errors }) => {
  const editTextField = (fieldName, inputValue) => {
    const updatedUser = {
      ...user,
      [fieldName]: inputValue,
    };

    handleEditUser(updatedUser);
  };

  return (
    <Grid container className={styles.userRow} columnGap={1}>
      {/* Render each user row inputs and trash icon at the end of each row */}
      <Grid item xs>
        <InputField
          name="name"
          value={user.name}
          placeholder="User Name"
          handleChange={editTextField}
          handleBlur={() => {
            if (!user.name) editTextField('name', '');
          }}
          error={errors?.name && errors.name !== 'ok'}
        />
      </Grid>
      <Grid item xs>
        <Autocomplete
          options={countryOptions}
          disableClearable
          onChange={(e) => {
            editTextField('country', e.target.innerText);
          }}
          value={user.country}
          renderInput={(params) => (
            <InputField {...params} name="country" placeholder="Country" />
          )}
          sx={{
            '.MuiOutlinedInput-root': { height: '40px', padding: 0, paddingLeft: '8px' },
          }}
        />
      </Grid>
      <Grid item xs>
        <InputField
          name="email"
          value={user.email}
          placeholder="Email"
          handleChange={editTextField}
          handleBlur={() => {
            if (!user.email) editTextField('email', '');
          }}
          error={errors?.email && errors.email !== 'ok'}
        />
      </Grid>
      <Grid item xs>
        <InputField
          name="phone"
          value={user.phone}
          placeholder="Phone Number"
          handleChange={editTextField}
          handleBlur={() => {
            if (!user.phone) editTextField('phone', '');
          }}
          error={errors?.phone && errors.phone !== 'ok'}
        />
      </Grid>
      <Grid item xs="auto">
        <TrashIconButton handleClick={handleDeleteUser} />
      </Grid>
    </Grid>
  );
};

export default UserRow;

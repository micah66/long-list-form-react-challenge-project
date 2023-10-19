import { useReducer } from 'react';
import { Grid } from '@mui/material';
import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';
import styles from '../users.module.css';

// user country must be one of those - for select/autocomplete implementation
import countryOptions from '../../../data/countries.json';

const USER_ACTIONS = {
  EDIT_FIELD: 'editTextField',
};

function reducer(state, action) {
  switch (action.type) {
    case USER_ACTIONS.EDIT_FIELD: {
      return {
        ...state,
        [action.payload.fieldName]: action.payload.inputValue,
      };
    }
    default: {
      return state;
    }
  }
}

const UserRow = ({ user, handleDeleteUser = () => {} }) => {
  const [state, dispatch] = useReducer(reducer, user);

  const editTextField = (fieldName, inputValue) =>
    dispatch({
      type: USER_ACTIONS.EDIT_FIELD,
      payload: { fieldName, inputValue },
    });

  return (
    <Grid container className={styles.userRow} columnGap={1}>
      {/* Render each user row inputs and trash icon at the end of each row */}
      <Grid item xs>
        <InputField
          name="name"
          value={state.name}
          placeholder="User Name"
          onChangehandler={editTextField}
        />
      </Grid>
      <Grid item xs>
        <InputField
          name="country"
          value={state.country}
          placeholder="Country"
          onChangehandler={editTextField}
        />
      </Grid>
      <Grid item xs>
        <InputField
          name="email"
          value={state.email}
          placeholder="Email"
          onChangehandler={editTextField}
        />
      </Grid>
      <Grid item xs>
        <InputField
          name="phone"
          value={state.phone}
          placeholder="Phone Number"
          onChangehandler={editTextField}
        />
      </Grid>
      <Grid item xs="auto">
        <TrashIconButton handleClick={handleDeleteUser} />
      </Grid>
    </Grid>
  );
};

export default UserRow;

import { useReducer } from 'react';
import { Grid } from '@mui/material';
import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';
import styles from '../users.module.css';

// user country must be one of those - for select/autocomplete implementation
import countryOptions from '../../../data/countries.json';

const USER_ACTIONS = {
  EDIT_FIELD: 'editTextField',
  VALIDATE_FIELD: 'validateField',
  BLUR_FIELD: 'blurField',
};

function reducer(state, action) {
  switch (action.type) {
    case USER_ACTIONS.EDIT_FIELD: {
      return {
        ...state,
        user: {
          ...state.user,
          [action.payload.fieldName]: action.payload.inputValue,
        },
      };
    }
    case USER_ACTIONS.VALIDATE_FIELD: {
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.fieldName]: action.payload.isInvalid,
        },
        emptyFields: {
          ...state.emptyFields,
          [action.payload.fieldName]: false,
        },
      };
    }
    case USER_ACTIONS.BLUR_FIELD: {
      return {
        ...state,
        emptyFields: {
          ...state.emptyFields,
          [action.payload.fieldName]: action.payload.isEmpty,
        },
      };
    }
    default: {
      return state;
    }
  }
}

const UserRow = ({ user, handleDeleteUser = () => {} }) => {
  const [state, dispatch] = useReducer(reducer, { user, errors: {}, emptyFields: {} });
  console.log(state);
  const editTextField = (fieldName, inputValue, validator) => {
    dispatch({
      type: USER_ACTIONS.EDIT_FIELD,
      payload: { fieldName, inputValue },
    });

    if (validator) {
      dispatch({
        type: USER_ACTIONS.VALIDATE_FIELD,
        payload: { fieldName, isInvalid: !!inputValue && validator(inputValue) },
      });
    }
  };

  const checkEmptyField = (fieldName, inputValue) => {
    dispatch({
      type: USER_ACTIONS.BLUR_FIELD,
      payload: { fieldName, isEmpty: !inputValue },
    });
  };

  return (
    <Grid container className={styles.userRow} columnGap={1}>
      {/* Render each user row inputs and trash icon at the end of each row */}
      <Grid item xs>
        <InputField
          name="name"
          value={state.user.name}
          placeholder="User Name"
          handleChange={(fieldName, inputValue) => {
            editTextField(fieldName, inputValue, () => /[^a-z\s]/gi.test(inputValue));
          }}
          handleBlur={checkEmptyField}
          error={state.errors.name || state.emptyFields.name}
        />
      </Grid>
      <Grid item xs>
        <InputField
          name="country"
          value={state.user.country}
          placeholder="Country"
          handleChange={editTextField}
        />
      </Grid>
      <Grid item xs>
        <InputField
          name="email"
          value={state.user.email}
          placeholder="Email"
          handleChange={(fieldName, inputValue) =>
            editTextField(
              fieldName,
              inputValue,
              () => !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(inputValue)
            )
          }
          handleBlur={checkEmptyField}
          error={state.errors.email || state.emptyFields.email}
        />
      </Grid>
      <Grid item xs>
        <InputField
          name="phone"
          value={state.user.phone}
          placeholder="Phone Number"
          handleChange={(fieldName, inputValue) =>
            editTextField(
              fieldName,
              inputValue,
              () => !/^\+{1,1}\d{7,12}$/g.test(inputValue)
            )
          }
          handleBlur={checkEmptyField}
          error={state.errors.phone || state.emptyFields.phone}
        />
      </Grid>
      <Grid item xs="auto">
        <TrashIconButton handleClick={handleDeleteUser} />
      </Grid>
    </Grid>
  );
};

export default UserRow;

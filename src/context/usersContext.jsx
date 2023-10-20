import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import data from '../data/initialUsersData.json';

// initial value
const UsersContext = createContext({
  usersData: [],
  setUsersData: () => {},
  loading: false,
  errors: {},
});

const validateName = (name) => {
  if (name === '') return 'empty';
  if (!name) return 'ok';
  return /[^a-z\s]/gi.test(name) ? 'invalid' : 'ok';
};
const validateEmail = (email) => {
  if (email === '') return 'empty';
  if (!email) return 'ok';
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email || '') ? 'ok' : 'invalid';
};
const validatePhone = (phone) => {
  if (phone === '') return 'empty';
  if (!phone) return 'ok';
  return /^\+{1,1}\d{7,}$/g.test(phone || '') ? 'ok' : 'invalid';
};

// value provider
export const ContextProvider = ({ children }) => {
  const [usersData, setUsersData] = useState([]);
  const [errors, setErrors] = useState(
    usersData.reduce((acc, user) => {
      acc[user.id] = {
        name: validateName(user.name),
        email: validateEmail(user.email),
        phone: validatePhone(user.phone),
      };

      return acc;
    }, {})
  );
  const [loading, setLoading] = useState(false);

  const addUser = () =>
    setUsersData((prevUsersList) => [{ id: uuidv4() }, ...prevUsersList]);

  const editUser = useCallback(
    (updatedUser) => {
      setUsersData((prevUsersList) =>
        prevUsersList.map((user) => (user.id !== updatedUser.id ? user : updatedUser))
      );

      errors[updatedUser.id] = {
        name: validateName(updatedUser.name),
        email: validateEmail(updatedUser.email),
        phone: validatePhone(updatedUser.phone),
      };

      setErrors({ ...errors });
    },
    [errors]
  );

  const deleteUser = useCallback(
    (user) => {
      setUsersData((prevUsersList) => prevUsersList.filter(({ id }) => user.id !== id));

      errors[user.id] = {};

      setErrors({ ...errors });
    },
    [errors]
  );

  console.log('usersData', usersData);

  useEffect(() => {
    const t = setTimeout(() => {
      setUsersData(data);
    }, 2000);

    return () => {
      clearTimeout(t);
    };
  }, []);

  const contextValue = useMemo(
    () => ({ usersData, errors, addUser, editUser, deleteUser }),
    [usersData, errors, editUser, deleteUser]
  );

  return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>;
};

// consumer
export const useUsersContext = () => useContext(UsersContext);

export default UsersContext;

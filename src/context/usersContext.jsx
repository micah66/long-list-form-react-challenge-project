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
import { useLocalStorage } from '../utils/useStorage';

// initial value
const UsersContext = createContext({
  usersData: [],
  setUsersData: () => {},
  loading: false,
  errors: {},
});

// value provider
export const ContextProvider = ({ children }) => {
  const [persistedData, setPersistedData] = useLocalStorage({
    key: 'usersData',
    initValue: data,
  });
  const [usersData, setUsersData] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const addUser = () =>
    setUsersData((prevUsersList) => [{ id: uuidv4() }, ...prevUsersList]);

  const editUser = useCallback((updatedUser, fieldName, status) => {
    setUsersData((prevUsersList) =>
      prevUsersList.map((user) => (user.id !== updatedUser.id ? user : updatedUser))
    );

    setErrors((prevErrors) => {
      prevErrors[updatedUser.id] = {
        ...prevErrors[updatedUser.id],
        [fieldName]: status,
      };
      return {
        ...prevErrors,
      };
    });
  }, []);

  const deleteUser = useCallback((user) => {
    setUsersData((prevUsersList) => prevUsersList.filter(({ id }) => user.id !== id));

    setErrors((prevErrors) => {
      prevErrors[user.id] = {};

      return {
        ...prevErrors,
      };
    });
  }, []);

  const saveUsers = useCallback(() => {
    setPersistedData(usersData);
  }, [setPersistedData, usersData]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setUsersData(persistedData);
      setLoading(false);
    }, 2000);
    return () => {
      setLoading(false);
      clearTimeout(t);
    };
  }, [persistedData]);

  const contextValue = useMemo(
    () => ({ usersData, errors, addUser, editUser, deleteUser, saveUsers, loading }),
    [usersData, errors, editUser, deleteUser, saveUsers, loading]
  );

  return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>;
};

// consumer
export const useUsersContext = () => useContext(UsersContext);

export default UsersContext;

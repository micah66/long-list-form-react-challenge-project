import { Button, Typography } from '@mui/material';
import { useUsersContext } from '../../../context/usersContext';
import UserRow from '../userRow/UserRow';
import AddButton from '../../../components/AddButton';
import styles from '../users.module.css';
import InputField from '../../../components/InputField';
import SearchBar from '../../../components/SearchBar';
import { useEffect, useState } from 'react';

function UsersList() {
  const { usersData, errors, addUser, editUser, deleteUser, loading } = useUsersContext();
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(usersData);

  const searchUsers = (searchText = '') =>
    usersData.filter((user) => {
      for (let k in user) {
        if (user[k].includes(searchText)) return true;
      }

      return false;
    });

  useEffect(() => {
    if (!loading) setFilteredUsers(usersData);
  }, [loading, usersData]);

  return (
    <div className={styles.usersList}>
      <div className={styles.usersListHeader}>
        <Typography variant="h6">
          Users List <Typography variant="span">({filteredUsers?.length})</Typography>
        </Typography>
        <SearchBar
          inputComponent={
            <InputField
              name="search"
              placeholder="Search user"
              value={search}
              handleChange={(_, searchText) => {
                setSearch(searchText);
                setFilteredUsers(searchUsers(searchText));
              }}
            />
          }
        />

        <AddButton handleClick={addUser} />
      </div>
      <div className={styles.usersListContent}>
        {loading ? (
          <div> Loading...</div>
        ) : (
          filteredUsers?.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              handleEditUser={editUser}
              errors={errors[user.id]}
              handleDeleteUser={() => deleteUser(user)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default UsersList;

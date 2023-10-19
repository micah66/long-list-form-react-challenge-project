import { Button, Typography } from '@mui/material';
import { useUsersContext } from '../../../context/usersContext';
import UserRow from '../userRow/UserRow';
import AddButton from '../../../components/AddButton';
import styles from '../users.module.css';

function UsersList() {
  const { usersData, errors, addUser, editUser, deleteUser } = useUsersContext();

  return (
    <div className={styles.usersList}>
      <div className={styles.usersListHeader}>
        <Typography variant="h6">
          Users List <Typography variant="span">({usersData.length})</Typography>
        </Typography>
        <AddButton handleClick={addUser} />
      </div>
      <div className={styles.usersListContent}>
        {usersData.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            handleEditUser={editUser}
            errors={errors[user.id]}
            handleDeleteUser={() => deleteUser(user)}
          />
        ))}
      </div>
    </div>
  );
}

export default UsersList;

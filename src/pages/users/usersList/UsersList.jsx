import { v4 as uuidv4 } from 'uuid';
import { Button, Typography } from '@mui/material';
import { useUsersContext } from '../../../context/usersContext';
import UserRow from '../userRow/UserRow';
import AddButton from '../../../components/AddButton';
import styles from '../users.module.css';

function UsersList() {
  const { usersData, setUsersData } = useUsersContext();

  return (
    <div className={styles.usersList}>
      <div className={styles.usersListHeader}>
        <Typography variant="h6">
          Users List <Typography variant="span">({usersData.length})</Typography>
        </Typography>
        <AddButton
          handleClick={() =>
            setUsersData((prevUsersList) => [{ id: uuidv4() }, ...prevUsersList])
          }
        />
      </div>
      <div className={styles.usersListContent}>
        {usersData.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            handleDeleteUser={() => {
              setUsersData((prevUsersList) =>
                prevUsersList.filter(({ id }) => user.id !== id)
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default UsersList;

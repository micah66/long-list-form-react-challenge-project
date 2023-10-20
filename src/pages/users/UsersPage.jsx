import UsersList from './usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './users.module.css';
import ErrorMessage from '../../components/ErrorMessage';
import { useUsersContext } from '../../context/usersContext';

function UsersPage() {
  const { errors } = useUsersContext();
  const fieldStatuses = Object.values(errors)
    .flatMap((users) => Object.values(users))
    .reduce(
      (acc, status) => {
        if (status !== 'ok') acc[status]++;

        return acc;
      },
      {
        invalid: 0,
        empty: 0,
      }
    );

  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList />
        {Boolean(fieldStatuses.empty + fieldStatuses.invalid) && (
          <ErrorMessage
            message={`Errors: Empty Fields - ${fieldStatuses.empty}, Invalid Fields - ${fieldStatuses.invalid}`}
          />
        )}
        <div className={styles.rightButtonContainer}>
          <PrimaryButton
            disabled={Boolean(fieldStatuses.empty + fieldStatuses.invalid)}
            // TODO: Implement onClick handler
          >
            Save
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;

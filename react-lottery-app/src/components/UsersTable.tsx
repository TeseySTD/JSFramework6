import { Button } from 'react-bootstrap';
import { User } from '../types/user';
import { UserRepo } from '../utils/user-repo';
import DefaultButton from './DefaultButton';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
interface UsersTableProps {
  userRepo: UserRepo;
}
const UsersTable = (props: UsersTableProps) => {
  const [tableDate, setTableDate] = useState<User[]>(() => {
    const users = props.userRepo.users;
    return users;
  });

  useEffect(() => {
    setTableDate(props.userRepo.users);
  }, [props.userRepo.users]);
  

  const searchUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    const users = props.userRepo.users;
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setTableDate(filteredUsers);
  };

  return (
    <div className="p-4 mb-4 card">
      <SearchBar changeHandler={searchUsers} className='mb-3'/>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>
              Name
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm ms-2"
                onClick={() => {props.userRepo.sortUsersByName();}}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-sort-alpha-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371zm1.57-.785L11 2.687h-.047l-.652 2.157z"
                  />
                  <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z" />
                </svg>
                <span className="visually-hidden">Button</span>
              </button>
            </th>
            <th>
              Date of Birth
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm ms-2"
                onClick={() =>{props.userRepo.sortUsersByDate();}}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-sort-down"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
                </svg>
                <span className="visually-hidden">Button</span>
              </button>
            </th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableDate.map((user) => (
            <tr
              key={user.id}
              className={
                props.userRepo.getWinners().includes(user)
                  ? 'table-success'
                  : ''
              }
            >
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.dob.toLocaleDateString()}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td className="d-flex">
                <button
                  className="btn btn-success me-2 btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#updateModal"
                  onClick={() =>
                    document
                      .getElementById('updateModal')
                      ?.setAttribute('id-to-update', user.id)
                  }
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                  onClick={() =>
                    document
                      .getElementById('deleteModal')
                      ?.setAttribute('id-to-delete', user.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;

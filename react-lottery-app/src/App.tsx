import React, { useState, useEffect } from 'react';
import './App.css';
import { User } from './types/user';
import RegisterForm from './components/RegisterForm';
import WinnersList from './components/WinnersList';
import UsersTable from './components/UsersTable';
import { Validator } from './utils/validation';
import { UserRepo } from './utils/user-repo';
import ModalDelete from './components/ModalDelete';
import ModalUpdate from './components/ModalUpdate';
import { KeyManager } from './utils/key-manager';

const App = () => {
  const _maximumWinners = 3;

  const [users, setUsers] = useState<User[]>(() => {
    const users = UserRepo.SeedData();
    return users;
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);
  UserRepo.Init(users, setUsers);
  KeyManager.Init();

  return (
    <div className="App container mt-5 col-md-7">
      <WinnersList maximumWinners={_maximumWinners} />
      <RegisterForm  />
      <UsersTable />

      <ModalDelete />
      <ModalUpdate />
    </div>
  );
};

export default App;

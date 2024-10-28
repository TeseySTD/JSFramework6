import React, { useState, useEffect, useRef } from 'react';
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
import AppHeader from './components/AppHeader';
import { Outlet } from 'react-router';

interface AppProps {
  // children: React.ReactNode
}

const App = (props: AppProps) => {
  const _maximumWinners = 3;

  const [users, setUsers] = useState<User[]>([]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetching users...');
      if (users.length > 0) {
        // console.log('users already exist');
        return;
      } else {
        const usersData = await UserRepo.SeedData();
        setUsers(usersData);
        isInitialMount.current = false;
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      return;
    }
    // console.log('set users to storage by useEffect', users);
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  UserRepo.Init(users, setUsers);
  KeyManager.Init();

  return (
    <div className="App container mt-5 col-md-7">
      <WinnersList maximumWinners={_maximumWinners} />
      <RegisterForm />
      <UsersTable />

      <ModalDelete />
      <ModalUpdate />
    </div>
  );
};

export default App;

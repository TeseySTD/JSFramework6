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

function getUsers(): User[] {
  const defaultUsers = [
    new User(
      'Amsterdam',
      new Date('1990-10-01'),
      'email1@domain',
      '(063) 555-5555'
    ),
    new User(
      'Washington',
      new Date('1985-02-05'),
      'email2@domain',
      '(063) 555-5555'
    ),
    new User(
      'Sydney',
      new Date('1987-08-15'),
      'email3@domain',
      '(063) 555-5555'
    )
  ];
  const users = localStorage.getItem('users');
  const usersList = users ? JSON.parse(users) : defaultUsers;
  usersList.forEach((user: User) => (user.dob = new Date(user.dob)));
  return usersList;
}

const App = () => {
  const _maximumWinners = 3;

  const [users, setUsers] = useState<User[]>(() => {
    const users = getUsers();
    return users;
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const userRepo = new UserRepo(users, setUsers);
  Validator.userRepo = userRepo;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!Validator.validateForm(form)) {
      form.classList.add('needs-validation');
    } else {
      const data = new FormData(form);
      const newUser = new User(
        data.get('name') as string,
        new Date(data.get('dob') as string),
        data.get('email') as string,
        data.get('phone') as string
      );
      userRepo.addUser(newUser);
      form.classList.remove('needs-validation');
      form.reset();
    }
  };

  const handleNewWinner = () => {
    const nonWinners = users.filter((user) => !user.isWinner);
    const random = Math.floor(Math.random() * nonWinners.length);
    const winner = nonWinners[random];
    if (winner) {
      winner.isWinner = true;
      userRepo.updateUser(winner);
    }
  };
  return (
    <div className="App container mt-5 col-md-7">
      {/* Winners List */}
      <WinnersList
        userRepo={userRepo}
        maximumWinners={_maximumWinners}
        handleNewWinner={handleNewWinner}
      />

      {/* Registration Form */}
      <RegisterForm onSubmit={handleSubmit} />

      {/* Users Table */}
      <UsersTable userRepo={userRepo} />

      <ModalDelete userRepo={userRepo} />
      <ModalUpdate userRepo={userRepo} />
    </div>
  );
};

export default App;

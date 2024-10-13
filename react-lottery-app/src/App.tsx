import React, { useState, useEffect } from 'react';
import './App.css';
import { User } from './types/user';
import RegisterForm from './components/RegisterForm';
import WinnersList from './components/WinnersList';
import UsersTable from './components/UsersTable';
import { Validator } from './utils/validation';
import { UserRepo } from './utils/user-repo';

function getUsers(): User[] {
  const defaultUsers =[
    new User('Amsterdam', new Date('1990-10-01'), 'email1@domain', '(063) 555-5555'),
    new User('Washington', new Date('1985-02-05'), 'email2@domain', '(063) 555-5555'),
    new User('Sydney', new Date('1987-08-15'), 'email3@domain', '(063) 555-5555')
  ]
  const users = localStorage.getItem('users');
  const usersList = users ? JSON.parse(users) : defaultUsers;
  usersList.forEach((user: User) => (user.dob = new Date(user.dob)));
  return usersList;
}

const App = () => {
  const _maximumWinners = 3;

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    phone: ''
  });

  const [users, setUsers] = useState<User[]>(() => {
    const users = getUsers();
    return users;
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const userRepo = new UserRepo(users, setUsers);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!Validator.validateForm(form)) {
      form.classList.add('needs-validation');
    } else {
      const newUser = new User(
        formData.name,
        new Date(formData.dob),
        formData.email,
        formData.phone
      );
      userRepo.addUser(newUser); 
      form.classList.remove('needs-validation');
      setFormData({ name: '', dob: '', email: '', phone: '' }); 
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

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (
      target.classList.contains('is-invalid') ||
      target.classList.contains('is-valid')
    ) {
      target.classList.remove('is-invalid');
      target.classList.remove('is-valid');
      switch (target.name) {
        case 'name':
          target.classList.add(
            Validator.validateName(target.value) ? 'is-valid' : 'is-invalid'
          );
          break;
        case 'dob':
          target.classList.add(
            Validator.validateDob(new Date(target.value))
              ? 'is-valid'
              : 'is-invalid'
          );
          break;
        case 'email':
          target.classList.add(
            Validator.validateEmail(target.value) ? 'is-valid' : 'is-invalid'
          );
          break;
        case 'phone':
          target.classList.add(
            Validator.validatePhone(target.value) ? 'is-valid' : 'is-invalid'
          );
          break;
      }
    }

    setFormData({
      ...formData,
      [target.name]: target.value
    });
  };

  return (
    <div className="App container mt-5 col-md-6">
      {/* Winners List */}
      <WinnersList
        userRepo={userRepo}
        maximumWinners={_maximumWinners}
        handleNewWinner={handleNewWinner}
      />

      {/* Registration Form */}
      <RegisterForm
        formData={formData}
        handleChangeInput={handleChangeInput}
        onSubmit={handleSubmit}
      />

      {/* Users Table */}
      <UsersTable userRepo={userRepo} />
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { Form, Button, Table, Badge, Card } from 'react-bootstrap';
import './App.css';
import { Validator } from './utils/validation';
import { User } from './types/user';
import UsersTable from './components/UsersTable';
import WinnersList from './components/WinnersList';
import RegisterForm from './components/RegisterForm';

const App = () => {
  const _maximumWinners = 3;

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    phone: ''
  });

  const [winners, setWinners] = useState<User[]>([]);

  const [users, setUsers] = useState<User[]>([
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
  ]);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.target as HTMLFormElement;
    e.preventDefault();
    if (!Validator.validateForm(form)) {
      e.stopPropagation();
      form.classList.add('needs-validation');
    } else {
      const newUser = new User(
        formData.name,
        new Date(formData.dob),
        formData.email,
        formData.phone
      );

      setUsers([...users, newUser]);

      form.classList.remove('needs-validation');
      setFormData({ name: '', dob: '', email: '', phone: '' }); //Clean form
    }
  };

  const handleNewWinner = () => {
    const random = Math.floor(
      Math.random() * users.filter((user) => !winners.includes(user)).length
    );
    try {
      const winner = users.filter((user) => !winners.includes(user))[random];
      if (winner && !winners.includes(winner)) setWinners([...winners, winner]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App container mt-5 col-md-6">
      {/* Winners List */}
      <WinnersList
        winners={winners}
        users={users}
        maximumWinners={_maximumWinners}
        setWinners={setWinners}
        handleNewWinner={handleNewWinner}
      />

      {/* Registration Form */}
      <RegisterForm
        formData={formData}
        handleChangeInput={handleChangeInput}
        onSubmit={handleSubmit}
      />

      {/* Winners Table */}
      <UsersTable
        users={users}
        winners={winners}
      />
    </div>
  );
};

export default App;

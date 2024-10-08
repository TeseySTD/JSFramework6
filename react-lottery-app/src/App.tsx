import React, { useState } from 'react';
import { Form, Button, Table, Badge, Card } from 'react-bootstrap';
import './App.css';
import { Validator } from './utils/validation';
import { User } from './types/user';

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
      {/* Winners Tags */}
      <div className="mb-4 d-flex border rounded bg-white align-items-center">
        <div className="Winners-list ms-2 border rounded">
          {winners.map((winner) => (
            <Badge key={winner.id} bg="info" className="me-2">
              {winner.name}
              <button
                type="button"
                className="close-button"
                aria-label="Close"
                onClick={() =>
                  setWinners(winners.filter((w) => w.id !== winner.id))
                }
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </Badge>
          ))}
          <span className="ms-2 text-muted">Winners</span>
        </div>
        <Button
          variant="info"
          className="btn-info-custom"
          id="new-winner-button"
          disabled={users.length === 0 || winners.length === _maximumWinners}
          onClick={handleNewWinner}
        >
          New winner
        </Button>
      </div>

      {/* Registration Form */}
      <Card className="p-4 mb-4">
        <h3>REGISTER FORM</h3>
        <p>Please fill in all the fields.</p>
        <Form className="d-flex flex-column" onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter user name"
              name="name"
              value={formData.name}
              onChange={handleChangeInput}
            />
            <Form.Control.Feedback type="invalid">
              Name must contains at least {Validator.minimalNameLength}{' '}
              character(s).
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChangeInput}
            />
            <Form.Control.Feedback type="invalid">
              Date must be between{' '}
              {Validator.minimalBirthDate.toLocaleDateString()} and{' '}
              {Validator.maximalBirthDate.toLocaleDateString()}.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email (example@domain)"
              value={formData.email}
              onChange={handleChangeInput}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email (example@domain).
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder="Enter phone number (099) 123-4567"
              value={formData.phone}
              onChange={handleChangeInput}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid phone number.
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="info"
            type="submit"
            className="btn-info-custom align-self-end"
          >
            Save
          </Button>
        </Form>
      </Card>

      {/* Winners Table */}
      <Card className="p-4 mb-4">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>Phone number</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className={winners.includes(user) ? 'table-success' : ''}
              >
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.dob.toLocaleDateString()}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default App;

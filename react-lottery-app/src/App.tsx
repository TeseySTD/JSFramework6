import { useState } from 'react';
import { Form, Button, Table, Badge, Card } from 'react-bootstrap';
import './App.css';
import { Validator } from './utils/validation';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    phone: ''
  });

  const [winners, setWinners] = useState([
    {
      id: 1,
      name: 'Amsterdam',
      dob: '01/10/1990',
      email: 'email1',
      phone: '(063) 555-5555'
    },
    {
      id: 2,
      name: 'Washington',
      dob: '02/05/1985',
      email: 'email2',
      phone: '(063) 555-5555'
    },
    {
      id: 3,
      name: 'Sydney',
      dob: '15/08/1987',
      email: 'email3',
      phone: '(063) 555-5555'
    }
  ]);

  const handleChange = (e: any ) => {
    if(e.target.classList.contains('is-invalid') || e.target.classList.contains('is-valid')) {
      e.target.classList.remove('is-invalid');
      e.target.classList.remove('is-valid');
      switch (e.target.name) {
        case 'name':
          e.target.classList.add(Validator.validateName(e.target.value) ? "is-valid" : "is-invalid");
          break;
        case 'dob':
          e.target.classList.add(Validator.validateDob(new Date(e.target.value)) ? "is-valid" : "is-invalid");
          break;
        case 'email':
          e.target.classList.add(Validator.validateEmail(e.target.value) ? "is-valid" : "is-invalid");
          break;
        case 'phone':
          e.target.classList.add(Validator.validatePhone(e.target.value) ? "is-valid" : "is-invalid");
          break;
      }
    }

    
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (e: any) => {
    const form = document.querySelector('form') as HTMLFormElement;
    e.preventDefault();
    if (!Validator.validateForm(form)) {
      e.stopPropagation();
      console.log('not valid');
      form.classList.add('needs-validation');
    } else {
      console.log('valid');
      const newWinner = {
        id: winners.length + 1,
        ...formData
      };
      setWinners([...winners, newWinner]);
      form.classList.remove('needs-validation');
      setFormData({ name: '', dob: '', email: '', phone: '' }); // Reset form
    }
  };

  return (
    <div className="App container mt-5 col-md-6">
      {/* Winners Tags */}
      <div className="mb-4 d-flex border rounded bg-white align-items-center ">
        <div className="Winners-list ms-2 border rounded">
          {winners.map((winner) => (
            <Badge key={winner.id} bg="info" className="me-2">
              {winner.name}
              <button type="button" className="close-button" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </Badge>
          ))}
          <span className="ms-2 "> Winners</span>
        </div>
        <Button variant="info" className="btn-info-custom">
          New winner
        </Button>
      </div>

      {/* Registration Form */}
      <div className="card p-4 mb-4">
        <h3>REGISTER FORM</h3>
        <p>Please fill in all the fields.</p>
        <Form className="d-flex flex-column " onSubmit={handleSave} noValidate>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter user name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required={true}
              minLength={3}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="mm/dd/yyyy"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Date must be between 01.01.1924 and 01.01.2024.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email (example@domain).
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
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
      </div>

      {/* Winners Table */}
      <Card className="p4 mb-4">
        <Table hover>
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
            {winners.map((winner) => (
              <tr key={winner.id}>
                <td>{winner.id}</td>
                <td>{winner.name}</td>
                <td>{winner.dob}</td>
                <td>{winner.email}</td>
                <td>{winner.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default App;

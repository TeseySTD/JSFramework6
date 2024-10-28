import { on } from 'events';
import DefaultButton from './DefaultButton';
import InputField from './InputField';
import { Validator } from '../utils/validation';
import { ChangeEventHandler, FormEventHandler } from 'react';
import { InputData } from '../interfaces/input-data';
import UserForm from './UserForm';
import { UserRepo } from '../utils/user-repo';
import { User } from '../types/user';

interface RegisterFormProps {
  // onSubmit: FormEventHandler<HTMLFormElement>;
}
const RegisterForm = (props: RegisterFormProps) => {
  const handleSubmit = (input : InputData) => {
    const newUser = new User(
      input.email,
      input.password,
      input.name,
      input.role,
      input.avatar
    );
    UserRepo.addUser(newUser);
  };

  return (
    <div className="p-4 mb-4 card">
      <h3>REGISTER FORM</h3>
      <p>Please fill in all the fields.</p>
      <UserForm
        onSubmit={handleSubmit}
        checkEmailUniqueness={true}
        addEmailField={true}
        id="registerForm"
      >
        <DefaultButton type="submit" className="btn-info-custom align-self-end">
          Save
        </DefaultButton>
      </UserForm>
    </div>
  );
};

export default RegisterForm;

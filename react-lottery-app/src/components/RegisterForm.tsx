import { on } from 'events';
import DefaultButton from './DefaultButton';
import InputField from './InputField';
import { Validator } from '../utils/validation';
import { ChangeEventHandler, FormEventHandler } from 'react';
import { InputData } from '../interfaces/input-data';
import UserForm from './UserForm';

interface RegisterFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
}
const RegisterForm = (props: RegisterFormProps) => {
  return (
    <div className="p-4 mb-4 card">
      <h3>REGISTER FORM</h3>
      <p>Please fill in all the fields.</p>
      <UserForm onSubmit={props.onSubmit} checkEmailUniqueness={true} addEmailField={true}>
        <DefaultButton type="submit" className="btn-info-custom align-self-end">
          Save
        </DefaultButton>
      </UserForm>
    </div>
  );
};

export default RegisterForm;

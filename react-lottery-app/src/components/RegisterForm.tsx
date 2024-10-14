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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Form submitted');
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!Validator.validateForm(form, true)) {
      form.classList.add('needs-validation');
    } else {
      const data = new FormData(form);
      const newUser = new User(
        data.get('name') as string,
        new Date(data.get('dob') as string),
        data.get('email') as string,
        data.get('phone') as string
      );
      UserRepo.addUser(newUser);
      form.classList.remove('needs-validation');
      form.reset();
    }
  };

  return (
    <div className="p-4 mb-4 card">
      <h3>REGISTER FORM</h3>
      <p>Please fill in all the fields.</p>
      <UserForm
        onSubmit={handleSubmit}
        checkEmailUniqueness={true}
        addEmailField={true}
        id='registerForm'
      >
        <DefaultButton type="submit" className="btn-info-custom align-self-end">
          Save
        </DefaultButton>
      </UserForm>
    </div>
  );
};

export default RegisterForm;

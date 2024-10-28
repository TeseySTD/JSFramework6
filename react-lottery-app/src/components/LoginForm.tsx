import { useState } from 'react';
import { InputData } from '../interfaces/input-data';
import { Validator } from '../utils/validation';
import InputField from './InputField';
import DefaultButton from './DefaultButton';
import { User } from '../types/user';
import { UserRepo } from '../utils/user-repo';
import { UserFakeApi } from '../utils/user-fake-api';

interface LoginFormProps {}

export const LoginForm = (props: LoginFormProps) => {
  const [inputData, setInputData] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: ''
  });

  const navigateToRoot = () => {
    window.location.href = '/';
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Form submitted');
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!Validator.validateForm(form, false)) {
      form.classList.add('needs-validation');
    } else {
      const data = new FormData(form);
      const params = {
        email: data.get('email') as string,
        password: data.get('password') as string
      };

      const tokens = await UserFakeApi.login(params.email, params.password);
      if(tokens) {
        sessionStorage.setItem('access_token', tokens!.access_token);
        sessionStorage.setItem('refresh_token', tokens!.refresh_token);
  
        form.classList.remove('needs-validation');
        form.reset();
        navigateToRoot();
      }
      else{
        console.log('Login failed');
        return;
      }
    }
  };

  return (
    <div className="p-4 mb-4 card mt-5 col-md-4 container">
      <h3>LOGIN FORM</h3>
      <p>Please fill in all the fields.</p>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          name="email"
          type="email"
          id="formEmail"
          placeholder="Enter email"
          onChange={(e) => {
            setInputData({ ...inputData, email: e.target.value });
            Validator.validateInputOnChange(e.target, false);
          }}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          id="formPassword"
          placeholder="Enter password"
          onChange={(e) => {
            setInputData({ ...inputData, email: e.target.value });
            Validator.validateInputOnChange(e.target, false);
          }}
          validationMessage="Please provide a password with at least 8 characters."
        />
        <DefaultButton type="submit" className="btn-info-custom align-self-end">
          Save
        </DefaultButton>
      </form>
    </div>
  );
};

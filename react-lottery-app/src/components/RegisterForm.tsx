import { on } from 'events';
import DefaultButton from './DefaultButton';
import InputField from './InputField';
import { Validator } from '../utils/validation';
import { ChangeEventHandler, FormEventHandler } from 'react';
interface FormData {
  name: string;
  dob: string;
  email: string;
  phone: string;
}
interface RegisterFormProps {
  formData: FormData;
  onSubmit: FormEventHandler<HTMLFormElement>;
  handleChangeInput: ChangeEventHandler<HTMLInputElement>;
}
const RegisterForm = (props: RegisterFormProps) => {
  return (
    <div className="p-4 mb-4 card">
      <h3>REGISTER FORM</h3>
      <p>Please fill in all the fields.</p>
      <form className="d-flex flex-column" onSubmit={props.onSubmit} noValidate>
        <InputField
          label="Name"
          placeholder="Enter user name"
          name="name"
          type="text"
          id="formName"
          value={props.formData.name}
          onChange={props.handleChangeInput}
          validationMessage={`Name must contains at least ${Validator.minimalNameLength} character(s).`}
        ></InputField>

        <InputField
          label="Date of Birth"
          name="dob"
          type="date"
          id="formDob"
          value={props.formData.dob}
          onChange={props.handleChangeInput}
          validationMessage={`Date must be between ${Validator.minimalBirthDate.toLocaleDateString()} and ${Validator.maximalBirthDate.toLocaleDateString()}.`}
        ></InputField>

        <InputField
          label="Email"
          placeholder="Enter email (example@domain)"
          name="email"
          type="email"
          id="formEmail"
          value={props.formData.email}
          onChange={props.handleChangeInput}
          validationMessage="Please provide a valid email (example@domain)."
        ></InputField>

        <InputField
          label="Phone number"
          placeholder="Enter phone number (099) 123-4567"
          name="phone"
          type="text"
          id="formPhone"
          value={props.formData.phone}
          onChange={props.handleChangeInput}
          validationMessage="Please provide a valid phone number."
        ></InputField>

        <DefaultButton type="submit" className="btn-info-custom align-self-end">
          Save
        </DefaultButton>
      </form>
    </div>
  );
};

export default RegisterForm;

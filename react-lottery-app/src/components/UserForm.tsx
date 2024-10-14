import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState
} from 'react';
import { Validator } from '../utils/validation';
import DefaultButton from './DefaultButton';
import InputField from './InputField';
import { InputData } from '../interfaces/input-data';

interface UserFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  children?: React.ReactNode;
  id?: string;
  inputData?: InputData;
  checkEmailUniqueness?: boolean;
  addEmailField?: boolean;
}
const UserForm = (props: UserFormProps) => {
  const [inputData, setInputData] = useState<InputData>({
    ...((props.inputData ?? {}) as InputData)
  });

  useEffect(() => {
    if (props.inputData) {
      console.log('form message');

      setInputData(props.inputData);
    }
  }, [props.inputData]);

  return (
    <form
      className="d-flex flex-column"
      onSubmit={props.onSubmit}
      noValidate
      id={props.id}
    >
      <InputField
        label="Name"
        placeholder="Enter user name"
        name="name"
        type="text"
        value={inputData.name}
        id="formName"
        onChange={(e) => {
          setInputData({ ...inputData, name: e.target.value });
          Validator.validateInputOnChange(e.target, props.checkEmailUniqueness);
        }}
        validationMessage={`Name must contains at least ${Validator.minimalNameLength} character(s).`}
      ></InputField>

      <InputField
        label="Date of Birth"
        name="dob"
        type="date"
        id="formDob"
        value={inputData.dob}
        onChange={(e) => {
          setInputData({ ...inputData, dob: e.target.value });
          Validator.validateInputOnChange(e.target, props.checkEmailUniqueness);
        }}
        validationMessage={`Date must be between ${Validator.minimalBirthDate.toLocaleDateString()} and ${Validator.maximalBirthDate.toLocaleDateString()}.`}
      ></InputField>

      {props.addEmailField ? (
        <InputField
          label="Email"
          placeholder="Enter email (example@domain)"
          name="email"
          type="email"
          id="formEmail"
          value={inputData.email}
          onChange={(e) => {
            setInputData({ ...inputData, email: e.target.value });
            Validator.validateInputOnChange(
              e.target,
              props.checkEmailUniqueness
            );
          }}
        ></InputField>
      ) : null}

      <InputField
        label="Phone number"
        placeholder="Enter phone number (099) 123-4567"
        name="phone"
        type="text"
        id="formPhone"
        value={inputData.phone}
        onChange={(e) => {
          setInputData({ ...inputData, phone: e.target.value });
          Validator.validateInputOnChange(e.target, props.checkEmailUniqueness);
        }}
        validationMessage="Please provide a valid phone number."
      ></InputField>
      {props.children}
    </form>
  );
};

export default UserForm;

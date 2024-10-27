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
  }, [props.inputData])

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
        label="Password"
        placeholder="Enter password"
        name="password"
        type="password"
        id="formPassword"
        value={inputData.password}
        onChange={(e) => {
          setInputData({ ...inputData, password: e.target.value });
          Validator.validateInputOnChange(e.target, props.checkEmailUniqueness);
        }}
        validationMessage={`Password must contains at least ${Validator.minimalPasswordLength} character(s).`}
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
        label="Role"
        placeholder="Enter role"
        name="role"
        type="text"
        id="formRole"
        value={inputData.role}
        onChange={(e) => {
          setInputData({ ...inputData, role: e.target.value });
          Validator.validateInputOnChange(e.target, props.checkEmailUniqueness);
        }}
        validationMessage={`Role must contains at least ${Validator.minimalRoleLength} character(s).`}
      ></InputField>

      <InputField
        label="Avatar"
        placeholder="Enter avatar url"
        name="avatar"
        type="text"
        id="formAvatar"
        value={inputData.avatar}
        onChange={(e) => {
          setInputData({ ...inputData, avatar: e.target.value });
          Validator.validateInputOnChange(e.target, props.checkEmailUniqueness);
        }}
        validationMessage={`Avatar must be link.`}
      ></InputField>
    </form>
  );
};

export default UserForm;

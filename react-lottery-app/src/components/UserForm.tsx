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
import {useFormik} from 'formik';

interface UserFormProps {
  onSubmit: (input : InputData) => void;
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


  const {values, handleChange, handleBlur, touched, errors, handleSubmit  } = useFormik({
    initialValues: {
      name: '',
      password: '',
      email: '',
      role: '',
      avatar: ''
    },
    validationSchema: Validator.basicSchema,
    onSubmit: props.onSubmit
  })

  console.log(errors);

  useEffect(() => {
    if (props.inputData) {
      console.log('form message');

      setInputData(props.inputData);
      values.name = props.inputData.name;
      values.password = props.inputData.password;
      values.email = props.inputData.email;
      values.role = props.inputData.role;
      values.avatar = props.inputData.avatar;
    }
  }, [props.inputData]);

  return (
    <form
      className="d-flex flex-column"
      onSubmit={handleSubmit}
      noValidate
      id={props.id}
    >
      <InputField
        label="Name"
        placeholder="Enter user name"
        name="name"
        type="text"
        value={values.name}
        id="formName"
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.name && touched.name ? 'is-invalid' : ''}
        validationMessage={touched.name && errors.name ? errors.name : ''}
      ></InputField>

      <InputField
        label="Password"
        placeholder="Enter password"
        name="password"
        type="password"
        id="formPassword"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.password && touched.password ? 'is-invalid' : ''}
        validationMessage={touched.password && errors.password ? errors.password : ''}
      ></InputField>

      {props.addEmailField ? (
        <InputField
          label="Email"
          placeholder="Enter email (example@domain)"
          name="email"
          type="email"
          id="formEmail"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email && touched.email ? 'is-invalid' : ''}
          validationMessage={touched.email && errors.email ? errors.email : ''}
        ></InputField>
      ) : null}

      <InputField
        label="Role"
        placeholder="Enter role"
        name="role"
        type="text"
        id="formRole"
        value={values.role}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.role && touched.role ? 'is-invalid' : ''}
        validationMessage={touched.role && errors.role ? errors.role : ''}
      ></InputField>

      <InputField
        label="Avatar"
        placeholder="Enter avatar url"
        name="avatar"
        type="text"
        id="formAvatar"
        value={values.avatar}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.avatar && touched.avatar ? 'is-invalid' : ''}
        validationMessage={touched.avatar && errors.avatar ? errors.avatar : ''}
      ></InputField>
      {props.children}
    </form>
  );
};

export default UserForm;

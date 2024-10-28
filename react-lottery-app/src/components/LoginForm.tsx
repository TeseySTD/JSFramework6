import { useFormik } from 'formik';
import { Validator } from '../utils/validation';
import InputField from './InputField';
import DefaultButton from './DefaultButton';
import { UserFakeApi } from '../utils/user-fake-api';

interface LoginFormProps {}
interface LoginData {
  email: string;
  password: string;
}




export const LoginForm = (props: LoginFormProps) => {
  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Form submitted');
    e.preventDefault();
    const form = e.target as HTMLFormElement;

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
    };


  const navigateToRoot = () => {
    window.location.href = '/';
  };

  const { values, handleChange, handleBlur, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Validator.basicSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log('Form submitted:', values);
      setSubmitting(false);
    } ,
  });

  return (
    <div className="p-4 mb-4 card mt-5 col-md-4 container">
      <h3>LOGIN FORM</h3>
      <p>Please fill in all the fields.</p>
      <form onSubmit={handlerSubmit}>
        <InputField
          label="Email"
          name="email"
          type="email"
          id="formEmail"
          placeholder="Enter email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email && touched.email ? 'is-invalid' : ''}
          validationMessage={touched.email && errors.email ? errors.email : ''}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          id="formPassword"
          placeholder="Enter password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.password && touched.password ? 'is-invalid' : ''}
          validationMessage={touched.password && errors.password ? errors.password : ''}
        />
        
        <DefaultButton type="submit" className="btn-info-custom align-self-end">
          Save
        </DefaultButton>
      </form>
    </div>
  );
};

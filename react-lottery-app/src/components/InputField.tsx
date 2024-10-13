import React from 'react';

interface InputFieldProps {
  placeholder?: string;
  label?: string;
  name?: string;
  type?: string;
  id?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  validationMessage?: string;
}

const InputField = (props: InputFieldProps) => {
  return (
    // <Form.Group className="mb-3" controlId="formName">
    //   <Form.Label>Name</Form.Label>
    //   <Form.Control
    //     type="text"
    //     placeholder="Enter user name"
    //     name="name"
    //     value={formData.name}
    //     onChange={handleChangeInput}
    //   />
    //   <Form.Control.Feedback type="invalid">
    //     Name must contains at least {Validator.minimalNameLength} character(s).
    //   </Form.Control.Feedback>
    // </Form.Group>

    <div className="mb-3">
      <label className="form-label" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        placeholder={props.placeholder}
        name={props.name}
        type={props.type}
        id={props.id}
        className="form-control"
        value={props.value}
        onChange={props.onChange}
      />
      <div className="invalid-feedback">{props.validationMessage}</div>
    </div>
  );
};

export default InputField;

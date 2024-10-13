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

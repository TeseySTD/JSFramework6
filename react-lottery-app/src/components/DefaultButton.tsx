interface DefaultButtonProps {
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  form?: string;
}
const DefaultButton = (props: DefaultButtonProps) => {
  return (
    <button
      type={props.type}
      id={props.id}
      className={`${props.className} btn btn-info `}
      onClick={props.onClick}
      disabled={props.disabled}
      style={props.style}
      form={props.form}
    >
      {props.children}
    </button>
  );
};

export default DefaultButton;

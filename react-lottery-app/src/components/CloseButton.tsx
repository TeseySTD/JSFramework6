import { CSSProperties } from 'react';

interface CloseButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
}

const CloseButton = ({ onClick, style }: CloseButtonProps) => {
  return (
    <button
      type="button"
      className="close-button"
      aria-label="Close"
      style={style}
      onClick={onClick}
    >
      <span aria-hidden="true">&times;</span>
    </button>
  );
};

export default CloseButton;

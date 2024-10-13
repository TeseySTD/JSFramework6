import CloseButton from './CloseButton';

interface WinnerItemProps {
  name: string;
  onDelete: () => void;
  className?: string;
}

const WinnerItem = (props: WinnerItemProps) => {
  return (
    <span className={`me-2 badge bg-info ${props.className}`}>
      {props.name}
      <CloseButton onClick={props.onDelete} />
    </span>
  );
};

export default WinnerItem;

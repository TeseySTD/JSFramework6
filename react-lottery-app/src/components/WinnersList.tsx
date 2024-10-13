import { User } from '../types/user';
import DefaultButton from './DefaultButton';
import WinnerItem from './WinnerItem';

interface WinnerItemProps {
  winners: User[];
  maximumWinners: number;
  users: User[];
  setWinners: React.Dispatch<React.SetStateAction<User[]>>;
  handleNewWinner: React.MouseEventHandler<HTMLButtonElement>;
}
const WinnersList = (props: WinnerItemProps) => {
  return (
    <div className="mb-4 d-flex border rounded bg-white align-items-center">
      <div className="Winners-list ms-2 border rounded">
        {props.winners.map((winner) => (
          <WinnerItem
            name={winner.name}
            className="me-2"
            onDelete={() =>
              props.setWinners(props.winners.filter((w) => w.id !== winner.id))
            }
          />
        ))}
        <span className="ms-2 text-muted">Winners</span>
      </div>
      <DefaultButton
        className="btn-info-custom"
        id="new-winner-button"
        disabled={
          props.users.length === 0 ||
          props.winners.length === props.maximumWinners
        }
        onClick={props.handleNewWinner}
      >
        New winner
      </DefaultButton>
    </div>
  );
};

export default WinnersList;

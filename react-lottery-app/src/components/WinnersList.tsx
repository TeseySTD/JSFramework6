import { User } from '../types/user';
import { UserRepo } from '../utils/user-repo';
import DefaultButton from './DefaultButton';
import WinnerItem from './WinnerItem';
interface WinnerItemProps {
  userRepo: UserRepo;
  maximumWinners: number;
  handleNewWinner: React.MouseEventHandler<HTMLButtonElement>;
}
const WinnersList = (props: WinnerItemProps) => {
  return (
    <div className="mb-4 d-flex border rounded bg-white align-items-center">
      <div className="Winners-list ms-2 border rounded">
        {props.userRepo.getWinners().map((winner) => (
          <WinnerItem
            name={winner.name}
            className="me-2"
            onDelete={() => {
              winner.isWinner = false;
              props.userRepo.updateUser(winner);
            }}
          />
        ))}
        <span className="ms-2 text-muted">Winners</span>
      </div>
      <DefaultButton
        className="btn-info-custom"
        id="new-winner-button"
        disabled={
          props.userRepo.users.length === 0 ||
          props.userRepo.getWinners().length === props.maximumWinners
        }
        onClick={props.handleNewWinner}
      >
        New winner
      </DefaultButton>
    </div>
  );
};

export default WinnersList;

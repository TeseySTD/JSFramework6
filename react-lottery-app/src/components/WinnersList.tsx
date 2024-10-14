import { User } from '../types/user';
import { UserRepo } from '../utils/user-repo';
import DefaultButton from './DefaultButton';
import WinnerItem from './WinnerItem';
interface WinnerItemProps {
  maximumWinners: number;
  // handleNewWinner: React.MouseEventHandler<HTMLButtonElement>;
}
const WinnersList = (props: WinnerItemProps) => {
  const handleNewWinner = () => {
    const nonWinners = UserRepo.users.filter((user) => !user.isWinner);
    const random = Math.floor(Math.random() * nonWinners.length);
    const winner = nonWinners[random];
    if (winner) {
      winner.isWinner = true;
      UserRepo.updateUser(winner);
    }
  };

  return (
    <div className="mb-4 d-flex border rounded bg-white align-items-center">
      <div className="Winners-list ms-2 border rounded">
        {UserRepo.getWinners().map((winner) => (
          <WinnerItem
            name={winner.name}
            className="me-2"
            onDelete={() => {
              winner.isWinner = false;
              UserRepo.updateUser(winner);
            }}
          />
        ))}
        <span className="ms-2 text-muted">Winners</span>
      </div>
      <DefaultButton
        className="btn-info-custom"
        id="new-winner-button"
        disabled={
          UserRepo.users.length === 0 ||
          UserRepo.getWinners().length === props.maximumWinners
        }
        onClick={handleNewWinner}
      >
        New winner
      </DefaultButton>
    </div>
  );
};

export default WinnersList;

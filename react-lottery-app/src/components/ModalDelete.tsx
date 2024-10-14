import { UserRepo } from '../utils/user-repo';
import Modal from './Modal';

interface ModalDeleteProps {
  // userRepo: UserRepo;
}
const ModalDelete = (props: ModalDeleteProps) => {
  return (
    <Modal
      title="Delete"
      id="deleteModal"
      acceptButton={
        <button
          type="button"
          className="btn btn-danger"
          data-bs-dismiss="modal"
          onClick={() => {
            const modal = document.getElementById('deleteModal');
            const id = modal?.getAttribute('id-to-delete') as string;
            const user = UserRepo.getUserById(id);
            UserRepo.deleteUser(user!);
          }}
        >
          Delete
        </button>
      }
    >
      <p>Are you sure you want to delete this user?</p>
    </Modal>
  );
};
export default ModalDelete;

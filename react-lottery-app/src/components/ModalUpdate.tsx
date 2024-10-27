import { useEffect, useState } from 'react';
import UserForm from './UserForm';
import Modal from './Modal';
import DefaultButton from './DefaultButton';
import { UserRepo } from '../utils/user-repo';
import { Validator } from '../utils/validation';
import { InputData } from '../interfaces/input-data';

interface ModalProps {
  // userRepo: UserRepo;
}

const ModalUpdate = (props: ModalProps) => {
  const [inputData, setInputData] = useState<InputData>({
    email: '',
    password: '',
    name: '',
    role: '',
    avatar: ''
  });

  // Fetch the user data and update the inputData state
  const getInputData = () => {
    const modal = document.getElementById('updateModal');
    const id = modal?.getAttribute('id-to-update') as string;
    const user = UserRepo.getUserById(id);
    if (user) {
      setInputData({
        email: user.email,
        password: user.password,
        name: user.name,
        role: user.role,
        avatar: user.avatar
      });
    }
    console.log('input data', inputData);
  };

  useEffect(() => {
    const modal = document.getElementById('updateModal');
    modal?.addEventListener('shown.bs.modal', getInputData);
  }, []);

  return (
    <Modal
      title="Update"
      id="updateModal"
      acceptButton={
        <DefaultButton
          type="submit"
          className="btn-info-custom"
          // dataBsDismiss="modal"
          form="updateForm"
        >
          Update
        </DefaultButton>
      }
    >
      <UserForm
        id="updateForm"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          if (!Validator.validateForm(form)) {
            form.classList.add('needs-validation');
          } else {
            const modal = document.getElementById('updateModal');
            const id = modal?.getAttribute('id-to-update') as string;
            const user = UserRepo.getUserById(id);
            console.log('user update', user);
            const data = new FormData(form);
            if (user) {
              user.name = data.get('name') as string;
              user.email = data.get('email') as string;
              user.password = data.get('password') as string;
              user.role = data.get('role') as string;
              user.avatar = data.get('avatar') as string;
              UserRepo.updateUser(user);
              form.classList.remove('needs-validation');
              form.reset();
            }
          }
        }}
        inputData={inputData}
      />
    </Modal>
  );
};

export default ModalUpdate;

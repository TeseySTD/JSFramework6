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

  const handleSubmit = (input: InputData) => {
    const modal = document.getElementById('updateModal');
    const id = modal?.getAttribute('id-to-update') as string;
    const user = UserRepo.getUserById(id);
    console.log('user update', user);
    if (user) {
      user.name = input.name;
      user.password = input.password;
      user.role = input.role;
      user.avatar = input.avatar;
      UserRepo.updateUser(user);
    }
  }

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
        onSubmit={handleSubmit}
        inputData={inputData}
      />
    </Modal>
  );
};

export default ModalUpdate;

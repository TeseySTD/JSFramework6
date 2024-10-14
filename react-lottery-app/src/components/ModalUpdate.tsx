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
    name: '',
    dob: '',
    email: '',
    phone: ''
  });

  // Fetch the user data and update the inputData state
  const getInputData = () => {
    const modal = document.getElementById('updateModal');
    const id = modal?.getAttribute('id-to-update') as string;
    const user = UserRepo.getUserById(id);
    if (user) {
      setInputData({
        name: user.name || '',
        dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '', // Format to YYYY-MM-DD for date input
        email: user.email || '',
        phone: user.phone || ''
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
              user.dob = new Date(data.get('dob') as string);
              user.phone = data.get('phone') as string;
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

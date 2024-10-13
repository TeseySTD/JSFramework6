import { ChangeEventHandler, FormEventHandler } from 'react';
import UserForm from './UserForm';
import Modal from './Modal';
import DefaultButton from './DefaultButton';
import { UserRepo } from '../utils/user-repo';
import { Validator } from '../utils/validation';
import { User } from '../types/user';
import { InputData } from '../interfaces/input-data';

interface ModalProps {
  userRepo: UserRepo;
}

const ModalUpdate = (props: ModalProps) => {
  const getInputData = () => {
    const modal = document.getElementById('updateModal');
    const id = modal?.getAttribute('id-to-update') as string;
    const user = props.userRepo.getUserById(id);
    const formData: InputData = {
      name: user?.name || '',
      dob: (user?.dob || '') as string,
      email: user?.email || '',
      phone: user?.phone || ''
    };
    return formData;
  };

  return (
    <Modal
      title="Update"
      id="updateModal"
      acceptButton={
        <DefaultButton
          type="submit"
          className="btn-info-custom"
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
            const user = props.userRepo.getUserById(id);
            const data = new FormData(form);
            if (user) {
              user.name = data.get('name') as string;
              user.dob = new Date(data.get('dob') as string);
              user.email = data.get('email') as string;
              user.phone = data.get('phone') as string;
              props.userRepo.updateUser(user);
              form.classList.remove('needs-validation');
              form.reset();
            }
          }
        }}
        inputData={getInputData()}
      />
    </Modal>
  );
};

export default ModalUpdate;

import InputField from '../components/InputField';
import { UserRepo } from './user-repo';
import * as yup from 'yup';

export class Validator {
    private static readonly _regexEmail =
        /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    private static readonly _regexURL =
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

    public static readonly minimalNameLength = 1;
    public static readonly minimalPasswordLength = 4;
    public static readonly minimalRoleLength = 2;

    public static readonly basicSchema = yup.object().shape({
        name: yup.string().required("Name is required").min(this.minimalNameLength, 'Name is too short'),
        email: yup.string().required("Email is required").email('Invalid email format'),
        password: yup.string().required("Password is required").min(this.minimalPasswordLength, 'Password is too short'),
        role: yup.string().required("Role is required").min(this.minimalRoleLength, 'Role is too short'),
        avatar: yup.string().required("Avatar is required").url('Avatar must be a valid URL'),
    });

    static validateEmailFormat(email: string): boolean {
        return this._regexEmail.test(String(email).toLowerCase());
    }

    static isEmailUnique(email: string): boolean {
        const existingUser = UserRepo.users.find(
            (user) => user.email.toLowerCase() === email.toLowerCase()
        );
        return !existingUser;
    }

    static validateEmail(
        email: HTMLInputElement,
        checkUniqueness: boolean = false
    ): boolean {
        const isValidFormat = this.validateEmailFormat(email.value);
        if (!isValidFormat) {
            this.changeValidateMessage(
                email,
                'Please provide a valid email (example@domain).'
            );
            return false;
        }
        if (checkUniqueness && !this.isEmailUnique(email.value)) {
            this.changeValidateMessage(email, 'Email already exists.');
            return false;
        }
        return true;
    }

    static validateName(name: string): boolean {
        return name.length >= this.minimalNameLength;
    }

    static validatePassword(password: string): boolean {
        return password.length >= this.minimalPasswordLength;
    }

    static validateRole(role: string): boolean {
        return role.length >= this.minimalRoleLength;
    }

    static validateAvatar(avatar: string): boolean {
        return this._regexURL.test(avatar);
    }

    static validateForm(
        form: HTMLFormElement,
        checkEmailUniqueness: boolean = false
    ): boolean {
        let isValid: boolean = true;
        const formName = form.querySelector('#formName') as HTMLInputElement;
        const formPassword = form.querySelector(
            '#formPassword'
        ) as HTMLInputElement;
        const formAvatar = form.querySelector(
            '#formAvatar'
        ) as HTMLInputElement;
        const formRole = form.querySelector('#formRole') as HTMLInputElement;
        const formEmail = form.querySelector('#formEmail') as HTMLInputElement;
        const inputs = [
            formName,
            formPassword,
            formRole,
            formEmail,
            formAvatar
        ];

        inputs.forEach((input) => {
            if (input) {
                console.log(input);
                if (isValid)
                    isValid =
                        isValid &&
                        this.validateInput(input, checkEmailUniqueness);
                else this.validateInput(input, checkEmailUniqueness);
            }
        });

        // Remove classes from inputs
        if (isValid) {
            inputs.forEach((input) => {
                if (input) {
                    input.classList.remove('is-valid');
                    input.classList.remove('is-invalid');
                }
            });
        }
        return isValid;
    }

    static validateInput(
        target: HTMLInputElement,
        checkEmailUniqueness: boolean = false
    ): boolean {
        let isValid: boolean = false;
        switch (target.name) {
            case 'name':
                isValid = this.validateName(target.value);
                break;
            case 'password':
                isValid = this.validatePassword(target.value);
                break;
            case 'email':
                isValid = this.validateEmail(target, checkEmailUniqueness);
                break;
            case 'role':
                isValid = this.validateRole(target.value);
                break;
            case 'avatar':
                isValid = this.validateAvatar(target.value);
                break;
        }
        target.classList.add(isValid ? 'is-valid' : 'is-invalid');
        return isValid;
    }

    public static validateInputOnChange(
        target: HTMLInputElement,
        checkEmailUniqueness: boolean = false
    ) {
        if (
            target.classList.contains('is-invalid') ||
            target.classList.contains('is-valid')
        ) {
            target.classList.remove('is-invalid');
            target.classList.remove('is-valid');
            this.validateInput(target, checkEmailUniqueness);
        }
    }

    private static changeValidateMessage(
        target: HTMLInputElement,
        message: string
    ) {
        const validateDiv = target.nextElementSibling as HTMLDivElement;
        if (validateDiv && validateDiv.classList.contains('invalid-feedback')) {
            validateDiv.textContent = message;
        }
    }
}

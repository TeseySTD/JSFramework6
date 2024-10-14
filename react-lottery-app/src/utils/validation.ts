import InputField from '../components/InputField';
import { UserRepo } from './user-repo';

export class Validator {
    private static readonly _phoneRegex =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    private static readonly _regexEmail =
        /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    public static readonly minimalBirthDate = new Date(
        new Date().setFullYear(new Date().getFullYear() - 100)
    );
    public static readonly maximalBirthDate = new Date(
        new Date().setFullYear(new Date().getFullYear() - 18)
    );
    public static readonly minimalNameLength = 1;

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

    static validatePhone(phone: string): boolean {
        return this._phoneRegex.test(phone);
    }

    static validateDob(dob: Date): boolean {
        return dob > this.minimalBirthDate && dob < this.maximalBirthDate;
    }

    static validateForm(
        form: HTMLFormElement,
        checkEmailUniqueness: boolean = false
    ): boolean {
        let isValid: boolean = true;
        const formName = form.querySelector('#formName') as HTMLInputElement;
        const formDob = form.querySelector('#formDob') as HTMLInputElement;
        const formEmail = form.querySelector('#formEmail') as HTMLInputElement;
        const formPhone = form.querySelector('#formPhone') as HTMLInputElement;
        const inputs = [formName, formDob, formEmail, formPhone];

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
            case 'dob':
                isValid = this.validateDob(new Date(target.value));
                break;
            case 'email':
                isValid = this.validateEmail(target, checkEmailUniqueness);
                break;
            case 'phone':
                isValid = this.validatePhone(target.value);
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

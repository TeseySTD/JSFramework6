import { UserRepo } from "./user-repo";

export class Validator {
    private static readonly _phoneRegex =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    private static readonly _regexEmail =
        /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    private static _userRepo : UserRepo;

    public static readonly minimalBirthDate = new Date(
        new Date().setFullYear(new Date().getFullYear() - 100)
    );
    public static readonly maximalBirthDate = new Date(
        new Date().setFullYear(new Date().getFullYear() - 18)
    );
    public static readonly minimalNameLength = 1;

    static validateEmail(email: string) {
        return this._regexEmail.test(String(email).toLowerCase()) && Validator.isEmailUnique(email);
    }
    static isEmailUnique(email: string): boolean {
        if (!this._userRepo) {
            console.warn("UserRepo is not set for email uniqueness validation.");
            return true;
        }

        const existingUser = this._userRepo.users.find(
            (user) => user.email.toLowerCase() === email.toLowerCase()
        );
        return !existingUser;
    }

    static validateName(name: string) {
        return name.length >= this.minimalNameLength;
    }
    static validatePhone(phone: string) {
        return this._phoneRegex.test(phone);
    }
    static validateDob(dob: Date) {
        return dob > this.minimalBirthDate && dob < this.maximalBirthDate;
    }

    static validateForm(form: HTMLFormElement): boolean {
        let isValid: boolean = false;
        const formName = form.querySelector('#formName') as HTMLInputElement;
        const formDob = form.querySelector('#formDob') as HTMLInputElement;
        const formEmail = form.querySelector('#formEmail') as HTMLInputElement;
        const formPhone = form.querySelector('#formPhone') as HTMLInputElement;
        const inputs = [formName, formDob, formEmail, formPhone];
        if (formName && formDob && formEmail && formPhone) {
            isValid =
                this.validateName(formName.value) &&
                this.validateDob(new Date(formDob.value)) &&
                this.validateEmail(formEmail.value) &&
                this.validatePhone(formPhone.value);

            inputs.forEach((input) => {
                input.classList.remove('is-valid');
                input.classList.remove('is-invalid');
            });

            if (!isValid) {
                formName.classList.add(
                    this.validateName(formName.value)
                        ? 'is-valid'
                        : 'is-invalid'
                );
                formDob.classList.add(
                    this.validateDob(new Date(formDob.value))
                        ? 'is-valid'
                        : 'is-invalid'
                );
                formEmail.classList.add(
                    this.validateEmail(formEmail.value)
                        ? 'is-valid'
                        : 'is-invalid'
                );
                formPhone.classList.add(
                    this.validatePhone(formPhone.value)
                        ? 'is-valid'
                        : 'is-invalid'
                );
            }
        }
        return isValid;
    }

    static validateInput(target: HTMLInputElement) {
        if (
            target.classList.contains('is-invalid') ||
            target.classList.contains('is-valid')
        ) {
            target.classList.remove('is-invalid');
            target.classList.remove('is-valid');
            switch (target.name) {
                case 'name':
                    target.classList.add(
                        Validator.validateName(target.value)
                            ? 'is-valid'
                            : 'is-invalid'
                    );
                    break;
                case 'dob':
                    target.classList.add(
                        Validator.validateDob(new Date(target.value))
                            ? 'is-valid'
                            : 'is-invalid'
                    );
                    break;
                case 'email':
                    target.classList.add(
                        Validator.validateEmail(target.value)
                            ? 'is-valid'
                            : 'is-invalid'
                    );
                    break;
                case 'phone':
                    target.classList.add(
                        Validator.validatePhone(target.value)
                            ? 'is-valid'
                            : 'is-invalid'
                    );
                    break;
            }
        }
    }

    public static set userRepo(userRepo: UserRepo) {
        this._userRepo = userRepo;
    }
}

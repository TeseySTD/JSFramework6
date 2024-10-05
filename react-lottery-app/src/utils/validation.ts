export class Validator {
    private static readonly _minimalBirthDate = new Date('1924-01-01');
    private static readonly _maximalBirthDate = new Date();
    private static readonly _minimumNameLength = 1;
    private static readonly _phoneRegex =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    private static readonly _regexEmail =
        /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    static validateEmail(email: string) {
        return this._regexEmail.test(String(email).toLowerCase());
    }
    static validateName(name: string) {
        return name.length >= this._minimumNameLength;
    }
    static validatePhone(phone: string) {
        return this._phoneRegex.test(phone);
    }
    static validateDob(dob: Date) {
        return dob > this._minimalBirthDate && dob < this._maximalBirthDate;
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
}

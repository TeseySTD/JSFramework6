export class User {
    private static _idCounter: number = 0;
    id: number;
    name: string;
    dob: Date;
    email: string;
    phone: string;

    constructor(name: string, dob: Date, email: string, phone: string) {
        this.id = User._idCounter++;
        this.name = name;
        this.dob = dob;
        this.email = email;
        this.phone = phone;
        console.log('New user created with id: ' + this.id);
    }
}

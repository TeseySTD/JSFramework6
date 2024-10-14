export class User {
    readonly id: string;
    name: string;
    dob: Date;
    email: string;
    phone: string;
    isWinner: boolean = false;

    constructor(name: string, dob: Date, email: string, phone: string) {
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.dob = dob;
        this.email = email;
        this.phone = phone;
        console.log('New user created with id: ' + this.id);
    }
}

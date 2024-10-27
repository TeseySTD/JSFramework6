export class User {
    readonly id: string;
    email: string;
    password: string;
    name: string;
    role: string;
    avatar: string;
    isWinner: boolean = false;

    constructor(email: string, password: string, name: string, role: string, avatar: string, id?: string, isWinner?: boolean) {
        this.id = id ?? (Math.random().toString(36).substring(7));
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.avatar = avatar;
        this.isWinner = isWinner ?? false;
        // console.log('New user created with id: ' + this.id);
    }
}

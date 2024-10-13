import { User } from '../types/user';

export class UserRepo {
    private _users: User[];
    private _setStateAction: React.Dispatch<React.SetStateAction<User[]>>;

    constructor(
        users: User[],
        setStateAction: React.Dispatch<React.SetStateAction<User[]>>
    ) {
        this._users = users;
        this._setStateAction = setStateAction;
    }

    public get users(): User[] {
        return this._users;
    }
    public updateUser(user: User): void {
        this._setStateAction(
            (this._users = this._users.map((u) =>
                u.id === user.id ? user : u
            ))
        );
    }

    public addUser(user: User): void {
        this._setStateAction([...this._users, user]);
    }

    public deleteUser(user: User): void {
        this._setStateAction(this._users.filter((u) => u.id !== user.id));
    }

    public getUserById(id: string): User | undefined {
        return this._users.find((user) => user.id === id);
    }

    public getWinners(): User[] {
        return this._users.filter((user) => user.isWinner);
    }

    public sortUsersByName() {
        console.log("sorting by name");
        const sortedUsers = [...this._users].sort((a, b) => a.name.localeCompare(b.name));
        this._setStateAction(sortedUsers);
        console.log(sortedUsers);
    }
    
    public sortUsersByDate() {
        console.log("sorting by date");
        const sortedUsers = [...this._users].sort((a, b) => a.dob.getTime() - b.dob.getTime());
        this._setStateAction(sortedUsers);
        console.log(sortedUsers);
    }
    
}

import { User } from '../types/user';
import { UserFakeApi } from './user-fake-api';

export class UserRepo {
    private static _users: User[];
    private static _setStateAction: React.Dispatch<
        React.SetStateAction<User[]>
    >;

    public static Init(
        users: User[],
        setStateAction: React.Dispatch<React.SetStateAction<User[]>>
    ) {
        UserRepo._users = users;
        UserRepo._setStateAction = setStateAction;
    }

    public static async SeedData(): Promise<User[]> {
        const users = localStorage.getItem('users');
        let usersList;
        if(users == null) {
            // console.log('users list from storage is empty');
            usersList = await UserFakeApi.getUsers();}
        else{
            // console.log('users list', users);
            usersList = JSON.parse(users);
            if (usersList.length == 0) {
                // console.log('users list is empty');
                usersList = await UserFakeApi.getUsers();
            }
            console.log(usersList);
        }


        return usersList;
    }

    public static get users(): User[] {
        return UserRepo._users;
    }
    
    public static updateUser(user: User): void {
        UserRepo._setStateAction(
            (UserRepo._users = UserRepo._users.map((u) =>
                u.id === user.id ? user : u
            ))
        );
    }

    public static addUser(user: User): void {
        UserRepo._setStateAction([...UserRepo._users, user]);
    }

    public static deleteUser(user: User): void {
        UserRepo._setStateAction(
            UserRepo._users.filter((u) => u.id !== user.id)
        );
    }

    public static getUserById(id: string): User | undefined {
        return UserRepo._users.find((user) => user.id === id);
    }

    public static getWinners(): User[] {
        return UserRepo._users.filter((user) => user.isWinner);
    }

    public static sortUsersByName() {
        console.log('sorting by name');
        const sortedUsers = [...UserRepo._users].sort((a, b) =>
            a.name.localeCompare(b.name)
        );
        UserRepo._setStateAction(sortedUsers);
        console.log(sortedUsers);
    }

    // public static sortUsersByDate() {
    //     console.log('sorting by date');
    //     const sortedUsers = [...UserRepo._users].sort(
    //         (a, b) => a.dob.getTime() - b.dob.getTime()
    //     );
    //     UserRepo._setStateAction(sortedUsers);
    //     console.log(sortedUsers);
    // }
}

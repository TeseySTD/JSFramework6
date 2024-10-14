import { User } from '../types/user';

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

    public static SeedData(): User[] {
        const defaultUsers = [
            new User(
                'Amsterdam',
                new Date('1990-10-01'),
                'email1@domain.com',
                '(063) 555-5555'
            ),
            new User(
                'Washington',
                new Date('1985-02-05'),
                'email2@domain.com',
                '(063) 555-5555'
            ),
            new User(
                'Sydney',
                new Date('1987-08-15'),
                'email3@domain.com',
                '(063) 555-5555'
            )
        ];
        const users = localStorage.getItem('users');
        let usersList = users ? JSON.parse(users) : defaultUsers;
        if (usersList.length == 0) usersList = defaultUsers;

        usersList.forEach((user: User) => (user.dob = new Date(user.dob)));
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

    public static sortUsersByDate() {
        console.log('sorting by date');
        const sortedUsers = [...UserRepo._users].sort(
            (a, b) => a.dob.getTime() - b.dob.getTime()
        );
        UserRepo._setStateAction(sortedUsers);
        console.log(sortedUsers);
    }
}

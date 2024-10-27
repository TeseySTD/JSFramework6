import { User } from "../types/user";

export class UserFakeApi {
    private static readonly _mainLink = 'https://api.escuelajs.co/api/v1/users';

    public static async getUsers(): Promise<User[]> {
        try {
            const response = await fetch(this._mainLink);
            const data = await response.json();
            
            return data.map((user: User) => {
                // console.log('creating user', user);
                return new User(
                    user.email,
                    user.password,
                    user.name,
                    user.role,
                    user.avatar,
                    user.id
                );
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}
import { User } from '../types/user';

export class UserFakeApi {
    private static readonly _mainLink = 'https://api.escuelajs.co/api/v1/users';
    private static readonly _authLink = 'https://api.escuelajs.co/api/v1/auth';

    public static async getUsers(): Promise<User[]> {
        try {
            const response = await fetch(this._mainLink);
            const data = await response.json();

            return data.map((user: User) => {
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

    // Метод для входу в систему
    public static async login(
        email: string,
        password: string
    ): Promise<{ access_token: string; refresh_token: string } | null> {
        try {
            const response = await fetch(`${this._authLink}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            return {
                access_token: data.access_token,
                refresh_token: data.refresh_token
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Метод для отримання профілю користувача
    public static async checkTokenValid(accessToken: string): Promise<boolean> {
        const response = await fetch(`${this._authLink}/profile`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return response.ok;
    }

    public static async refreshAccessToken(
        refreshToken: string
    ): Promise<{ access_token: string; refresh_token: string } | null> {
        try {
            const response = await fetch(`${this._authLink}/refresh-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refreshToken })
            });

            if (!response.ok) {  
                throw new Error('Failed to refresh token');
            }

            const data = await response.json();
            return {
                access_token: data.access_token,
                refresh_token: data.refresh_token
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

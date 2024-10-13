import { User } from "../types/user";

interface UsersTableProps {
    users: User[]
    winners: User[] 
}
const UsersTable = (props: UsersTableProps) => {
    return (
        <div className="p-4 mb-4 card">
            <table className="table">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.map((user) => (
                    <tr
                        key={user.id}
                        className={props.winners.includes(user) ? 'table-success' : ''}
                    >
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.dob.toLocaleDateString()}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersTable;
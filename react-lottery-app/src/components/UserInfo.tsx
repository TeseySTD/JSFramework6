import { LoaderFunction, useLoaderData } from 'react-router';
import { UserRepo } from '../utils/user-repo';
import { User } from '../types/user';
import { useEffect, useRef, useState } from 'react';
import { Card, Container } from 'react-bootstrap';

interface UserInfoProps {}

export const loader: LoaderFunction = ({ params }: any) => {
  return params.userId;
};

export default function UserInfo(props: UserInfoProps) {
  const id = useLoaderData() as string;
  const [user, setUser] = useState<User | undefined>(undefined);

  const [users, setUsers] = useState<User[]>([]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetching users...');
      if (users.length > 0) {
        // console.log('users already exist');
        return;
      } else {
        const usersData = await UserRepo.SeedData();
        setUsers(usersData);
        isInitialMount.current = false;
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      return;
    }
    // console.log('set users to storage by useEffect', users);
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  UserRepo.Init(users, setUsers);

  useEffect(() => {
    console.log('set user info');
    setUser(UserRepo.getUserById(id));
  }, [UserRepo.users]);
  if (user) {
    return (
      <Container className="d-flex justify-content-center align-items-start min-vh-100 mt-5 fs-4">
        <Card className="text-center shadow-lg" style={{ width: '18rem' }}>
          <Card.Img
            variant="top"
            src={user.avatar}
            alt={user.name}
            className="rounded-circle mx-auto mt-3"
            style={{ width: '100px', height: '100px' }}
          />
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Card.Text>
              <strong>Email:</strong> {user.email} <br />
              <strong>Role:</strong> {user.role} <br />
              <strong>Is Winner:</strong> {user.isWinner ? 'Yes' : 'No'}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  } else {
    return (
      <Container className="d-flex justify-content-center align-items-start min-vh-100 mt-5 fs-4">
        <Card className="text-center shadow-lg" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>User Not Found</Card.Title>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

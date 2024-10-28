import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserFakeApi } from '../utils/user-fake-api';

interface AppHeaderProps {}

export default function AppNavigation(props: AppHeaderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigateToRoot = () => {
    window.location.href = '/';
  }

  useEffect(() => {
    const checkAuthentication = async () => {
      const accessToken = sessionStorage.getItem('access_token');
      const refreshToken = sessionStorage.getItem('refresh_token');

      if (accessToken && refreshToken) {
        const isValid = await UserFakeApi.checkTokenValid(accessToken);
        setIsAuthenticated(isValid);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    navigateToRoot();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light-subtle">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/lottery">Lottery</a>
          </li>
          <li className="nav-item">
            {isAuthenticated ? (
              <button className="btn btn-link nav-link" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <a className="nav-link" href="/login">Login</a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

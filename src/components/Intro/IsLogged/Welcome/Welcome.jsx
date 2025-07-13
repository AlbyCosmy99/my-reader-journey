import './Welcome.css';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import consts from '../../../../consts';

export default function Welcome() {
  const [name, setName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        const payload = jwtDecode(token);
        setName(payload.name);
      } catch (error) {
        console.error('Failed to decode token', error);
        localStorage.removeItem('jwt');
        window.location.href = `${consts.getFrontendUrl()}`;
      }
    }
  }, []);

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome, <span>{name}</span></h1>
      <p className="welcome-subtitle">Keep track of your books!</p>
    </div>
  );
}

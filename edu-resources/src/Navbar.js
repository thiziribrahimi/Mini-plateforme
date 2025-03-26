import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { ThemeContext } from './ThemeContext';

export default function Navbar({ userEmail, role }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Déconnexion réussie !');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} mb-4`}>
  <div className="container-fluid">
    <a className="navbar-brand" href="#">📚 EduRessources</a>

    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarContent"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
      <ul className="navbar-nav align-items-center">
        <li className="nav-item me-3">
          <button onClick={toggleTheme} className="btn btn-outline-secondary btn-sm">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </li>
        <li className="nav-item me-3">
          <span className="navbar-text">
            {userEmail} ({role})
          </span>
        </li>
        <li className="nav-item">
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>
            Déconnexion
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

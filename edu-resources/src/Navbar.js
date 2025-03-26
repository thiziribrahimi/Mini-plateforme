import React, { useContext, useState } from 'react';
import { auth } from './firebase';
import {
  updateEmail,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { ThemeContext } from './ThemeContext';

export default function Navbar({ userEmail, role }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [newEmail, setNewEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = async () => {
    await auth.signOut();
  };

  const handleChangeEmail = async () => {
    const user = auth.currentUser;
    if (!user || !newEmail) return;

    try {
      await updateEmail(user, newEmail);
      alert('✅ Email mis à jour. Veuillez vous reconnecter.');
      await auth.signOut();
    } catch (err) {
      alert("❌ Une erreur est survenue. Vérifie que tu es bien reconnecté récemment.");
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, userEmail);
      alert("📩 Email de réinitialisation envoyé !");
    } catch (err) {
      alert("❌ Impossible d’envoyer l’email.");
    }
  };

  const handlePasswordChange = async () => {
    const user = auth.currentUser;
    const cred = EmailAuthProvider.credential(user.email, oldPassword);

    try {
      await reauthenticateWithCredential(user, cred);
      await updatePassword(user, newPassword);
      alert("✅ Mot de passe mis à jour !");
      setShowPasswordModal(false);
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      alert("❌ Échec. Vérifie ton ancien mot de passe.");
    }
  };

  const getRoleBadge = () => {
    if (role === 'tuteur') return <span className="badge bg-primary">Tuteur 🧑‍🏫</span>;
    if (role === 'eleve') return <span className="badge bg-success">Élève 🎒</span>;
    return null;
  };

  return (
    <>
      <nav className={`navbar ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} px-3`}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand fw-bold" href="/">📚 EduRessources</a>

          <div className="d-flex align-items-center gap-3">
            {/* Thème */}
            <button
              onClick={toggleTheme}
              className="btn btn-outline-secondary btn-sm"
              title="Changer de thème"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* Avatar */}
            <div className="position-relative">
              <div
                className="avatar-circle"
                onClick={toggleDropdown}
                title="Mon compte"
              >
                {userEmail?.charAt(0).toUpperCase()}
              </div>

              {showDropdown && (
                <div className="dropdown-menu-custom">
                  <div className="small text-muted mb-2">{getRoleBadge()}</div>
                  <button className="dropdown-item" onClick={() => { setShowProfile(true); setShowDropdown(false); }}>
                    👤 Mon profil
                  </button>
                  <button className="dropdown-item" onClick={() => { setShowSettings(true); setShowDropdown(false); }}>
                    ⚙️ Paramètres
                  </button>
                  <button className="dropdown-item" onClick={() => { setShowPasswordModal(true); setShowDropdown(false); }}>
                    🔒 Modifier mot de passe
                  </button>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    🚪 Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Modales : profil, paramètres, mot de passe */}
      {showProfile && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog"><div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">👤 Mon profil</h5>
              <button className="btn-close" onClick={() => setShowProfile(false)}></button>
            </div>
            <div className="modal-body">
              <p><strong>Email :</strong> {userEmail}</p>
              <div className="mb-3">
                <label>Nouveau mail :</label>
                <input type="email" className="form-control" onChange={(e) => setNewEmail(e.target.value)} />
                <button className="btn btn-outline-primary btn-sm mt-2" onClick={handleChangeEmail}>Mettre à jour</button>
              </div>
              <button className="btn btn-outline-warning btn-sm mt-2" onClick={handleResetPassword}>
                🔐 Réinitialiser mot de passe
              </button>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowProfile(false)}>Fermer</button>
            </div>
          </div></div>
        </div>
      )}

      {showSettings && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog"><div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">⚙️ Paramètres</h5>
              <button className="btn-close" onClick={() => setShowSettings(false)}></button>
            </div>
            <div className="modal-body">
              <p>🌗 Thème actuel : <strong>{theme}</strong></p>
              <button className="btn btn-outline-primary btn-sm" onClick={toggleTheme}>
                Changer de thème
              </button>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowSettings(false)}>Fermer</button>
            </div>
          </div></div>
        </div>
      )}

      {showPasswordModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog"><div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">🔒 Modifier le mot de passe</h5>
              <button className="btn-close" onClick={() => setShowPasswordModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label>Ancien mot de passe</label>
                <input type="password" className="form-control" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              </div>
              <div className="mb-3">
                <label>Nouveau mot de passe</label>
                <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowPasswordModal(false)}>Annuler</button>
              <button className="btn btn-success" onClick={handlePasswordChange}>Enregistrer</button>
            </div>
          </div></div>
        </div>
      )}
    </>
  );
}

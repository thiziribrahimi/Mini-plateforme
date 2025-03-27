import React, { useState } from 'react';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function Auth() {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('tuteur'); 
  const [isLogin, setIsLogin] = useState(true); 

  // Gère la soumission du formulaire (connexion ou inscription)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Connexion réussie !');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Enregistrement du rôle dans Firestore
        await setDoc(doc(db, 'users', user.uid), {
          email: email,
          role: role
        });

        alert('Inscription réussie avec rôle !');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <div className="card shadow">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">
            {isLogin ? 'Connexion' : 'Inscription'}
          </h3>

          {/* Formulaire d'authentification */}
          <form onSubmit={handleSubmit}>
            {/* Champ email */}
            <div className="mb-3">
              <label>Email :</label>
              <input
                type="email"
                className="form-control"
                placeholder="exemple@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Champ mot de passe */}
            <div className="mb-3">
              <label>Mot de passe :</label>
              <input
                type="password"
                className="form-control"
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Sélection du rôle (affiché uniquement en mode inscription) */}
            {!isLogin && (
              <div className="mb-3">
                <label>Rôle :</label>
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="tuteur">Tuteur</option>
                  <option value="eleve">Élève</option>
                </select>
              </div>
            )}

            {/* Bouton de soumission */}
            <button type="submit" className="btn btn-primary w-100">
              {isLogin ? 'Se connecter' : 'S’inscrire'}
            </button>
          </form>

          {/* Lien pour basculer entre inscription et connexion */}
          <div className="text-center mt-3">
            <button
              className="btn btn-link"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Pas encore de compte ? S’inscrire"
                : "Déjà inscrit ? Se connecter"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

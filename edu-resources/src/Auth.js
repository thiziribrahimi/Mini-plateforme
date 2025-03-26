import React, { useState } from 'react';
import { auth, db } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('tuteur'); // Valeur par défaut
  const [isLogin, setIsLogin] = useState(true);

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
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />

        {!isLogin && (
          <>
            <label>Rôle : </label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="tuteur">Tuteur</option>
              <option value="eleve">Élève</option>
            </select>
            <br /><br />
          </>
        )}

        <button type="submit">
          {isLogin ? 'Se connecter' : 'S’inscrire'}
        </button>
      </form>
      <br />
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Pas encore de compte ? S’inscrire" : "Déjà inscrit ? Se connecter"}
      </button>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import Auth from './Auth';
import ResourceForm from './ResourceForm';
import ResourceList from './ResourceList';
import SavedResources from './SavedResources';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setRole(userData.role); // "tuteur" ou "eleve"
        }
      } else {
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Déconnexion réussie !');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-vh-100 bg-light text-dark">
      {user ? (
        <div className="container py-5">
          <h2 className="text-center mb-3">
            Bienvenue, {user.email} <span className="text-muted">({role})</span>
          </h2>

          <div className="text-center mb-4">
            <button
              onClick={handleLogout}
              className="btn btn-danger"
            >
              Se déconnecter
            </button>
          </div>

          {role === 'tuteur' && <ResourceForm />}
          <ResourceList role={role} />
          {role === 'eleve' && <SavedResources />}
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import Auth from './Auth';
import ResourceForm from './ResourceForm';
import ResourceList from './ResourceList';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Va chercher le rôle de l'utilisateur dans Firestore
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
      alert("Déconnexion réussie !");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <h2 style={{ textAlign: 'center' }}>
            Bienvenue, {user.email} ({role})
          </h2>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <button onClick={handleLogout}>Se déconnecter</button>
          </div>

          {/* Si le rôle est tuteur, on affiche le formulaire */}
          {role === 'tuteur' && <ResourceForm />}
          <ResourceList role={role} />
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;

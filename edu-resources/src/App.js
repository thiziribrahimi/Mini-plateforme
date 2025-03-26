import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import Auth from './Auth';
import ResourceForm from './ResourceForm';
import ResourceList from './ResourceList';
import SavedResources from './SavedResources';
import Navbar from './Navbar';

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

  return (
    <div className="min-vh-100 bg-light text-dark">
      {user ? (
        <>
          <Navbar userEmail={user.email} role={role} />

          <div className="container py-4">
            {role === 'tuteur' && <ResourceForm />}
            <ResourceList role={role} />
            {role === 'eleve' && <SavedResources />}
          </div>
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;

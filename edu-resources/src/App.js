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

  const getIllustration = () => {
    if (role === 'tuteur') return '/educative.png';    // 👨‍🏫 tuteur
    if (role === 'eleve') return '/learn_kid.png';     // 🧠 élève
    return null;
  };

  const getCitation = () => {
    if (role === 'tuteur') return "Partager, c'est faire grandir 📚";
    if (role === 'eleve') return "Apprendre, c’est grandir 🌱";
    return '';
  };

  return (
    <div className="min-vh-100 bg-light text-dark">
      {user ? (
        <>
          <Navbar userEmail={user.email} role={role} />

          <div className="container py-5">
            <div className="row align-items-center">
              {/* Colonne illustration */}
              <div className="col-md-4 text-center mb-4 mb-md-0">
                {getIllustration() && (
                  <>
                    <img
                      src={getIllustration()}
                      alt="Illustration"
                      className="edu-image"
                    />
                    <p className="quote-text mt-3">{getCitation()}</p>
                  </>
                )}
              </div>

              {/* Colonne contenu */}
              <div className="col-md-8">
                {role === 'tuteur' && <ResourceForm />}
                <ResourceList role={role} />
                {role === 'eleve' && <SavedResources />}
              </div>
            </div>
          </div>
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;

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
          setRole(userData.role);
        }
      } else {
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const getIllustration = () => {
    if (role === 'tuteur') return '/educative.png';
    if (role === 'eleve') return '/learn_kid.png';
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

          <div className="container-fluid py-4">
            <div className="row">
              
              {/* Illustration en haut (mobile only) */}
              <div className="d-block d-md-none text-center mb-4">
                {getIllustration() && (
                  <>
                    <img src={getIllustration()} alt="Illustration" className="edu-image" />
                    <p className="quote-text mt-2">{getCitation()}</p>
                  </>
                )}
              </div>

              {/* Illustration fixe à gauche (desktop only) */}
              <div className="col-md-3 d-none d-md-block">
                <div className="sticky-top" style={{ top: '90px' }}>
                  {getIllustration() && (
                    <>
                      <img src={getIllustration()} alt="Illustration" className="edu-image fixed-illustration" />
                      <div className="quote-wrapper mt-2">
                        <p className="quote-text">{getCitation()}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Contenu principal */}
              <div className="col-md-9">
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

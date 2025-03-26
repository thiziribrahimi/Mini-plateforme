import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';

export default function SavedResources() {
  const [savedResources, setSavedResources] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, 'savedResources'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSavedResources(items);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer cette ressource de votre liste ?")) {
      await deleteDoc(doc(db, 'savedResources', id));
    }
  };

  return (
    <div className="card mt-4 shadow-sm">
      <div className="card-body">
        <h4 className="card-title">Mes ressources enregistrées</h4>

        {savedResources.length === 0 ? (
          <p className="text-muted">Aucune ressource enregistrée.</p>
        ) : (
          <ul className="list-group">
            {savedResources.map((res) => (
              <li key={res.id} className="list-group-item">
                <strong>{res.title}</strong><br />
                <a href={res.url} target="_blank" rel="noreferrer">
                  {res.url}
                </a>
                <div className="mt-2">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(res.id)}
                  >
                    Supprimer de ma liste
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

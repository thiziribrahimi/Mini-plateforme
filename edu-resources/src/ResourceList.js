import React, { useEffect, useState } from 'react';
import {
  collection, query, where, onSnapshot,
  deleteDoc, doc, updateDoc
} from 'firebase/firestore';
import { db, auth } from './firebase';

export default function ResourceList({ role }) {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedUrl, setEditedUrl] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    let q;

    if (role === 'tuteur') {
      q = query(collection(db, 'resources'), where('userId', '==', user.uid));
    } else {
      q = collection(db, 'resources');
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setResources(items);
    });

    return () => unsubscribe();
  }, [role]);

  const filteredResources = resources.filter((res) =>
    res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer cette ressource ?")) {
      await deleteDoc(doc(db, 'resources', id));
    }
  };

  const startEdit = (resource) => {
    setEditingId(resource.id);
    setEditedTitle(resource.title);
    setEditedUrl(resource.url);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedTitle('');
    setEditedUrl('');
  };

  const saveEdit = async (id) => {
    await updateDoc(doc(db, 'resources', id), {
      title: editedTitle,
      url: editedUrl
    });
    cancelEdit();
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h3>{role === 'tuteur' ? 'Vos ressources' : 'Ressources disponibles'}</h3>

      <input
        type="text"
        placeholder="Rechercher une ressource..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
      />

      <ul>
        {filteredResources.map(resource => (
          <li key={resource.id}>
            {editingId === resource.id ? (
              <>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                /><br />
                <input
                  type="url"
                  value={editedUrl}
                  onChange={(e) => setEditedUrl(e.target.value)}
                /><br />
                <button onClick={() => saveEdit(resource.id)}>Enregistrer</button>
                <button onClick={cancelEdit}>Annuler</button>
              </>
            ) : (
              <>
                <strong>{resource.title}</strong><br />
                <a href={resource.url} target="_blank" rel="noreferrer">{resource.url}</a><br />
                {role === 'tuteur' && resource.userId === auth.currentUser.uid && (
                  <>
                    <button onClick={() => startEdit(resource)}>Modifier</button>
                    <button onClick={() => handleDelete(resource.id)}>Supprimer</button>
                  </>
                )}
              </>
            )}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

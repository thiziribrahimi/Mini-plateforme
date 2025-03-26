import React, { useEffect, useState } from 'react';
import {
  collection, query, where, onSnapshot,
  deleteDoc, doc, updateDoc, addDoc
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

    const q = role === 'tuteur'
      ? query(collection(db, 'resources'), where('userId', '==', user.uid))
      : collection(db, 'resources');

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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

  const handleSave = async (resource) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const savedResource = {
        userId: user.uid,
        resourceId: resource.id,
        title: resource.title,
        url: resource.url,
        savedAt: new Date()
      };

      await addDoc(collection(db, 'savedResources'), savedResource);
      alert('Ressource ajoutée à votre liste !');
    } catch (err) {
      console.error("Erreur ajout ressource :", err);
      alert("Erreur lors de l\'ajout !");
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
          <h4 className="card-title">
             📚 Ressources {role === 'tuteur' ? 'ajoutées par vous' : 'disponibles'}
          </h4>


        <input
          type="text"
          className="form-control mb-3"
          placeholder="Rechercher une ressource..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ul className="list-group">
          {filteredResources.map(resource => (
            <li key={resource.id} className="list-group-item">
              {editingId === resource.id ? (
                <>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                  <input
                    type="url"
                    className="form-control mb-2"
                    value={editedUrl}
                    onChange={(e) => setEditedUrl(e.target.value)}
                  />
                  <button onClick={() => saveEdit(resource.id)} className="btn btn-primary btn-sm me-2">Enregistrer</button>
                  <button onClick={cancelEdit} className="btn btn-secondary btn-sm">Annuler</button>
                </>
              ) : (
                <>
                  <strong>{resource.title}</strong><br />
                  <a href={resource.url} target="_blank" rel="noreferrer">{resource.url}</a><br />

                  {role === 'tuteur' && resource.userId === auth.currentUser.uid && (
                    <div className="mt-2">
                      <button onClick={() => startEdit(resource)} className="btn btn-outline-primary btn-sm me-2">Modifier</button>
                      <button onClick={() => handleDelete(resource.id)} className="btn btn-outline-danger btn-sm">Supprimer</button>
                    </div>
                  )}

                  {role === 'eleve' && (
                    <div className="mt-2">
                      <button
                        onClick={() => handleSave(resource)}
                        className="btn btn-outline-success btn-sm"
                      >
                        Ajouter à ma liste
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { db, auth } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ResourceForm() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("Tu dois être connecté.");

    try {
      await addDoc(collection(db, 'resources'), {
        title,
        url,
        userId: user.uid,
        createdAt: serverTimestamp()
      });
      setTitle('');
      setUrl('');
      alert('Ressource ajoutée !');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h4 className="card-title mb-3">Ajouter une ressource</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Titre</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: Introduction à React"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Lien URL</label>
            <input
              type="url"
              className="form-control"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Ajouter</button>
        </form>
      </div>
    </div>
  );
}

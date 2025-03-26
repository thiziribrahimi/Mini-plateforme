import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from './firebase';

export default function ResourceForm() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || !title || !url) return;

    const newResource = {
      userId: user.uid,
      title,
      url,
      description,
      createdAt: new Date()
    };

    try {
      await addDoc(collection(db, 'resources'), newResource);
      setTitle('');
      setUrl('');
      setDescription('');
    } catch (error) {
      alert("Erreur lors de l'ajout");
    }
  };

  return (
    <div className="card shadow-sm mb-4 bg-light-gradient">
      <div className="card-body">
        <h4 className="card-title">📤 Ajouter une ressource</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="url"
            className="form-control mb-2"
            placeholder="Lien URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Description"
            rows="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit" className="btn btn-success w-100">Ajouter</button>
        </form>
      </div>
    </div>
  );
}

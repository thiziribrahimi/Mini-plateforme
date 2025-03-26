import React, { useState } from 'react';
import { db, auth } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ResourceForm() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("Tu dois être connecté !");
      return;
    }

    try {
      await addDoc(collection(db, 'resources'), {
        title,
        url,
        userId: user.uid,
        createdAt: serverTimestamp()
      });

      setTitle('');
      setUrl('');
      alert("Ressource ajoutée !");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h3>Ajouter une ressource</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre de la ressource"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br /><br />
        <input
          type="url"
          placeholder="Lien URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

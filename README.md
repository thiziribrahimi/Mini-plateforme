# 📚 EduRessources – Plateforme de partage éducatif

**EduRessources** est une mini-plateforme web permettant aux **tuteurs** de partager des ressources éducatives et aux **élèves** de les consulter et enregistrer.

---

## 🚀 Fonctionnalités

- 🔐 Authentification (inscription & connexion)
- 👨‍🏫 Rôles : Tuteur / Élève
- ➕ Ajouter des ressources (titre, URL, description)
- 📂 Liste des ressources selon le rôle :
  - **Tuteur** : peut modifier / supprimer ses ressources
  - **Élève** : peut enregistrer et gérer ses ressources favorites
- 🔍 Barre de recherche
- 🌓 Thème clair / sombre
- 📱 Interface responsive (mobile & desktop)
- 🧑‍🎓 Avatar avec menu (profil, mot de passe, déconnexion)

---

## 🛠️ Technologies utilisées

- **React.js** (Frontend)
- **Firebase Auth & Firestore** (Backend & BDD)
- **Bootstrap** + **CSS personnalisé**

---

## ⚙️ Installation

1. Clone le repo :

```bash
git clone https://github.com/thiziribrahimi/Mini-plateforme.git
cd edu-ressources
```

2. Installe les dépendances :

```bash
npm install
```

3. Configure Firebase :

Crée un fichier `.env` ou modifie directement `firebase.js` avec tes clés Firebase :

```js
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
};
```

---

## 🚀 Lancer le projet en local

```bash
npm start
```

---

## 🌐 Déploiement sur Firebase 

1. Installe Firebase CLI :

```bash
npm install -g firebase-tools
```

2. Connecte ton compte Firebase :

```bash
firebase login
```

3. Initialise Firebase dans ton projet :

```bash
firebase init
```

4. Build l’application pour la production :

```bash
npm run build
```

5. Déploie l’application sur Firebase :

```bash
firebase deploy
```

---
## 📸 Aperçu

Voici un aperçu de l’interface :

![La page de connexion / inscription](https://github.com/user-attachments/assets/e9020843-23d7-403a-b820-82b0f1d27e5d)

![L’espace élève](https://github.com/user-attachments/assets/7ab161e1-5d57-48ab-a27d-d19ade165f9a)

![L’espace tuteur](https://github.com/user-attachments/assets/bb2b7419-3b8f-4d82-bc25-591543675a03)




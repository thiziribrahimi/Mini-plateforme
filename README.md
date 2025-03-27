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
git clone https://github.com/ton-utilisateur/edu-ressources.git
cd edu-ressources

2. Installe les dépendances :

```bash
npm install

3. Configure Firebase :

Crée un fichier .env ou modifie firebase.js avec tes clés Firebase :

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
};
## 🚀 Lancer le projet en local
```bash
npm start

## 🌐 Déploiement
1. Installe Firebase CLI :

```bash
npm install -g firebase-tools

2. Connecte ton compte Firebase :

```bash
firebase login
3. Initialise Firebase dans ton projet :

```bash
firebase init

4. Build l’application pour la production :

```bash
npm run build

5. Déploie-la sur Firebase :

```bash
firebase deploy

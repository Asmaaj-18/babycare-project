# BabyCare Project
## Description
BabyCare est une application web de suivi et gestion de la santé des bébés, permettant aux parents et aux médecins de consulter, ajouter et suivre les informations liées à la croissance, au sommeil, aux vaccins et aux commentaires.

## Technologies utilisées

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM (PostgreSQL via Neon)
- JWT (authentification)
- dotenv

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

## Structure du projet
```
projetfinal babycare/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── prisma/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── README.md
└── README.md
```

## Utilisateurs de test

- **Parent**
  - Email : `marie@test.com`
  - Mot de passe : `parent123`
- **Doctor**
  - Email : `doctor3@test.com`
  - Mot de passe : `doctor123`

## Fonctionnalités principales
- Authentification parent/doctor
- Gestion des bébés (ajout, modification, suppression)
- Suivi de la croissance, du sommeil, des vaccins
- Section commentaires
- Dashboard parent et doctor

## Installation

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Configuration
- Renseignez la variable `DATABASE_URL` dans le fichier `.env` du backend.

## Accès
- Accédez à l’application via le frontend (Vite).
- Utilisez les comptes de test pour explorer les fonctionnalités.



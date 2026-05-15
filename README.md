# Simulateur PMP — Examen Officiel

Application web complète pour s'entraîner à l'examen PMP en conditions réelles.

## ✨ Fonctionnalités

- **🎯 Mode Examen Officiel** : 180 questions / 230 min / 2 pauses obligatoires de 10 min (après Q60 et Q120)
- **⚡ Mini-examen** : 60 questions / 75 min, pour un entraînement rapide
- **📚 Mode Étude** : sans timer, explication immédiate après chaque question
- **🤖 Assistant PMP** : collez du texte ou téléversez une capture d'écran (OCR français + anglais via Tesseract.js) ; l'assistant cherche la réponse dans la banque et la base de connaissances
- **📊 Statistiques détaillées** : score global + par domaine (Personnes / Processus / Environnement) + par approche (Prédictif / Agile / Hybride)
- **🔖 Marquage et navigation** : marquer des questions, naviguer dans la grille, revenir avant soumission de section
- **📖 Révision complète** : revoir chaque question avec réponse correcte et explication détaillée
- **🌓 Thème clair/sombre** • **📱 Responsive** desktop & mobile

## 📁 Structure des fichiers

```
pmp-exam-app/
├── index.html                  ← Point d'entrée
├── assets/styles.css           ← Styles personnalisés
└── src/
    ├── main.jsx                ← Montage React
    ├── App.jsx                 ← Routeur / machine d'états
    ├── data/
    │   ├── questions.js        ← Banque de 180 questions PMP en français
    │   └── knowledge.js        ← Base de connaissances PMBOK 7 + Agile
    ├── utils/
    │   ├── helpers.js          ← Utilitaires (temps, shuffle, persistance)
    │   └── search.js           ← Moteur de recherche pour l'Assistant
    └── components/
        ├── Header.jsx
        ├── Home.jsx
        ├── Timer.jsx
        ├── NavigationGrid.jsx
        ├── QuestionCard.jsx
        ├── BreakScreen.jsx
        ├── ExamScreen.jsx
        ├── ResultsScreen.jsx
        ├── ReviewScreen.jsx
        ├── StudyMode.jsx
        └── Assistant.jsx
```

## 🚀 Lancement

### Option 1 : Ouvrir directement (le plus simple)

Double-cliquez sur `index.html` pour l'ouvrir dans votre navigateur (Chrome / Firefox / Edge / Safari).

> ⚠️ Sur certains navigateurs, ouvrir un fichier local peut bloquer le chargement de modules. Si l'application reste blanche, utilisez l'option 2.

### Option 2 : Serveur local (recommandé)

Ouvrez un terminal dans ce dossier, puis :

```bash
# Avec Python (déjà installé sur Mac/Linux)
python3 -m http.server 8080

# Ou avec Node.js
npx serve .

# Ou avec PHP
php -S localhost:8080
```

Puis ouvrez **http://localhost:8080** dans votre navigateur.

## 🛠 Technologies

- **React 18** (via CDN — pas de build)
- **Babel Standalone** (transpilation JSX dans le navigateur)
- **Tailwind CSS** (via CDN, dark mode classe)
- **Tesseract.js** (OCR pour l'assistant — chargé à la demande)
- **Vanilla JS** pour le moteur de recherche

## 📚 Sources

- *PMBOK Guide* 7th Edition (Project Management Institute)
- *Agile Practice Guide* (PMI + Agile Alliance)
- Questions issues d'examens réels en français + générées selon les principes PMI

## ⚖️ Mentions

Application pédagogique non-officielle. **PMP®** et **PMBOK®** sont des marques déposées du Project Management Institute, Inc.

Le seuil de réussite affiché (≈ 70 %) est indicatif. Le PMI ne publie pas de score de passage officiel.

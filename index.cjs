const express = require('express');
const app = express();

// Middleware pour parser le corps des requêtes
app.use(express.json());

// Données
let jsonData = [];

// Route GET pour "/"
app.get('/', (req, res) => {
  res.send('Hello');
});

// Route POST pour "/api"
app.post('/api', (req, res) => {
  const { username, password } = req.body;

  // Créer un nouvel objet avec les nouvelles données
  const newData = { username, password };

  // Ajouter les nouvelles données au tableau existant
  jsonData.push(newData);

  res.status(201).json({ message: 'Données ajoutées avec succès' });
});

// Route GET pour "/data"
app.get('/data', (req, res) => {
  res.json(jsonData);
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});

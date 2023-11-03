const express = require('express');
const fs = require('fs');
const app = express();

// Middleware pour parser le corps des requêtes
app.use(express.json());

// Chemin du fichier JSON de données
const dataFilePath = './data.json';

// Vérifier si le fichier JSON existe, sinon le créer avec un tableau vide
if (!fs.existsSync(dataFilePath)) {
  const defaultData = [];
  saveDataToFile(defaultData);
}

// Route GET pour "/"
app.get('/', (req, res) => {
  res.send('Hello');
});

// Route POST pour "/api"
app.post('/api', (req, res) => {
  const { username, password } = req.body;

  // Charger les données existantes à partir du fichier JSON
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier JSON :', err);
      res.status(500).json({ message: 'Erreur lors de la lecture des données' });
      return;
    }

    let jsonData = [];
    if (data) {
      jsonData = JSON.parse(data);
    }

    // Créer un nouvel objet avec les nouvelles données
    const newData = { username, password };

    // Ajouter les nouvelles données au tableau existant
    jsonData.push(newData);

    // Enregistrer le tableau mis à jour dans le fichier JSON
    saveDataToFile(jsonData);

    res.status(201).json({ message: 'Données ajoutées avec succès' });
  });
});

// Fonction pour enregistrer les données dans un fichier JSON
function saveDataToFile(data) {
  fs.writeFile(dataFilePath, JSON.stringify(data), (err) => {
    if (err) {
      console.error('Erreur lors de l\'enregistrement des données :', err);
    } else {
      console.log('Données enregistrées avec succès dans data.json');
    }
  });
}

// Route GET pour "/data"
app.get('/data', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier JSON :', err);
      res.status(500).json({ message: 'Erreur lors de la lecture des données' });
    } else {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    }
  });
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});

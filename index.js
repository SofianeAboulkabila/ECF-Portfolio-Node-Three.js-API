// Description: Ce fichier contient le code du serveur Node.js


// Import des modules


const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public'), { 
  extensions: ['html', 'css', 'js'],
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'text/javascript');
    }
  }
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Récupérer la page index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Récupérer toutes les data dans le fichier data.json methode GET
app.get('/data', (req, res) => {
});

// Ajouter une data dans le fichier data.json methode POST
app.post('/data', (req, res) => {
});

// Récupérer unedata spécifique en utilisant son ID dans le fichier data.json methode GET
app.get('/data/id/:id', (req, res) => {
});

// Route permettant de modifier une data spécifique en utilisant son ID dans le fichier data.json
app.put('/data/id/:id/modifier', (req, res) => {
});

// Supprimer une data à partir de son nom dans le fichier data.json methode DELETE
app.delete('/data/:nom', (req, res) => {
});


app.listen(
  3001, () => {
    console.log('Serveur démarré sur le port 3001');
  });

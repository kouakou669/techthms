const express = require('express');
const app = express();
__path = process.cwd(); // Récupère le chemin actuel du travail
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;

// Importation de modules externes
let server = require('./qr');
let code = require('./pair');

// Augmente le nombre maximum d'auditeurs d'événements
require('events').EventEmitter.defaultMaxListeners = 500;

// Routes pour différents modules
app.use('/qr', server);
app.use('/code', code);
app.use('/pair', async (req, res, next) => {
    res.sendFile(__path + '/pair.html');
});
app.use('/', async (req, res, next) => {
    res.sendFile(__path + '/hacking.html');
});

// Middleware pour parser le corps des requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`
Don't Forget To Give Star

 Hacking Session Server running on http://localhost:` + PORT);
});

module.exports = app;

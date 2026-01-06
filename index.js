require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const logger = require('./utils/logger');

// Vérifier que le token est présent
if (!process.env.DISCORD_TOKEN) {
  logger.error('❌ Le token Discord n\'est pas défini dans le fichier .env');
  logger.error('📝 Veuillez créer un fichier .env avec DISCORD_TOKEN=votre_token');
  process.exit(1);
}

// Créer le client Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// Collection pour stocker les commandes
client.commands = new Collection();

// Charger toutes les commandes
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
    logger.debug(`Commande chargée: ${command.data.name}`);
  } else {
    logger.warn(`La commande ${filePath} n'a pas les propriétés 'data' ou 'execute' requises.`);
  }
}

// Charger tous les événements
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
  
  logger.debug(`Événement chargé: ${event.name}`);
}

// Gestion des erreurs globales
process.on('uncaughtException', (error) => {
  logger.error('Exception non capturée:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Promesse rejetée non gérée:', reason);
});

// Connexion du bot
client.login(process.env.DISCORD_TOKEN).catch(error => {
  logger.error(`Erreur lors de la connexion: ${error.message}`);
  process.exit(1);
});

const { Events, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    logger.info(`✅ Bot connecté en tant que ${client.user.tag}`);
    logger.info(`📊 Connecté à ${client.guilds.cache.size} serveur(s)`);

    // Charger toutes les commandes
    const commands = [];
    const commandsPath = path.join(__dirname, '..', 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(path.join(commandsPath, file));
      commands.push(command.data.toJSON());
    }

    // Enregistrer les commandes
    const rest = new REST({ version: '10' }).setToken(client.token);

    try {
      logger.info('🔄 Enregistrement des commandes...');

      // Enregistrer les commandes globalement
      const data = await rest.put(
        Routes.applicationCommands(client.user.id),
        { body: commands }
      );

      logger.info(`✅ ${data.length} commande(s) enregistrée(s) avec succès.`);
    } catch (error) {
      logger.error(`❌ Erreur lors de l'enregistrement des commandes: ${error.message}`);
    }

    // Définir le statut du bot
    client.user.setActivity('gérer les vouches', { type: 'WATCHING' });
  }
};


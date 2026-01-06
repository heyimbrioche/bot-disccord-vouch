const { Events, MessageFlags } = require('discord.js');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      logger.warn(`Commande ${interaction.commandName} non trouvée.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      logger.error(`Erreur lors de l'exécution de la commande ${interaction.commandName}: ${error.message}`);
      logger.error(error.stack);

      const errorMessage = {
        content: '❌ Une erreur est survenue lors de l\'exécution de cette commande.',
        flags: MessageFlags.Ephemeral
      };

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(errorMessage);
      } else {
        await interaction.reply(errorMessage);
      }
    }
  }
};


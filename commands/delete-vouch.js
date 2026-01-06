const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const database = require('../utils/database');
const logger = require('../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delete-vouch')
    .setDescription('Supprimer un vouch (Administrateurs uniquement)')
    .addStringOption(option =>
      option.setName('vouch-id')
        .setDescription('ID du vouch à supprimer')
        .setRequired(true)),

  async execute(interaction) {
    try {
      // Vérifier les permissions
      if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
        return interaction.reply({
          content: '❌ Vous devez être administrateur pour utiliser cette commande.',
          flags: MessageFlags.Ephemeral
        });
      }

      const vouchId = interaction.options.getString('vouch-id');
      const success = database.removeVouch(interaction.guildId, vouchId);

      if (success) {
        logger.info(`Vouch ${vouchId} supprimé par ${interaction.user.tag}`);
        await interaction.reply({
          content: `✅ Le vouch \`${vouchId}\` a été supprimé avec succès.`,
          flags: MessageFlags.Ephemeral
        });
      } else {
        await interaction.reply({
          content: `❌ Aucun vouch trouvé avec l'ID \`${vouchId}\`.`,
          flags: MessageFlags.Ephemeral
        });
      }
    } catch (error) {
      logger.error(`Erreur dans la commande delete-vouch: ${error.message}`);
      await interaction.reply({
        content: '❌ Une erreur est survenue lors de la suppression du vouch.',
        flags: MessageFlags.Ephemeral
      });
    }
  }
};


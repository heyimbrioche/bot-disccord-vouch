const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const database = require('../utils/database');
const logger = require('../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('set-vouch-channel')
    .setDescription('Définir le salon où les vouches seront envoyés')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('Le salon pour les vouches')
        .setRequired(true)),

  async execute(interaction) {
    try {
      if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
        return interaction.reply({
          content: '❌ Vous devez être administrateur pour utiliser cette commande.',
          flags: MessageFlags.Ephemeral
        });
      }

      const channel = interaction.options.getChannel('channel');
      
      if (!channel.isTextBased()) {
        return interaction.reply({
          content: '❌ Le salon doit être un salon textuel.',
          flags: MessageFlags.Ephemeral
        });
      }

      database.setGuildConfig(interaction.guildId, { vouchChannel: channel.id });
      logger.info(`Canal de vouches défini sur ${channel.name} par ${interaction.user.tag}`);

      await interaction.reply({
        content: `✅ Le salon des vouches a été défini sur ${channel}.`,
        flags: MessageFlags.Ephemeral
      });
    } catch (error) {
      logger.error(`Erreur dans la commande set-vouch-channel: ${error.message}`);
      await interaction.reply({
        content: '❌ Une erreur est survenue lors de la configuration.',
        flags: MessageFlags.Ephemeral
      });
    }
  }
};


const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const database = require('../utils/database');
const logger = require('../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('set-role-vouch')
    .setDescription('Définir un rôle autorisé à utiliser les commandes de vouch')
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('Le rôle autorisé')
        .setRequired(true)),

  async execute(interaction) {
    try {
      if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
        return interaction.reply({
          content: '❌ Vous devez être administrateur pour utiliser cette commande.',
          flags: MessageFlags.Ephemeral
        });
      }

      const role = interaction.options.getRole('role');
      database.setGuildConfig(interaction.guildId, { vouchRole: role.id });
      logger.info(`Rôle de vouches défini sur ${role.name} par ${interaction.user.tag}`);

      await interaction.reply({
        content: `✅ Le rôle ${role} est maintenant autorisé à utiliser les commandes de vouch.`,
        flags: MessageFlags.Ephemeral
      });
    } catch (error) {
      logger.error(`Erreur dans la commande set-role-vouch: ${error.message}`);
      await interaction.reply({
        content: '❌ Une erreur est survenue lors de la configuration.',
        flags: MessageFlags.Ephemeral
      });
    }
  }
};


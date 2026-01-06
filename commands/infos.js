const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const database = require('../utils/database');
const helpers = require('../utils/helpers');
const logger = require('../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('infos')
    .setDescription('Voir les statistiques d\'un utilisateur')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Utilisateur à vérifier')
        .setRequired(false)),

  async execute(interaction) {
    try {
      const user = interaction.options.getUser('user') || interaction.user;
      const vouches = database.getUserVouches(interaction.guildId, user.id);

      if (vouches.length === 0) {
        return interaction.reply({
          content: `ℹ️ Aucun vouch trouvé pour ${user.username}.`,
          flags: MessageFlags.Ephemeral
        });
      }

      const stats = helpers.calculateUserStats(vouches);
      const embed = helpers.createStatsEmbed(user, stats);

      // Ajouter les derniers vouches
      const recentVouches = vouches
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

      if (recentVouches.length > 0) {
        const recentText = recentVouches
          .map(v => `${'⭐'.repeat(v.stars)} ${v.description.substring(0, 50)}${v.description.length > 50 ? '...' : ''}`)
          .join('\n');
        embed.addFields({ name: '📋 Derniers vouches', value: recentText || 'Aucun' });
      }

      await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    } catch (error) {
      logger.error(`Erreur dans la commande infos: ${error.message}`);
      await interaction.reply({
        content: '❌ Une erreur est survenue lors de la récupération des informations.',
        flags: MessageFlags.Ephemeral
      });
    }
  }
};


const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const database = require('../utils/database');
const helpers = require('../utils/helpers');
const logger = require('../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Afficher le classement des utilisateurs avec les meilleures notes')
    .addIntegerOption(option =>
      option.setName('page')
        .setDescription('Page à afficher (par défaut: 1)')
        .setMinValue(1)
        .setRequired(false)),

  async execute(interaction) {
    try {
      const page = interaction.options.getInteger('page') || 1;
      const vouches = database.getGuildVouches(interaction.guildId);

      if (vouches.length === 0) {
        return interaction.reply({
          content: 'ℹ️ Aucun vouch trouvé sur ce serveur.',
          flags: MessageFlags.Ephemeral
        });
      }

      const leaderboard = helpers.generateLeaderboard(vouches, 20);
      const paginated = helpers.paginate(leaderboard, page, 10);

      if (paginated.data.length === 0) {
        return interaction.reply({
          content: `❌ Aucun résultat pour la page ${page}.`,
          flags: MessageFlags.Ephemeral
        });
      }

      const embed = helpers.createLeaderboardEmbed(paginated.data, paginated.page, paginated.totalPages);
      
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      logger.error(`Erreur dans la commande leaderboard: ${error.message}`);
      await interaction.reply({
        content: '❌ Une erreur est survenue lors de l\'affichage du leaderboard.',
        flags: MessageFlags.Ephemeral
      });
    }
  }
};


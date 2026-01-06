const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const database = require('../utils/database');
const helpers = require('../utils/helpers');
const logger = require('../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('history')
    .setDescription('Voir l\'historique des vouches d\'un utilisateur')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Utilisateur dont vous voulez voir l\'historique')
        .setRequired(false))
    .addIntegerOption(option =>
      option.setName('page')
        .setDescription('Page à afficher (par défaut: 1)')
        .setMinValue(1)
        .setRequired(false)),

  async execute(interaction) {
    try {
      const user = interaction.options.getUser('user') || interaction.user;
      const page = interaction.options.getInteger('page') || 1;
      const vouches = database.getUserVouches(interaction.guildId, user.id);

      if (vouches.length === 0) {
        return interaction.reply({
          content: `ℹ️ Aucun vouch trouvé pour ${user.username}.`,
          flags: MessageFlags.Ephemeral
        });
      }

      // Trier par date (plus récent en premier)
      const sortedVouches = vouches.sort((a, b) => new Date(b.date) - new Date(a.date));
      const paginated = helpers.paginate(sortedVouches, page, 5);

      if (paginated.data.length === 0) {
        return interaction.reply({
          content: `❌ Aucun résultat pour la page ${page}.`,
          flags: MessageFlags.Ephemeral
        });
      }

      const embed = new EmbedBuilder()
        .setColor('#0099FF')
        .setTitle(`📜 Historique des vouches de ${user.username}`)
        .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }))
        .setFooter({ text: `Page ${paginated.page}/${paginated.totalPages} • Total: ${paginated.total} vouches` })
        .setTimestamp();

      const historyText = paginated.data
        .map((vouch, index) => {
          const date = helpers.formatDate(vouch.date);
          const stars = '⭐'.repeat(vouch.stars);
          return `**${(paginated.page - 1) * 5 + index + 1}.** ${stars} ${vouch.stars}/5\n` +
                 `📝 ${vouch.description.substring(0, 100)}${vouch.description.length > 100 ? '...' : ''}\n` +
                 `👤 Par: ${vouch.authorName || 'Inconnu'} • 📅 ${date}`;
        })
        .join('\n\n');

      embed.setDescription(historyText);

      await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    } catch (error) {
      logger.error(`Erreur dans la commande history: ${error.message}`);
      await interaction.reply({
        content: '❌ Une erreur est survenue lors de la récupération de l\'historique.',
        flags: MessageFlags.Ephemeral
      });
    }
  }
};


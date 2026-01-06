const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const database = require('../utils/database');
const helpers = require('../utils/helpers');
const logger = require('../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Afficher les statistiques globales du serveur'),

  async execute(interaction) {
    try {
      const vouches = database.getGuildVouches(interaction.guildId);

      if (vouches.length === 0) {
        return interaction.reply({
          content: 'ℹ️ Aucun vouch trouvé sur ce serveur.',
          flags: MessageFlags.Ephemeral
        });
      }

      // Calculer les statistiques globales
      const totalVouches = vouches.length;
      const totalStars = vouches.reduce((acc, v) => acc + v.stars, 0);
      const averageStars = totalStars / totalVouches;
      const positiveVouches = vouches.filter(v => v.stars >= 4).length;
      const negativeVouches = vouches.filter(v => v.stars <= 2).length;
      const neutralVouches = vouches.filter(v => v.stars === 3).length;

      // Utilisateurs uniques
      const uniqueUsers = new Set(vouches.map(v => v.userId)).size;

      // Distribution des étoiles
      const starDistribution = {};
      for (let i = 1; i <= 5; i++) {
        starDistribution[i] = vouches.filter(v => v.stars === i).length;
      }

      const embed = new EmbedBuilder()
        .setColor('#0099FF')
        .setTitle('📊 Statistiques Globales du Serveur')
        .setThumbnail(interaction.guild.iconURL({ format: 'png', dynamic: true }))
        .addFields(
          { name: '📈 Total de vouches', value: `${totalVouches}`, inline: true },
          { name: '👥 Utilisateurs uniques', value: `${uniqueUsers}`, inline: true },
          { name: '⭐ Note moyenne', value: `${averageStars.toFixed(2)}/5`, inline: true },
          { name: '👍 Vouches positifs (4-5⭐)', value: `${positiveVouches}`, inline: true },
          { name: '👎 Vouches négatifs (1-2⭐)', value: `${negativeVouches}`, inline: true },
          { name: '➖ Vouches neutres (3⭐)', value: `${neutralVouches}`, inline: true },
          {
            name: '📊 Distribution des étoiles',
            value: `1⭐: ${starDistribution[1]}\n2⭐: ${starDistribution[2]}\n3⭐: ${starDistribution[3]}\n4⭐: ${starDistribution[4]}\n5⭐: ${starDistribution[5]}`,
            inline: false
          }
        )
        .setFooter({ text: `Serveur: ${interaction.guild.name}` })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      logger.error(`Erreur dans la commande stats: ${error.message}`);
      await interaction.reply({
        content: '❌ Une erreur est survenue lors de la récupération des statistiques.',
        flags: MessageFlags.Ephemeral
      });
    }
  }
};


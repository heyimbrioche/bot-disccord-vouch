const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const logger = require('../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Afficher l\'aide et la liste des commandes'),

  async execute(interaction) {
    try {
      const embed = new EmbedBuilder()
        .setColor('#0099FF')
        .setTitle('📚 Guide d\'utilisation du Bot Vouch')
        .setDescription('Voici toutes les commandes disponibles :')
        .addFields(
          {
            name: '💬 Commandes principales',
            value: 
              '`/vouch` - Soumettre un vouch pour un utilisateur\n' +
              '`/infos [user]` - Voir les statistiques d\'un utilisateur\n' +
              '`/history [user] [page]` - Voir l\'historique des vouches\n' +
              '`/leaderboard [page]` - Afficher le classement\n' +
              '`/stats` - Statistiques globales du serveur\n' +
              '`/help` - Afficher cette aide',
            inline: false
          },
          {
            name: '⚙️ Commandes d\'administration',
            value:
              '`/set-vouch-channel <channel>` - Définir le salon des vouches\n' +
              '`/set-role-vouch <role>` - Définir le rôle autorisé\n' +
              '`/delete-vouch <vouch-id>` - Supprimer un vouch',
            inline: false
          },
          {
            name: '📝 Comment utiliser',
            value:
              '1. Configurez le salon avec `/set-vouch-channel`\n' +
              '2. Configurez le rôle avec `/set-role-vouch`\n' +
              '3. Les utilisateurs peuvent maintenant soumettre des vouches avec `/vouch`',
            inline: false
          },
          {
            name: '⭐ Système de notation',
            value:
              'Les vouches utilisent un système de 1 à 5 étoiles :\n' +
              '1-2⭐ : Vouch négatif\n' +
              '3⭐ : Vouch neutre\n' +
              '4-5⭐ : Vouch positif',
            inline: false
          }
        )
        .setFooter({ text: 'Bot Vouch v2.0' })
        .setTimestamp();

      await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    } catch (error) {
      logger.error(`Erreur dans la commande help: ${error.message}`);
      await interaction.reply({
        content: '❌ Une erreur est survenue lors de l\'affichage de l\'aide.',
        flags: MessageFlags.Ephemeral
      });
    }
  }
};


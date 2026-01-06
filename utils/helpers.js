const { EmbedBuilder } = require('discord.js');

class Helpers {
  /**
   * Génère un embed pour un vouch
   */
  createVouchEmbed(vouch, user) {
    const stars = '⭐'.repeat(vouch.stars) + ' '.repeat(5 - vouch.stars) + ` (${vouch.stars}/5)`;
    const date = new Date(vouch.date).toLocaleString('fr-FR');

    return new EmbedBuilder()
      .setColor(this.getStarColor(vouch.stars))
      .setTitle(`💬 Vouch de ${vouch.userName}`)
      .setThumbnail(user?.displayAvatarURL({ format: 'png', dynamic: true }) || vouch.userAvatar)
      .addFields(
        { name: '👤 Utilisateur', value: `<@${vouch.userId}>`, inline: true },
        { name: '⭐ Note', value: stars, inline: true },
        { name: '📝 Description', value: vouch.description || 'Aucune description' }
      )
      .setFooter({ text: `Vouch #${vouch.id} • ${date}` })
      .setTimestamp(new Date(vouch.date));
  }

  /**
   * Génère un embed pour les statistiques d'un utilisateur
   */
  createStatsEmbed(user, stats) {
    const { totalVouches, totalStars, averageStars, positiveVouches, negativeVouches } = stats;
    const percentage = totalVouches > 0 ? ((positiveVouches / totalVouches) * 100).toFixed(1) : 0;

    return new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle(`📊 Statistiques de ${user.username}`)
      .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }))
      .addFields(
        { name: '📈 Total de vouches', value: `${totalVouches}`, inline: true },
        { name: '⭐ Note moyenne', value: `${averageStars.toFixed(2)}/5`, inline: true },
        { name: '✨ Total d\'étoiles', value: `${totalStars}`, inline: true },
        { name: '👍 Vouches positifs (4-5⭐)', value: `${positiveVouches}`, inline: true },
        { name: '👎 Vouches négatifs (1-2⭐)', value: `${negativeVouches}`, inline: true },
        { name: '📊 Taux de satisfaction', value: `${percentage}%`, inline: true }
      )
      .setFooter({ text: `ID: ${user.id}` })
      .setTimestamp();
  }

  /**
   * Génère un embed pour le leaderboard
   */
  createLeaderboardEmbed(leaderboard, page, totalPages) {
    const embed = new EmbedBuilder()
      .setColor('#FFD700')
      .setTitle('🏆 Classement des Vouches')
      .setDescription(leaderboard.length === 0 ? 'Aucun vouch trouvé.' : null)
      .setFooter({ text: `Page ${page}/${totalPages}` })
      .setTimestamp();

    if (leaderboard.length > 0) {
      const medals = ['🥇', '🥈', '🥉'];
      const leaderboardText = leaderboard
        .map((entry, index) => {
          const medal = medals[index] || `${index + 1}.`;
          return `${medal} <@${entry.userId}> - ${entry.averageStars.toFixed(2)}⭐ (${entry.totalVouches} vouches)`;
        })
        .join('\n');
      embed.setDescription(leaderboardText);
    }

    return embed;
  }

  /**
   * Calcule les statistiques d'un utilisateur
   */
  calculateUserStats(vouches) {
    if (!vouches || vouches.length === 0) {
      return {
        totalVouches: 0,
        totalStars: 0,
        averageStars: 0,
        positiveVouches: 0,
        negativeVouches: 0
      };
    }

    const totalVouches = vouches.length;
    const totalStars = vouches.reduce((acc, v) => acc + v.stars, 0);
    const averageStars = totalStars / totalVouches;
    const positiveVouches = vouches.filter(v => v.stars >= 4).length;
    const negativeVouches = vouches.filter(v => v.stars <= 2).length;

    return {
      totalVouches,
      totalStars,
      averageStars,
      positiveVouches,
      negativeVouches
    };
  }

  /**
   * Génère un leaderboard
   */
  generateLeaderboard(vouches, limit = 10) {
    const userStats = {};

    vouches.forEach(vouch => {
      if (!userStats[vouch.userId]) {
        userStats[vouch.userId] = {
          userId: vouch.userId,
          vouches: []
        };
      }
      userStats[vouch.userId].vouches.push(vouch);
    });

    const leaderboard = Object.values(userStats)
      .map(user => {
        const stats = this.calculateUserStats(user.vouches);
        return {
          userId: user.userId,
          ...stats
        };
      })
      .filter(user => user.totalVouches >= 3) // Minimum 3 vouches pour apparaître
      .sort((a, b) => {
        // Trier par note moyenne, puis par nombre de vouches
        if (b.averageStars !== a.averageStars) {
          return b.averageStars - a.averageStars;
        }
        return b.totalVouches - a.totalVouches;
      })
      .slice(0, limit);

    return leaderboard;
  }

  /**
   * Retourne une couleur basée sur le nombre d'étoiles
   */
  getStarColor(stars) {
    const colors = {
      1: '#FF0000', // Rouge
      2: '#FF6B6B', // Rouge clair
      3: '#FFD700', // Or
      4: '#90EE90', // Vert clair
      5: '#00FF00'  // Vert
    };
    return colors[stars] || '#808080';
  }

  /**
   * Génère un ID unique pour un vouch
   */
  generateVouchId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Formate une date
   */
  formatDate(date) {
    return new Date(date).toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Pagine un tableau
   */
  paginate(array, page, perPage) {
    const totalPages = Math.ceil(array.length / perPage);
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return {
      data: array.slice(start, end),
      page,
      totalPages,
      total: array.length
    };
  }
}

module.exports = new Helpers();


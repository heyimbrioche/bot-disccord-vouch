const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const database = require('../utils/database');
const helpers = require('../utils/helpers');
const logger = require('../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vouch')
    .setDescription('Soumettre un vouch pour un utilisateur')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('L\'utilisateur pour qui vous soumettez un vouch')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('stars')
        .setDescription('Nombre d\'étoiles (entre 1 et 5)')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(5))
    .addStringOption(option =>
      option.setName('description')
        .setDescription('Description du vouch')
        .setRequired(true)
        .setMaxLength(1000)),

  async execute(interaction) {
    try {
      const targetUser = interaction.options.getUser('user');
      const rating = interaction.options.getInteger('stars');
      const description = interaction.options.getString('description');
      const author = interaction.user;

      // Vérifier que l'utilisateur ne se vouch pas lui-même
      if (targetUser.id === author.id) {
        return interaction.reply({
          content: '❌ Vous ne pouvez pas vous soumettre un vouch à vous-même.',
          flags: MessageFlags.Ephemeral
        });
      }

      // Vérifier la configuration du serveur
      const guildConfig = database.getGuildConfig(interaction.guildId);
      if (!guildConfig.vouchChannel) {
        return interaction.reply({
          content: '❌ Le salon des vouches n\'a pas été configuré. Utilisez `/set-vouch-channel` pour le configurer.',
          flags: MessageFlags.Ephemeral
        });
      }

      if (!guildConfig.vouchRole) {
        return interaction.reply({
          content: '❌ Le rôle autorisé n\'a pas été configuré. Utilisez `/set-role-vouch` pour le configurer.',
          flags: MessageFlags.Ephemeral
        });
      }

      // Vérifier les permissions
      const member = interaction.member;
      if (!member.roles.cache.has(guildConfig.vouchRole) && !member.permissions.has(PermissionFlagsBits.Administrator)) {
        return interaction.reply({
          content: '❌ Vous n\'avez pas le rôle nécessaire pour soumettre un vouch.',
          flags: MessageFlags.Ephemeral
        });
      }

      // Vérifier le cooldown (optionnel - peut être amélioré)
      const userVouches = database.getUserVouches(interaction.guildId, author.id);
      const recentVouches = userVouches.filter(v => {
        const vouchDate = new Date(v.date);
        const now = new Date();
        const hoursDiff = (now - vouchDate) / (1000 * 60 * 60);
        return hoursDiff < 1; // 1 heure de cooldown
      });

      if (recentVouches.length >= 5) {
        return interaction.reply({
          content: '❌ Vous avez atteint la limite de vouches pour cette heure. Veuillez réessayer plus tard.',
          flags: MessageFlags.Ephemeral
        });
      }

      // Créer le vouch
      const vouch = {
        id: helpers.generateVouchId(),
        userId: targetUser.id,
        userName: targetUser.username,
        userAvatar: targetUser.displayAvatarURL({ format: 'png', dynamic: true }),
        authorId: author.id,
        authorName: author.username,
        stars: rating,
        description: description,
        date: new Date().toISOString(),
        guildId: interaction.guildId
      };

      database.addVouch(interaction.guildId, vouch);

      // Envoyer le vouch dans le salon configuré
      const vouchChannel = interaction.guild.channels.cache.get(guildConfig.vouchChannel);
      if (vouchChannel) {
        const embed = helpers.createVouchEmbed(vouch, targetUser);
        embed.addFields({ name: '👤 Auteur', value: `<@${author.id}>`, inline: true });
        await vouchChannel.send({ embeds: [embed] });
      }

      logger.info(`Nouveau vouch créé par ${author.tag} pour ${targetUser.tag} (${rating}⭐)`);

      await interaction.reply({
        content: `✅ Votre vouch pour ${targetUser.username} a été envoyé avec succès !`,
        flags: MessageFlags.Ephemeral
      });
    } catch (error) {
      logger.error(`Erreur dans la commande vouch: ${error.message}`);
      await interaction.reply({
        content: '❌ Une erreur est survenue lors de la création du vouch.',
        flags: MessageFlags.Ephemeral
      });
    }
  }
};


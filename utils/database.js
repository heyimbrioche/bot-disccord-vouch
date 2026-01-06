const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const DATA_DIR = path.join(__dirname, '..', 'data');

// S'assurer que le dossier data existe
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class Database {
  constructor() {
    this.configPath = path.join(DATA_DIR, 'vouch_config.json');
    this.vouchesPath = path.join(DATA_DIR, 'vouches.json');
    this.load();
  }

  load() {
    try {
      // Charger la configuration
      if (fs.existsSync(this.configPath)) {
        this.config = JSON.parse(fs.readFileSync(this.configPath, 'utf-8'));
      } else {
        this.config = {};
        this.saveConfig();
      }

      // Charger les vouches
      if (fs.existsSync(this.vouchesPath)) {
        this.vouches = JSON.parse(fs.readFileSync(this.vouchesPath, 'utf-8'));
      } else {
        this.vouches = {};
        this.saveVouches();
      }

      logger.info('Base de données chargée avec succès');
    } catch (error) {
      logger.error(`Erreur lors du chargement de la base de données: ${error.message}`);
      this.config = {};
      this.vouches = {};
    }
  }

  saveConfig() {
    try {
      fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
    } catch (error) {
      logger.error(`Erreur lors de la sauvegarde de la config: ${error.message}`);
    }
  }

  saveVouches() {
    try {
      fs.writeFileSync(this.vouchesPath, JSON.stringify(this.vouches, null, 2));
    } catch (error) {
      logger.error(`Erreur lors de la sauvegarde des vouches: ${error.message}`);
    }
  }

  // Méthodes pour la configuration
  getGuildConfig(guildId) {
    return this.config[guildId] || {};
  }

  setGuildConfig(guildId, config) {
    this.config[guildId] = { ...this.getGuildConfig(guildId), ...config };
    this.saveConfig();
  }

  // Méthodes pour les vouches
  getGuildVouches(guildId) {
    return this.vouches[guildId] || [];
  }

  addVouch(guildId, vouch) {
    if (!this.vouches[guildId]) {
      this.vouches[guildId] = [];
    }
    this.vouches[guildId].push(vouch);
    this.saveVouches();
    return vouch;
  }

  removeVouch(guildId, vouchId) {
    if (!this.vouches[guildId]) return false;
    const index = this.vouches[guildId].findIndex(v => v.id === vouchId);
    if (index === -1) return false;
    this.vouches[guildId].splice(index, 1);
    this.saveVouches();
    return true;
  }

  getUserVouches(guildId, userId) {
    return this.getGuildVouches(guildId).filter(v => v.userId === userId);
  }

  getVouchById(guildId, vouchId) {
    return this.getGuildVouches(guildId).find(v => v.id === vouchId);
  }
}

module.exports = new Database();


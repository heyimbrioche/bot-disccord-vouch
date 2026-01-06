# 🤖 Discord Vouch Bot

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Discord.js](https://img.shields.io/badge/discord.js-14.14-blue.svg)](https://discord.js.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Un bot Discord moderne et complet pour la gestion des vouches (avis/testimonials) avec un système de notation, statistiques avancées et classements.

## ✨ Fonctionnalités

### 💬 Commandes principales

| Commande | Description |
|----------|-------------|
| `/vouch` | Soumettre un vouch pour un utilisateur avec une note de 1 à 5 étoiles |
| `/infos [user]` | Afficher les statistiques détaillées d'un utilisateur |
| `/history [user] [page]` | Consulter l'historique paginé des vouches d'un utilisateur |
| `/leaderboard [page]` | Afficher le classement des utilisateurs avec les meilleures notes |
| `/stats` | Statistiques globales du serveur |
| `/help` | Guide d'utilisation et liste des commandes |

### ⚙️ Commandes d'administration

| Commande | Description | Permission |
|----------|-------------|------------|
| `/set-vouch-channel <channel>` | Définir le salon où les vouches seront publiés | Administrateur |
| `/set-role-vouch <role>` | Définir le rôle autorisé à soumettre des vouches | Administrateur |
| `/delete-vouch <vouch-id>` | Supprimer un vouch spécifique | Administrateur |

### 🎯 Fonctionnalités avancées

- ⭐ **Système de notation** : Notes de 1 à 5 étoiles avec statistiques détaillées
- 📊 **Statistiques complètes** : Notes moyennes, taux de satisfaction, distribution des étoiles
- 🏆 **Leaderboard** : Classement automatique des meilleurs utilisateurs
- 📜 **Historique paginé** : Navigation facile dans l'historique des vouches
- ⏱️ **Système de cooldown** : Limite de 5 vouches par heure par utilisateur
- 📝 **Logging complet** : Système de logs pour le débogage et le suivi
- 🛡️ **Gestion d'erreurs robuste** : Gestion complète des erreurs avec messages clairs
- 🔒 **Sécurité** : Vérification des permissions et validation des entrées

## 📋 Prérequis

- **Node.js** 18.0.0 ou supérieur
- **npm** (généralement inclus avec Node.js)
- Un **bot Discord** avec un token (voir [Créer un bot Discord](#-créer-un-bot-discord))

## 🚀 Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/heyimbrioche/bot-disccord-vouch.git
cd bot-disccord-vouch
```

Ou téléchargez le projet et extrayez-le dans un dossier.

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration

Créez un fichier `.env` à la racine du projet en copiant `env.example` :

```bash
# Windows
copy env.example .env

# Linux/Mac
cp env.example .env
```

Puis éditez le fichier `.env` et remplacez `votre_token_discord_ici` par votre token Discord réel.

> ⚠️ **Important** : Ne partagez jamais votre token Discord publiquement !

### 4. Démarrer le bot

```bash
npm start
```

## 🤖 Créer un bot Discord

Si vous n'avez pas encore de bot Discord :

1. Allez sur le [Discord Developer Portal](https://discord.com/developers/applications)
2. Cliquez sur **"New Application"** et donnez-lui un nom
3. Allez dans l'onglet **"Bot"** à gauche
4. Cliquez sur **"Add Bot"** et confirmez
5. Sous **"Token"**, cliquez sur **"Reset Token"** et copiez le token
6. Collez le token dans votre fichier `.env`

### Permissions requises

Lors de l'invitation du bot sur votre serveur, assurez-vous d'activer les permissions suivantes :

- ✅ Lire les messages
- ✅ Envoyer les messages
- ✅ Utiliser les commandes slash
- ✅ Voir les membres du serveur
- ✅ Lire l'historique des messages

**Lien d'invitation** (remplacez `CLIENT_ID` par l'ID de votre bot) :
```
https://discord.com/api/oauth2/authorize?client_id=CLIENT_ID&permissions=274877906944&scope=bot%20applications.commands
```

## 🔧 Configuration initiale

Une fois le bot démarré et invité sur votre serveur :

1. **Définir le salon des vouches** :
   ```
   /set-vouch-channel #salon-des-vouches
   ```

2. **Définir le rôle autorisé** :
   ```
   /set-role-vouch @RôleVouch
   ```

3. **Tester le bot** :
   ```
   /vouch user:@utilisateur stars:5 description:Excellent service !
   ```

## 📁 Structure du projet

```
discord-vouch-bot/
├── commands/              # Commandes slash Discord
│   ├── vouch.js          # Commande principale pour créer un vouch
│   ├── infos.js          # Statistiques d'un utilisateur
│   ├── history.js         # Historique des vouches
│   ├── leaderboard.js     # Classement des utilisateurs
│   ├── stats.js           # Statistiques globales
│   ├── help.js            # Guide d'utilisation
│   ├── delete-vouch.js    # Suppression de vouches (admin)
│   ├── set-vouch-channel.js
│   └── set-role-vouch.js
├── events/                # Gestionnaires d'événements Discord
│   ├── ready.js          # Événement de démarrage
│   └── interactionCreate.js
├── utils/                 # Utilitaires et helpers
│   ├── database.js       # Gestion de la base de données JSON
│   ├── helpers.js        # Fonctions utilitaires
│   └── logger.js         # Système de logging
├── data/                  # Données (créé automatiquement)
│   ├── vouches.json      # Stockage des vouches
│   └── vouch_config.json # Configuration par serveur
├── logs/                  # Logs (créé automatiquement)
├── index.js              # Point d'entrée principal
├── package.json
├── .env                  # Variables d'environnement (à créer)
└── README.md
```

## 📖 Utilisation

### Créer un vouch

```
/vouch user:@utilisateur stars:5 description:Service excellent, très professionnel !
```

### Consulter les statistiques

```
/infos user:@utilisateur
```

### Voir le classement

```
/leaderboard
/leaderboard page:2
```

### Consulter l'historique

```
/history user:@utilisateur
/history user:@utilisateur page:2
```

## 🛠️ Technologies utilisées

- **[discord.js](https://discord.js.org/)** v14.14.1 - Bibliothèque Discord officielle
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Gestion des variables d'environnement
- **Node.js** - Runtime JavaScript

## 📊 Stockage des données

Les données sont stockées dans des fichiers JSON dans le dossier `data/` :
- `vouches.json` : Tous les vouches par serveur
- `vouch_config.json` : Configuration (salons, rôles) par serveur

> 💡 **Note** : Pour une utilisation en production avec beaucoup de données, considérez migrer vers une base de données (MongoDB, PostgreSQL, etc.)

## 🔒 Sécurité

- ⚠️ **Ne partagez jamais votre token Discord**
- Le fichier `.env` est automatiquement ignoré par Git (voir `.gitignore`)
- Les tokens exposés doivent être régénérés immédiatement
- Le bot vérifie les permissions avant d'exécuter les commandes

## 🐛 Dépannage

### Le bot ne démarre pas

- Vérifiez que Node.js 18+ est installé : `node --version`
- Vérifiez que le fichier `.env` existe et contient `DISCORD_TOKEN=...`
- Vérifiez que `npm install` a été exécuté

### Les commandes n'apparaissent pas

- Attendez quelques minutes (Discord peut prendre du temps pour synchroniser)
- Redémarrez le bot
- Vérifiez les logs dans le dossier `logs/`

### Erreurs de permissions

- Assurez-vous que le bot a les permissions nécessaires sur le serveur
- Vérifiez que les rôles et salons configurés existent toujours

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour plus de détails.

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [discord.js](https://discord.js.org/) pour l'excellente bibliothèque
- La communauté Discord pour le support

## 📞 Support

- 🐛 **Signaler un bug** : [Ouvrir une issue](https://github.com/heyimbrioche/bot-disccord-vouch/issues)
- 💡 **Suggérer une fonctionnalité** : [Ouvrir une issue](https://github.com/heyimbrioche/bot-disccord-vouch/issues)
- 📖 **Documentation complète** : Voir le dossier [docs/](docs/)
- 🚀 **Démarrage rapide** : Voir [QUICKSTART.md](QUICKSTART.md)

### 💬 Contact direct

Pour des problèmes spéciaux, des questions urgentes ou si vous souhaitez contribuer directement au projet, vous pouvez contacter le créateur sur Discord :

**Discord** : `dialogue_._56197`

> 💡 **Note** : Pour les bugs et suggestions de fonctionnalités, privilégiez les [Issues GitHub](https://github.com/heyimbrioche/bot-disccord-vouch/issues) afin que la communauté puisse en bénéficier.

## 📚 Documentation

- [README.md](README.md) - Ce fichier (documentation principale)
- [QUICKSTART.md](QUICKSTART.md) - Guide de démarrage rapide
- [CONTRIBUTING.md](CONTRIBUTING.md) - Guide pour contribuer
- [CHANGELOG.md](CHANGELOG.md) - Historique des versions
- [SECURITY.md](SECURITY.md) - Politique de sécurité
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) - Code de conduite
- [LICENSE](LICENSE) - Licence MIT

---

⭐ Si ce projet vous est utile, n'hésitez pas à lui donner une étoile !

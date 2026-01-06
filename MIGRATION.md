# 🔄 Guide de Migration

## Changements apportés

### Structure du projet
Le projet a été complètement restructuré pour une meilleure organisation :
- ✅ Commandes séparées en fichiers individuels
- ✅ Système d'événements modulaire
- ✅ Utilitaires centralisés
- ✅ Données stockées dans le dossier `data/`

### Nouvelles fonctionnalités
1. **Leaderboard** (`/leaderboard`) - Classement des meilleurs utilisateurs
2. **Historique** (`/history`) - Historique paginé des vouches
3. **Statistiques globales** (`/stats`) - Stats du serveur
4. **Suppression de vouches** (`/delete-vouch`) - Pour les admins
5. **Aide** (`/help`) - Guide d'utilisation
6. **Système de logging** - Logs automatiques
7. **Cooldown** - Limite de 5 vouches/heure

### Améliorations de sécurité
- ✅ Token déplacé dans `.env` (plus de token en dur dans le code)
- ✅ Fichier `.gitignore` pour protéger les données sensibles

## 📋 Étapes de migration

### 1. Installer les dépendances
```bash
npm install
```

### 2. Créer le fichier .env
Créez un fichier `.env` à la racine avec :
```
DISCORD_TOKEN=votre_ancien_token_du_code
```

⚠️ **Important** : Récupérez votre token depuis l'ancien `index.js` (ligne 204) et mettez-le dans `.env`

### 3. Migrer les données
Les fichiers `vouch_config.json` et `vouches.json` ont été automatiquement déplacés dans le dossier `data/`.

### 4. Démarrer le bot
```bash
npm start
```

## ⚠️ Notes importantes

- L'ancien `index.js` peut être supprimé après migration
- Les commandes doivent être réenregistrées (automatique au démarrage)
- Toutes les données existantes sont préservées

## 🆘 Problèmes courants

### Le bot ne démarre pas
- Vérifiez que le fichier `.env` existe et contient `DISCORD_TOKEN=...`
- Vérifiez que `npm install` a été exécuté

### Les commandes n'apparaissent pas
- Attendez quelques minutes (Discord peut prendre du temps)
- Redémarrez le bot
- Vérifiez les logs dans le dossier `logs/`

### Erreurs de permissions
- Assurez-vous que le bot a les permissions nécessaires
- Vérifiez que les rôles et salons configurés existent toujours


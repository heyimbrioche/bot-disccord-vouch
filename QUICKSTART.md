# 🚀 Démarrage Rapide

Guide rapide pour démarrer le bot en 5 minutes.

## 📋 Prérequis

- Node.js 18+ installé
- Un bot Discord créé (voir ci-dessous)

## ⚡ Installation en 3 étapes

### 1️⃣ Installer les dépendances

```bash
npm install
```

### 2️⃣ Configurer le token

Créez un fichier `.env` à la racine du projet :

```env
DISCORD_TOKEN=votre_token_discord_ici
```

**Comment obtenir un token ?**

1. Allez sur [Discord Developer Portal](https://discord.com/developers/applications)
2. Créez une nouvelle application ou sélectionnez-en une existante
3. Allez dans l'onglet **"Bot"**
4. Cliquez sur **"Reset Token"** et copiez-le
5. Collez-le dans votre fichier `.env`

> ⚠️ **Sécurité** : Ne partagez jamais votre token publiquement !

### 3️⃣ Démarrer le bot

```bash
npm start
```

## ✅ Vérification

Si tout fonctionne, vous devriez voir dans la console :

```
[INFO] ✅ Bot connecté en tant que VotreBot#1234
[INFO] 📊 Connecté à X serveur(s)
[INFO] 🔄 Enregistrement des commandes...
[INFO] ✅ X commande(s) enregistrée(s) avec succès.
```

## 🔧 Configuration initiale

Une fois le bot démarré, sur votre serveur Discord :

### Étape 1 : Définir le salon des vouches

```
/set-vouch-channel #salon-des-vouches
```

### Étape 2 : Définir le rôle autorisé

```
/set-role-vouch @RôleVouch
```

> 💡 **Astuce** : Créez un rôle spécifique pour les utilisateurs autorisés à soumettre des vouches.

### Étape 3 : Tester le bot

```
/vouch user:@utilisateur stars:5 description:Excellent service !
```

## 🎉 C'est prêt !

Le bot est maintenant configuré et prêt à être utilisé. Les utilisateurs avec le rôle configuré peuvent maintenant soumettre des vouches.

## 📚 Commandes utiles

- `/help` - Afficher l'aide complète
- `/infos @user` - Voir les stats d'un utilisateur
- `/leaderboard` - Voir le classement
- `/stats` - Statistiques du serveur

## 🆘 Problème ?

- **Le bot ne démarre pas** : Vérifiez que le fichier `.env` existe et contient un token valide
- **Les commandes n'apparaissent pas** : Attendez quelques minutes ou redémarrez le bot
- **Erreurs de permissions** : Vérifiez que le bot a les permissions nécessaires

Pour plus d'aide, consultez le [README.md](README.md) complet.

### 💬 Besoin d'aide supplémentaire ?

Si vous rencontrez un problème spécial ou avez besoin d'aide directe, vous pouvez contacter le créateur sur Discord : `dialogue_._56197`

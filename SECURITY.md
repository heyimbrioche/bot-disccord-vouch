# 🔒 Politique de Sécurité

## 🛡️ Signalement de vulnérabilités

Si vous découvrez une vulnérabilité de sécurité, **ne créez pas d'issue publique**. Contactez plutôt les mainteneurs du projet de manière privée.

### Comment signaler

1. Contactez directement le créateur sur Discord : `dialogue_._56197` (recommandé pour les vulnérabilités critiques) OU
2. Envoyez un email à [votre-email@example.com] OU
3. Créez une issue privée sur GitHub (si disponible)

> ⚠️ **Important** : Pour les vulnérabilités de sécurité critiques, contactez directement sur Discord pour une réponse plus rapide.

### Ce qu'il faut inclure

- Description de la vulnérabilité
- Étapes pour reproduire le problème
- Impact potentiel
- Suggestions de correction (si vous en avez)

## 🔐 Bonnes pratiques de sécurité

### Pour les utilisateurs

1. **Ne partagez jamais votre token Discord**
   - Le token doit rester dans le fichier `.env`
   - Ne commitez jamais le fichier `.env` dans Git
   - Si votre token est exposé, régénérez-le immédiatement

2. **Permissions du bot**
   - Accordez uniquement les permissions nécessaires
   - Ne donnez pas de permissions administrateur sauf si nécessaire

3. **Sécurité du serveur**
   - Gardez Node.js à jour
   - Utilisez des versions récentes des dépendances
   - Surveillez les logs pour des activités suspectes

### Pour les contributeurs

1. **Vérification du code**
   - Vérifiez que les entrées utilisateur sont validées
   - Ne stockez jamais de données sensibles en clair
   - Utilisez des méthodes sécurisées pour les opérations de fichiers

2. **Dépendances**
   - Vérifiez les vulnérabilités avec `npm audit`
   - Mettez à jour les dépendances régulièrement

## 🔍 Audit de sécurité

Avant chaque release, nous effectuons :

- ✅ Vérification des dépendances (`npm audit`)
- ✅ Revue du code pour les vulnérabilités courantes
- ✅ Tests de sécurité des fonctionnalités

## 📋 Checklist de sécurité

- [ ] Token Discord stocké dans `.env` (non versionné)
- [ ] Validation de toutes les entrées utilisateur
- [ ] Vérification des permissions avant exécution
- [ ] Gestion sécurisée des fichiers JSON
- [ ] Pas de données sensibles en clair dans le code
- [ ] Logs ne contiennent pas d'informations sensibles

## 🚨 En cas de compromission

Si vous pensez que votre bot a été compromis :

1. **Régénérez immédiatement le token Discord**
2. **Révoquez toutes les permissions du bot**
3. **Vérifiez les logs pour des activités suspectes**
4. **Changez tous les mots de passe associés**
5. **Contactez le support Discord si nécessaire**

## 📞 Contact

Pour toute question de sécurité, contactez : [votre-email@example.com]


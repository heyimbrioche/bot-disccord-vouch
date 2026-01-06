# 🤝 Guide de Contribution

Merci de votre intérêt pour contribuer à Discord Vouch Bot ! Ce document fournit des directives pour contribuer au projet.

## 📋 Comment contribuer

### Signaler un bug

Si vous trouvez un bug :

1. Vérifiez que le bug n'a pas déjà été signalé dans les [Issues](https://github.com/heyimbrioche/bot-disccord-vouch/issues)
2. Si ce n'est pas le cas, créez une nouvelle issue avec :
   - Une description claire du bug
   - Les étapes pour reproduire le problème
   - Le comportement attendu vs le comportement actuel
   - Votre version de Node.js et discord.js
   - Des captures d'écran si applicable

### Proposer une fonctionnalité

1. Vérifiez que la fonctionnalité n'a pas déjà été proposée
2. Créez une issue avec le label "enhancement"
3. Décrivez clairement la fonctionnalité et son utilité
4. Expliquez comment elle s'intègre au projet

### Soumettre du code

1. **Fork** le projet
2. **Clone** votre fork :
   ```bash
   git clone https://github.com/heyimbrioche/bot-disccord-vouch.git
   cd discord-vouch-bot
   ```
3. **Créez une branche** pour votre fonctionnalité :
   ```bash
   git checkout -b feature/ma-fonctionnalite
   ```
4. **Faites vos modifications** en suivant les conventions de code
5. **Testez** vos modifications
6. **Commit** vos changements :
   ```bash
   git commit -m "feat: ajout de ma fonctionnalité"
   ```
7. **Push** vers votre fork :
   ```bash
   git push origin feature/ma-fonctionnalite
   ```
8. Ouvrez une **Pull Request** sur GitHub

## 📝 Conventions de code

### Style de code

- Utilisez des noms de variables et fonctions clairs et descriptifs
- Ajoutez des commentaires pour expliquer la logique complexe
- Suivez le style existant du projet

### Messages de commit

Utilisez le format conventionnel :

- `feat:` pour une nouvelle fonctionnalité
- `fix:` pour une correction de bug
- `docs:` pour la documentation
- `style:` pour le formatage
- `refactor:` pour la refactorisation
- `test:` pour les tests
- `chore:` pour les tâches de maintenance

Exemples :
```
feat: ajout de la commande /top-users
fix: correction du calcul de la moyenne
docs: mise à jour du README
```

### Structure des fichiers

- Gardez les fichiers de commandes dans `commands/`
- Gardez les événements dans `events/`
- Gardez les utilitaires dans `utils/`
- Utilisez des noms de fichiers en minuscules avec des tirets

## 🧪 Tests

Avant de soumettre une PR :

- Testez vos modifications localement
- Vérifiez qu'il n'y a pas d'erreurs dans la console
- Testez les cas limites
- Vérifiez que les commandes fonctionnent correctement

## 📚 Documentation

Si vous ajoutez une nouvelle fonctionnalité :

- Mettez à jour le README.md si nécessaire
- Ajoutez des commentaires dans le code
- Documentez les nouvelles commandes

## ❓ Questions ?

Si vous avez des questions, n'hésitez pas à :

- Ouvrir une issue avec le label "question"
- Contacter les mainteneurs du projet

### 💬 Contact direct

Pour des contributions directes, des questions urgentes ou des problèmes spéciaux, vous pouvez contacter le créateur directement sur Discord :

**Discord** : `dialogue_._56197`

> 💡 **Note** : Pour les contributions importantes, nous recommandons toujours d'utiliser le processus de Pull Request standard pour maintenir la traçabilité et permettre les discussions publiques.

## 🙏 Merci !

Votre contribution est appréciée ! Merci de prendre le temps d'améliorer ce projet.


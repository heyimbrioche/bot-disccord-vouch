# 📝 Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [2.0.0] - 2026-01-06

### ✨ Ajouté

- Système de commandes modulaire avec structure de dossiers organisée
- Commande `/leaderboard` pour afficher le classement des utilisateurs
- Commande `/history` pour consulter l'historique paginé des vouches
- Commande `/stats` pour les statistiques globales du serveur
- Commande `/help` avec guide d'utilisation complet
- Commande `/delete-vouch` pour supprimer des vouches (admin)
- Système de logging complet avec fichiers de logs
- Gestion de base de données centralisée
- Helpers réutilisables pour les embeds et calculs
- Système de cooldown (5 vouches/heure par utilisateur)
- Validation améliorée des entrées
- Gestion d'erreurs robuste
- Support des variables d'environnement avec `.env`
- Documentation complète (README, CONTRIBUTING, etc.)

### 🔄 Modifié

- Restructuration complète du projet
- Séparation des commandes en fichiers individuels
- Amélioration de la commande `/vouch` avec validation du cooldown
- Amélioration de la commande `/infos` avec statistiques détaillées
- Migration des données vers le dossier `data/`
- Amélioration de la sécurité (token dans `.env`)

### 🐛 Corrigé

- Correction de la dépréciation `ephemeral` → `MessageFlags.Ephemeral`
- Amélioration de la gestion des erreurs
- Correction des problèmes de permissions

### 🔒 Sécurité

- Token Discord déplacé dans le fichier `.env`
- Ajout de `.gitignore` pour protéger les données sensibles
- Validation des permissions avant exécution des commandes

## [1.0.0] - Version initiale

### ✨ Ajouté

- Commande `/vouch` pour soumettre des vouches
- Commande `/infos` pour voir les statistiques d'un utilisateur
- Commande `/set-vouch-channel` pour configurer le salon
- Commande `/set-role-vouch` pour configurer le rôle autorisé
- Système de notation de 1 à 5 étoiles
- Stockage des données en JSON


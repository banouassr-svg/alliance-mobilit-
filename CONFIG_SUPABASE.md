# Configuration Supabase - Demandes de devis synchronisées

Pour que les demandes de devis apparaissent dans l'espace commercial sur **tous vos appareils** (ordinateur, téléphone, tablette), configurez Supabase :

## 1. Créer un compte Supabase (gratuit)

1. Allez sur **[supabase.com](https://supabase.com)**
2. Cliquez sur **"Start your project"**
3. Créez un compte (gratuit, 500 Mo de base de données)

## 2. Créer un projet

1. Cliquez sur **"New Project"**
2. Choisissez une organisation
3. Nom du projet : **alliance-mobilite** (ou autre)
4. Mot de passe de la base de données : notez-le bien
5. Région : choisissez la plus proche (ex: West EU pour la France)
6. Cliquez sur **"Create new project"** (attendez 2 minutes)

## 3. Créer la table des demandes de devis

1. Dans le menu de gauche, cliquez sur **"SQL Editor"**
2. Cliquez sur **"New query"**
3. Collez ce code SQL et exécutez-le (bouton **Run**) :

```sql
CREATE TABLE quote_requests (
  id BIGSERIAL PRIMARY KEY,
  client_name TEXT,
  email TEXT,
  phone TEXT,
  move_date TEXT,
  property_size TEXT,
  from_address TEXT,
  to_address TEXT,
  from_floor TEXT,
  to_floor TEXT,
  elevator TEXT,
  distance TEXT,
  pack_type TEXT,
  volume TEXT,
  parking TEXT,
  services TEXT,
  details TEXT,
  status TEXT DEFAULT 'nouvelle',
  submitted_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Autoriser l'accès public (insertion depuis le formulaire, lecture depuis l'espace commercial)
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Autoriser lecture publique" ON quote_requests
  FOR SELECT USING (true);

CREATE POLICY "Autoriser insertion publique" ON quote_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Autoriser mise à jour publique" ON quote_requests
  FOR UPDATE USING (true);

CREATE POLICY "Autoriser suppression publique" ON quote_requests
  FOR DELETE USING (true);
```

## 4. Récupérer l'URL et la clé (pour connecter votre site à Supabase)

**Étape A – Ouvrir les paramètres :**
- En bas à gauche de l'écran Supabase, cliquez sur l'**icône engrenage** (⚙️)
- Ou cherchez **"Project Settings"** / **"Paramètres du projet"**

**Étape B – Trouver la page des clés API :**
- Dans le menu qui s'ouvre, cliquez sur **"API"** ou **"API Keys"** ou **"Clé API"**
- (C'est la même chose, le nom peut varier)

**Étape C – Copier ces 2 informations :**

| Ce qu'il faut | Où le trouver | Exemple |
|---------------|---------------|---------|
| **1. L'URL du projet** | Voir les 3 méthodes ci-dessous ⬇️ | `https://abcdefgh.supabase.co` |
| **2. La clé "anon"** | Dans la liste des clés, celle nommée **anon** ou **anon public** (pas "service_role") | Une longue chaîne qui commence par `eyJ...` |

---

### 🔍 Où trouver l'URL du projet ? (3 méthodes)

**Méthode 1 – Bouton "Connect" :**
- Sur la page d'accueil de votre projet, cherchez un bouton **"Connect"** ou **"Get started"**
- Cliquez dessus : une fenêtre s'ouvre avec l'URL et la clé déjà affichées

**Méthode 2 – Paramètres > API :**
- Engrenage ⚙️ → **API** (ou **API Keys**)
- L'URL est en haut de la page, dans une zone "Configuration" ou "Project URL"
- Elle ressemble à : `https://xxxxxxxx.supabase.co` (avec des lettres/chiffres à la place des x)

**Méthode 3 – Barre d'adresse du navigateur :**
- Quand vous êtes dans votre projet Supabase, regardez l'URL dans le navigateur
- Elle ressemble à : `https://supabase.com/dashboard/project/abcdefghijklmnop`
- Votre URL du projet est : `https://abcdefghijklmnop.supabase.co`
- Remplacez la partie `abcdefghijklmnop` par l'identifiant qui apparaît après `/project/` dans l'URL

> 💡 **Astuce :** Cliquez sur le petit bouton **copier** (📋) à côté de chaque valeur pour la copier.

---

## 5. Mettre dans votre site

1. Ouvrez le fichier **index.html** avec un éditeur de texte
2. Appuyez sur **Ctrl+F** pour rechercher : `VOTRE_SUPABASE_URL`
3. Remplacez `'VOTRE_SUPABASE_URL'` par votre URL (ex. `'https://abcdefgh.supabase.co'`)
4. Recherchez : `VOTRE_SUPABASE_ANON_KEY`
5. Remplacez `'VOTRE_SUPABASE_ANON_KEY'` par votre clé anon (copiée à l'étape C)

6. Ouvrez le fichier **comercial.html**
7. Faites les mêmes 2 remplacements (URL et clé)

## Résultat

- Chaque demande de devis est enregistrée dans le cloud Supabase
- L'espace commercial affiche les devis sur **tous les appareils** connectés
- Formspree continue d'envoyer les demandes par email (double enregistrement pour plus de sécurité)
- Si Supabase n'est pas configuré, le site utilise le localStorage (données visibles uniquement sur l'appareil utilisé)

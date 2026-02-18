# Configuration Formspree - Demandes de devis

Pour recevoir et consulter les demandes de devis sur **tous vos appareils** (ordinateur, téléphone, tablette), suivez ces étapes :

## 1. Créer un compte Formspree (gratuit)

1. Allez sur **[formspree.io](https://formspree.io)**
2. Cliquez sur **"Get Started"** ou **"Sign Up"**
3. Créez un compte (gratuit, 50 envois/mois)

## 2. Créer un formulaire

1. Une fois connecté, cliquez sur **"New Form"**
2. Donnez un nom : par exemple **"Demandes de devis Alliance Mobilité"**
3. Indiquez votre email : **alliancemobilite2@gmail.com** (ou votre email professionnel)
4. Cliquez sur **"Create Form"**

## 3. Récupérer votre ID Formspree

Après création, vous verrez une URL du type :
```
https://formspree.io/f/xyzabcde
```

Le **ID** est la partie après `/f/` : `xyzabcde`

## 4. Configurer le site

1. Ouvrez le fichier **index.html**
2. Cherchez la ligne : `const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';`
3. Remplacez **YOUR_FORM_ID** par votre ID (ex: `xyzabcde`)
4. La ligne devient : `const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyzabcde';`
5. Sauvegardez et republiez votre site

## Résultat

- Chaque demande de devis vous sera envoyée par **email**
- Vous pourrez consulter toutes les demandes dans votre **tableau de bord Formspree** (accessible depuis n'importe quel appareil)
- Les visiteurs seront redirigés vers la page "Merci" après envoi

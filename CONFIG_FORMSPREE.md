# Configuration Formspree - Emails pour devis et candidatures

Formspree envoie les demandes de devis et les candidatures professionnelles par **email** à **alliancemobilite2@gmail.com**.

## 1. Créer un compte Formspree (gratuit)

1. Allez sur **[formspree.io](https://formspree.io)**
2. Cliquez sur **"Get Started"** ou **"Sign Up"**
3. Créez un compte (gratuit, 50 envois/mois)

## 2. Formulaire pour les demandes de devis

1. Une fois connecté, cliquez sur **"New Form"**
2. Nom : **"Demandes de devis Alliance Mobilité"**
3. Email : **alliancemobilite2@gmail.com**
4. Créez le formulaire et notez l'ID (ex: `mbdaybap`)
5. Dans **index.html**, configurez : `FORMSPREE_ENDPOINT = 'https://formspree.io/f/VOTRE_ID'`

## 3. Formulaire pour les candidatures professionnelles

1. Cliquez sur **"New Form"** (2e formulaire)
2. Nom : **"Candidatures professionnels Alliance Mobilité"**
3. Email : **alliancemobilite2@gmail.com**
4. Créez le formulaire et notez l'ID (ex: `xyzabcde`)
5. Ouvrez **professionals.html**
6. Cherchez : `FORMSPREE_CANDIDATURE_ENDPOINT`
7. Remplacez par : `'https://formspree.io/f/VOTRE_ID_CANDIDATURE'`

> 💡 **Astuce :** Vous pouvez utiliser le **même** formulaire Formspree pour les deux (devis + candidatures). Dans ce cas, mettez le même ID dans les deux fichiers. Les emails auront des sujets différents : "Nouvelle demande de devis" vs "Nouvelle candidature".

## Résultat

- **Demandes de devis** → email avec sujet "Nouvelle demande de devis - Alliance Mobilité"
- **Candidatures** → email avec sujet "Nouvelle candidature - Alliance Mobilité"
- Les deux arrivent à **alliancemobilite2@gmail.com** (ou l'email configuré dans Formspree)

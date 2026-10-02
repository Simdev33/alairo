// Textes français — même structure que en.ts (type Dictionary).
//   = espace insécable (avant « : », dans « … »),   = espace fine insécable (avant ; ! ?).

import type { Dictionary } from "./en";

export const fr: Dictionary = {
  meta: {
    title: "DoneSignIn — Signez vos documents depuis votre téléphone avec un QR code",
    description:
      "Importez un PDF ou un document Word, scannez le QR code avec votre téléphone, signez du doigt et placez la signature n'importe où dans le document. Essai gratuit — téléchargement avec un abonnement.",
    phoneTitle: "Signature · DoneSignIn",
    accountTitle: "Mon compte · DoneSignIn",
    thankYouTitle: "Merci · DoneSignIn",
    notFound: "Cette page n'existe pas.",
    backHome: "Retour à l'accueil",
  },

  common: {
    close: "Fermer",
    cancel: "Annuler",
    undo: "Annuler le dernier trait",
    undoShort: "Défaire",
    clear: "Effacer",
    home: "Accueil",
    language: "Langue",
    unexpected: "Une erreur s'est produite. Veuillez réessayer.",
  },

  ink: {
    black: "Noir",
    blue: "Bleu",
    thin: "Fin",
    medium: "Moyen",
    bold: "Épais",
    colorGroup: "Couleur de l'encre",
    widthGroup: "Épaisseur du trait",
  },

  pad: {
    hint: "Signez ici",
    line: "Signature",
  },

  nav: {
    how: "Comment ça marche",
    pricing: "Tarifs",
    privacy: "Confidentialité",
    badge: "Essai gratuit · sans application",
    terms: "CGU",
    privacyPolicy: "Politique de confidentialité",
    account: "Mon compte",
    signIn: "Se connecter",
  },

  hero: {
    eyebrow: "PDF · Word · QR code",
    line1: "Signez",
    line2: "sur votre mobile,",
    line3: "pas sur papier.",
    lead: "Importez le document, scannez le QR code et signez du doigt. Quelques secondes plus tard, la signature est dans le PDF — exactement là où vous la faites glisser.",
    trust: [
      "Chiffrement 256 bits",
      "Fichiers supprimés automatiquement après 1 heure",
      "100 % privé",
      "Conforme au RGPD",
    ],
  },

  dropzone: {
    idle: "Déposez votre document ici",
    over: "Relâchez, c'est parti",
    or: "ou",
    choose: "choisissez un fichier sur votre ordinateur",
    wait: "Un instant…",
    maxSize: "50 Mo max.",
    sampleQuestion: "Pas de document sous la main ?",
    sampleCta: "Essayez avec un contrat d'exemple",
    dropAnywhere: "Relâchez le fichier",
    openingPdf: "Ouverture du document…",
    convertingWord: "Conversion du fichier Word…",
    consent: "En utilisant DoneSignIn, vous acceptez les {terms} et la {privacy}.",
    consentTerms: "CGU",
    consentPrivacy: "politique de confidentialité",
  },

  steps: {
    eyebrow: "Comment ça marche",
    titleA: "Trois étapes,",
    titleB: "zéro imprimante.",
    items: [
      {
        title: "Importez",
        text: "Glissez votre PDF ou votre fichier Word. Les documents Word sont convertis automatiquement en PDF.",
      },
      {
        title: "Scannez le QR code",
        text: "Pointez l'appareil photo de votre téléphone vers le code. Aucune application à installer, aucune connexion requise.",
      },
      {
        title: "Signez, placez",
        text: "Vous signez du doigt, et la signature apparaît en direct sur l'ordinateur. Faites-la glisser sur n'importe quelle page, puis téléchargez.",
      },
    ],
  },

  pricing: {
    eyebrow: "Tarifs",
    titleA: "Une formule simple,",
    titleB: "résiliable à tout moment.",
    lead: "Importer, signer et placer votre signature, c'est gratuit. Pour télécharger le PDF signé, commencez par {days} jours d'accès complet pour {trial} — ensuite, c'est {monthly} par mois, et vous pouvez résilier en un clic.",
    plan: "Accès complet",
    today: "pour les {days} premiers jours",
    then: "puis {monthly} par mois",
    features: [
      "Téléchargements illimités de PDF signés",
      "Signature sur mobile ou à la souris",
      "Documents PDF et Word, quel que soit le nombre de pages",
      "Résiliable à tout moment depuis votre compte",
    ],
    cta: "Commencer à signer",
  },

  privacySection: {
    eyebrow: "Confidentialité",
    titleA: "Votre document",
    titleB: "reste sur votre appareil.",
    text: "C'est votre navigateur qui ouvre et signe le document — nous ne l'envoyons nulle part. Seuls les tracés de la signature arrivent depuis le téléphone, et ils sont eux aussi supprimés du serveur au bout d'une heure.",
    items: [
      {
        title: "Traité localement",
        text: "Le PDF comme le fichier Word sont préparés dans votre navigateur ; le contenu du document n'arrive jamais sur notre serveur.",
      },
      {
        title: "Signature vectorielle",
        text: "La signature est intégrée au PDF sous forme de tracés vectoriels : elle reste nette à n'importe quel niveau de zoom.",
      },
      {
        title: "Plusieurs pages, plusieurs signatures",
        text: "Placez la même signature à plusieurs endroits, ou sur toutes les pages en un clic.",
      },
      {
        title: "Sans mot de passe, résiliable à tout moment",
        text: "Pour vous abonner, une adresse e-mail suffit — et vous pouvez résilier en un clic.",
      },
    ],
  },

  footer: {
    disclaimer:
      "DoneSignIn insère dans le document l'image de votre signature dessinée à la main (signature électronique simple). Il ne s'agit pas d'une signature électronique qualifiée, et elle ne remplace pas une identification électronique officielle.",
    operatedBy: "Service exploité par {name}.",
    rights: "Tous droits réservés.",
  },

  heroVisual: {
    docType: "Contrat de prestation",
    docTitle: "Développement web",
    partyA: "Client",
    partyB: "Prestataire",
    signed: "Signé",
    scan: "Scannez",
    signFor: "Signature pour",
    fileName: "contrat.pdf",
    send: "Envoyer la signature",
  },

  errors: {
    unknownType: "Ce type de fichier n'est pas reconnu. Importez un PDF ou un document Word (.docx).",
    tooLarge: "Le fichier est trop volumineux — 50 Mo maximum.",
    serverUnreachable: "Impossible de joindre le serveur pour la conversion.",
    convertFailed: "Impossible de convertir le document en PDF.",
    legacyFormat: "Le format .{ext} ne peut pas être ouvert ici. Enregistrez-le dans Word au format .docx ou PDF, puis réessayez.",
    wordOpenFailed: "Impossible d'ouvrir le document Word. Enregistrez-le au format PDF, puis importez ce fichier.",
    wordPassword: "Ce document est protégé par un mot de passe : nous ne pouvons pas l'ouvrir.",
    pdfPassword: "Ce PDF est protégé par un mot de passe. Ouvrez-le, enregistrez-le sans mot de passe, puis réessayez.",
    pdfInvalid: "Ce fichier n'est pas un PDF valide, ou il est endommagé.",
    pdfOpenFailed: "Impossible d'ouvrir le PDF.",
    generic: "Une erreur s'est produite à l'ouverture du document. Veuillez réessayer.",
  },

  workspace: {
    pages: { one: "{n} page", other: "{n} pages" },
    converted: "converti depuis un fichier .{ext}",
    newDocument: "Nouveau document",
    download: "Télécharger le PDF signé",
    downloadShort: "Télécharger",
    armHint: "Cliquez à l'endroit où placer la signature",
    yourSignatures: "Vos signatures",
    trayHint: "Faites-la glisser sur la page, ou cliquez dessus.",
    draw: "Dessiner",
    withPhone: "Sur mobile",
    drawHere: "Dessiner ici",
    tips: "Faites glisser une signature placée pour la déplacer, ou son coin pour la redimensionner. Les flèches permettent un réglage fin, la touche {key} la supprime.",
    autoPlaced: "Nous avons placé la signature en bas de la dernière page — faites-la glisser où il faut.",
    newSignature: "Nouvelle signature reçue — faites-la glisser sur le document.",
    exportFailed: "Impossible de générer le PDF signé.",
    confirmNew: "Ouvrir un nouveau document ? Les signatures placées seront perdues.",
    pageLabel: "Page {n}",
    pagesNav: "Pages",
  },

  placement: {
    label: "Signature placée — faites glisser pour la déplacer",
    resize: "Redimensionner",
    duplicate: "Dupliquer",
    allPages: "Sur toutes les pages",
    remove: "Supprimer",
    allPagesDone: "La signature a été ajoutée sur toutes les pages ({n} pages).",
  },

  tray: {
    emptyRow: "Aucune signature pour l'instant.",
    empty: "Les signatures reçues apparaîtront ici.",
    drawOne: "Dessinez-en une ici",
    emptySuffix: " — à la souris ou au pavé tactile.",
    tileTitle: "Faites-la glisser sur le document, ou cliquez dessus puis sur la page",
    fromPhone: "Téléphone",
    drawn: "Dessinée",
    remove: "Supprimer la signature",
  },

  phonePanel: {
    eyebrow: "Signature sur mobile",
    scanTitle: "Scannez le code",
    drawingTitle: "Signature en cours…",
    connectedTitle: "Téléphone connecté",
    expired: "Le QR code a expiré.",
    failed: "Impossible de générer le QR code.",
    newCode: "Nouveau code",
    step1: "Ouvrez l'appareil photo de votre téléphone et pointez-le vers le code.",
    step2: "Touchez le lien qui s'affiche, puis signez du doigt.",
    step3: "La signature apparaîtra ici en quelques secondes.",
    drawingHint: "Vous voyez en direct ce que vous dessinez sur le téléphone. Une fois terminé, appuyez sur le bouton d'envoi.",
    connectedHint: "Signez sur le téléphone, puis appuyez sur « Envoyer la signature ».",
    showQr: "Revoir le QR code",
    liveView: "Vue en direct",
    copied: "Copié",
    copyLink: "Copier le lien",
    cantOpen: "Le lien ne s'ouvre pas sur le téléphone ?",
    networkHint: "Le téléphone et l'ordinateur doivent être connectés au même Wi-Fi. Si vous avez plusieurs cartes réseau, essayez une autre adresse :",
    waiting: "En attente de la signature…",
    live: "en direct",
    qrAria: "QR code pour signer avec le téléphone",
  },

  drawDialog: {
    aria: "Dessiner une signature",
    title: "Dessinez votre signature",
    subtitle: "À la souris, au pavé tactile ou au stylet — le trait s'affine selon la vitesse.",
    add: "Ajouter la signature",
  },

  done: {
    aria: "Document signé téléchargé",
    title: "Terminé, c'est signé !",
    downloaded: "Le fichier {name} a été téléchargé sur votre appareil.",
    rasterized: "Le PDF d'origine était protégé : les pages ont donc été enregistrées sous forme d'images, et le texte n'est plus sélectionnable.",
    keepEditing: "Continuer l'édition",
    newDocument: "Nouveau document",
    again: "Rien ne s'est passé ? Télécharger à nouveau",
    seal: "SIGNÉ · DONESIGNIN · SIGNÉ · DONESIGNIN ·",
  },

  thankYou: {
    title: "Merci !",
    lead: "Votre paiement a bien été effectué — votre accès complet de {days} jours est maintenant actif.",
    noFile: "Vous pouvez désormais télécharger vos documents signés sans limite.",
    back: "Revenir à mon document",
    next: "Signer un autre document",
    account: "Mon compte",
    cancel: "Vous pouvez résilier à tout moment, en un clic, sur la page [Mon compte](account).",
  },

  cookies: {
    title: "Cookies",
    text: "Nous utilisons des cookies essentiels pour vous garder connecté et mémoriser votre langue. Avec votre accord, nous utilisons aussi des cookies publicitaires pour mesurer l’efficacité de nos annonces. [Politique de confidentialité](privacy)",
    accept: "Accepter",
    reject: "Refuser",
    settings: "Paramètres des cookies",
  },

  phone: {
    signFor: "Signature pour",
    connected: "Connecté",
    rotateTip: "Tournez votre téléphone pour avoir plus de place pour signer.",
    closeTip: "Fermer l'astuce",
    sending: "Envoi…",
    send: "Envoyer la signature",
    sentTitle: "Envoyé !",
    sentText: "Votre signature est apparue sur l'ordinateur. C'est là que vous pourrez la faire glisser dans le document.",
    again: "Nouvelle signature",
    failTitle: "Échec de l'envoi",
    failText: "Vérifiez votre connexion Internet, puis réessayez.",
    back: "Retour",
    retry: "Réessayer",
    expiredTitle: "Ce lien n'est plus valide",
    expiredText: "Le QR code a expiré, ou le document a été fermé sur l'ordinateur. Générez-y un nouveau code, puis scannez-le.",
    consent: "En envoyant la signature, vous acceptez les {terms} et la {privacy}.",
  },

  paywall: {
    label: "Téléchargement et paiement",
    expires: "Pour préserver votre confidentialité, le fichier signé reste sur cet appareil pendant :",
    expired: "Le fichier signé n'est plus conservé sur cet appareil. Téléchargez-le à nouveau depuis l'éditeur.",
    ready: "Votre PDF signé est prêt",
    title: "Téléchargez-le maintenant.",
    includes: "L'accès complet de {days} jours comprend :",
    features: [
      "Téléchargements illimités de PDF signés",
      "Signature sur mobile ou à la souris",
      "Documents PDF et Word, quel que soit le nombre de pages",
      "Vos documents ne quittent jamais votre appareil",
    ],
    priceLabel: "Paiement",
    email: "Votre adresse e-mail",
    emailHint: "Elle vous permettra ensuite de vous connecter sur d'autres appareils.",
    emailPlaceholder: "nom@exemple.com",
    methods: "Choisissez un moyen de paiement",
    pay: "Commander avec obligation de paiement · {amount}",
    consent:
      "J'accepte les [Conditions générales d'utilisation](terms) et la [Politique de confidentialité](privacy), et je demande expressément que l'exécution du service commence immédiatement.",
    consentNeeded: "Pour payer, cochez la case ci-dessus.",
    renewal:
      "Si vous ne résiliez pas au cours des {days} premiers jours, votre abonnement se poursuit à partir du {next}e jour au prix de {monthly} par mois. Vous pouvez résilier à tout moment, en un clic, sur la page [Mon compte](account). Si vous vous rétractez pendant le délai de rétractation de 14 jours, vous payez un montant proportionnel à la période déjà utilisée.",
    ssl: "SSL 256 bits",
    stripe: "Paiements via Stripe",
    cancelAnytime: "Résiliable à tout moment",
    loading: "Chargement du paiement…",
    processing: "Paiement en cours…",
    success: "Paiement réussi ! Votre téléchargement commence.",
    haveAccount: "Déjà abonné ?",
    login: "Se connecter",
    backToPay: "Retour au paiement",
    notConfigured: "Les paiements ne sont pas encore configurés sur ce serveur.",
    returning: "Vérification de votre paiement…",
  },

  auth: {
    title: "Connexion",
    intro: "Saisissez l'adresse e-mail associée à votre abonnement : nous vous enverrons un code de connexion à 6 chiffres.",
    email: "Adresse e-mail",
    sendCode: "Envoyer le code",
    sent: "Si un abonnement est associé à {email}, nous y avons envoyé le code. Pensez à vérifier aussi vos courriers indésirables.",
    code: "Code de connexion",
    verify: "Se connecter",
    resend: "Demander un nouveau code",
    otherEmail: "Utiliser une autre adresse e-mail",
    success: "Connexion réussie.",
  },

  account: {
    title: "Mon compte",
    signedInAs: "Connecté avec l'adresse {email}",
    trial: "Période d'essai jusqu'au {date}. Sans résiliation de votre part, l'abonnement se poursuit ensuite à {monthly} par mois.",
    active: "Abonnement actif. Prochain prélèvement : le {date} ({monthly}).",
    canceling: "Abonnement résilié. Vous conservez l'accès jusqu'au {date}.",
    pastDue: "Le dernier prélèvement a échoué. Mettez à jour votre carte pour que votre accès ne soit pas interrompu.",
    none: "Vous n'avez pas d'abonnement actif. Signez un document : vous pourrez vous abonner au moment de le télécharger.",
    manage: "Gérer ou résilier l'abonnement",
    manageHint: "Sur la page sécurisée de Stripe, vous pouvez résilier votre abonnement, changer de carte et consulter vos paiements précédents.",
    start: "Signer un document",
    logout: "Se déconnecter",
    loading: "Chargement…",
    error: "Impossible de charger les informations de votre compte. Veuillez réessayer plus tard.",
  },

  server: {
    invalidEmail: "Saisissez une adresse e-mail valide.",
    rateLimited: "Trop de tentatives. Patientez quelques minutes, puis réessayez.",
    billingUnavailable: "Le service de paiement est momentanément indisponible. Réessayez plus tard.",
    checkoutFailed: "Impossible de lancer le paiement. Réessayez.",
    alreadySubscribed:
      "Cette adresse e-mail a déjà un abonnement actif. Connectez-vous avec le code que nous vous envoyons par e-mail.",
    paymentIncomplete: "Le paiement n'a pas abouti.",
    notSignedIn: "Connectez-vous pour effectuer cette action.",
    codeInvalid: "Code incorrect. Vérifiez-le, puis réessayez.",
    codeExpired: "Le code a expiré. Demandez-en un nouveau.",
    codeLocked: "Trop de tentatives erronées. Demandez un nouveau code.",
    emailFailed: "Impossible d'envoyer l'e-mail. Réessayez plus tard.",
    unexpected: "Une erreur s'est produite. Veuillez réessayer.",
  },

  email: {
    subject: "{code} – votre code de connexion ({site})",
    intro: "Utilisez ce code pour vous connecter à {site} :",
    validity: "Le code est valable {minutes} minutes.",
    ignore: "Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet e-mail sans crainte.",
  },

  files: {
    signedSuffix: "signe",
    sampleName: "contrat-exemple.pdf",
  },

  legal: {
    backHome: "Retour à DoneSignIn",
    effective: "En vigueur depuis le {date}",
    contents: "Sommaire",
    alsoSee: "Voir aussi :",
    toBeCompleted: "à compléter",
    operatorLabels: {
      name: "Exploitant",
      address: "Siège social",
      email: "E-mail",
      taxId: "Numéro fiscal",
      registration: "Numéro d'immatriculation",
      hosting: "Hébergeur",
    },
  },
};

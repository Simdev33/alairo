import type { LegalTexts } from "./types";

//   = espace insécable (avant « : », dans « … »),   = espace fine insécable (avant ; ! ?).

// Textes juridiques français — traduction de en.ts.
export const legal: LegalTexts = {
  terms: {
    title: "Conditions générales d'utilisation",
    intro:
      "Les présentes conditions régissent l'utilisation du service en ligne {site} ({siteUrl}, ci-après : le « Service ») ainsi que l'abonnement à celui-ci. En utilisant le Service ou en souscrivant l'abonnement, vous acceptez les présentes conditions ; si vous ne les acceptez pas, nous vous prions de ne pas utiliser le Service.",
    sections: [
      {
        id: "exploitant",
        title: "L'exploitant",
        blocks: ["Le Service est fourni par l'exploitant suivant (ci-après : l'« Exploitant ») :", { operator: true }],
      },
      {
        id: "service",
        title: "Le Service",
        blocks: [
          "{site} est un outil en ligne qui vous permet d'ouvrir un document PDF ou Word, de dessiner votre signature manuscrite sur votre téléphone (après avoir scanné un QR code affiché à l'écran) ou à la souris sur votre ordinateur, de placer la signature à l'endroit de votre choix dans le document et de télécharger le PDF signé.",
          "L'ouverture des documents, le dessin des signatures, leur placement et l'aperçu du résultat sont gratuits. Le téléchargement du PDF signé nécessite un abonnement (voir la section 3).",
          "Les documents sont traités dans votre navigateur, sur votre propre appareil ; leur contenu n'est pas transmis à l'Exploitant. Les détails figurent dans la [Politique de confidentialité](privacy).",
        ],
      },
      {
        id: "abonnement",
        title: "Abonnement et tarifs",
        blocks: [
          "L'abonnement commence par une période initiale de {days} jours, dont le prix est de {trial}. Pendant cette période, le Service peut être utilisé pleinement, sans aucune restriction.",
          "Si vous ne résiliez pas l'abonnement avant la fin de la période initiale, il se poursuit automatiquement, à partir du {next}e jour, sous la forme d'un abonnement au prix mensuel de {monthly}, et il est renouvelé chaque mois jusqu'à sa résiliation. Le prix mensuel est prélevé au début de chaque période sur le moyen de paiement que vous avez indiqué lors de la commande.",
          "Le montant total à payer est clairement indiqué sur la page de paiement avant que vous ne passiez commande. La commande est passée lorsque vous appuyez sur le bouton indiquant l'obligation de paiement (ou sur le bouton du moyen de paiement choisi).",
          "Nous informons les abonnés par e-mail de toute modification des tarifs au moins 30 jours avant son entrée en vigueur ; si vous ne l'acceptez pas, vous pouvez résilier votre abonnement avant cette date.",
        ],
      },
      {
        id: "paiement",
        title: "Paiement",
        blocks: [
          "Les paiements sont traités par Stripe Payments Europe, Ltd. (Irlande). Les moyens de paiement disponibles dépendent de votre appareil, de votre navigateur et de votre pays, et peuvent inclure les cartes de débit et de crédit, Apple Pay, Google Pay, PayPal et Link. L'Exploitant ne voit ni ne conserve les données de votre carte.",
          "Stripe vous envoie un reçu par e-mail pour chaque paiement réussi. La facture exigée par la loi est émise par l'Exploitant.",
          "Si un prélèvement mensuel échoue, Stripe effectue une nouvelle tentative dans un délai de quelques jours ; si le prélèvement échoue toujours, l'abonnement prend fin, de même que votre accès au téléchargement.",
        ],
      },
      {
        id: "resiliation",
        title: "Résiliation",
        blocks: [
          "Vous pouvez résilier votre abonnement à tout moment, sans avoir à vous justifier, sur la page [Mon compte](account) (connexion avec un code envoyé par e-mail), en un clic, via l'interface sécurisée de Stripe.",
          "La résiliation prend effet à la fin de la période en cours : jusque-là, vous conservez votre accès, et aucun autre prélèvement n'est effectué. Si vous résiliez pendant la période initiale, aucun prix mensuel n'est prélevé à partir du {next}e jour.",
          "Le prix d'une période déjà commencée n'est pas remboursé, sauf si vous exercez votre droit de rétractation et dans les autres cas prévus par la loi.",
        ],
      },
      {
        id: "retractation",
        title: "Droit de rétractation",
        blocks: [
          "Si vous souscrivez l'abonnement en tant que consommateur, vous pouvez vous rétracter du contrat dans un délai de 14 jours à compter de la commande, sans avoir à motiver votre décision. Vous pouvez informer l'Exploitant de votre décision de vous rétracter au moyen d'une déclaration dénuée d'ambiguïté (par exemple par e-mail à l'adresse {operatorEmail}) ; vous pouvez utiliser le modèle de formulaire de rétractation figurant à l'annexe I, partie B, de la directive 2011/83/UE, mais vous n'y êtes pas obligé.",
          "Comme vous demandez expressément, lors de la commande, que l'exécution du Service commence immédiatement, vous devez, en cas de rétractation, payer un montant proportionnel à la période d'utilisation écoulée jusqu'à la rétractation. Nous vous remboursons le montant restant, sur le moyen de paiement utilisé pour le paiement, dans un délai de 14 jours à compter du jour où vous nous informez de votre rétractation.",
          "Le droit de rétractation n'affecte pas votre possibilité de résilier l'abonnement à tout moment (voir la section 5).",
        ],
      },
      {
        id: "compte",
        title: "Compte et connexion",
        blocks: [
          "Il n'y a pas d'inscription distincte avec mot de passe. Votre compte est lié à l'adresse e-mail que vous indiquez lors du paiement : dans le navigateur avec lequel vous avez payé, vous êtes connecté automatiquement, et sur d'autres appareils, vous pouvez vous connecter avec un code à 6 chiffres envoyé par e-mail, valable 10 minutes.",
          "Ne communiquez votre code de connexion à personne. L'abonnement est à usage personnel ; le partage ou la revente de l'accès ne sont pas autorisés.",
        ],
      },
      {
        id: "signature",
        title: "Nature et effets juridiques de la signature",
        blocks: [
          "La signature créée avec le Service est l'image de votre signature manuscrite, insérée dans le document sous forme vectorielle. Elle constitue une signature électronique simple au sens du règlement (UE) n° 910/2014 (eIDAS) : il ne s'agit ni d'une signature électronique avancée ni d'une signature électronique qualifiée, et elle n'identifie pas le signataire.",
          "Pour certains actes juridiques et documents, la loi peut exiger la forme écrite, une signature électronique qualifiée, la présence de témoins ou une autre forme d'authentification. Il vous appartient de déterminer si une telle signature convient au document concerné ; en cas de doute, demandez conseil à un juriste.",
          "L'Exploitant n'est pas partie aux relations juridiques établies entre vous et des tiers, et n'examine pas le contenu des documents.",
        ],
      },
      {
        id: "utilisation",
        title: "Conditions d'utilisation",
        blocks: [
          "Vous ne pouvez utiliser le Service qu'à des fins licites et conformément aux présentes conditions. Vous vous engagez notamment à :",
          {
            list: [
              "ne signer que des documents que vous êtes habilité à signer ;",
              "ne signer au nom d'autrui qu'avec une autorisation appropriée, et ne pas imiter la signature d'une autre personne ;",
              "ne pas utiliser le Service à des fins de fraude, de falsification de documents ou à toute autre fin illicite ;",
              "ne pas tenter d'accéder sans autorisation au Service, de contourner ses mesures de sécurité ou de paiement, ni de perturber son fonctionnement (par exemple par des requêtes automatisées en masse) ;",
              "ne pas communiquer le QR code ni le lien correspondant à des personnes non autorisées — toute personne qui les connaît peut envoyer une signature vers votre document jusqu'à l'expiration de la session (1 heure au maximum).",
            ],
          },
          "Si les documents traités contiennent des données personnelles d'autres personnes, il vous incombe de traiter ces données de manière licite.",
          "L'Exploitant peut restreindre l'accès ou y mettre fin afin de prévenir les abus ; en cas de manquement grave aux présentes conditions, l'abonnement peut être résilié avec effet immédiat.",
        ],
      },
      {
        id: "propriete-intellectuelle",
        title: "Propriété intellectuelle",
        blocks: [
          "Le logiciel, l'apparence, le logo et les textes du Service sont la propriété intellectuelle de l'Exploitant ; ils ne peuvent être ni copiés ni diffusés au-delà d'une utilisation du Service conforme à sa destination.",
          "Le Service utilise également des composants open source (tels que Mozilla pdf.js, pdf-lib, perfect-freehand et docx-preview), soumis à leurs propres conditions de licence.",
          "Les documents que vous ouvrez et les signatures que vous dessinez restent les vôtres ; l'Exploitant n'acquiert aucun droit sur eux.",
        ],
      },
      {
        id: "responsabilite",
        title: "Responsabilité",
        blocks: [
          "L'Exploitant fait de son mieux pour assurer le fonctionnement continu et correct du Service, mais ne garantit pas qu'il sera disponible sans interruption ni erreur. Vérifiez le document téléchargé avant de l'utiliser, en particulier l'emplacement de la signature et l'intégralité du contenu, et conservez toujours une copie de vos fichiers originaux.",
          "Dans toute la mesure permise par la loi, l'Exploitant n'est pas responsable des dommages indirects, du manque à gagner ou des pertes de données résultant de l'utilisation ou de l'impossibilité d'utiliser le Service, ni des conséquences liées à la validité, aux effets juridiques ou à l'utilisation des documents signés. Cette limitation ne s'applique pas à la responsabilité pour les dommages causés intentionnellement ou par une faute lourde, ni pour les manquements contractuels portant atteinte à la vie, à l'intégrité physique ou à la santé, et elle n'affecte pas les droits reconnus aux consommateurs par la loi.",
        ],
      },
      {
        id: "disponibilite",
        title: "Disponibilité et modifications",
        blocks: [
          "L'Exploitant a le droit de développer et de modifier le Service. En cas d'arrêt définitif du Service, nous mettons fin aux abonnements et remboursons, au prorata, le prix de la période non utilisée.",
        ],
      },
      {
        id: "donnees-personnelles",
        title: "Protection des données",
        blocks: ["Les modalités du traitement des données personnelles sont décrites dans la [Politique de confidentialité](privacy)."],
      },
      {
        id: "modification",
        title: "Modification des conditions",
        blocks: [
          "L'Exploitant a le droit de modifier les présentes conditions. Les modifications prennent effet par leur publication sur cette page, à la date d'entrée en vigueur indiquée en haut du document. Nous informons les abonnés par e-mail, au moins 30 jours à l'avance, de toute modification substantielle qui leur est défavorable ; s'ils ne l'acceptent pas, ils peuvent résilier leur abonnement avant son entrée en vigueur.",
        ],
      },
      {
        id: "droit-applicable",
        title: "Droit applicable et litiges",
        blocks: [
          "Les présentes conditions sont régies par le droit slovaque. Si vous utilisez le Service en tant que consommateur, ce choix de loi ne vous prive pas de la protection que vous assurent les dispositions impératives de protection des consommateurs de votre pays de résidence.",
          "Nous nous efforçons de régler les litiges à l'amiable : vous pouvez adresser votre réclamation à {operatorEmail}, et nous y répondons dans un délai de 30 jours. Si nous rejetons votre réclamation ou si nous n'y répondons pas dans un délai de 30 jours, vous pouvez, en tant que consommateur, engager une procédure de règlement extrajudiciaire des litiges auprès de l'Inspection slovaque du commerce (Slovenská obchodná inšpekcia, https://www.soi.sk) ou d'un autre organisme de règlement des litiges figurant sur la liste du ministère slovaque de l'Économie. Vous pouvez également vous adresser à l'autorité de protection des consommateurs et aux tribunaux de votre lieu de résidence.",
        ],
      },
      {
        id: "contact",
        title: "Contact",
        blocks: ["Vous pouvez contacter l'Exploitant pour toute question, remarque ou réclamation à l'adresse e-mail suivante : {operatorEmail}."],
      },
    ],
  },

  privacy: {
    title: "Politique de confidentialité",
    intro:
      "Conformément au règlement (UE) 2016/679 (règlement général sur la protection des données, RGPD), la présente politique explique quelles données personnelles nous traitons lorsque vous utilisez {site} ({siteUrl}), dans quel but, sur quelle base juridique et pendant combien de temps, ainsi que les droits dont vous disposez.",
    sections: [
      {
        id: "responsable",
        title: "Le responsable du traitement",
        blocks: [{ operator: true }, "Pour toute question relative à la protection des données, vous pouvez nous joindre à l'adresse {operatorEmail}."],
      },
      {
        id: "en-bref",
        title: "En bref",
        blocks: [
          {
            list: [
              "Vos documents sont ouverts et signés par votre navigateur, sur votre propre appareil ; leur contenu ne nous parvient jamais.",
              "La signature que vous dessinez sur votre téléphone transite par notre serveur jusqu'à votre ordinateur, et elle est supprimée automatiquement au plus tard au bout d'une heure.",
              "Il n'y a pas d'inscription avec mot de passe. Si vous vous abonnez, nous traitons votre adresse e-mail et les données de votre abonnement.",
              "Les paiements sont traités par Stripe ; nous ne voyons ni ne conservons les données de votre carte.",
              "Nous n'utilisons aucun outil de mesure d'audience. La mesure des conversions Google Ads ne fonctionne que si vous l'autorisez dans le bandeau cookies ; sinon, nous n'utilisons que les cookies nécessaires à la connexion, au paiement et au choix de la langue.",
            ],
          },
        ],
      },
      {
        id: "documents",
        title: "Vos documents",
        blocks: [
          "Les documents PDF et Word que vous ouvrez sont traités par votre navigateur, sur votre propre appareil : l'ouverture, la conversion des fichiers Word en PDF, le placement de la signature et la génération du PDF à télécharger s'y déroulent. Nous n'avons pas accès au contenu de vos documents et nous ne le stockons pas.",
          "Si, dans un déploiement donné, le Service utilise un convertisseur Word côté serveur, le fichier Word ne se trouve sur le serveur que le temps de la conversion, puis il est immédiatement supprimé.",
          "Tant que la page de paiement est ouverte, votre navigateur conserve le PDF signé sur votre propre appareil (IndexedDB) pendant 60 minutes au maximum, afin qu'il ne soit pas perdu si un moyen de paiement vous redirige vers une autre page (par exemple PayPal). Ce fichier ne nous parvient pas non plus.",
          "Le nom du fichier du document est inclus dans la session de signature sur téléphone (voir ci-dessous), afin que votre téléphone puisse afficher ce que vous signez.",
        ],
      },
      {
        id: "session",
        title: "La session de signature sur téléphone",
        blocks: [
          "Lorsque vous ouvrez un document, le Service crée une session dotée d'un identifiant aléatoire et en affiche le lien sous forme de QR code. La session contient :",
          {
            list: [
              "l'identifiant aléatoire de la session et son heure d'expiration ;",
              "le nom du fichier du document ;",
              "l'indication de la connexion ou non d'un téléphone ;",
              "pendant le dessin, les tracés en cours de la signature (l'aperçu en direct sur votre ordinateur) ;",
              "la signature envoyée, sous forme vectorielle : la forme des tracés, leur couleur et l'heure de l'envoi.",
            ],
          },
          "Finalité : transmettre à votre ordinateur la signature dessinée sur votre téléphone. Base juridique : la fourniture du Service à votre demande (article 6, paragraphe 1, point b, du RGPD).",
          "Durée : les données de la session sont conservées au maximum 1 heure, puis elles sont supprimées automatiquement et définitivement. Nous ne conservons que la forme finale des tracés, et non le déroulement du dessin dans le temps (vitesse, pression), et nous n'identifions personne à partir de sa signature.",
        ],
      },
      {
        id: "abonnement",
        title: "Abonnement et paiement",
        blocks: [
          "Si vous vous abonnez, les données que vous saisissez sur la page de paiement sont traitées par Stripe ; nous recevons les données nécessaires au suivi de votre abonnement.",
          {
            list: [
              "Données traitées : adresse e-mail, identifiants de client et d'abonnement attribués par Stripe, statut et périodes de l'abonnement, montant et date des paiements, type de moyen de paiement (par exemple carte, avec ses 4 derniers chiffres) et — si la page de paiement les demande — pays et code postal de facturation.",
              "Finalité : création et exécution de l'abonnement, encaissement des paiements, vérification de l'accès, facturation et service client.",
              "Base juridique : exécution d'un contrat (article 6, paragraphe 1, point b, du RGPD) ; pour la tenue des documents comptables, respect d'une obligation légale (article 6, paragraphe 1, point c, du RGPD).",
              "Durée : pendant toute la durée de l'abonnement ; après sa fin, nous conservons les documents comptables pendant 10 ans, conformément à l'article 35 de la loi slovaque sur la comptabilité (loi n° 431/2002 Coll.). Nous supprimons les autres données à votre demande après la fin de l'abonnement.",
            ],
          },
          "Les paiements sont traités par Stripe Payments Europe, Ltd. (1 Grand Canal Street Lower, Grand Canal Dock, Dublin, D02 H210, Irlande), qui agit en tant que responsable du traitement indépendant pour les données de paiement et la prévention de la fraude. Vous trouverez des informations sur ses traitements de données à l'adresse https://stripe.com/privacy.",
        ],
      },
      {
        id: "connexion",
        title: "Connexion par code envoyé par e-mail",
        blocks: [
          "Sur d'autres appareils, vous pouvez vous connecter avec un code à usage unique envoyé par e-mail.",
          {
            list: [
              "Données traitées : adresse e-mail, forme hachée du code de connexion, heure d'expiration du code et nombre de tentatives.",
              "Finalité : connexion et protection de votre compte.",
              "Base juridique : exécution d'un contrat (article 6, paragraphe 1, point b, du RGPD).",
              "Durée : le code est valable 10 minutes, et nous le supprimons immédiatement après son utilisation.",
            ],
          },
          "Les e-mails de connexion sont envoyés par Resend, Inc. (https://resend.com), en qualité de sous-traitant.",
        ],
      },
      {
        id: "journaux",
        title: "Journaux techniques",
        blocks: [
          "Lorsque le site est servi — comme pour tout site web — les serveurs de l'hébergeur enregistrent des données techniques.",
          {
            list: [
              "Données traitées : adresse IP, heure de la requête, adresse de la page demandée, type et version du navigateur.",
              "Finalité : fonctionnement sûr et ininterrompu du Service, détection des erreurs et des abus.",
              "Base juridique : intérêt légitime de l'Exploitant (article 6, paragraphe 1, point f, du RGPD).",
              "Durée : une courte période, conformément aux règles de conservation des données de l'hébergeur.",
            ],
          },
        ],
      },
      {
        id: "cookies",
        title: "Cookies et stockage local",
        blocks: [
          "Les cookies suivants sont nécessaires au fonctionnement du Service ; ils ne requièrent pas de consentement :",
          {
            list: [
              "ds_session : maintient votre connexion (180 jours) ;",
              "ds_signed_in : indique au site que vous êtes connecté (180 jours) ;",
              "ds_login : processus de connexion par code (10 minutes) ;",
              "NEXT_LOCALE : mémorise la langue choisie dans le sélecteur de langue (1 an) ;",
              "ds_consent : mémorise votre choix dans le bandeau cookies (180 jours).",
            ],
          },
          "Cookies publicitaires — uniquement avec votre consentement : si vous cliquez sur « Accepter » dans le bandeau cookies, nous chargeons la balise Google de Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irlande) afin de mesurer si nos annonces Google Ads mènent à des achats (mesure des conversions). Google dépose alors ses propres cookies (par exemple _gcl_au, pendant 90 jours au plus) et reçoit votre adresse IP, des données sur votre navigateur, l'adresse de la page consultée et l'identifiant du clic sur l'annonce. Base juridique : votre consentement (article 6, paragraphe 1, point a, du RGPD). Sans votre consentement, la balise Google n'est pas chargée du tout. Vous pouvez donner ou retirer votre consentement à tout moment grâce au lien « Paramètres des cookies » en bas de page ; le retrait ne remet pas en cause la licéité du traitement effectué auparavant. Google peut également transférer des données vers les États-Unis (cadre de protection des données UE–États-Unis) ; sa politique de confidentialité : https://policies.google.com/privacy.",
          "Sur la page de paiement, Stripe utilise ses propres cookies pour traiter le paiement en toute sécurité et prévenir la fraude. Nous n'utilisons pas de cookies de mesure d'audience. Nous chargeons les polices de caractères depuis notre propre serveur : aucun fournisseur de polices externe ne reçoit donc de données vous concernant.",
        ],
      },
      {
        id: "sous-traitants",
        title: "Sous-traitants et transferts de données",
        blocks: [
          "Les sous-traitants suivants traitent des données pour notre compte :",
          {
            list: [
              "hébergement et serveur d'application : {hosting} ;",
              "base de données des sessions de signature sur téléphone : {storage} — lieu de stockage des données : {storageRegion} ;",
              "envoi des e-mails de connexion : Resend, Inc., États-Unis.",
            ],
          },
          "Ces prestataires ont leur siège aux États-Unis d'Amérique ; les données peuvent donc également être transférées en dehors de l'Espace économique européen. Ces transferts sont encadrés par des garanties appropriées (le cadre de protection des données UE–États-Unis et/ou les clauses contractuelles types adoptées par la Commission européenne).",
          "En dehors de la mesure des conversions Google Ads à laquelle vous consentez (voir « Cookies et stockage local »), nous ne communiquons vos données à aucun autre tiers, et nous ne les vendons pas.",
        ],
      },
      {
        id: "securite",
        title: "Sécurité des données",
        blocks: [
          "Toutes les connexions entre le site et le serveur sont chiffrées (HTTPS). Les cookies de connexion sont signés et ne peuvent pas être lus par des scripts. Les identifiants de session sont aléatoires et impossibles à deviner, et les données de session se suppriment d'elles-mêmes au bout d'une heure. Ne communiquez pas le QR code ni son lien à d'autres personnes : toute personne qui les connaît peut envoyer une signature dans la session jusqu'à son expiration.",
        ],
      },
      {
        id: "droits",
        title: "Vos droits",
        blocks: [
          "En vertu du RGPD, vous disposez des droits suivants :",
          {
            list: [
              "droit d'information et d'accès (article 15) ;",
              "droit de rectification (article 16) ;",
              "droit à l'effacement (article 17) ;",
              "droit à la limitation du traitement (article 18) ;",
              "droit à la portabilité des données (article 20) ;",
              "droit d'opposition au traitement fondé sur l'intérêt légitime (article 21).",
            ],
          },
          "Vous pouvez adresser votre demande à {operatorEmail} ; nous y répondrons dans un délai d'un mois au plus. Vous pouvez également modifier vous-même votre adresse e-mail sur la page [Mon compte](account), via l'interface de Stripe.",
        ],
      },
      {
        id: "recours",
        title: "Voies de recours",
        blocks: [
          "Si vous estimez que le traitement de vos données personnelles enfreint la loi, vous pouvez introduire une réclamation auprès de l'autorité de contrôle du lieu du siège du responsable du traitement, l'Office de protection des données personnelles de la République slovaque (Úrad na ochranu osobných údajov Slovenskej republiky ; Hraničná 12, 820 07 Bratislava 27 ; https://dataprotection.gov.sk), ou auprès de l'autorité de protection des données de votre lieu de résidence ou de travail — en Hongrie, par exemple, l'Autorité nationale hongroise de protection des données et de la liberté de l'information (Nemzeti Adatvédelmi és Információszabadság Hatóság, NAIH ; 1055 Budapest, Falk Miksa utca 9–11. ; https://naih.hu).",
          "En cas de violation de vos droits, vous pouvez également saisir la justice ; vous pouvez intenter l'action devant les juridictions de l'État membre de votre lieu de résidence.",
        ],
      },
      {
        id: "enfants",
        title: "Enfants",
        blocks: ["Le Service ne s'adresse pas aux enfants de moins de 16 ans, et nous ne traitons pas sciemment de données les concernant."],
      },
      {
        id: "modifications",
        title: "Modifications de la présente politique",
        blocks: [
          "Nous mettons à jour la présente politique à chaque évolution du Service ; la date d'entrée en vigueur est indiquée en haut du document. Les conditions d'utilisation du Service figurent dans les [Conditions générales d'utilisation](terms).",
        ],
      },
    ],
  },
};

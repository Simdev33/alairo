import type { LegalTexts } from "./types";

//   = espace insécable (avant « : », dans « … »),   = espace fine insécable (avant ; ! ?).

export const legal: LegalTexts = {
  terms: {
    title: "Conditions générales d'utilisation",
    intro:
      "Le présent document définit les conditions d'utilisation du service en ligne {site} (ci-après : le « Service »). Nous vous invitons à le lire attentivement avant d'utiliser le Service.",
    sections: [
      {
        id: "exploitant",
        title: "L'exploitant",
        blocks: [
          "Le Service est fourni par l'exploitant suivant (ci-après : l'« Exploitant ») :",
          { operator: true },
        ],
      },
      {
        id: "service",
        title: "Le Service",
        blocks: [
          "{site} est un outil gratuit qui fonctionne dans le navigateur. Il vous permet d'ouvrir un document PDF ou Word, de dessiner une signature manuscrite sur votre téléphone après avoir scanné le QR code affiché à l'écran (ou de la dessiner à la souris sur votre ordinateur), puis de placer la signature à l'endroit de votre choix dans le document et de télécharger le PDF signé.",
          "Son utilisation ne nécessite ni inscription ni installation d'application. Le document est traité dans votre navigateur ; les détails sont décrits dans la [Politique de confidentialité](privacy).",
        ],
      },
      {
        id: "acceptation",
        title: "Acceptation des conditions",
        blocks: [
          "En utilisant le Service, vous acceptez les présentes conditions. Si vous ne les acceptez pas, nous vous prions de ne pas utiliser le Service.",
        ],
      },
      {
        id: "tarifs",
        title: "Tarifs",
        blocks: [
          "Le Service est gratuit. L'Exploitant pourra à l'avenir introduire des fonctionnalités payantes ; il vous en informera au préalable et de manière claire, et ne pourra facturer de frais qu'après votre acceptation expresse.",
        ],
      },
      {
        id: "signature",
        title: "Nature et effets juridiques de la signature",
        blocks: [
          "La signature créée avec le Service est l'image de votre signature dessinée à la main, insérée dans le document sous forme vectorielle. Elle constitue une signature électronique simple au sens du règlement (UE) n° 910/2014 (eIDAS) : il ne s'agit ni d'une signature électronique avancée ni d'une signature électronique qualifiée, et elle n'identifie pas le signataire.",
          "Pour certains actes juridiques et documents, la loi peut exiger la forme écrite, une signature électronique qualifiée, la présence de témoins ou une autre forme d'authentification. Il vous appartient de déterminer si une telle signature convient au document concerné ; en cas de doute, demandez conseil à un juriste.",
          "L'Exploitant n'est pas partie aux relations juridiques établies entre vous et des tiers, et n'examine pas le contenu des documents.",
        ],
      },
      {
        id: "obligations",
        title: "Obligations de l'utilisateur",
        blocks: [
          "En utilisant le Service, vous vous engagez à :",
          {
            list: [
              "ne signer que des documents que vous êtes habilité à signer ;",
              "ne signer au nom d'autrui qu'avec une autorisation appropriée, et ne pas imiter la signature d'une autre personne ;",
              "ne pas utiliser le Service à des fins de fraude, de falsification de documents ou à toute autre fin illicite ;",
              "ne pas tenter d'accéder sans autorisation au Service ni perturber son fonctionnement (par exemple par des requêtes automatisées en masse) ;",
              "ne pas communiquer le QR code ni le lien correspondant à des personnes non autorisées — toute personne qui les connaît peut envoyer une signature vers votre document jusqu'à l'expiration de la session (1 heure au maximum).",
            ],
          },
          "En cas de soupçon d'utilisation illicite, l'Exploitant peut restreindre l'accès au Service.",
        ],
      },
      {
        id: "disponibilite",
        title: "Disponibilité",
        blocks: [
          "L'Exploitant s'efforce d'assurer le fonctionnement continu du Service, mais ne garantit pas un fonctionnement ininterrompu et exempt d'erreurs. Le Service peut être temporairement indisponible en raison d'opérations de maintenance, de développements ou de défaillances de prestataires externes. L'Exploitant peut modifier ou interrompre le Service à tout moment.",
          "Vérifiez le document téléchargé avant de l'utiliser, en particulier l'emplacement de la signature et l'intégralité du contenu.",
        ],
      },
      {
        id: "responsabilite",
        title: "Responsabilité",
        blocks: [
          "Le Service est fourni gratuitement, « en l'état ». Dans toute la mesure permise par la loi, l'Exploitant n'est pas responsable des dommages indirects, du manque à gagner ou des pertes de données résultant de l'utilisation ou de l'impossibilité d'utiliser le Service, ni des conséquences liées à la validité, aux effets juridiques ou à l'utilisation des documents signés.",
          "Cette limitation de responsabilité ne s'applique pas à la responsabilité pour les dommages causés intentionnellement ou par une faute lourde, ni pour les manquements contractuels portant atteinte à la vie, à l'intégrité physique ou à la santé, et elle n'affecte pas les droits reconnus aux consommateurs par la loi.",
        ],
      },
      {
        id: "propriete-intellectuelle",
        title: "Propriété intellectuelle",
        blocks: [
          "Le logiciel, l'apparence, le logo et les textes du Service sont la propriété intellectuelle de l'Exploitant ; vous ne pouvez pas les copier ni les diffuser au-delà d'une utilisation conforme à leur destination.",
          "Les documents ouverts et les signatures dessinées restent les vôtres ; l'Exploitant n'acquiert aucun droit sur eux.",
        ],
      },
      {
        id: "donnees-personnelles",
        title: "Protection des données",
        blocks: ["Le traitement des données personnelles est régi par la [Politique de confidentialité](privacy)."],
      },
      {
        id: "contact",
        title: "Contact et réclamations",
        blocks: [
          "Vous pouvez envoyer vos questions, remarques et réclamations à l'adresse e-mail {operatorEmail}. L'Exploitant répond sur le fond aux réclamations dans un délai de 30 jours au plus.",
          "Si vous êtes un consommateur, vous pouvez également recourir au médiateur de la consommation (organisme de règlement extrajudiciaire des litiges) compétent pour votre lieu de résidence.",
        ],
      },
      {
        id: "modification",
        title: "Modification des conditions",
        blocks: [
          "L'Exploitant peut modifier les présentes conditions ; la modification prend effet par sa publication sur cette page, à la date d'entrée en vigueur indiquée. En continuant à utiliser le Service, vous acceptez les conditions modifiées.",
        ],
      },
      {
        id: "droit-applicable",
        title: "Droit applicable",
        blocks: [
          "Les présentes conditions sont régies par le droit hongrois. Si vous êtes un consommateur, ce choix ne vous prive pas de la protection que vous assurent les dispositions impératives du droit du pays de votre résidence habituelle. Les tribunaux hongrois sont compétents pour trancher les litiges, sans préjudice des règles impératives de compétence protégeant les consommateurs.",
        ],
      },
    ],
  },

  privacy: {
    title: "Politique de confidentialité",
    intro:
      "La présente politique explique quelles données personnelles {site} traite, dans quel but et pendant combien de temps, ainsi que les droits dont vous disposez. En bref : nous ne téléversons pas votre document, il n'y a ni inscription ni suivi, et la signature envoyée depuis le téléphone est automatiquement supprimée au bout d'une heure.",
    sections: [
      {
        id: "responsable",
        title: "Le responsable du traitement",
        blocks: [
          "Le responsable du traitement des données personnelles est :",
          { operator: true },
          "Pour toute question relative à la protection des données, vous pouvez nous joindre à l'adresse {operatorEmail}.",
        ],
      },
      {
        id: "documents",
        title: "Les documents",
        blocks: [
          "Les documents PDF et Word que vous ouvrez sont traités par votre navigateur, sur votre propre appareil : l'ouverture, la conversion du fichier Word en PDF, le placement de la signature et la génération du PDF à télécharger s'y déroulent. Le contenu du document n'est ni transmis à notre serveur ni stocké.",
          "Si, dans un environnement d'hébergement donné, le Service utilise un convertisseur Word côté serveur, le fichier Word n'est placé sur le serveur que le temps de la conversion, puis il est immédiatement supprimé.",
          "Le nom du fichier du document est enregistré dans la session de signature sur téléphone (voir ci-dessous), afin que le téléphone affiche ce que vous signez.",
        ],
      },
      {
        id: "session",
        title: "La session de signature sur téléphone",
        blocks: [
          "Lorsque vous ouvrez un document, le Service crée une session dotée d'un identifiant aléatoire et en affiche le lien sous forme de QR code. Nous stockons les données suivantes dans la session :",
          {
            list: [
              "l'identifiant aléatoire de la session et sa date d'expiration ;",
              "le nom du fichier du document ;",
              "l'indication de la connexion ou non du téléphone ;",
              "pendant le dessin, les tracés en cours de la signature (il s'agit de l'aperçu en direct sur l'ordinateur) ;",
              "la signature envoyée, sous forme vectorielle : la forme et la couleur des tracés, ainsi que l'heure de l'envoi.",
            ],
          },
          "Ce traitement a pour finalité de transmettre à votre ordinateur la signature dessinée sur le téléphone. Il a pour base juridique la fourniture du Service que vous avez demandé (RGPD, article 6, paragraphe 1, point b).",
          "Les données de la session sont conservées au maximum 1 heure, puis elles sont supprimées automatiquement et définitivement. Nous ne conservons que la forme finale des tracés, et non le déroulement du dessin dans le temps (vitesse, pression) ; nous n'identifions personne à partir de la signature.",
        ],
      },
      {
        id: "journaux",
        title: "Données techniques et journaux",
        blocks: [
          "Comme pour tout site web, les serveurs de l'hébergeur enregistrent automatiquement les données techniques des requêtes (adresse IP, type de navigateur, page demandée et horodatage). Nous traitons ces données afin d'assurer la sécurité du fonctionnement et de diagnostiquer les erreurs, sur la base de notre intérêt légitime (RGPD, article 6, paragraphe 1, point f) ; l'hébergeur les conserve pendant une courte durée, selon ses propres règles.",
        ],
      },
      {
        id: "cookies",
        title: "Cookies",
        blocks: [
          "Nous n'utilisons ni cookies publicitaires ou de suivi, ni outil de mesure d'audience. Nous n'utilisons qu'un seul cookie : si vous choisissez une langue, votre choix est mémorisé pendant 1 an dans le cookie NEXT_LOCALE, afin que le site s'affiche dans cette langue lors de votre prochaine visite. Ce cookie est nécessaire au fonctionnement du Service que vous avez demandé ; nous ne vous demandons donc pas de consentement distinct.",
          "Les polices de caractères sont chargées depuis notre propre serveur : aucun fournisseur de polices externe ne reçoit de données vous concernant lorsque vous ouvrez le site.",
        ],
      },
      {
        id: "sous-traitants",
        title: "Sous-traitants et transferts de données",
        blocks: [
          "Les données sont traitées pour notre compte par les sous-traitants suivants :",
          {
            list: [
              "hébergement et serveur d'application : {hosting} ;",
              "base de données des sessions : {storage} — lieu de stockage des données : {storageRegion}.",
            ],
          },
          "Ces deux prestataires sont des sociétés américaines ; les données peuvent donc être transférées en dehors de l'Espace économique européen. Ces transferts reposent sur le cadre de protection des données UE–États-Unis et/ou sur les clauses types de protection des données adoptées par la Commission européenne.",
          "Nous ne vendons pas de données personnelles et ne les utilisons pas à des fins publicitaires.",
        ],
      },
      {
        id: "securite",
        title: "Sécurité des données",
        blocks: [
          "Le site n'est accessible que par une connexion chiffrée (HTTPS). Les identifiants de session sont aléatoires et impossibles à deviner, et les données sont supprimées d'elles-mêmes au bout d'une heure. Ne communiquez pas le QR code et le lien à d'autres personnes : toute personne qui les connaît peut envoyer une signature dans la session jusqu'à son expiration.",
        ],
      },
      {
        id: "droits",
        title: "Vos droits",
        blocks: [
          "En vertu du règlement général sur la protection des données (RGPD), vous avez le droit :",
          {
            list: [
              "d'obtenir des informations sur les données vous concernant que nous traitons, et d'y accéder ;",
              "de demander la rectification des données inexactes ;",
              "de demander l'effacement des données ou la limitation de leur traitement ;",
              "de vous opposer au traitement fondé sur l'intérêt légitime ;",
              "de demander que vos données vous soient communiquées dans un format portable.",
            ],
          },
          "Vous pouvez adresser votre demande à {operatorEmail} ; nous y répondrons dans un délai d'un mois au plus. Comme il n'y a pas d'inscription et que les données des sessions sont supprimées dans l'heure, il est fort probable qu'au moment de votre demande, nous ne traitions déjà plus aucune donnée vous concernant.",
          "Si vous estimez que vos droits n'ont pas été respectés, vous pouvez introduire une réclamation auprès de l'autorité hongroise de protection des données et de la liberté de l'information, la Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH, 1055 Budapest, Falk Miksa utca 9–11., www.naih.hu), ou auprès de l'autorité de protection des données de votre lieu de résidence ; vous pouvez également saisir la justice.",
        ],
      },
      {
        id: "enfants",
        title: "Enfants",
        blocks: [
          "Le Service ne s'adresse pas aux enfants de moins de 16 ans, et nous ne traitons pas sciemment de données les concernant.",
        ],
      },
      {
        id: "modifications",
        title: "Modifications",
        blocks: [
          "Nous pouvons mettre à jour la présente politique de temps à autre. La version en vigueur est toujours consultable sur cette page, avec sa date d'entrée en vigueur. Pour les questions relatives au fonctionnement du Service, les [Conditions générales d'utilisation](terms) font foi.",
        ],
      },
    ],
  },
};

import type { LegalTexts } from "./types";

export const legal: LegalTexts = {
  terms: {
    title: "Terms of Service",
    intro:
      "This document sets out the terms for using the {site} web service (the “Service”). Please read it carefully before using the Service.",
    sections: [
      {
        id: "operator",
        title: "The operator",
        blocks: ["The Service is provided by the following operator (the “Operator”):", { operator: true }],
      },
      {
        id: "service",
        title: "The Service",
        blocks: [
          "{site} is a free tool that runs in your browser. It lets you open a PDF or Word document, draw a handwritten signature on your phone after scanning the QR code shown on the screen (or draw it on your computer with a mouse), place the signature anywhere in the document and download the signed PDF.",
          "You do not need to register or install an app to use it. The document is processed in your browser; the details are described in the [Privacy Policy](privacy).",
        ],
      },
      {
        id: "acceptance",
        title: "Acceptance of the terms",
        blocks: [
          "By using the Service, you accept these terms. If you do not agree with them, please do not use the Service.",
        ],
      },
      {
        id: "fees",
        title: "Fees",
        blocks: [
          "The Service is free of charge. The Operator may introduce paid features in the future; it will inform you about them clearly and in advance, and may charge a fee only after you have expressly agreed to it.",
        ],
      },
      {
        id: "signature",
        title: "Nature and legal effect of the signature",
        blocks: [
          "A signature created with the Service is an image of your hand-drawn signature, placed in the document in vector form. It qualifies as a simple electronic signature under Regulation (EU) No 910/2014 (eIDAS): it is neither an advanced nor a qualified electronic signature, and it does not identify the signatory.",
          "For certain legal declarations and documents, the law may require written form, a qualified electronic signature, witnesses or other authentication. It is your responsibility to decide whether such a signature is appropriate for a given document; if in doubt, seek legal advice.",
          "The Operator is not a party to any legal relationship between you and third parties, and does not review the content of documents.",
        ],
      },
      {
        id: "obligations",
        title: "Your obligations",
        blocks: [
          "When using the Service, you agree that you will:",
          {
            list: [
              "only sign documents that you are entitled to sign;",
              "sign on behalf of others only with proper authorization, and not imitate anyone else’s signature;",
              "not use the Service for fraud, forgery of documents or any other unlawful purpose;",
              "not attempt to gain unauthorized access to the Service or disrupt its operation (for example, with automated bulk requests);",
              "not share the QR code or its link with unauthorized persons — anyone who has it can send a signature to your document until the session expires (within 1 hour at most).",
            ],
          },
          "If unlawful use is suspected, the Operator may restrict access to the Service.",
        ],
      },
      {
        id: "availability",
        title: "Availability",
        blocks: [
          "The Operator strives to keep the Service running continuously, but does not guarantee uninterrupted or error-free operation. The Service may be temporarily unavailable due to maintenance, development or failures of third-party providers. The Operator may modify or discontinue the Service at any time.",
          "Check the downloaded document before using it, especially the position of the signature and the completeness of the content.",
        ],
      },
      {
        id: "liability",
        title: "Liability",
        blocks: [
          "The Service is provided free of charge on an “as is” basis. To the fullest extent permitted by law, the Operator is not liable for indirect damages, lost profits or data loss arising from the use of, or inability to use, the Service, nor for any consequences relating to the validity, legal effect or use of signed documents.",
          "This limitation of liability does not apply to liability for damage caused intentionally or through gross negligence, or for breach of contract resulting in harm to human life, physical integrity or health, and it does not affect the rights that consumers have under the law.",
        ],
      },
      {
        id: "intellectual-property",
        title: "Intellectual property",
        blocks: [
          "The software, design, logo and texts of the Service are the intellectual property of the Operator; you may not copy or distribute them beyond their intended use.",
          "The documents you open and the signatures you draw remain yours; the Operator acquires no rights to them.",
        ],
      },
      {
        id: "data-protection",
        title: "Data protection",
        blocks: ["The processing of personal data is governed by the [Privacy Policy](privacy)."],
      },
      {
        id: "complaints",
        title: "Contact and complaints",
        blocks: [
          "You can send your questions, comments and complaints to {operatorEmail}. The Operator will respond to complaints on the merits within 30 days at the latest.",
          "If you are a consumer, you may also turn to the consumer conciliation body (alternative dispute resolution body) competent for your place of residence.",
        ],
      },
      {
        id: "changes",
        title: "Changes to the terms",
        blocks: [
          "The Operator may amend these terms; amendments take effect upon publication on this page, on the effective date indicated. By continuing to use the Service, you accept the amended terms.",
        ],
      },
      {
        id: "governing-law",
        title: "Governing law",
        blocks: [
          "These terms are governed by Hungarian law. If you are a consumer, this does not deprive you of the protection afforded to you by the mandatory provisions of the law of your country of habitual residence. Without prejudice to the mandatory jurisdiction rules protecting consumers, the Hungarian courts have jurisdiction to settle disputes.",
        ],
      },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    intro:
      "This policy explains what personal data {site} processes, for what purposes and for how long, and what rights you have. In short: we do not upload your document, there is no registration and no tracking, and the signature sent from your phone is deleted automatically after one hour.",
    sections: [
      {
        id: "controller",
        title: "The data controller",
        blocks: [
          "The controller of your personal data is:",
          { operator: true },
          "For data protection questions, you can reach us at {operatorEmail}.",
        ],
      },
      {
        id: "documents",
        title: "Your documents",
        blocks: [
          "The PDF and Word documents you open are processed by your browser on your own device: opening the file, converting a Word file to PDF, placing the signature and generating the PDF to download all happen there. We do not transmit the content of the document to our server, and we do not store it.",
          "If, in a particular hosting environment, the Service uses a server-side Word converter, the Word file is sent to the server only for the duration of the conversion and is deleted immediately afterwards.",
          "The file name of the document is included in the phone signing session (see below) so that your phone can show what you are signing.",
        ],
      },
      {
        id: "session",
        title: "The phone signing session",
        blocks: [
          "When you open a document, the Service creates a session with a random identifier and displays its link as a QR code. The session stores the following data:",
          {
            list: [
              "the random identifier of the session and its expiry time;",
              "the file name of the document;",
              "whether a phone has connected;",
              "while you are drawing, the current strokes of the signature (this is the live preview on the computer);",
              "the submitted signature in vector form: the shape and color of the strokes and the time it was sent.",
            ],
          },
          "The purpose of this processing is to deliver the signature drawn on your phone to your computer. The legal basis is the provision of the Service you requested (Article 6(1)(b) GDPR).",
          "Session data is stored for no more than 1 hour and is then deleted automatically and permanently. We store only the final shape of the strokes, not how the drawing unfolded over time (speed, pressure), and we do not use the signature to identify anyone.",
        ],
      },
      {
        id: "logs",
        title: "Technical data and logs",
        blocks: [
          "As with any website, the hosting provider’s servers automatically log technical data about requests (IP address, browser type, the requested page and the time). We process this data for secure operation and troubleshooting, on the basis of legitimate interest (Article 6(1)(f) GDPR); the hosting provider retains it for a short period in accordance with its own policies.",
        ],
      },
      {
        id: "cookies",
        title: "Cookies",
        blocks: [
          "We do not use advertising or tracking cookies, and we do not use web analytics. We use a single cookie: if you choose a language, we remember your choice for 1 year in a cookie named NEXT_LOCALE, so that the site appears in the same language next time. This cookie is necessary for the operation of the Service you requested, so we do not ask for separate consent for it.",
          "We load fonts from our own server, so no external font provider receives any data about you when you open the site.",
        ],
      },
      {
        id: "processors",
        title: "Processors and data transfers",
        blocks: [
          "The data is processed on our behalf by the following processors:",
          {
            list: [
              "hosting and application server: {hosting};",
              "session database: {storage} — data storage location: {storageRegion}.",
            ],
          },
          "Both providers are US companies, so data may also be transferred outside the European Economic Area. Such transfers take place on the basis of the EU–US Data Privacy Framework and/or the standard contractual clauses adopted by the European Commission.",
          "We do not sell personal data, and we do not use it for advertising.",
        ],
      },
      {
        id: "security",
        title: "Data security",
        blocks: [
          "The site is only accessible over an encrypted (HTTPS) connection. Session identifiers are random and cannot be guessed, and the data deletes itself after one hour. Do not share the QR code or the link with others: anyone who has it can send a signature to the session until it expires.",
        ],
      },
      {
        id: "rights",
        title: "Your rights",
        blocks: [
          "Under the General Data Protection Regulation (GDPR), you have the right to:",
          {
            list: [
              "request information about the data we process about you, and access it;",
              "request the rectification of inaccurate data;",
              "request the erasure of your data or the restriction of its processing;",
              "object to processing based on legitimate interest;",
              "request your data in a portable format.",
            ],
          },
          "You can send your request to {operatorEmail}; we will respond within one month at the latest. Since there is no registration and session data is deleted within an hour, it is likely that we no longer hold any data about you by the time you make your request.",
          "If you believe that we have violated your rights, you can lodge a complaint with the Hungarian National Authority for Data Protection and Freedom of Information (Nemzeti Adatvédelmi és Információszabadság Hatóság, NAIH, 1055 Budapest, Falk Miksa utca 9–11., www.naih.hu) or with the data protection authority of your place of residence, and you may also go to court.",
        ],
      },
      {
        id: "children",
        title: "Children",
        blocks: ["The Service is not intended for children under 16, and we do not knowingly process their data."],
      },
      {
        id: "changes",
        title: "Changes",
        blocks: [
          "We may update this policy from time to time. The current version is always available on this page, together with its effective date. For matters concerning the operation of the Service, the [Terms of Service](terms) apply.",
        ],
      },
    ],
  },
};

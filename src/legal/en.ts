import type { LegalTexts } from "./types";

// English legal texts — the source for the other languages.
export const legal: LegalTexts = {
  terms: {
    title: "Terms of Service",
    intro:
      "These terms govern the use of the {site} web service ({siteUrl}, the “Service”) and the subscription to it. By using the Service or ordering the subscription, you accept these terms; if you do not agree with them, please do not use the Service.",
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
          "{site} is an online tool with which you can open a PDF or Word document, draw your handwritten signature on your phone (after scanning a QR code shown on the screen) or on your computer with a mouse, place the signature anywhere in the document and download the signed PDF.",
          "Opening documents, drawing signatures, placing them and previewing the result are free of charge. Downloading the signed PDF requires a subscription (see section 3).",
          "Documents are processed in your browser, on your own device; their content is not sent to the Operator. Details are set out in the [Privacy Policy](privacy).",
        ],
      },
      {
        id: "subscription",
        title: "Subscription and fees",
        blocks: [
          "The subscription starts with an introductory period of {days} days, the fee for which is {trial}. During this period, the Service can be used in full, without any restrictions.",
          "If you do not cancel the subscription by the end of the introductory period, from day {next} it automatically continues as a subscription with a monthly fee of {monthly}, and it renews every month until you cancel it. The monthly fee is charged at the start of each period to the payment method you provided when ordering.",
          "The total amount payable is clearly shown on the payment page before you place your order. The order is placed when you press the button indicating the obligation to pay (or the button of the selected payment method).",
          "We notify subscribers by email of any change in fees at least 30 days before the change takes effect; if you do not accept it, you can cancel your subscription before then.",
        ],
      },
      {
        id: "payment",
        title: "Payment",
        blocks: [
          "Payments are processed by Stripe Payments Europe, Ltd. (Ireland). Available payment methods depend on your device, browser and country and may include debit and credit cards, Apple Pay, Google Pay, PayPal and Link. The Operator does not see or store your card details.",
          "Stripe sends you a receipt by email for each successful payment. The invoice required by law is issued by the Operator.",
          "If a monthly charge fails, Stripe will try again within a few days; if it still fails, the subscription ends together with your download access.",
        ],
      },
      {
        id: "cancellation",
        title: "Cancellation",
        blocks: [
          "You can cancel your subscription at any time, without giving a reason, on the [My account](account) page (sign in with a code sent to you by email), in one click, on Stripe’s secure interface.",
          "Cancellation takes effect at the end of the current period: until then you keep your access, and no further charges are made. If you cancel during the introductory period, no monthly fee is charged from day {next}.",
          "The fee for a period that has already started is not refunded, except where you exercise your right of withdrawal and in other cases required by law.",
        ],
      },
      {
        id: "withdrawal",
        title: "Right of withdrawal",
        blocks: [
          "If you order the subscription as a consumer, you may withdraw from the contract within 14 days of the order without giving any reason. You can inform the Operator of your decision to withdraw by an unequivocal statement (for example by email to {operatorEmail}); you may use the model withdrawal form in Annex I(B) of Directive 2011/83/EU, but you are not obliged to.",
          "Since you expressly request the immediate start of the Service when ordering, if you withdraw you must pay a proportionate fee for the period used up to the withdrawal. We refund the remaining amount to the payment method used for the payment within 14 days of the day you inform us of your withdrawal.",
          "The right of withdrawal does not affect your option to cancel the subscription at any time (see section 5).",
        ],
      },
      {
        id: "account",
        title: "Account and sign-in",
        blocks: [
          "There is no separate registration with a password. Your account is linked to the email address you provide when paying: in the browser where you paid, you are signed in automatically, and on other devices you can sign in with a 6-digit code sent to you by email, which is valid for 10 minutes.",
          "Do not share your sign-in code with anyone. The subscription is for personal use; sharing or reselling access is not permitted.",
        ],
      },
      {
        id: "signature",
        title: "Nature and legal effect of the signature",
        blocks: [
          "A signature created with the Service is an image of your handwritten signature, placed in the document in vector form. It qualifies as a simple electronic signature within the meaning of Regulation (EU) No 910/2014 (eIDAS): it is neither an advanced nor a qualified electronic signature, and it does not identify the person signing.",
          "For certain legal declarations and documents, the law may require written form, a qualified electronic signature, witnesses or other authentication. It is your responsibility to decide whether such a signature is suitable for a given document; if in doubt, seek legal advice.",
          "The Operator is not a party to the legal relationships between you and third parties, and it does not examine the content of documents.",
        ],
      },
      {
        id: "use",
        title: "Conditions of use",
        blocks: [
          "You may use the Service only for lawful purposes and in accordance with these terms. In particular, you undertake:",
          {
            list: [
              "to sign only documents that you are entitled to sign;",
              "to sign on behalf of others only with proper authorization, and not to imitate anyone else’s signature;",
              "not to use the Service for fraud, forgery of documents or any other unlawful purpose;",
              "not to attempt to gain unauthorized access to the Service, circumvent its security or payment measures, or obstruct its operation (for example with automated mass requests);",
              "not to share the QR code and its link with unauthorized persons — anyone who knows it can send a signature to your document until the session expires (at most 1 hour).",
            ],
          },
          "If the processed documents contain other people’s personal data, you are responsible for handling that data lawfully.",
          "The Operator may restrict or terminate access in order to prevent abuse; in the event of a serious breach of these terms, the subscription may be terminated with immediate effect.",
        ],
      },
      {
        id: "ownership",
        title: "Intellectual property",
        blocks: [
          "The software, design, logo and texts of the Service are the intellectual property of the Operator; they may not be copied or distributed beyond the intended use of the Service.",
          "The Service also uses open-source components (such as Mozilla pdf.js, pdf-lib, perfect-freehand and docx-preview), which are subject to their own license terms.",
          "The documents you open and the signatures you draw remain yours; the Operator acquires no rights to them.",
        ],
      },
      {
        id: "liability",
        title: "Liability",
        blocks: [
          "The Operator does its best to ensure the continuous and correct operation of the Service, but does not guarantee that it will be available without interruption or errors. Check the downloaded document before use, especially the position of the signature and the completeness of the content, and always keep a copy of your original files.",
          "To the maximum extent permitted by law, the Operator is not liable for any indirect damage, loss of profit or data loss arising from the use of, or inability to use, the Service, nor for consequences relating to the validity, legal effect or use of the signed documents. This limitation does not apply to liability for damage caused intentionally or by gross negligence, or for breach of contract resulting in harm to life, physical integrity or health, and it does not affect the rights to which consumers are entitled by law.",
        ],
      },
      {
        id: "changes-to-service",
        title: "Availability and changes",
        blocks: [
          "The Operator is entitled to develop and modify the Service. If the Service is permanently discontinued, we will terminate the subscriptions and refund the fee for the unused period on a pro rata basis.",
        ],
      },
      {
        id: "data-protection",
        title: "Data protection",
        blocks: ["Details of the processing of personal data are set out in the [Privacy Policy](privacy)."],
      },
      {
        id: "amendments",
        title: "Amendment of the terms",
        blocks: [
          "The Operator is entitled to amend these terms. Amendments take effect upon publication on this page, on the effective date shown at the top of the document. We notify subscribers by email at least 30 days in advance of any material changes that are disadvantageous to them; if they do not accept the changes, they can cancel their subscription before the changes take effect.",
        ],
      },
      {
        id: "law",
        title: "Governing law and disputes",
        blocks: [
          "Slovak law applies to these terms. If you use the Service as a consumer, this choice of law does not deprive you of the protection afforded to you by the mandatory consumer protection rules of your country of residence.",
          "We aim to settle any disputes amicably: you can send your complaint to {operatorEmail}, and we respond within 30 days. If we reject your complaint or do not respond within 30 days, as a consumer you can initiate alternative dispute resolution with the Slovak Trade Inspection (Slovenská obchodná inšpekcia, https://www.soi.sk) or with another dispute resolution body on the list of the Slovak Ministry of Economy. You can also turn to the consumer protection authority and the courts of your place of residence.",
        ],
      },
      {
        id: "contact",
        title: "Contact",
        blocks: ["You can contact the Operator with questions, comments or complaints at the following email address: {operatorEmail}."],
      },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    intro:
      "In accordance with Regulation (EU) 2016/679 (General Data Protection Regulation, GDPR), this notice explains what personal data we process when you use {site} ({siteUrl}), for what purpose, on what legal basis and for how long, as well as what rights you have.",
    sections: [
      {
        id: "controller",
        title: "The data controller",
        blocks: [{ operator: true }, "For data protection matters, you can reach us at {operatorEmail}."],
      },
      {
        id: "summary",
        title: "In brief",
        blocks: [
          {
            list: [
              "Your documents are opened and signed by your browser, on your own device; their content never reaches us.",
              "The signature you draw on your phone travels to your computer through our server and is deleted automatically after 1 hour at the latest.",
              "There is no registration with a password. If you subscribe, we process your email address and your subscription details.",
              "Payments are processed by Stripe; we do not see or store your card details.",
              "We do not use analytics or advertising tracking. We only use cookies that are necessary for signing in, payment and your language choice.",
            ],
          },
        ],
      },
      {
        id: "documents",
        title: "Your documents",
        blocks: [
          "The PDF and Word documents you open are processed by your browser, on your own device: opening them, converting Word files to PDF, placing the signature and creating the PDF to download all happen there. We have no access to the content of your documents, and we do not store it.",
          "If, in a particular deployment, the Service uses a server-side Word converter, the Word file is on the server only for the duration of the conversion and is deleted immediately afterwards.",
          "While the payment page is open, your browser keeps the signed PDF on your own device (IndexedDB) for up to 60 minutes, so that it is not lost if a payment method redirects you to another page (such as PayPal). This file does not reach us either.",
          "The file name of the document is included in the phone signing session (see below), so that your phone can show what you are signing.",
        ],
      },
      {
        id: "session",
        title: "The phone signing session",
        blocks: [
          "When you open a document, the Service creates a session with a random identifier and shows its link as a QR code. The session stores:",
          {
            list: [
              "the random identifier of the session and its expiry time;",
              "the file name of the document;",
              "whether a phone has connected;",
              "while you draw, the current strokes of the signature (the live preview on your computer);",
              "the signature you send, in vector form: the shape of the strokes, their color and the time of sending.",
            ],
          },
          "Purpose: delivering the signature drawn on your phone to your computer. Legal basis: providing the Service at your request (Article 6(1)(b) GDPR).",
          "Duration: the session data is stored for at most 1 hour and is then deleted automatically and permanently. We only store the final shape of the strokes, not how they were drawn over time (speed, pressure), and we do not identify anyone on the basis of their signature.",
        ],
      },
      {
        id: "subscription",
        title: "Subscription and payment",
        blocks: [
          "If you subscribe, the data you enter on the payment page is processed by Stripe; what we receive is the data needed to keep a record of your subscription.",
          {
            list: [
              "Data processed: email address, the customer and subscription identifiers assigned by Stripe, the status and periods of the subscription, the amount and date of payments, the type of payment method (for example card, and its last 4 digits) and — if the payment page asks for them — the billing country and postal code.",
              "Purpose: creating and fulfilling the subscription, collecting fees, verifying access, invoicing and customer service.",
              "Legal basis: performance of a contract (Article 6(1)(b) GDPR); for keeping accounting records, a legal obligation (Article 6(1)(c) GDPR).",
              "Duration: for as long as the subscription exists; after it ends, we keep the accounting records for 10 years under section 35 of the Slovak Accounting Act (Act No. 431/2002 Coll.). We delete the other data at your request after the subscription ends.",
            ],
          },
          "Payments are processed by Stripe Payments Europe, Ltd. (1 Grand Canal Street Lower, Grand Canal Dock, Dublin, D02 H210, Ireland), which is an independent controller with regard to payment data and fraud prevention. You can find information about its data processing at https://stripe.com/privacy.",
        ],
      },
      {
        id: "sign-in",
        title: "Sign-in with an email code",
        blocks: [
          "On other devices, you can sign in with a single-use code sent to you by email.",
          {
            list: [
              "Data processed: email address, the hashed form of the sign-in code, its expiry time and the number of attempts.",
              "Purpose: signing in and protecting your account.",
              "Legal basis: performance of a contract (Article 6(1)(b) GDPR).",
              "Duration: the code is valid for 10 minutes, and we delete it immediately after use.",
            ],
          },
          "Sign-in emails are sent by Resend, Inc. (https://resend.com) as a data processor.",
        ],
      },
      {
        id: "logs",
        title: "Technical logs",
        blocks: [
          "When the site is served — as with any website — the hosting provider’s servers record technical data.",
          {
            list: [
              "Data processed: IP address, time of the request, address of the requested page, browser type and version.",
              "Purpose: the secure and uninterrupted operation of the Service, and the detection of errors and abuse.",
              "Legal basis: the Operator’s legitimate interest (Article 6(1)(f) GDPR).",
              "Duration: for a short time, in accordance with the hosting provider’s data retention rules.",
            ],
          },
        ],
      },
      {
        id: "cookies",
        title: "Cookies and local storage",
        blocks: [
          "We only use cookies that are necessary for the Service to work; these do not require consent:",
          {
            list: [
              "ds_session: keeps you signed in (180 days);",
              "ds_signed_in: tells the site that you are signed in (180 days);",
              "ds_login: the sign-in code process (10 minutes);",
              "NEXT_LOCALE: remembers the language you picked in the language switcher (1 year).",
            ],
          },
          "On the payment page, Stripe uses its own cookies to process the payment securely and to prevent fraud. We do not use analytics or advertising cookies. We load fonts from our own server, so no external font provider receives data about you.",
        ],
      },
      {
        id: "processors",
        title: "Data processors and data transfers",
        blocks: [
          "The following data processors process data on our behalf:",
          {
            list: [
              "hosting and application server: {hosting};",
              "database for the phone signing sessions: {storage} — data location: {storageRegion};",
              "sending sign-in emails: Resend, Inc., USA.",
            ],
          },
          "These providers are headquartered in the United States of America, so data may also be transferred outside the European Economic Area. Such transfers take place with appropriate safeguards (the EU–US Data Privacy Framework and/or the standard contractual clauses adopted by the European Commission).",
          "We do not share your data with any other third party, and we do not sell it.",
        ],
      },
      {
        id: "security",
        title: "Data security",
        blocks: [
          "All connections between the site and the server are encrypted (HTTPS). Sign-in cookies are signed and cannot be read by scripts. Session identifiers are random and cannot be guessed, and session data deletes itself after one hour. Do not share the QR code or its link with others: anyone who knows it can send a signature to the session until it expires.",
        ],
      },
      {
        id: "rights",
        title: "Your rights",
        blocks: [
          "Under the GDPR, you have the following rights:",
          {
            list: [
              "right to information and access (Article 15);",
              "right to rectification (Article 16);",
              "right to erasure (Article 17);",
              "right to restriction of processing (Article 18);",
              "right to data portability (Article 20);",
              "right to object to processing based on legitimate interest (Article 21).",
            ],
          },
          "You can send your request to {operatorEmail}; we respond within one month at the latest. You can also change your email address yourself on the [My account](account) page, on Stripe’s interface.",
        ],
      },
      {
        id: "remedies",
        title: "Remedies",
        blocks: [
          "If you feel that the processing of your personal data violates the law, you can lodge a complaint with the supervisory authority of the controller’s registered office, the Office for Personal Data Protection of the Slovak Republic (Úrad na ochranu osobných údajov Slovenskej republiky; Hraničná 12, 820 07 Bratislava 27; https://dataprotection.gov.sk), or with the data protection authority of your place of residence or place of work — in Hungary, for example, the Hungarian National Authority for Data Protection and Freedom of Information (Nemzeti Adatvédelmi és Információszabadság Hatóság, NAIH; 1055 Budapest, Falk Miksa utca 9–11.; https://naih.hu).",
          "If your rights are violated, you can also go to court; you may bring the action before the courts of the member state of your place of residence.",
        ],
      },
      {
        id: "children",
        title: "Children",
        blocks: ["The Service is not intended for children under 16, and we do not knowingly process their data."],
      },
      {
        id: "changes",
        title: "Changes to this notice",
        blocks: [
          "We update this notice whenever the Service changes; the effective date is shown at the top of the document. The terms of use of the Service are set out in the [Terms of Service](terms).",
        ],
      },
    ],
  },
};

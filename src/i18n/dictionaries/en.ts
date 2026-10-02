// English texts — the primary language and the source of the Dictionary type; every other language follows this structure.
// {name} placeholders are filled in by the code. { one, other } pairs are plural forms.
// [visible text](terms|privacy|account) marks an in-app link.

export const en = {
  meta: {
    title: "DoneSignIn — Sign documents from your phone with a QR code",
    description:
      "Upload a PDF or Word document, scan the QR code with your phone, sign with your finger and place the signature anywhere in the document. Try it free — download with a subscription.",
    phoneTitle: "Sign · DoneSignIn",
    accountTitle: "My account · DoneSignIn",
    thankYouTitle: "Thank you · DoneSignIn",
    notFound: "This page doesn’t exist.",
    backHome: "Back to the home page",
  },

  common: {
    close: "Close",
    cancel: "Cancel",
    undo: "Undo",
    undoShort: "Undo",
    clear: "Clear",
    home: "Home",
    language: "Language",
    unexpected: "Something went wrong. Please try again.",
  },

  ink: {
    black: "Black",
    blue: "Blue",
    thin: "Thin",
    medium: "Medium",
    bold: "Bold",
    colorGroup: "Ink color",
    widthGroup: "Line width",
  },

  pad: {
    hint: "Sign here",
    line: "Signature",
  },

  nav: {
    how: "How it works",
    pricing: "Pricing",
    privacy: "Privacy",
    badge: "Free to try · no app needed",
    terms: "Terms",
    privacyPolicy: "Privacy Policy",
    account: "My account",
    signIn: "Sign in",
  },

  hero: {
    eyebrow: "PDF · Word · QR code",
    line1: "Sign it",
    line2: "with your phone,",
    line3: "not your printer.",
    lead: "Upload your document, scan the QR code and sign with your finger. Seconds later your signature is in the PDF — exactly where you drag it.",
    trust: [
      "256-bit Encryption",
      "Files automatically deleted after 1 hour",
      "100% Private",
      "GDPR Compliant",
    ],
  },

  dropzone: {
    idle: "Drop your document here",
    over: "Let go and we’re off",
    or: "or",
    choose: "choose a file from your computer",
    wait: "Just a moment…",
    maxSize: "max. 50 MB",
    sampleQuestion: "No document at hand?",
    sampleCta: "Try it with a sample contract",
    dropAnywhere: "Drop the file",
    openingPdf: "Opening document…",
    convertingWord: "Converting Word file…",
    consent: "By using DoneSignIn, you accept the {terms} and the {privacy}.",
    consentTerms: "Terms of Service",
    consentPrivacy: "Privacy Policy",
  },

  steps: {
    eyebrow: "How it works",
    titleA: "Three steps,",
    titleB: "zero printers.",
    items: [
      {
        title: "Upload it",
        text: "Drag in a PDF or Word file. Word documents are converted to PDF automatically.",
      },
      {
        title: "Scan the QR code",
        text: "Point your phone’s camera at it. No app to install and no need to log in.",
      },
      {
        title: "Sign and place it",
        text: "Sign with your finger and watch it appear live on your computer. Drag it onto any page, then download.",
      },
    ],
  },

  pricing: {
    eyebrow: "Pricing",
    titleA: "One simple plan,",
    titleB: "cancel anytime.",
    lead: "Uploading, signing and placing your signature are free. To download the signed PDF, start with {days} days of full access for {trial} — after that it’s {monthly} a month, and you can cancel in one click.",
    plan: "Full access",
    today: "for the first {days} days",
    then: "then {monthly} / month",
    features: [
      "Unlimited signed PDF downloads",
      "Sign with your phone or with a mouse",
      "PDF and Word documents, any number of pages",
      "Cancel anytime on your account page",
    ],
    cta: "Start signing",
  },

  privacySection: {
    eyebrow: "Privacy",
    titleA: "Your document",
    titleB: "stays on your computer.",
    text: "Your browser opens and signs the document — we don’t upload it anywhere. Only the strokes of your signature arrive from your phone, and even those are deleted from the server after an hour.",
    items: [
      {
        title: "Processed locally",
        text: "Both PDF and Word files are prepared in your browser; the content of your document never reaches our server.",
      },
      {
        title: "Vector signature",
        text: "Your signature goes into the PDF as lines, so it stays sharp at any zoom level.",
      },
      {
        title: "More pages, more signatures",
        text: "Place the same signature in several spots, or on every page with a single click.",
      },
      {
        title: "No password, cancel anytime",
        text: "An email address is all you need when you subscribe — and you can cancel in one click.",
      },
    ],
  },

  footer: {
    disclaimer:
      "DoneSignIn places an image of your hand-drawn signature in the document (a simple electronic signature). It is not a qualified electronic signature and does not replace official electronic identification.",
    operatedBy: "Operated by {name}.",
    rights: "All rights reserved.",
  },

  heroVisual: {
    docType: "Services agreement",
    docTitle: "Web development work",
    partyA: "Client",
    partyB: "Contractor",
    signed: "Signed",
    scan: "Scan me",
    signFor: "Signing",
    fileName: "contract.pdf",
    send: "Send signature",
  },

  errors: {
    unknownType: "We don’t recognize this file type. Please upload a PDF or a Word document (.docx).",
    tooLarge: "The file is too large — the limit is 50 MB.",
    serverUnreachable: "We can’t reach the server to convert the file.",
    convertFailed: "We couldn’t convert the document to PDF.",
    legacyFormat: "We can’t open .{ext} files here. Save it in Word as .docx or as a PDF, then try again.",
    wordOpenFailed: "We couldn’t open the Word document. Save it as a PDF and upload that instead.",
    wordPassword: "This document is password-protected, so we can’t open it.",
    pdfPassword: "This PDF is password-protected. Open it, save it without a password, and try again.",
    pdfInvalid: "This file isn’t a valid PDF, or it’s damaged.",
    pdfOpenFailed: "We couldn’t open the PDF.",
    generic: "Something went wrong while opening the document. Please try again.",
  },

  workspace: {
    pages: { one: "{n} page", other: "{n} pages" },
    converted: "Converted from .{ext}",
    newDocument: "New document",
    download: "Download signed PDF",
    downloadShort: "Download",
    armHint: "Click where you want the signature",
    yourSignatures: "Your signatures",
    trayHint: "Drag onto the page, or click it.",
    draw: "Draw",
    withPhone: "With phone",
    drawHere: "Draw here",
    tips: "Drag a placed signature to move it, or resize it by its corner. Fine-tune with the arrow keys; {key} removes it.",
    autoPlaced: "We put the signature at the bottom of the last page — drag it wherever you need it.",
    newSignature: "New signature received — drag it onto the document.",
    exportFailed: "We couldn’t create the signed PDF.",
    confirmNew: "Open a new document? The signatures you’ve placed will be lost.",
    pageLabel: "Page {n}",
    pagesNav: "Pages",
  },

  placement: {
    label: "Placed signature — drag to move",
    resize: "Resize",
    duplicate: "Duplicate",
    allPages: "All pages",
    remove: "Delete",
    allPagesDone: "The signature was added to every page ({n} in total).",
  },

  tray: {
    emptyRow: "No signatures yet.",
    empty: "Incoming signatures will appear here.",
    drawOne: "Draw one here",
    emptySuffix: " — with a mouse or touchpad.",
    tileTitle: "Drag onto the document, or click it and then click the page",
    fromPhone: "Phone",
    drawn: "Drawn",
    remove: "Delete signature",
  },

  phonePanel: {
    eyebrow: "Sign with your phone",
    scanTitle: "Scan the code",
    drawingTitle: "Signing now…",
    connectedTitle: "Phone connected",
    expired: "The QR code has expired.",
    failed: "We couldn’t create a QR code.",
    newCode: "New code",
    step1: "Open your phone’s camera and point it at the code.",
    step2: "Tap the link that appears and sign with your finger.",
    step3: "Your signature will show up here in a few seconds.",
    drawingHint: "You can watch live as you draw on your phone. When you’re done, tap the send button.",
    connectedHint: "Sign on your phone, then tap “Send signature”.",
    showQr: "Show QR code",
    liveView: "Live view",
    copied: "Copied",
    copyLink: "Copy link",
    cantOpen: "Won’t open on your phone?",
    networkHint:
      "Your phone and computer need to be on the same Wi-Fi. If you have more than one network adapter, try a different address:",
    waiting: "Waiting for the signature…",
    live: "live",
    qrAria: "QR code for signing on your phone",
  },

  drawDialog: {
    aria: "Draw a signature",
    title: "Draw your signature",
    subtitle: "With a mouse, touchpad or pen — the line gets thinner the faster you draw.",
    add: "Add signature",
  },

  done: {
    aria: "Signed document downloaded",
    title: "Done, it’s signed!",
    downloaded: "{name} has been downloaded to your computer.",
    rasterized:
      "The original PDF was protected, so we saved its pages as images — the text can’t be selected.",
    keepEditing: "Keep editing",
    newDocument: "New document",
    again: "Didn’t start? Download again",
    seal: "SIGNED · DONESIGNIN · SIGNED · DONESIGNIN ·",
  },

  thankYou: {
    title: "Thank you!",
    lead: "Your payment was successful — your {days}-day full access is now active.",
    noFile: "You can now download your signed documents without any limits.",
    back: "Back to my document",
    next: "Sign another document",
    account: "My account",
    cancel: "You can cancel anytime on the [My account](account) page, in one click.",
  },

  cookies: {
    title: "Cookies",
    text: "We use essential cookies to keep you signed in and remember your language. With your consent, we also use advertising cookies to measure how well our ads work. [Privacy Policy](privacy)",
    accept: "Accept",
    reject: "Reject",
    settings: "Cookie settings",
  },

  phone: {
    signFor: "Signing",
    connected: "Connected",
    rotateTip: "Turn your phone sideways to get more room for your signature.",
    closeTip: "Close tip",
    sending: "Sending…",
    send: "Send signature",
    sentTitle: "Sent!",
    sentText: "Your signature has appeared on the computer. You can drag it into the document there.",
    again: "Sign again",
    failTitle: "Couldn’t send it",
    failText: "Check your internet connection and try again.",
    back: "Back",
    retry: "Try again",
    expiredTitle: "This link is no longer valid",
    expiredText:
      "The QR code has expired, or the document was closed on the computer. Get a new code there and scan it again.",
    consent: "By sending, you accept the {terms} and the {privacy}.",
  },

  paywall: {
    label: "Download and payment",
    expires: "For your privacy, the signed file is kept on this device for:",
    expired: "The signed file is no longer kept on this device. Download it again from the editor.",
    ready: "Your signed PDF is ready",
    title: "Download it now.",
    includes: "{days} days of full access include:",
    features: [
      "Unlimited signed PDF downloads",
      "Sign with your phone or with a mouse",
      "PDF and Word documents, any number of pages",
      "Your documents never leave your device",
    ],
    priceLabel: "Payment",
    email: "Your email address",
    emailHint: "You can use it to sign in on other devices later.",
    emailPlaceholder: "name@example.com",
    methods: "Choose a payment method",
    pay: "Order with obligation to pay · {amount}",
    consent:
      "I accept the [Terms of Service](terms) and the [Privacy Policy](privacy), and I request that the service start immediately.",
    consentNeeded: "To pay, please tick the box above.",
    renewal:
      "If you don’t cancel within the first {days} days, your subscription continues from day {next} at {monthly} a month. You can cancel anytime on the [My account](account) page, in one click. If you withdraw within the 14-day withdrawal period, you pay a proportionate amount for the period already used.",
    ssl: "256-bit SSL",
    stripe: "Payments by Stripe",
    cancelAnytime: "Cancel anytime",
    loading: "Loading payment…",
    processing: "Processing payment…",
    success: "Payment successful! Your download is starting.",
    haveAccount: "Already a subscriber?",
    login: "Sign in",
    backToPay: "Back to payment",
    notConfigured: "Payments aren’t set up on this server yet.",
    returning: "Checking your payment…",
  },

  auth: {
    title: "Sign in",
    intro: "Enter the email address linked to your subscription, and we’ll send you a 6-digit sign-in code.",
    email: "Email address",
    sendCode: "Send code",
    sent: "If there’s a subscription linked to {email}, we’ve sent the code there. Check your spam folder too.",
    code: "Sign-in code",
    verify: "Sign in",
    resend: "Request a new code",
    otherEmail: "Use a different email address",
    success: "You’re signed in.",
  },

  account: {
    title: "My account",
    signedInAs: "Signed in as {email}",
    trial: "Trial period, ends on {date}. If you don’t cancel, it continues at {monthly}/month.",
    active: "Active subscription. Next charge: {date} ({monthly}).",
    canceling: "Cancelled. You have access until {date}.",
    pastDue: "The last charge failed. Update your card so your access isn’t interrupted.",
    none: "You don’t have an active subscription. Sign a document, and you can start one when you download it.",
    manage: "Manage or cancel subscription",
    manageHint: "On Stripe’s secure page, you can cancel your subscription, change your card and see your past charges.",
    start: "Sign a document",
    logout: "Sign out",
    loading: "Loading…",
    error: "We couldn’t load your account details. Please try again later.",
  },

  server: {
    invalidEmail: "Enter a valid email address.",
    rateLimited: "Too many attempts. Wait a few minutes and try again.",
    billingUnavailable: "The payment service is currently unavailable. Try again later.",
    checkoutFailed: "The payment couldn’t be started. Try again.",
    alreadySubscribed:
      "This email address already has an active subscription. Sign in with the code we send you by email.",
    paymentIncomplete: "The payment wasn’t completed.",
    notSignedIn: "You need to sign in to do this.",
    codeInvalid: "Wrong code. Check it and try again.",
    codeExpired: "The code has expired. Request a new one.",
    codeLocked: "Too many wrong attempts. Request a new code.",
    emailFailed: "The email couldn’t be sent. Try again later.",
    unexpected: "Something went wrong. Please try again.",
  },

  email: {
    subject: "{code} – your sign-in code ({site})",
    intro: "Use this code to sign in to {site}:",
    validity: "The code is valid for {minutes} minutes.",
    ignore: "If you didn’t request this, you can safely ignore this email.",
  },

  files: {
    signedSuffix: "signed",
    sampleName: "sample-contract.pdf",
  },

  legal: {
    backHome: "Back to DoneSignIn",
    effective: "Effective: {date}",
    contents: "Contents",
    alsoSee: "See also:",
    toBeCompleted: "to be completed",
    operatorLabels: {
      name: "Operator",
      address: "Registered office",
      email: "Email",
      taxId: "Tax number",
      registration: "Registration",
      hosting: "Hosting provider",
    },
  },
};

export type Dictionary = typeof en;

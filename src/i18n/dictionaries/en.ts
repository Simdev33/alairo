import type { Dictionary } from "./hu";

export const en: Dictionary = {
  meta: {
    title: "Kézjegy — Sign from your phone with a QR code",
    description:
      "Upload a PDF or Word document, scan the QR code with your phone, sign with your finger and place the signature in the document. Free, no sign-up needed.",
    phoneTitle: "Sign · Kézjegy",
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
    privacy: "Privacy",
    badge: "Free · no sign-up",
    terms: "Terms",
    privacyPolicy: "Privacy Policy",
  },

  hero: {
    eyebrow: "PDF · Word · QR code",
    line1: "Sign it",
    line2: "with your phone,",
    line3: "not your printer.",
    lead: "Upload your document, scan the QR code and sign with your finger. Seconds later your signature is in the PDF — exactly where you drag it.",
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
    consent: "By using Kézjegy, you accept the {terms} and the {privacy}.",
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
        title: "No account, no subscription",
        text: "We don’t ask for your email address, and there’s nothing to install.",
      },
    ],
  },

  footer: {
    disclaimer:
      "Kézjegy places an image of your hand-drawn signature in the document (a simple electronic signature). It is not a qualified electronic signature and does not replace official electronic identification.",
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
    seal: "SIGNED · KÉZJEGY · SIGNED · KÉZJEGY ·",
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

  files: {
    signedSuffix: "signed",
    sampleName: "sample-contract.pdf",
  },

  legal: {
    backHome: "Back to Kézjegy",
    effective: "Effective: {date}",
    contents: "Contents",
    alsoSee: "See also:",
    operatorLabels: {
      name: "Operator",
      address: "Registered office",
      email: "Email",
      taxId: "Tax number",
      registration: "Registration number",
      hosting: "Hosting provider",
    },
  },
};

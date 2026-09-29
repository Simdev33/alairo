import type { Dictionary } from "./hu";

export const de: Dictionary = {
  meta: {
    title: "Kézjegy — Unterschreiben per Handy, mit einem QR-Code",
    description:
      "Lade dein PDF oder Word-Dokument hoch, scanne den QR-Code mit dem Handy, unterschreibe mit dem Finger und platziere die Unterschrift im Dokument. Kostenlos, ohne Registrierung.",
    phoneTitle: "Unterschrift · Kézjegy",
    notFound: "Diese Seite gibt es nicht.",
    backHome: "Zurück zur Startseite",
  },

  common: {
    close: "Schließen",
    cancel: "Abbrechen",
    undo: "Rückgängig",
    undoShort: "Zurück",
    clear: "Löschen",
    home: "Startseite",
    language: "Sprache",
  },

  ink: {
    black: "Schwarz",
    blue: "Blau",
    thin: "Dünn",
    medium: "Mittel",
    bold: "Dick",
    colorGroup: "Tintenfarbe",
    widthGroup: "Strichstärke",
  },

  pad: {
    hint: "Hier unterschreiben",
    line: "Unterschrift",
  },

  nav: {
    how: "So funktioniert’s",
    privacy: "Datenschutz",
    badge: "Kostenlos · ohne Registrierung",
    terms: "AGB",
    privacyPolicy: "Datenschutzerklärung",
  },

  hero: {
    eyebrow: "PDF · Word · QR-Code",
    line1: "Unterschreib’s",
    line2: "mit dem Handy,",
    line3: "ohne Drucker.",
    lead: "Lade das Dokument hoch, scanne den QR-Code und unterschreibe mit dem Finger. Ein paar Sekunden später ist die Unterschrift im PDF — genau dort, wo du sie hinziehst.",
  },

  dropzone: {
    idle: "Dokument hierher ziehen",
    over: "Loslassen, und los geht’s",
    or: "oder",
    choose: "wähle eine Datei auf deinem Computer",
    wait: "Einen Moment…",
    maxSize: "max. 50 MB",
    sampleQuestion: "Kein Dokument zur Hand?",
    sampleCta: "Probier’s mit einem Mustervertrag",
    dropAnywhere: "Datei loslassen",
    openingPdf: "Dokument wird geöffnet…",
    convertingWord: "Word-Datei wird umgewandelt…",
    consent: "Mit der Nutzung akzeptierst du die {terms} und die {privacy}.",
    consentTerms: "AGB",
    consentPrivacy: "Datenschutzerklärung",
  },

  steps: {
    eyebrow: "So funktioniert’s",
    titleA: "Drei Schritte,",
    titleB: "null Drucker.",
    items: [
      {
        title: "Hochladen",
        text: "Zieh das PDF oder die Word-Datei hinein. Word-Dokumente wandeln wir automatisch in PDF um.",
      },
      {
        title: "QR-Code scannen",
        text: "Richte die Handykamera darauf. Du musst keine App installieren und dich nirgends anmelden.",
      },
      {
        title: "Unterschreiben, platzieren",
        text: "Du unterschreibst mit dem Finger, die Unterschrift erscheint live am Computer. Zieh sie auf eine beliebige Seite und lade das PDF herunter.",
      },
    ],
  },

  privacySection: {
    eyebrow: "Datenschutz",
    titleA: "Dein Dokument",
    titleB: "bleibt auf deinem Rechner.",
    text: "Dein Browser öffnet und unterschreibt das Dokument — wir laden es nirgendwohin hoch. Vom Handy kommen nur die Linien der Unterschrift an, und auch die werden nach einer Stunde vom Server gelöscht.",
    items: [
      {
        title: "Lokal verarbeitet",
        text: "PDF und Word-Datei werden in deinem Browser verarbeitet, der Inhalt des Dokuments gelangt nicht auf unseren Server.",
      },
      {
        title: "Vektor-Unterschrift",
        text: "Die Unterschrift kommt als Linien ins PDF und bleibt so bei jeder Vergrößerung gestochen scharf.",
      },
      {
        title: "Mehrere Seiten, mehrere Unterschriften",
        text: "Setze dieselbe Unterschrift an mehrere Stellen oder mit einem Klick auf jede Seite.",
      },
      {
        title: "Kein Konto, kein Abo",
        text: "Wir fragen nicht nach deiner E-Mail-Adresse, und du musst nichts installieren.",
      },
    ],
  },

  footer: {
    disclaimer:
      "Kézjegy platziert ein Bild deiner von Hand gezeichneten Unterschrift im Dokument (einfache elektronische Signatur). Das ist keine qualifizierte elektronische Signatur und ersetzt keine amtliche elektronische Identifizierung.",
    rights: "Alle Rechte vorbehalten.",
  },

  heroVisual: {
    docType: "Dienstleistungsvertrag",
    docTitle: "Webentwicklung",
    partyA: "Auftraggeber",
    partyB: "Auftragnehmer",
    signed: "Unterschrieben",
    scan: "Scannen",
    signFor: "Unterschrift für",
    fileName: "vertrag.pdf",
    send: "Unterschrift senden",
  },

  errors: {
    unknownType: "Diesen Dateityp kennen wir nicht. Lade ein PDF oder ein Word-Dokument (.docx) hoch.",
    tooLarge: "Die Datei ist zu groß — maximal 50 MB sind erlaubt.",
    serverUnreachable: "Der Server für die Umwandlung ist nicht erreichbar.",
    convertFailed: "Das Dokument konnte nicht in PDF umgewandelt werden.",
    legacyFormat: "Das Format .{ext} können wir hier nicht öffnen. Speichere die Datei in Word als .docx oder PDF und versuch es noch einmal.",
    wordOpenFailed: "Das Word-Dokument ließ sich nicht öffnen. Speichere es als PDF und lade dieses hoch.",
    wordPassword: "Dieses Dokument ist passwortgeschützt, daher können wir es nicht öffnen.",
    pdfPassword: "Dieses PDF ist passwortgeschützt. Öffne es, speichere es ohne Passwort und versuch es noch einmal.",
    pdfInvalid: "Diese Datei ist kein gültiges PDF oder sie ist beschädigt.",
    pdfOpenFailed: "Das PDF ließ sich nicht öffnen.",
    generic: "Beim Öffnen des Dokuments ist etwas schiefgelaufen. Versuch es noch einmal.",
  },

  workspace: {
    pages: { one: "{n} Seite", other: "{n} Seiten" },
    converted: "aus .{ext} umgewandelt",
    newDocument: "Neues Dokument",
    download: "Signiertes PDF herunterladen",
    downloadShort: "Download",
    armHint: "Klicke dorthin, wo die Unterschrift hin soll",
    yourSignatures: "Deine Unterschriften",
    trayHint: "Auf die Seite ziehen oder anklicken.",
    draw: "Zeichnen",
    withPhone: "Per Handy",
    drawHere: "Hier zeichnen",
    tips: "Eine platzierte Unterschrift verschiebst du durch Ziehen, an der Ecke änderst du ihre Größe. Mit den Pfeiltasten richtest du sie fein aus, die {key}-Taste löscht sie.",
    autoPlaced: "Wir haben die Unterschrift unten auf die letzte Seite gesetzt — zieh sie dorthin, wo sie hingehört.",
    newSignature: "Neue Unterschrift angekommen — zieh sie aufs Dokument.",
    exportFailed: "Das signierte PDF konnte nicht erstellt werden.",
    confirmNew: "Wirklich ein neues Dokument öffnen? Die platzierten Unterschriften gehen dabei verloren.",
    pageLabel: "Seite {n}",
    pagesNav: "Seiten",
  },

  placement: {
    label: "Platzierte Unterschrift — zum Verschieben ziehen",
    resize: "Größe ändern",
    duplicate: "Duplizieren",
    allPages: "Auf alle Seiten",
    remove: "Löschen",
    allPagesDone: "Die Unterschrift steht jetzt auf allen Seiten ({n} Seiten).",
  },

  tray: {
    emptyRow: "Noch keine Unterschrift.",
    empty: "Hier erscheinen die eingehenden Unterschriften.",
    drawOne: "Zeichne hier eine",
    emptySuffix: " — mit Maus oder Touchpad.",
    tileTitle: "Aufs Dokument ziehen, oder anklicken und dann auf die Seite klicken",
    fromPhone: "Handy",
    drawn: "Gezeichnet",
    remove: "Unterschrift löschen",
  },

  phonePanel: {
    eyebrow: "Per Handy unterschreiben",
    scanTitle: "Scanne den Code",
    drawingTitle: "Du unterschreibst gerade…",
    connectedTitle: "Handy verbunden",
    expired: "Der QR-Code ist abgelaufen.",
    failed: "Der QR-Code konnte nicht erstellt werden.",
    newCode: "Neuer Code",
    step1: "Öffne die Kamera deines Handys und richte sie auf den Code.",
    step2: "Tippe auf den angezeigten Link und unterschreibe mit dem Finger.",
    step3: "Nach ein paar Sekunden erscheint die Unterschrift hier.",
    drawingHint: "Du siehst live, wie du auf dem Handy zeichnest. Wenn du fertig bist, tippe auf Senden.",
    connectedHint: "Unterschreibe auf dem Handy und tippe auf „Unterschrift senden“.",
    showQr: "QR-Code zeigen",
    liveView: "Live-Ansicht",
    copied: "Kopiert",
    copyLink: "Link kopieren",
    cantOpen: "Öffnet sich nicht auf dem Handy?",
    networkHint: "Handy und Computer müssen im selben WLAN sein. Wenn du mehrere Netzwerkkarten hast, probier eine andere Adresse:",
    waiting: "Warte auf die Unterschrift…",
    live: "live",
    qrAria: "QR-Code zum Unterschreiben per Handy",
  },

  drawDialog: {
    aria: "Unterschrift zeichnen",
    title: "Zeichne deine Unterschrift",
    subtitle: "Mit Maus, Touchpad oder Stift — je nach Tempo wird die Linie dünner.",
    add: "Unterschrift hinzufügen",
  },

  done: {
    aria: "Signiertes Dokument heruntergeladen",
    title: "Fertig, unterschrieben!",
    downloaded: "{name} wurde auf deinen Computer heruntergeladen.",
    rasterized: "Das Original-PDF war geschützt, deshalb haben wir die Seiten als Bilder gespeichert — der Text lässt sich so nicht markieren.",
    keepEditing: "Weiter bearbeiten",
    newDocument: "Neues Dokument",
    again: "Nicht gestartet? Erneut herunterladen",
    seal: "SIGNIERT · KÉZJEGY · SIGNIERT · KÉZJEGY ·",
  },

  phone: {
    signFor: "Unterschrift für",
    connected: "Verbunden",
    rotateTip: "Dreh das Handy quer, dann hast du mehr Platz für die Unterschrift.",
    closeTip: "Tipp schließen",
    sending: "Wird gesendet…",
    send: "Unterschrift senden",
    sentTitle: "Gesendet!",
    sentText: "Deine Unterschrift ist auf dem Computer angekommen. Dort kannst du sie ins Dokument ziehen.",
    again: "Noch eine Unterschrift",
    failTitle: "Senden fehlgeschlagen",
    failText: "Prüfe deine Internetverbindung und versuch es noch einmal.",
    back: "Zurück",
    retry: "Erneut versuchen",
    expiredTitle: "Dieser Link ist nicht mehr gültig",
    expiredText: "Der QR-Code ist abgelaufen oder das Dokument wurde am Computer geschlossen. Fordere dort einen neuen Code an und scanne ihn erneut.",
    consent: "Mit dem Senden akzeptierst du die {terms} und die {privacy}.",
  },

  files: {
    signedSuffix: "unterschrieben",
    sampleName: "mustervertrag.pdf",
  },

  legal: {
    backHome: "Zurück zu Kézjegy",
    effective: "Gültig ab: {date}",
    contents: "Inhalt",
    alsoSee: "Siehe auch:",
    operatorLabels: {
      name: "Betreiber",
      address: "Sitz",
      email: "E-Mail",
      taxId: "Steuernummer",
      registration: "Registernummer",
      hosting: "Hosting-Anbieter",
    },
  },
};

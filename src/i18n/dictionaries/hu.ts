// Magyar szövegek — ez a forrás, a többi nyelv ugyanezt a szerkezetet követi (Dictionary típus).
// {név} alakú helyőrzők: a kód tölti ki. A { one, other } párok többes számot jelölnek.

export const hu = {
  meta: {
    title: "Kézjegy — Aláírás telefonról, egy QR-kóddal",
    description:
      "Töltsd fel a PDF-et vagy Word-dokumentumot, olvasd be a QR-kódot a telefonoddal, írd alá az ujjaddal, és helyezd el az aláírást a dokumentumban. Ingyenes, regisztráció nélkül.",
    phoneTitle: "Aláírás · Kézjegy",
    notFound: "Ez az oldal nem létezik.",
    backHome: "Vissza a főoldalra",
  },

  common: {
    close: "Bezárás",
    cancel: "Mégse",
    undo: "Visszavonás",
    undoShort: "Vissza",
    clear: "Törlés",
    home: "Kezdőlap",
    language: "Nyelv",
  },

  ink: {
    black: "Fekete",
    blue: "Kék",
    thin: "Vékony",
    medium: "Közepes",
    bold: "Vastag",
    colorGroup: "Tinta színe",
    widthGroup: "Vonalvastagság",
  },

  pad: {
    hint: "Írd alá itt",
    line: "Aláírás",
  },

  nav: {
    how: "Hogyan működik",
    privacy: "Adatvédelem",
    badge: "Ingyenes · regisztráció nélkül",
    terms: "ÁSZF",
    privacyPolicy: "Adatvédelmi tájékoztató",
  },

  hero: {
    eyebrow: "PDF · Word · QR-kód",
    line1: "Írd alá",
    line2: "a telefonoddal,",
    line3: "ne a nyomtatóval.",
    lead: "Töltsd fel a dokumentumot, olvasd be a QR-kódot, és írd alá az ujjaddal. Az aláírás pár másodperc múlva már a PDF-ben van — pontosan ott, ahová húzod.",
  },

  dropzone: {
    idle: "Húzd ide a dokumentumot",
    over: "Engedd el, és kezdhetjük",
    or: "vagy",
    choose: "válassz fájlt a gépedről",
    wait: "Egy pillanat…",
    maxSize: "max. 50 MB",
    sampleQuestion: "Nincs kéznél dokumentum?",
    sampleCta: "Próbáld ki egy minta-szerződéssel",
    dropAnywhere: "Engedd el a fájlt",
    openingPdf: "Dokumentum megnyitása…",
    convertingWord: "Word-fájl átalakítása…",
    consent: "A használattal elfogadod az {terms} és az {privacy}.",
    consentTerms: "ÁSZF-et",
    consentPrivacy: "adatvédelmi tájékoztatót",
  },

  steps: {
    eyebrow: "Hogyan működik",
    titleA: "Három lépés,",
    titleB: "nulla nyomtató.",
    items: [
      {
        title: "Töltsd fel",
        text: "Húzd be a PDF-et vagy a Word-fájlt. A Word-dokumentumot automatikusan PDF-fé alakítjuk.",
      },
      {
        title: "Olvasd be a QR-kódot",
        text: "Irányítsd rá a telefon kameráját. Nem kell alkalmazást telepíteni, és be sem kell jelentkezni.",
      },
      {
        title: "Írd alá, húzd a helyére",
        text: "Az ujjaddal aláírsz, az aláírás élőben megjelenik a gépen. Húzd bármelyik oldalra, és töltsd le.",
      },
    ],
  },

  privacySection: {
    eyebrow: "Adatvédelem",
    titleA: "A dokumentumod",
    titleB: "a te gépeden marad.",
    text: "A dokumentumot a böngésződ nyitja meg és írja alá — nem töltjük fel sehová. A telefonról csak az aláírás vonalai érkeznek meg, és egy óra múlva azok is törlődnek a szerverről.",
    items: [
      {
        title: "Helyben feldolgozva",
        text: "A PDF és a Word-fájl is a böngésződben készül el, a dokumentum tartalma nem kerül a szerverünkre.",
      },
      {
        title: "Vektoros aláírás",
        text: "Az aláírás vonalként kerül a PDF-be, így bármekkora nagyításban éles marad.",
      },
      {
        title: "Több oldal, több aláírás",
        text: "Tedd ugyanazt az aláírást több helyre, vagy egy kattintással minden oldalra.",
      },
      {
        title: "Nincs fiók, nincs előfizetés",
        text: "Nem kérünk e-mail-címet, és nem kell semmit telepíteni.",
      },
    ],
  },

  footer: {
    disclaimer:
      "A Kézjegy a kézzel rajzolt aláírásod képét helyezi el a dokumentumban (egyszerű elektronikus aláírás). Nem minősített elektronikus aláírás, és nem helyettesíti a hivatalos elektronikus azonosítást.",
    rights: "Minden jog fenntartva.",
  },

  heroVisual: {
    docType: "Megbízási szerződés",
    docTitle: "Webfejlesztési munkák",
    partyA: "Megbízó",
    partyB: "Megbízott",
    signed: "Aláírva",
    scan: "Olvasd be",
    signFor: "Aláírás ehhez",
    fileName: "szerzodes.pdf",
    send: "Aláírás elküldése",
  },

  errors: {
    unknownType: "Ezt a fájltípust nem ismerjük. PDF-et vagy Word-dokumentumot (.docx) tölts fel.",
    tooLarge: "A fájl túl nagy — legfeljebb 50 MB lehet.",
    serverUnreachable: "Nem érjük el a szervert az átalakításhoz.",
    convertFailed: "Nem sikerült PDF-fé alakítani a dokumentumot.",
    legacyFormat: "A .{ext} formátumot itt nem tudjuk megnyitni. Mentsd el a Wordben .docx-ként vagy PDF-ként, és próbáld újra.",
    wordOpenFailed: "Nem sikerült megnyitni a Word-dokumentumot. Mentsd el PDF-ként, és azt töltsd fel.",
    wordPassword: "Ez a dokumentum jelszóval védett, így nem tudjuk megnyitni.",
    pdfPassword: "Ez a PDF jelszóval védett. Nyisd meg, mentsd el jelszó nélkül, és próbáld újra.",
    pdfInvalid: "Ez a fájl nem érvényes PDF, vagy megsérült.",
    pdfOpenFailed: "Nem sikerült megnyitni a PDF-et.",
    generic: "Valami elromlott a dokumentum megnyitásakor. Próbáld újra.",
  },

  workspace: {
    pages: { one: "{n} oldal", other: "{n} oldal" },
    converted: ".{ext} fájlból átalakítva",
    newDocument: "Új dokumentum",
    download: "Aláírt PDF letöltése",
    downloadShort: "Letöltés",
    armHint: "Kattints oda, ahová az aláírást szeretnéd",
    yourSignatures: "Aláírásaid",
    trayHint: "Húzd az oldalra, vagy kattints rá.",
    draw: "Rajzolás",
    withPhone: "Telefonnal",
    drawHere: "Rajzolás itt",
    tips: "Az elhelyezett aláírást húzással mozgathatod, a sarkánál átméretezheted. Nyilakkal finoman igazíthatsz, a {key} billentyű törli.",
    autoPlaced: "Az aláírást az utolsó oldal aljára tettük — húzd oda, ahová kell.",
    newSignature: "Új aláírás érkezett — húzd a dokumentumra.",
    exportFailed: "Nem sikerült elkészíteni az aláírt PDF-et.",
    confirmNew: "Biztosan új dokumentumot nyitsz? Az elhelyezett aláírások elvesznek.",
    pageLabel: "{n}. oldal",
    pagesNav: "Oldalak",
  },

  placement: {
    label: "Elhelyezett aláírás — húzd a mozgatáshoz",
    resize: "Átméretezés",
    duplicate: "Másolat",
    allPages: "Minden oldalra",
    remove: "Törlés",
    allPagesDone: "Az aláírás minden oldalra felkerült ({n} oldal).",
  },

  tray: {
    emptyRow: "Még nincs aláírás.",
    empty: "Itt jelennek meg a beérkező aláírások.",
    drawOne: "Rajzolj egyet itt",
    emptySuffix: " — egérrel vagy érintőpaddal.",
    tileTitle: "Húzd a dokumentumra, vagy kattints rá, majd kattints az oldalra",
    fromPhone: "Telefon",
    drawn: "Rajzolt",
    remove: "Aláírás törlése",
  },

  phonePanel: {
    eyebrow: "Aláírás telefonnal",
    scanTitle: "Olvasd be a kódot",
    drawingTitle: "Most írod alá…",
    connectedTitle: "Telefon kapcsolódva",
    expired: "A QR-kód lejárt.",
    failed: "Nem sikerült QR-kódot készíteni.",
    newCode: "Új kód",
    step1: "Nyisd meg a telefon kameráját, és irányítsd a kódra.",
    step2: "Koppints a megjelenő linkre, és írd alá az ujjaddal.",
    step3: "Az aláírás pár másodperc múlva itt jelenik meg.",
    drawingHint: "Élőben látod, ahogy a telefonon rajzolsz. Ha kész, nyomd meg a küldés gombot.",
    connectedHint: "Írd alá a telefonon, és nyomd meg az „Aláírás elküldése” gombot.",
    showQr: "QR-kód újra",
    liveView: "Élő nézet",
    copied: "Másolva",
    copyLink: "Link másolása",
    cantOpen: "Nem nyílik meg a telefonon?",
    networkHint: "A telefon és a gép legyen ugyanazon a Wi-Fi-n. Ha több hálózati kártyád van, próbálj másik címet:",
    waiting: "Várjuk az aláírást…",
    live: "élő",
    qrAria: "QR-kód a telefonos aláíráshoz",
  },

  drawDialog: {
    aria: "Aláírás rajzolása",
    title: "Rajzold meg az aláírásod",
    subtitle: "Egérrel, érintőpaddal vagy tollal — a vonal a sebességtől függően vékonyodik.",
    add: "Aláírás hozzáadása",
  },

  done: {
    aria: "Aláírt dokumentum letöltve",
    title: "Kész, aláírva!",
    downloaded: "A {name} letöltődött a gépedre.",
    rasterized: "Az eredeti PDF védett volt, ezért az oldalakat képként mentettük — a szöveg így nem kijelölhető.",
    keepEditing: "Tovább szerkesztem",
    newDocument: "Új dokumentum",
    again: "Nem indult el? Letöltés újra",
    seal: "ALÁÍRVA · KÉZJEGY · ALÁÍRVA · KÉZJEGY ·",
  },

  phone: {
    signFor: "Aláírás ehhez",
    connected: "Kapcsolódva",
    rotateTip: "Fordítsd el a telefont, így nagyobb helyed lesz az aláíráshoz.",
    closeTip: "Tipp bezárása",
    sending: "Küldés…",
    send: "Aláírás elküldése",
    sentTitle: "Elküldve!",
    sentText: "Az aláírásod megjelent a számítógépen. Ott tudod a dokumentumba húzni.",
    again: "Újabb aláírás",
    failTitle: "Nem sikerült elküldeni",
    failText: "Ellenőrizd az internetkapcsolatot, és próbáld újra.",
    back: "Vissza",
    retry: "Újrapróbálom",
    expiredTitle: "Ez a link már nem érvényes",
    expiredText: "A QR-kód lejárt, vagy a dokumentumot bezárták a számítógépen. Kérj új kódot ott, és olvasd be újra.",
    consent: "A küldéssel elfogadod az {terms} és az {privacy}.",
  },

  files: {
    signedSuffix: "alairt",
    sampleName: "minta-szerzodes.pdf",
  },

  legal: {
    backHome: "Vissza a Kézjegyre",
    effective: "Hatályos: {date}",
    contents: "Tartalom",
    alsoSee: "Lásd még:",
    operatorLabels: {
      name: "Üzemeltető",
      address: "Székhely",
      email: "E-mail",
      taxId: "Adószám",
      registration: "Nyilvántartási szám",
      hosting: "Tárhelyszolgáltató",
    },
  },
};

export type Dictionary = typeof hu;

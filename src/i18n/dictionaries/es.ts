import type { Dictionary } from "./hu";

export const es: Dictionary = {
  meta: {
    title: "Kézjegy — Firma desde el teléfono con un código QR",
    description:
      "Sube tu PDF o documento de Word, escanea el código QR con el teléfono, firma con el dedo y coloca la firma en el documento. Gratis y sin registro.",
    phoneTitle: "Firmar · Kézjegy",
    notFound: "Esta página no existe.",
    backHome: "Volver al inicio",
  },

  common: {
    close: "Cerrar",
    cancel: "Cancelar",
    undo: "Deshacer",
    undoShort: "Deshacer",
    clear: "Borrar",
    home: "Inicio",
    language: "Idioma",
  },

  ink: {
    black: "Negro",
    blue: "Azul",
    thin: "Fino",
    medium: "Medio",
    bold: "Grueso",
    colorGroup: "Color de la tinta",
    widthGroup: "Grosor del trazo",
  },

  pad: {
    hint: "Firma aquí",
    line: "Firma",
  },

  nav: {
    how: "Cómo funciona",
    privacy: "Privacidad",
    badge: "Gratis · sin registro",
    terms: "Términos",
    privacyPolicy: "Política de privacidad",
  },

  hero: {
    eyebrow: "PDF · Word · Código QR",
    line1: "Fírmalo",
    line2: "con tu teléfono,",
    line3: "no con la impresora.",
    lead: "Sube el documento, escanea el código QR y firma con el dedo. En unos segundos la firma ya está en el PDF, justo donde la arrastres.",
  },

  dropzone: {
    idle: "Arrastra aquí tu documento",
    over: "Suéltalo y empezamos",
    or: "o",
    choose: "elige un archivo de tu equipo",
    wait: "Un momento…",
    maxSize: "máx. 50 MB",
    sampleQuestion: "¿No tienes un documento a mano?",
    sampleCta: "Pruébalo con un contrato de ejemplo",
    dropAnywhere: "Suelta el archivo",
    openingPdf: "Abriendo el documento…",
    convertingWord: "Convirtiendo el archivo de Word…",
    consent: "Al usar Kézjegy, aceptas los {terms} y la {privacy}.",
    consentTerms: "términos y condiciones",
    consentPrivacy: "política de privacidad",
  },

  steps: {
    eyebrow: "Cómo funciona",
    titleA: "Tres pasos,",
    titleB: "cero impresoras.",
    items: [
      {
        title: "Súbelo",
        text: "Arrastra el PDF o el archivo de Word. Los documentos de Word los convertimos a PDF automáticamente.",
      },
      {
        title: "Escanea el código QR",
        text: "Apunta al código con la cámara del teléfono. No hace falta instalar ninguna app ni iniciar sesión.",
      },
      {
        title: "Firma y colócala",
        text: "Firmas con el dedo y la firma aparece al instante en tu equipo. Arrástrala a cualquier página y descarga el PDF.",
      },
    ],
  },

  privacySection: {
    eyebrow: "Privacidad",
    titleA: "Tu documento",
    titleB: "se queda en tu equipo.",
    text: "Tu navegador abre y firma el documento: no lo subimos a ningún sitio. Del teléfono solo llegan los trazos de la firma, y al cabo de una hora también se borran del servidor.",
    items: [
      {
        title: "Procesado en local",
        text: "Tanto el PDF como el archivo de Word se preparan en tu navegador; el contenido del documento no llega a nuestro servidor.",
      },
      {
        title: "Firma vectorial",
        text: "La firma entra en el PDF como trazos, así que se ve nítida con cualquier nivel de zoom.",
      },
      {
        title: "Varias páginas, varias firmas",
        text: "Pon la misma firma en varios sitios, o en todas las páginas con un solo clic.",
      },
      {
        title: "Sin cuenta ni suscripción",
        text: "No te pedimos el correo electrónico ni tienes que instalar nada.",
      },
    ],
  },

  footer: {
    disclaimer:
      "Kézjegy coloca en el documento la imagen de la firma que dibujas a mano (firma electrónica simple). No es una firma electrónica cualificada ni sustituye a la identificación electrónica oficial.",
    rights: "Todos los derechos reservados.",
  },

  heroVisual: {
    docType: "Contrato de servicios",
    docTitle: "Trabajos de desarrollo web",
    partyA: "Cliente",
    partyB: "Proveedor",
    signed: "Firmado",
    scan: "Escanea",
    signFor: "Vas a firmar",
    fileName: "contrato.pdf",
    send: "Enviar firma",
  },

  errors: {
    unknownType: "No reconocemos este tipo de archivo. Sube un PDF o un documento de Word (.docx).",
    tooLarge: "El archivo es demasiado grande: el máximo es de 50 MB.",
    serverUnreachable: "No podemos conectar con el servidor para la conversión.",
    convertFailed: "No se pudo convertir el documento a PDF.",
    legacyFormat: "Aquí no podemos abrir el formato .{ext}. Guárdalo en Word como .docx o como PDF y vuelve a intentarlo.",
    wordOpenFailed: "No se pudo abrir el documento de Word. Guárdalo como PDF y sube ese archivo.",
    wordPassword: "Este documento está protegido con contraseña, así que no podemos abrirlo.",
    pdfPassword: "Este PDF está protegido con contraseña. Ábrelo, guárdalo sin contraseña y vuelve a intentarlo.",
    pdfInvalid: "Este archivo no es un PDF válido o está dañado.",
    pdfOpenFailed: "No se pudo abrir el PDF.",
    generic: "Algo falló al abrir el documento. Vuelve a intentarlo.",
  },

  workspace: {
    pages: { one: "{n} página", other: "{n} páginas" },
    converted: "convertido desde .{ext}",
    newDocument: "Nuevo documento",
    download: "Descargar PDF firmado",
    downloadShort: "Descargar",
    armHint: "Haz clic donde quieras poner la firma",
    yourSignatures: "Tus firmas",
    trayHint: "Arrástrala a la página o haz clic en ella.",
    draw: "Dibujar",
    withPhone: "Con el teléfono",
    drawHere: "Dibujar aquí",
    tips: "Arrastra una firma colocada para moverla y tira de su esquina para cambiar el tamaño. Con las flechas la ajustas con precisión; la tecla {key} la borra.",
    autoPlaced: "Hemos puesto la firma al pie de la última página: arrástrala adonde la necesites.",
    newSignature: "Ha llegado una firma nueva: arrástrala al documento.",
    exportFailed: "No se pudo generar el PDF firmado.",
    confirmNew: "¿Seguro que quieres abrir un documento nuevo? Se perderán las firmas colocadas.",
    pageLabel: "Página {n}",
    pagesNav: "Páginas",
  },

  placement: {
    label: "Firma colocada: arrástrala para moverla",
    resize: "Cambiar tamaño",
    duplicate: "Duplicar",
    allPages: "En todas las páginas",
    remove: "Eliminar",
    allPagesDone: "La firma se ha añadido a todas las páginas ({n} páginas).",
  },

  tray: {
    emptyRow: "Aún no hay firmas.",
    empty: "Aquí aparecerán las firmas que vayan llegando.",
    drawOne: "Dibuja una aquí",
    emptySuffix: " — con el ratón o el panel táctil.",
    tileTitle: "Arrástrala al documento, o haz clic en ella y luego en la página",
    fromPhone: "Teléfono",
    drawn: "Dibujada",
    remove: "Eliminar firma",
  },

  phonePanel: {
    eyebrow: "Firma con el teléfono",
    scanTitle: "Escanea el código",
    drawingTitle: "Estás firmando…",
    connectedTitle: "Teléfono conectado",
    expired: "El código QR ha caducado.",
    failed: "No se pudo generar el código QR.",
    newCode: "Nuevo código",
    step1: "Abre la cámara del teléfono y apunta al código.",
    step2: "Toca el enlace que aparece y firma con el dedo.",
    step3: "En unos segundos, la firma aparecerá aquí.",
    drawingHint: "Ves en directo lo que dibujas en el teléfono. Cuando termines, pulsa el botón de enviar.",
    connectedHint: "Firma en el teléfono y pulsa el botón «Enviar firma».",
    showQr: "Ver el QR",
    liveView: "Vista en directo",
    copied: "Copiado",
    copyLink: "Copiar enlace",
    cantOpen: "¿No se abre en el teléfono?",
    networkHint: "El teléfono y el equipo deben estar en la misma red wifi. Si tienes varias tarjetas de red, prueba con otra dirección:",
    waiting: "Esperando la firma…",
    live: "en directo",
    qrAria: "Código QR para firmar con el teléfono",
  },

  drawDialog: {
    aria: "Dibujar firma",
    title: "Dibuja tu firma",
    subtitle: "Con el ratón, el panel táctil o un lápiz: el trazo se afina según la velocidad.",
    add: "Añadir firma",
  },

  done: {
    aria: "Documento firmado descargado",
    title: "¡Listo, firmado!",
    downloaded: "Se ha descargado {name} en tu equipo.",
    rasterized: "El PDF original estaba protegido, así que hemos guardado las páginas como imágenes: por eso el texto no se puede seleccionar.",
    keepEditing: "Seguir editando",
    newDocument: "Nuevo documento",
    again: "¿No empezó? Descargar de nuevo",
    seal: "FIRMADO · KÉZJEGY · FIRMADO · KÉZJEGY ·",
  },

  phone: {
    signFor: "Vas a firmar",
    connected: "Conectado",
    rotateTip: "Gira el teléfono y tendrás más espacio para firmar.",
    closeTip: "Cerrar consejo",
    sending: "Enviando…",
    send: "Enviar firma",
    sentTitle: "¡Enviada!",
    sentText: "Tu firma ya aparece en el equipo. Desde allí puedes arrastrarla al documento.",
    again: "Otra firma",
    failTitle: "No se pudo enviar",
    failText: "Comprueba tu conexión a internet y vuelve a intentarlo.",
    back: "Volver",
    retry: "Reintentar",
    expiredTitle: "Este enlace ya no es válido",
    expiredText: "El código QR ha caducado o el documento se ha cerrado en el equipo. Pide allí un código nuevo y vuelve a escanearlo.",
    consent: "Al enviar, aceptas los {terms} y la {privacy}.",
  },

  files: {
    signedSuffix: "firmado",
    sampleName: "contrato-ejemplo.pdf",
  },

  legal: {
    backHome: "Volver a Kézjegy",
    effective: "En vigor desde: {date}",
    contents: "Contenido",
    alsoSee: "Consulta también:",
    operatorLabels: {
      name: "Operador",
      address: "Domicilio social",
      email: "Correo electrónico",
      taxId: "N.º de identificación fiscal",
      registration: "Número de registro",
      hosting: "Proveedor de alojamiento",
    },
  },
};

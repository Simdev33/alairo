import type { Dictionary } from "./en";

export const es: Dictionary = {
  meta: {
    title: "DoneSignIn — Firma documentos desde el teléfono con un código QR",
    description:
      "Sube un PDF o un documento de Word, escanea el código QR con el teléfono, firma con el dedo y coloca la firma donde quieras del documento. Pruébalo gratis y descárgalo con una suscripción.",
    phoneTitle: "Firmar · DoneSignIn",
    accountTitle: "Mi cuenta · DoneSignIn",
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
    unexpected: "Algo ha fallado. Vuelve a intentarlo.",
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
    pricing: "Precios",
    privacy: "Privacidad",
    badge: "Pruébalo gratis · sin instalar nada",
    terms: "Términos",
    privacyPolicy: "Política de privacidad",
    account: "Mi cuenta",
    signIn: "Iniciar sesión",
  },

  hero: {
    eyebrow: "PDF · Word · Código QR",
    line1: "Fírmalo",
    line2: "con tu teléfono,",
    line3: "no con la impresora.",
    lead: "Sube el documento, escanea el código QR y firma con el dedo. En unos segundos la firma ya está en el PDF, justo donde la arrastres.",
    trust: [
      "Cifrado de 256 bits",
      "Archivos eliminados automáticamente tras 1 hora",
      "100 % privado",
      "Conforme al RGPD",
    ],
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
    consent: "Al usar DoneSignIn, aceptas los {terms} y la {privacy}.",
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

  pricing: {
    eyebrow: "Precios",
    titleA: "Un plan sencillo,",
    titleB: "cancela cuando quieras.",
    lead: "Subir el documento, firmar y colocar la firma es gratis. Para descargar el PDF firmado, empieza con {days} días de acceso completo por {trial}; después cuesta {monthly} al mes, y puedes cancelar con un solo clic.",
    plan: "Acceso completo",
    today: "durante los primeros {days} días",
    then: "después, {monthly} / mes",
    features: [
      "Descargas ilimitadas de PDF firmados",
      "Firma con el teléfono o con el ratón",
      "Documentos PDF y de Word, con cualquier número de páginas",
      "Cancela cuando quieras desde la página de tu cuenta",
    ],
    cta: "Empezar a firmar",
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
        title: "Sin contraseña, cancela cuando quieras",
        text: "Para suscribirte solo necesitas una dirección de correo electrónico, y puedes cancelar con un solo clic.",
      },
    ],
  },

  footer: {
    disclaimer:
      "DoneSignIn coloca en el documento la imagen de la firma que dibujas a mano (firma electrónica simple). No es una firma electrónica cualificada ni sustituye a la identificación electrónica oficial.",
    operatedBy: "Operado por {name}.",
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
    networkHint:
      "El teléfono y el equipo deben estar en la misma red wifi. Si tienes varias tarjetas de red, prueba con otra dirección:",
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
    rasterized:
      "El PDF original estaba protegido, así que hemos guardado las páginas como imágenes: por eso el texto no se puede seleccionar.",
    keepEditing: "Seguir editando",
    newDocument: "Nuevo documento",
    again: "¿No empezó? Descargar de nuevo",
    seal: "FIRMADO · DONESIGNIN · FIRMADO · DONESIGNIN ·",
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
    expiredText:
      "El código QR ha caducado o el documento se ha cerrado en el equipo. Pide allí un código nuevo y vuelve a escanearlo.",
    consent: "Al enviar, aceptas los {terms} y la {privacy}.",
  },

  paywall: {
    label: "Descarga y pago",
    expires: "Por tu privacidad, el archivo firmado se guarda en este dispositivo durante:",
    expired: "El archivo firmado ya no se guarda en este dispositivo. Vuelve a descargarlo desde el editor.",
    ready: "Tu PDF firmado está listo",
    title: "Descárgalo ya.",
    includes: "El acceso completo de {days} días incluye:",
    features: [
      "Descargas ilimitadas de PDF firmados",
      "Firma con el teléfono o con el ratón",
      "Documentos PDF y de Word, con cualquier número de páginas",
      "Tus documentos nunca salen de tu dispositivo",
    ],
    priceLabel: "Pago",
    email: "Tu correo electrónico",
    emailHint: "Con él podrás iniciar sesión más adelante en otros dispositivos.",
    emailPlaceholder: "nombre@ejemplo.com",
    methods: "Elige un método de pago",
    pay: "Pedido con obligación de pago · {amount}",
    consent:
      "Acepto los [Términos y condiciones](terms) y la [Política de privacidad](privacy), y solicito expresamente que el servicio comience de inmediato.",
    consentNeeded: "Para pagar, marca la casilla de arriba.",
    renewal:
      "Si no cancelas durante los primeros {days} días, tu suscripción continúa a partir del día {next} por {monthly} al mes. Puedes cancelar cuando quieras en la página [Mi cuenta](account), con un solo clic. Si desistes dentro del plazo de desistimiento de 14 días, pagas la parte proporcional al periodo ya utilizado.",
    ssl: "SSL de 256 bits",
    stripe: "Pagos gestionados por Stripe",
    cancelAnytime: "Cancela cuando quieras",
    loading: "Cargando el pago…",
    processing: "Procesando el pago…",
    success: "¡Pago completado! Tu descarga está empezando.",
    haveAccount: "¿Ya tienes una suscripción?",
    login: "Iniciar sesión",
    backToPay: "Volver al pago",
    notConfigured: "Los pagos aún no están configurados en este servidor.",
    returning: "Comprobando tu pago…",
  },

  auth: {
    title: "Iniciar sesión",
    intro: "Introduce la dirección de correo electrónico vinculada a tu suscripción y te enviaremos un código de acceso de 6 dígitos.",
    email: "Correo electrónico",
    sendCode: "Enviar código",
    sent: "Si hay una suscripción vinculada a {email}, te hemos enviado allí el código. Revisa también la carpeta de spam.",
    code: "Código de acceso",
    verify: "Iniciar sesión",
    resend: "Pedir un código nuevo",
    otherEmail: "Usar otra dirección de correo",
    success: "Has iniciado sesión.",
  },

  account: {
    title: "Mi cuenta",
    signedInAs: "Sesión iniciada como {email}",
    trial: "Periodo de prueba: termina el {date}. Si no cancelas, continúa por {monthly}/mes.",
    active: "Suscripción activa. Próximo cobro: {date} ({monthly}).",
    canceling: "Cancelada. Tienes acceso hasta el {date}.",
    pastDue: "El último cobro ha fallado. Actualiza tu tarjeta para no perder el acceso.",
    none: "No tienes ninguna suscripción activa. Firma un documento y podrás suscribirte al descargarlo.",
    manage: "Gestionar o cancelar la suscripción",
    manageHint: "En la página segura de Stripe puedes cancelar la suscripción, cambiar la tarjeta y ver tus cobros anteriores.",
    start: "Firmar un documento",
    logout: "Cerrar sesión",
    loading: "Cargando…",
    error: "No hemos podido cargar los datos de tu cuenta. Vuelve a intentarlo más tarde.",
  },

  server: {
    invalidEmail: "Introduce una dirección de correo electrónico válida.",
    rateLimited: "Demasiados intentos. Espera unos minutos y vuelve a intentarlo.",
    billingUnavailable: "El servicio de pago no está disponible en este momento. Vuelve a intentarlo más tarde.",
    checkoutFailed: "No se ha podido iniciar el pago. Vuelve a intentarlo.",
    alreadySubscribed:
      "Esta dirección de correo ya tiene una suscripción activa. Inicia sesión con el código que te enviaremos por correo electrónico.",
    paymentIncomplete: "El pago no se ha completado.",
    notSignedIn: "Tienes que iniciar sesión para hacer esto.",
    codeInvalid: "Código incorrecto. Compruébalo y vuelve a intentarlo.",
    codeExpired: "El código ha caducado. Pide uno nuevo.",
    codeLocked: "Demasiados intentos fallidos. Pide un código nuevo.",
    emailFailed: "No se ha podido enviar el correo. Vuelve a intentarlo más tarde.",
    unexpected: "Algo ha fallado. Vuelve a intentarlo.",
  },

  email: {
    subject: "{code} – tu código de acceso ({site})",
    intro: "Usa este código para iniciar sesión en {site}:",
    validity: "El código es válido durante {minutes} minutos.",
    ignore: "Si no lo has solicitado, puedes ignorar este correo sin problema.",
  },

  files: {
    signedSuffix: "firmado",
    sampleName: "contrato-ejemplo.pdf",
  },

  legal: {
    backHome: "Volver a DoneSignIn",
    effective: "En vigor desde: {date}",
    contents: "Contenido",
    alsoSee: "Consulta también:",
    toBeCompleted: "pendiente de completar",
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

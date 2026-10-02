import type { LegalTexts } from "./types";

export const legal: LegalTexts = {
  terms: {
    title: "Términos y condiciones",
    intro:
      "Las presentes condiciones regulan el uso del servicio web {site} ({siteUrl}, en adelante, el «Servicio») y la suscripción a este. Al utilizar el Servicio o contratar la suscripción, usted acepta estas condiciones; si no está de acuerdo con ellas, le rogamos que no utilice el Servicio.",
    sections: [
      {
        id: "operador",
        title: "El operador",
        blocks: ["El Servicio lo presta el siguiente operador (en adelante, el «Operador»):", { operator: true }],
      },
      {
        id: "servicio",
        title: "El Servicio",
        blocks: [
          "{site} es una herramienta en línea con la que puede abrir un documento PDF o de Word, dibujar su firma manuscrita en el teléfono (tras escanear un código QR que aparece en pantalla) o en el ordenador con el ratón, colocar la firma en cualquier lugar del documento y descargar el PDF firmado.",
          "La apertura de documentos, el dibujo de firmas, su colocación y la vista previa del resultado son gratuitos. Para descargar el PDF firmado es necesaria una suscripción (véase la sección 3).",
          "Los documentos se procesan en su navegador, en su propio dispositivo; su contenido no se envía al Operador. Los detalles figuran en la [Política de privacidad](privacy).",
        ],
      },
      {
        id: "suscripcion",
        title: "Suscripción y tarifas",
        blocks: [
          "La suscripción comienza con un periodo introductorio de {days} días, cuya tarifa es de {trial}. Durante este periodo, el Servicio puede utilizarse en su totalidad, sin ninguna restricción.",
          "Si no cancela la suscripción antes de que finalice el periodo introductorio, a partir del día {next} esta continúa automáticamente como suscripción con una tarifa mensual de {monthly}, y se renueva cada mes hasta que usted la cancele. La tarifa mensual se cobra al inicio de cada periodo en el método de pago que haya indicado al realizar el pedido.",
          "El importe total a pagar se muestra claramente en la página de pago antes de que realice el pedido. El pedido se realiza al pulsar el botón que indica la obligación de pago (o el botón del método de pago seleccionado).",
          "Notificaremos a los suscriptores por correo electrónico cualquier modificación de las tarifas con al menos 30 días de antelación a su entrada en vigor; si no la acepta, podrá cancelar su suscripción antes de esa fecha.",
        ],
      },
      {
        id: "pago",
        title: "Pago",
        blocks: [
          "Los pagos los procesa Stripe Payments Europe, Ltd. (Irlanda). Los métodos de pago disponibles dependen de su dispositivo, navegador y país, y pueden incluir tarjetas de débito y crédito, Apple Pay, Google Pay, PayPal y Link. El Operador no ve ni almacena los datos de su tarjeta.",
          "Stripe le envía por correo electrónico un recibo por cada pago realizado correctamente. La factura exigida por la ley la emite el Operador.",
          "Si falla un cobro mensual, Stripe volverá a intentarlo en unos días; si sigue fallando, la suscripción finaliza junto con su acceso a las descargas.",
        ],
      },
      {
        id: "cancelacion",
        title: "Cancelación",
        blocks: [
          "Puede cancelar su suscripción en cualquier momento, sin necesidad de indicar el motivo, en la página [Mi cuenta](account) (tras iniciar sesión con un código que le enviamos por correo electrónico), con un solo clic, en la interfaz segura de Stripe.",
          "La cancelación surte efecto al final del periodo en curso: hasta entonces conserva el acceso y no se realizan más cobros. Si cancela durante el periodo introductorio, no se le cobrará ninguna tarifa mensual a partir del día {next}.",
          "La tarifa de un periodo ya iniciado no se reembolsa, salvo cuando ejerza su derecho de desistimiento y en los demás casos exigidos por la ley.",
        ],
      },
      {
        id: "desistimiento",
        title: "Derecho de desistimiento",
        blocks: [
          "Si contrata la suscripción como consumidor, puede desistir del contrato en un plazo de 14 días desde el pedido, sin necesidad de indicar el motivo. Puede comunicar al Operador su decisión de desistir mediante una declaración inequívoca (por ejemplo, por correo electrónico a {operatorEmail}); puede utilizar el modelo de formulario de desistimiento que figura en el anexo I, parte B, de la Directiva 2011/83/UE, aunque no está obligado a ello.",
          "Dado que, al realizar el pedido, usted solicita expresamente que la prestación del Servicio comience de inmediato, si desiste deberá abonar una tarifa proporcional al periodo utilizado hasta el desistimiento. Le reembolsaremos el importe restante en el método de pago utilizado para el pago en un plazo de 14 días a partir del día en que nos comunique su desistimiento.",
          "El derecho de desistimiento no afecta a su posibilidad de cancelar la suscripción en cualquier momento (véase la sección 5).",
        ],
      },
      {
        id: "cuenta",
        title: "Cuenta e inicio de sesión",
        blocks: [
          "No existe un registro independiente con contraseña. Su cuenta está vinculada a la dirección de correo electrónico que indique al pagar: en el navegador en el que haya pagado, la sesión se inicia automáticamente, y en otros dispositivos puede iniciar sesión con un código de 6 dígitos que le enviamos por correo electrónico y que es válido durante 10 minutos.",
          "No comparta su código de inicio de sesión con nadie. La suscripción es para uso personal; no está permitido compartir ni revender el acceso.",
        ],
      },
      {
        id: "firma",
        title: "Naturaleza y efectos jurídicos de la firma",
        blocks: [
          "La firma creada con el Servicio es la imagen de la firma que usted dibuja a mano, que se incorpora al documento en formato vectorial. Constituye una firma electrónica simple conforme al Reglamento (UE) n.º 910/2014 (eIDAS): no es una firma electrónica avanzada ni cualificada, y no identifica a la persona firmante.",
          "Para determinadas declaraciones de voluntad y documentos, la ley puede exigir la forma escrita, una firma electrónica cualificada, la presencia de testigos u otro tipo de autenticación. Es responsabilidad suya decidir si este tipo de firma es adecuado para el documento en cuestión; en caso de duda, consulte a un profesional del derecho.",
          "El Operador no es parte en las relaciones jurídicas que se establezcan entre usted y terceros, y no examina el contenido de los documentos.",
        ],
      },
      {
        id: "uso",
        title: "Condiciones de uso",
        blocks: [
          "Solo puede utilizar el Servicio con fines lícitos y de conformidad con estas condiciones. En particular, se compromete a:",
          {
            list: [
              "firmar únicamente documentos que esté facultado para firmar;",
              "firmar en nombre de otras personas solo con la debida autorización, y no imitar la firma de nadie;",
              "no utilizar el Servicio para cometer fraude, falsificar documentos ni con ningún otro fin ilícito;",
              "no intentar acceder al Servicio sin autorización, eludir sus medidas de seguridad o de pago ni obstaculizar su funcionamiento (por ejemplo, mediante solicitudes masivas automatizadas);",
              "no compartir el código QR ni su enlace con personas no autorizadas: quien los conozca podrá enviar una firma a su documento hasta que caduque la sesión (como máximo, 1 hora).",
            ],
          },
          "Si los documentos procesados contienen datos personales de otras personas, usted es responsable de tratarlos de forma lícita.",
          "El Operador podrá restringir o suprimir el acceso para evitar abusos; en caso de incumplimiento grave de estas condiciones, la suscripción podrá resolverse con efecto inmediato.",
        ],
      },
      {
        id: "propiedad-intelectual",
        title: "Propiedad intelectual",
        blocks: [
          "El software, el diseño, el logotipo y los textos del Servicio son propiedad intelectual del Operador; no podrá copiarlos ni distribuirlos más allá del uso conforme a la finalidad del Servicio.",
          "El Servicio también utiliza componentes de código abierto (como Mozilla pdf.js, pdf-lib, perfect-freehand y docx-preview), que están sujetos a sus propias condiciones de licencia.",
          "Los documentos que abra y las firmas que dibuje siguen siendo suyos; el Operador no adquiere ningún derecho sobre ellos.",
        ],
      },
      {
        id: "responsabilidad",
        title: "Responsabilidad",
        blocks: [
          "El Operador hace todo lo posible por garantizar el funcionamiento continuo y correcto del Servicio, pero no garantiza que esté disponible sin interrupciones ni errores. Revise el documento descargado antes de utilizarlo, en especial la posición de la firma y la integridad del contenido, y conserve siempre una copia de sus archivos originales.",
          "En la máxima medida permitida por la ley, el Operador no será responsable de los daños indirectos, el lucro cesante ni la pérdida de datos derivados del uso del Servicio o de la imposibilidad de utilizarlo, ni de las consecuencias relacionadas con la validez, los efectos jurídicos o el uso de los documentos firmados. Esta limitación no se aplica a la responsabilidad por los daños causados de forma dolosa o por negligencia grave, ni por incumplimientos contractuales que atenten contra la vida, la integridad física o la salud, y no afecta a los derechos que la ley reconoce a los consumidores.",
        ],
      },
      {
        id: "cambios-servicio",
        title: "Disponibilidad y cambios",
        blocks: [
          "El Operador tiene derecho a desarrollar y modificar el Servicio. Si el Servicio se interrumpe de forma definitiva, resolveremos las suscripciones y reembolsaremos de forma proporcional la tarifa correspondiente al periodo no utilizado.",
        ],
      },
      {
        id: "proteccion-datos",
        title: "Protección de datos",
        blocks: ["Los detalles del tratamiento de los datos personales figuran en la [Política de privacidad](privacy)."],
      },
      {
        id: "modificaciones",
        title: "Modificación de las condiciones",
        blocks: [
          "El Operador tiene derecho a modificar estas condiciones. Las modificaciones entran en vigor con su publicación en esta página, en la fecha de entrada en vigor indicada al principio del documento. Notificaremos a los suscriptores por correo electrónico, con al menos 30 días de antelación, cualquier modificación sustancial que les resulte desfavorable; si no aceptan las modificaciones, podrán cancelar su suscripción antes de que entren en vigor.",
        ],
      },
      {
        id: "legislacion",
        title: "Legislación aplicable y litigios",
        blocks: [
          "Estas condiciones se rigen por la legislación eslovaca. Si utiliza el Servicio como consumidor, esta elección de ley no le priva de la protección que le otorgan las normas imperativas de protección de los consumidores de su país de residencia.",
          "Procuramos resolver cualquier litigio de forma amistosa: puede enviar su reclamación a {operatorEmail}, y le responderemos en un plazo de 30 días. Si rechazamos su reclamación o no respondemos en un plazo de 30 días, como consumidor puede iniciar un procedimiento de resolución alternativa de litigios ante la Inspección de Comercio de Eslovaquia (Slovenská obchodná inšpekcia, SOI, https://www.soi.sk) o ante otra entidad de resolución de litigios incluida en la lista del Ministerio de Economía de Eslovaquia. También puede dirigirse a la autoridad de protección de los consumidores y a los tribunales de su lugar de residencia.",
        ],
      },
      {
        id: "contacto",
        title: "Contacto",
        blocks: [
          "Puede dirigir al Operador sus preguntas, observaciones o reclamaciones a la siguiente dirección de correo electrónico: {operatorEmail}.",
        ],
      },
    ],
  },

  privacy: {
    title: "Política de privacidad",
    intro:
      "De conformidad con el Reglamento (UE) 2016/679 (Reglamento General de Protección de Datos, RGPD), esta política explica qué datos personales tratamos cuando usted utiliza {site} ({siteUrl}), con qué finalidad, sobre qué base jurídica y durante cuánto tiempo, así como los derechos que le asisten.",
    sections: [
      {
        id: "responsable",
        title: "El responsable del tratamiento",
        blocks: [
          { operator: true },
          "Para cualquier cuestión relacionada con la protección de datos, puede escribirnos a {operatorEmail}.",
        ],
      },
      {
        id: "resumen",
        title: "En resumen",
        blocks: [
          {
            list: [
              "Su navegador abre y firma sus documentos en su propio dispositivo; su contenido nunca llega a nosotros.",
              "La firma que dibuja en el teléfono llega a su ordenador a través de nuestro servidor y se elimina automáticamente al cabo de 1 hora como máximo.",
              "No hay registro con contraseña. Si se suscribe, tratamos su dirección de correo electrónico y los datos de su suscripción.",
              "Los pagos los procesa Stripe; no vemos ni almacenamos los datos de su tarjeta.",
              "No utilizamos herramientas de analítica. La medición de conversiones de Google Ads solo funciona si usted la permite en el banner de cookies; de lo contrario, solo utilizamos las cookies necesarias para el inicio de sesión, el pago y la elección de idioma.",
            ],
          },
        ],
      },
      {
        id: "documentos",
        title: "Sus documentos",
        blocks: [
          "Los documentos PDF y de Word que abra los procesa su navegador en su propio dispositivo: allí se realizan la apertura, la conversión de los archivos de Word a PDF, la colocación de la firma y la generación del PDF que se descarga. No tenemos acceso al contenido de sus documentos ni lo almacenamos.",
          "Si, en un determinado entorno de funcionamiento, el Servicio utiliza un conversor de Word en el servidor, el archivo de Word solo permanece en el servidor mientras dura la conversión y se elimina inmediatamente después.",
          "Mientras la página de pago está abierta, su navegador conserva el PDF firmado en su propio dispositivo (IndexedDB) durante un máximo de 60 minutos, para que no se pierda si un método de pago le redirige a otra página (como PayPal). Este archivo tampoco llega a nosotros.",
          "El nombre del archivo del documento se incluye en la sesión de firma con el teléfono (véase más abajo), para que en el teléfono se vea qué está firmando.",
        ],
      },
      {
        id: "sesion",
        title: "La sesión de firma con el teléfono",
        blocks: [
          "Cuando usted abre un documento, el Servicio crea una sesión con un identificador aleatorio y muestra su enlace en forma de código QR. En la sesión se almacenan:",
          {
            list: [
              "el identificador aleatorio de la sesión y su hora de caducidad;",
              "el nombre del archivo del documento;",
              "si se ha conectado un teléfono;",
              "mientras dibuja, los trazos actuales de la firma (la vista previa en directo en su ordenador);",
              "la firma enviada, en formato vectorial: la forma de los trazos, su color y el momento del envío.",
            ],
          },
          "Finalidad: hacer llegar a su ordenador la firma dibujada en el teléfono. Base jurídica: la prestación del Servicio a petición suya (artículo 6, apartado 1, letra b), del RGPD).",
          "Plazo de conservación: los datos de la sesión se conservan durante 1 hora como máximo y, después, se eliminan de forma automática y definitiva. Solo almacenamos la forma final de los trazos, no cómo se dibujaron a lo largo del tiempo (velocidad, presión), y no identificamos a nadie a partir de su firma.",
        ],
      },
      {
        id: "suscripcion",
        title: "Suscripción y pago",
        blocks: [
          "Si se suscribe, los datos que introduzca en la página de pago los trata Stripe; nosotros recibimos los datos necesarios para llevar el registro de su suscripción.",
          {
            list: [
              "Datos tratados: dirección de correo electrónico, los identificadores de cliente y de suscripción asignados por Stripe, el estado y los periodos de la suscripción, el importe y la fecha de los pagos, el tipo de método de pago (por ejemplo, tarjeta, y sus 4 últimas cifras) y, si la página de pago los solicita, el país y el código postal de facturación.",
              "Finalidad: la formalización y ejecución de la suscripción, el cobro de las tarifas, la verificación del acceso, la facturación y la atención al cliente.",
              "Base jurídica: la ejecución de un contrato (artículo 6, apartado 1, letra b), del RGPD); para la conservación de los registros contables, el cumplimiento de una obligación legal (artículo 6, apartado 1, letra c), del RGPD).",
              "Plazo de conservación: mientras exista la suscripción; una vez finalizada, conservamos los registros contables durante 10 años conforme al artículo 35 de la Ley eslovaca de contabilidad (Ley n.º 431/2002 Coll.). Los demás datos los suprimimos a petición suya una vez finalizada la suscripción.",
            ],
          },
          "Los pagos los procesa Stripe Payments Europe, Ltd. (1 Grand Canal Street Lower, Grand Canal Dock, Dublin, D02 H210, Irlanda), que es responsable independiente del tratamiento en lo que respecta a los datos de pago y a la prevención del fraude. Puede consultar información sobre su tratamiento de datos en https://stripe.com/privacy.",
        ],
      },
      {
        id: "inicio-sesion",
        title: "Inicio de sesión con un código por correo electrónico",
        blocks: [
          "En otros dispositivos, puede iniciar sesión con un código de un solo uso que le enviamos por correo electrónico.",
          {
            list: [
              "Datos tratados: dirección de correo electrónico, el código de inicio de sesión en forma de hash, su hora de caducidad y el número de intentos.",
              "Finalidad: el inicio de sesión y la protección de su cuenta.",
              "Base jurídica: la ejecución de un contrato (artículo 6, apartado 1, letra b), del RGPD).",
              "Plazo de conservación: el código es válido durante 10 minutos, y lo suprimimos inmediatamente después de su uso.",
            ],
          },
          "Los correos electrónicos de inicio de sesión los envía Resend, Inc. (https://resend.com) en calidad de encargado del tratamiento.",
        ],
      },
      {
        id: "registros",
        title: "Registros técnicos",
        blocks: [
          "Al servir el sitio, como ocurre con cualquier sitio web, los servidores del proveedor de alojamiento registran datos técnicos.",
          {
            list: [
              "Datos tratados: dirección IP, hora de la solicitud, dirección de la página solicitada, tipo y versión del navegador.",
              "Finalidad: el funcionamiento seguro e ininterrumpido del Servicio y la detección de errores y abusos.",
              "Base jurídica: el interés legítimo del Operador (artículo 6, apartado 1, letra f), del RGPD).",
              "Plazo de conservación: un breve periodo, conforme a las normas de conservación de datos del proveedor de alojamiento.",
            ],
          },
        ],
      },
      {
        id: "cookies",
        title: "Cookies y almacenamiento local",
        blocks: [
          "Las siguientes cookies son necesarias para el funcionamiento del Servicio; estas no requieren consentimiento:",
          {
            list: [
              "ds_session: mantiene su sesión iniciada (180 días);",
              "ds_signed_in: indica al sitio que ha iniciado sesión (180 días);",
              "ds_login: el proceso de inicio de sesión con código (10 minutos);",
              "NEXT_LOCALE: recuerda el idioma que ha elegido en el selector de idioma (1 año);",
              "ds_consent: recuerda su elección en el banner de cookies (180 días).",
            ],
          },
          "Cookies publicitarias, solo con su consentimiento: si hace clic en «Aceptar» en el banner de cookies, cargamos la etiqueta de Google de Google Ireland Limited (Gordon House, Barrow Street, Dublín 4, Irlanda) para medir si nuestros anuncios de Google Ads generan compras (medición de conversiones). Google instala entonces sus propias cookies (por ejemplo, _gcl_au, durante un máximo de 90 días) y recibe su dirección IP, datos de su navegador, la dirección de la página visitada y el identificador del clic en el anuncio. Base jurídica: su consentimiento (artículo 6, apartado 1, letra a), del RGPD). Sin su consentimiento, la etiqueta de Google no se carga en absoluto. Puede dar o retirar su consentimiento en cualquier momento con el enlace «Configuración de cookies» al pie de la página; la retirada no afecta a la licitud del tratamiento anterior. Google también puede transferir datos a EE. UU. (Marco de Privacidad de Datos UE-EE. UU.); su política de privacidad: https://policies.google.com/privacy.",
          "En la página de pago, Stripe utiliza sus propias cookies para procesar el pago de forma segura y prevenir el fraude. No utilizamos cookies de analítica. Cargamos las fuentes tipográficas desde nuestro propio servidor, por lo que ningún proveedor externo de fuentes recibe datos sobre usted.",
        ],
      },
      {
        id: "encargados",
        title: "Encargados del tratamiento y transferencias de datos",
        blocks: [
          "Los siguientes encargados del tratamiento tratan datos por cuenta nuestra:",
          {
            list: [
              "alojamiento y servidor de aplicaciones: {hosting};",
              "base de datos de las sesiones de firma con el teléfono: {storage} — ubicación de los datos: {storageRegion};",
              "envío de los correos electrónicos de inicio de sesión: Resend, Inc., EE. UU.",
            ],
          },
          "Estos proveedores tienen su sede en los Estados Unidos de América, por lo que los datos también pueden transferirse fuera del Espacio Económico Europeo. Dichas transferencias se realizan con las garantías adecuadas (el Marco de Privacidad de Datos UE-EE. UU. y/o las cláusulas contractuales tipo adoptadas por la Comisión Europea).",
          "Aparte de la medición de conversiones de Google Ads a la que usted consiente (véase «Cookies y almacenamiento local»), no compartimos sus datos con ningún otro tercero ni los vendemos.",
        ],
      },
      {
        id: "seguridad",
        title: "Seguridad de los datos",
        blocks: [
          "Todas las conexiones entre el sitio y el servidor están cifradas (HTTPS). Las cookies de inicio de sesión están firmadas y no pueden leerse mediante scripts. Los identificadores de sesión son aleatorios e imposibles de adivinar, y los datos de la sesión se eliminan solos al cabo de una hora. No comparta el código QR ni su enlace con otras personas: quien los conozca podrá enviar una firma a la sesión hasta que caduque.",
        ],
      },
      {
        id: "derechos",
        title: "Sus derechos",
        blocks: [
          "En virtud del RGPD, usted tiene los siguientes derechos:",
          {
            list: [
              "derecho de información y de acceso (artículo 15);",
              "derecho de rectificación (artículo 16);",
              "derecho de supresión (artículo 17);",
              "derecho a la limitación del tratamiento (artículo 18);",
              "derecho a la portabilidad de los datos (artículo 20);",
              "derecho de oposición al tratamiento basado en el interés legítimo (artículo 21).",
            ],
          },
          "Puede enviar su solicitud a {operatorEmail}; le responderemos en el plazo máximo de un mes. También puede cambiar usted mismo su dirección de correo electrónico en la página [Mi cuenta](account), en la interfaz de Stripe.",
        ],
      },
      {
        id: "recursos",
        title: "Vías de recurso",
        blocks: [
          "Si considera que el tratamiento de sus datos personales infringe la ley, puede presentar una reclamación ante la autoridad de control del domicilio social del responsable, la Oficina de Protección de Datos Personales de la República Eslovaca (Úrad na ochranu osobných údajov Slovenskej republiky; Hraničná 12, 820 07 Bratislava 27; https://dataprotection.gov.sk), o ante la autoridad de protección de datos de su lugar de residencia o de trabajo; en Hungría, por ejemplo, la Autoridad Nacional de Protección de Datos y Libertad de Información (Nemzeti Adatvédelmi és Információszabadság Hatóság, NAIH; 1055 Budapest, Falk Miksa utca 9–11.; https://naih.hu).",
          "Si se vulneran sus derechos, también puede acudir a los tribunales; puede interponer la demanda ante los tribunales del Estado miembro de su lugar de residencia.",
        ],
      },
      {
        id: "menores",
        title: "Menores",
        blocks: ["El Servicio no está dirigido a menores de 16 años, y no tratamos a sabiendas datos sobre ellos."],
      },
      {
        id: "cambios",
        title: "Cambios en esta política",
        blocks: [
          "Actualizamos esta política cada vez que cambia el Servicio; la fecha de entrada en vigor figura al principio del documento. Las condiciones de uso del Servicio se recogen en los [Términos y condiciones](terms).",
        ],
      },
    ],
  },
};

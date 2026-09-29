import type { LegalTexts } from "./types";

export const legal: LegalTexts = {
  terms: {
    title: "Términos y condiciones",
    intro:
      "Este documento recoge las condiciones de uso del servicio web {site} (en adelante, el «Servicio»). Le rogamos que las lea detenidamente antes de utilizar el Servicio.",
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
          "{site} es una herramienta gratuita que funciona en el navegador. Con ella puede abrir un documento PDF o de Word, dibujar a mano una firma en su teléfono tras escanear el código QR que aparece en pantalla (o dibujarla con el ratón en su ordenador) y, después de colocar la firma en el lugar del documento que desee, descargar el PDF firmado.",
          "Para utilizarlo no es necesario registrarse ni instalar ninguna aplicación. El documento se procesa en su navegador; los detalles se describen en la [Política de privacidad](privacy).",
        ],
      },
      {
        id: "aceptacion",
        title: "Aceptación de las condiciones",
        blocks: [
          "Al utilizar el Servicio, usted acepta las presentes condiciones. Si no está de acuerdo con ellas, le rogamos que no utilice el Servicio.",
        ],
      },
      {
        id: "tarifas",
        title: "Tarifas",
        blocks: [
          "El Servicio es gratuito. En el futuro, el Operador podrá introducir funciones de pago; informará de ellas con antelación y de forma clara, y solo podrá cobrar una tarifa previa aceptación expresa por su parte.",
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
        id: "obligaciones",
        title: "Obligaciones del usuario",
        blocks: [
          "Al utilizar el Servicio, usted se compromete a:",
          {
            list: [
              "firmar únicamente documentos que esté facultado para firmar;",
              "firmar en nombre de otra persona solo con la debida autorización, y no imitar la firma de otras personas;",
              "no utilizar el Servicio para cometer fraude, falsificar documentos ni con ningún otro fin ilícito;",
              "no intentar acceder al Servicio sin autorización ni perturbar su funcionamiento (por ejemplo, mediante solicitudes masivas automatizadas);",
              "no compartir el código QR ni el enlace correspondiente con personas no autorizadas: quien los conozca podrá enviar firmas a su documento hasta que caduque la sesión (como máximo, 1 hora).",
            ],
          },
          "En caso de sospecha de uso ilícito, el Operador podrá restringir el acceso al Servicio.",
        ],
      },
      {
        id: "disponibilidad",
        title: "Disponibilidad",
        blocks: [
          "El Operador procura que el Servicio funcione de forma continuada, pero no garantiza un funcionamiento ininterrumpido ni libre de errores. El Servicio puede dejar de estar disponible temporalmente por tareas de mantenimiento o desarrollo, o por fallos de proveedores externos. El Operador podrá modificar el Servicio o dejar de prestarlo en cualquier momento.",
          "Antes de utilizar el documento descargado, revíselo, en especial la posición de la firma y la integridad del contenido.",
        ],
      },
      {
        id: "responsabilidad",
        title: "Responsabilidad",
        blocks: [
          "El Servicio se ofrece de forma gratuita y «tal cual». En la máxima medida permitida por la ley, el Operador no será responsable de los daños indirectos, el lucro cesante ni la pérdida de datos derivados del uso del Servicio o de la imposibilidad de utilizarlo, ni de las consecuencias relacionadas con la validez, los efectos jurídicos o el uso de los documentos firmados.",
          "Esta limitación de responsabilidad no se aplica a la responsabilidad por los daños causados de forma dolosa o por negligencia grave, ni a la responsabilidad por incumplimientos contractuales que atenten contra la vida, la integridad física o la salud de las personas, y no afecta a los derechos que la ley reconoce a los consumidores.",
        ],
      },
      {
        id: "propiedad-intelectual",
        title: "Propiedad intelectual",
        blocks: [
          "El software, el diseño, el logotipo y los textos del Servicio son propiedad intelectual del Operador; no podrá copiarlos ni distribuirlos más allá del uso conforme a su finalidad.",
          "Los documentos que abra y las firmas que dibuje siguen siendo suyos; el Operador no adquiere ningún derecho sobre ellos.",
        ],
      },
      {
        id: "privacidad",
        title: "Protección de datos",
        blocks: ["El tratamiento de los datos personales se rige por la [Política de privacidad](privacy)."],
      },
      {
        id: "reclamaciones",
        title: "Contacto y reclamaciones",
        blocks: [
          "Puede enviar sus preguntas, observaciones y reclamaciones a la dirección de correo electrónico {operatorEmail}. El Operador dará una respuesta sobre el fondo de cada reclamación en un plazo máximo de 30 días.",
          "Si es usted consumidor, también puede dirigirse al organismo de arbitraje de consumo o de resolución alternativa de litigios competente según su lugar de residencia.",
        ],
      },
      {
        id: "modificaciones",
        title: "Modificación de las condiciones",
        blocks: [
          "El Operador podrá modificar estas condiciones; las modificaciones entrarán en vigor mediante su publicación en esta página, en la fecha de entrada en vigor que se indique. Si sigue utilizando el Servicio, usted acepta las condiciones modificadas.",
        ],
      },
      {
        id: "legislacion",
        title: "Legislación aplicable",
        blocks: [
          "Las presentes condiciones se rigen por la legislación húngara. Si es usted consumidor, ello no le priva de la protección que le otorgan las disposiciones imperativas de la ley de su país de residencia habitual. Los tribunales húngaros serán competentes para resolver los litigios, sin perjuicio de las normas imperativas de competencia que protegen a los consumidores.",
        ],
      },
    ],
  },

  privacy: {
    title: "Política de privacidad",
    intro:
      "Esta política explica qué datos personales trata {site}, con qué fines y durante cuánto tiempo, así como los derechos que le asisten. En resumen: no subimos su documento, no hay registro ni seguimiento, y la firma enviada desde el teléfono se elimina automáticamente al cabo de una hora.",
    sections: [
      {
        id: "responsable",
        title: "El responsable del tratamiento",
        blocks: [
          "El responsable del tratamiento de los datos personales es:",
          { operator: true },
          "Para cualquier cuestión relacionada con la protección de datos, puede escribirnos a {operatorEmail}.",
        ],
      },
      {
        id: "documentos",
        title: "Los documentos",
        blocks: [
          "Los documentos PDF y de Word que abra los procesa su navegador en su propio dispositivo: allí se realizan la apertura, la conversión del archivo de Word a PDF, la colocación de la firma y la generación del PDF que se descarga. No transmitimos el contenido del documento a nuestro servidor ni lo almacenamos.",
          "Si, en un determinado entorno de funcionamiento, el Servicio utiliza un conversor de Word en el servidor, el archivo de Word solo permanece en el servidor mientras dura la conversión y se elimina inmediatamente después.",
          "El nombre del archivo del documento se incluye en la sesión de firma con el teléfono (véase más abajo), para que en el teléfono se vea qué está firmando.",
        ],
      },
      {
        id: "sesion",
        title: "La sesión de firma con el teléfono",
        blocks: [
          "Cuando usted abre un documento, el Servicio crea una sesión con un identificador aleatorio y muestra su enlace en forma de código QR. En la sesión almacenamos los siguientes datos:",
          {
            list: [
              "el identificador aleatorio de la sesión y su hora de caducidad;",
              "el nombre del archivo del documento;",
              "si el teléfono se ha conectado o no;",
              "mientras dibuja, los trazos provisionales de la firma (que forman la vista previa en directo en el ordenador);",
              "la firma enviada, en formato vectorial: la forma y el color de los trazos y el momento del envío.",
            ],
          },
          "La finalidad del tratamiento es que la firma dibujada en el teléfono llegue a su ordenador. La base jurídica es la prestación del Servicio que usted ha solicitado (artículo 6, apartado 1, letra b), del RGPD).",
          "Los datos de la sesión se conservan durante 1 hora como máximo y, después, se eliminan de forma automática y definitiva. Solo almacenamos la forma final de los trazos; no almacenamos la evolución temporal del dibujo (velocidad, presión) y no identificamos a nadie a partir de la firma.",
        ],
      },
      {
        id: "registros",
        title: "Datos técnicos y registros",
        blocks: [
          "Como ocurre con cualquier sitio web, los servidores del proveedor de alojamiento registran automáticamente los datos técnicos de las solicitudes (dirección IP, tipo de navegador, página solicitada y hora). Tratamos estos datos para garantizar un funcionamiento seguro y para detectar errores, sobre la base de nuestro interés legítimo (artículo 6, apartado 1, letra f), del RGPD); el proveedor de alojamiento los conserva durante un breve periodo, conforme a sus propias normas.",
        ],
      },
      {
        id: "cookies",
        title: "Cookies",
        blocks: [
          "No utilizamos cookies publicitarias ni de seguimiento, ni herramientas de analítica web. Utilizamos una única cookie: si selecciona un idioma, recordamos su elección durante 1 año en la cookie denominada NEXT_LOCALE, para que la próxima vez la página se muestre también en ese idioma. Esta cookie es necesaria para el funcionamiento del Servicio que usted ha solicitado, por lo que no pedimos un consentimiento específico para ella.",
          "Las fuentes tipográficas se cargan desde nuestro propio servidor, de modo que, al abrir la página, ningún proveedor externo de fuentes recibe datos sobre usted.",
        ],
      },
      {
        id: "encargados",
        title: "Encargados del tratamiento y transferencias de datos",
        blocks: [
          "Los siguientes encargados del tratamiento tratan los datos por cuenta nuestra:",
          {
            list: [
              "alojamiento y servidor de aplicaciones: {hosting};",
              "base de datos de las sesiones: {storage}; ubicación de almacenamiento de los datos: {storageRegion}.",
            ],
          },
          "Ambos proveedores son empresas estadounidenses, por lo que los datos pueden transferirse fuera del Espacio Económico Europeo. Las transferencias se realizan al amparo del Marco de Privacidad de Datos UE-EE. UU. y/o de las cláusulas tipo de protección de datos adoptadas por la Comisión Europea.",
          "No vendemos datos personales ni los utilizamos con fines publicitarios.",
        ],
      },
      {
        id: "seguridad",
        title: "Seguridad de los datos",
        blocks: [
          "El sitio solo es accesible mediante una conexión cifrada (HTTPS). El identificador de las sesiones es aleatorio e imposible de adivinar, y los datos se eliminan automáticamente al cabo de una hora. No comparta el código QR ni el enlace con otras personas: quien los conozca podrá enviar firmas a la sesión hasta que caduque.",
        ],
      },
      {
        id: "derechos",
        title: "Sus derechos",
        blocks: [
          "En virtud del Reglamento General de Protección de Datos (RGPD), usted tiene derecho a:",
          {
            list: [
              "obtener información sobre los datos que tratamos sobre usted y acceder a ellos;",
              "solicitar la rectificación de los datos inexactos;",
              "solicitar la supresión de los datos o la limitación de su tratamiento;",
              "oponerse al tratamiento basado en el interés legítimo;",
              "solicitar que se le faciliten sus datos en un formato portable.",
            ],
          },
          "Puede enviar su solicitud a {operatorEmail}; le responderemos en el plazo máximo de un mes. Dado que no hay registro y que los datos de las sesiones se eliminan en el plazo de una hora, es muy probable que, en el momento de su solicitud, ya no tratemos ningún dato sobre usted.",
          "Si considera que hemos vulnerado sus derechos, puede presentar una reclamación ante la autoridad húngara de protección de datos, la Nemzeti Adatvédelmi és Információszabadság Hatóság (Autoridad Nacional de Protección de Datos y Libertad de Información; NAIH, 1055 Budapest, Falk Miksa utca 9–11., www.naih.hu), o ante la autoridad de protección de datos de su lugar de residencia, y también puede acudir a los tribunales.",
        ],
      },
      {
        id: "menores",
        title: "Menores",
        blocks: ["El Servicio no está dirigido a menores de 16 años, y no tratamos a sabiendas datos sobre ellos."],
      },
      {
        id: "cambios",
        title: "Cambios",
        blocks: [
          "Podemos actualizar esta política periódicamente. La versión vigente en cada momento puede consultarse en esta página, junto con su fecha de entrada en vigor. En las cuestiones relativas al funcionamiento del Servicio, se aplican los [Términos y condiciones](terms).",
        ],
      },
    ],
  },
};

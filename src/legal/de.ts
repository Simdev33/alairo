import type { LegalTexts } from "./types";

export const legal: LegalTexts = {
  terms: {
    title: "Allgemeine Geschäftsbedingungen",
    intro:
      "Dieses Dokument enthält die Bedingungen für die Nutzung des Webdienstes {site} (im Folgenden: Dienst). Bitte lesen Sie es vor der Nutzung des Dienstes aufmerksam durch.",
    sections: [
      {
        id: "betreiber",
        title: "Der Betreiber",
        blocks: ["Der Dienst wird von folgendem Betreiber erbracht (im Folgenden: Betreiber):", { operator: true }],
      },
      {
        id: "leistung",
        title: "Der Dienst",
        blocks: [
          "{site} ist ein kostenloses Werkzeug, das im Browser läuft. Damit können Sie ein PDF- oder Word-Dokument öffnen, nach dem Scannen des auf dem Bildschirm angezeigten QR-Codes auf Ihrem Handy eine Unterschrift von Hand zeichnen (oder sie am Computer mit der Maus zeichnen), die Unterschrift an einer beliebigen Stelle des Dokuments platzieren und anschließend das unterschriebene PDF herunterladen.",
          "Für die Nutzung ist weder eine Registrierung noch die Installation einer App erforderlich. Das Dokument wird in Ihrem Browser verarbeitet; Einzelheiten dazu finden Sie in der [Datenschutzerklärung](privacy).",
        ],
      },
      {
        id: "annahme",
        title: "Annahme der Bedingungen",
        blocks: [
          "Mit der Nutzung des Dienstes akzeptieren Sie diese Bedingungen. Wenn Sie mit ihnen nicht einverstanden sind, nutzen Sie den Dienst bitte nicht.",
        ],
      },
      {
        id: "entgelte",
        title: "Entgelte",
        blocks: [
          "Der Dienst ist kostenlos. Der Betreiber kann künftig kostenpflichtige Funktionen einführen; darüber informiert er vorab und eindeutig, und ein Entgelt darf er erst nach Ihrer ausdrücklichen Zustimmung berechnen.",
        ],
      },
      {
        id: "unterschrift",
        title: "Art und Rechtswirkung der Unterschrift",
        blocks: [
          "Die mit dem Dienst erstellte Unterschrift ist ein Abbild Ihrer von Hand gezeichneten Unterschrift, das in Vektorform in das Dokument eingefügt wird. Sie gilt als einfache elektronische Signatur im Sinne der Verordnung (EU) Nr. 910/2014 (eIDAS): Sie ist weder eine fortgeschrittene noch eine qualifizierte elektronische Signatur und identifiziert die unterzeichnende Person nicht.",
          "Für bestimmte Willenserklärungen und Dokumente können Rechtsvorschriften die Schriftform, eine qualifizierte elektronische Signatur, Zeugen oder eine andere Form der Beglaubigung vorschreiben. Es liegt in Ihrer Verantwortung zu entscheiden, ob eine solche Unterschrift für das jeweilige Dokument geeignet ist; holen Sie im Zweifel rechtlichen Rat ein.",
          "Der Betreiber ist nicht Partei der Rechtsverhältnisse, die zwischen Ihnen und Dritten entstehen, und prüft den Inhalt der Dokumente nicht.",
        ],
      },
      {
        id: "pflichten",
        title: "Pflichten der Nutzer",
        blocks: [
          "Bei der Nutzung des Dienstes verpflichten Sie sich,",
          {
            list: [
              "nur Dokumente zu unterschreiben, zu deren Unterzeichnung Sie berechtigt sind;",
              "im Namen anderer nur mit entsprechender Bevollmächtigung zu unterschreiben und nicht die Unterschrift anderer nachzuahmen;",
              "den Dienst nicht für Betrug, Urkundenfälschung oder andere rechtswidrige Zwecke zu nutzen;",
              "nicht zu versuchen, sich unbefugt Zugang zum Dienst zu verschaffen, und seinen Betrieb nicht zu stören (zum Beispiel durch automatisierte Massenanfragen);",
              "den QR-Code und den zugehörigen Link nicht an Unbefugte weiterzugeben — wer ihn kennt, kann bis zum Ablauf der Sitzung (höchstens 1 Stunde) eine Unterschrift an Ihr Dokument senden.",
            ],
          },
          "Bei Verdacht auf eine rechtswidrige Nutzung kann der Betreiber den Zugang zum Dienst einschränken.",
        ],
      },
      {
        id: "verfuegbarkeit",
        title: "Verfügbarkeit",
        blocks: [
          "Der Betreiber ist um einen durchgehenden Betrieb des Dienstes bemüht, übernimmt jedoch keine Gewähr für einen unterbrechungs- und fehlerfreien Betrieb. Der Dienst kann wegen Wartung, Weiterentwicklung oder Störungen externer Anbieter vorübergehend nicht erreichbar sein. Der Betreiber kann den Dienst jederzeit ändern oder einstellen.",
          "Prüfen Sie das heruntergeladene Dokument vor der Verwendung, insbesondere die Position der Unterschrift und die Vollständigkeit des Inhalts.",
        ],
      },
      {
        id: "haftung",
        title: "Haftung",
        blocks: [
          "Der Dienst wird kostenlos und „wie besehen“ bereitgestellt. Der Betreiber haftet — im größtmöglichen gesetzlich zulässigen Umfang — nicht für mittelbare Schäden, entgangenen Gewinn oder Datenverlust, die sich aus der Nutzung oder der Nichtnutzbarkeit des Dienstes ergeben, und auch nicht für Folgen, die mit der Gültigkeit, der Rechtswirkung oder der Verwendung der unterschriebenen Dokumente zusammenhängen.",
          "Die Haftungsbeschränkung gilt nicht für die Haftung für vorsätzlich oder grob fahrlässig verursachte Schäden sowie für Vertragsverletzungen, die zu einer Verletzung des Lebens, des Körpers oder der Gesundheit führen, und lässt die Rechte, die Verbrauchern von Gesetzes wegen zustehen, unberührt.",
        ],
      },
      {
        id: "geistiges-eigentum",
        title: "Geistiges Eigentum",
        blocks: [
          "Die Software, die Gestaltung, das Logo und die Texte des Dienstes sind geistiges Eigentum des Betreibers; Sie dürfen sie über die bestimmungsgemäße Nutzung hinaus weder vervielfältigen noch verbreiten.",
          "Die geöffneten Dokumente und die gezeichneten Unterschriften gehören weiterhin Ihnen; der Betreiber erwirbt daran keinerlei Rechte.",
        ],
      },
      {
        id: "datenschutz",
        title: "Datenschutz",
        blocks: ["Die Verarbeitung personenbezogener Daten ist in der [Datenschutzerklärung](privacy) geregelt."],
      },
      {
        id: "beschwerden",
        title: "Kontakt und Beschwerden",
        blocks: [
          "Fragen, Anmerkungen und Beschwerden können Sie an die E-Mail-Adresse {operatorEmail} senden. Der Betreiber beantwortet Beschwerden spätestens innerhalb von 30 Tagen in der Sache.",
          "Wenn Sie Verbraucher sind, können Sie sich auch an die für Ihren Wohnort zuständige Verbraucherschlichtungsstelle (Stelle zur alternativen Streitbeilegung) wenden.",
        ],
      },
      {
        id: "aenderungen",
        title: "Änderung der Bedingungen",
        blocks: [
          "Der Betreiber kann die Bedingungen ändern; die Änderung wird durch Veröffentlichung auf dieser Seite zu dem dort angegebenen Datum des Inkrafttretens wirksam. Durch die weitere Nutzung des Dienstes akzeptieren Sie die geänderten Bedingungen.",
        ],
      },
      {
        id: "recht",
        title: "Anwendbares Recht",
        blocks: [
          "Für diese Bedingungen gilt ungarisches Recht. Wenn Sie Verbraucher sind, wird Ihnen dadurch nicht der Schutz der zwingenden Bestimmungen entzogen, die Ihnen nach dem Recht des Staates Ihres gewöhnlichen Aufenthalts zustehen. Für Rechtsstreitigkeiten sind — unbeschadet zwingender Zuständigkeitsvorschriften zum Schutz von Verbrauchern — die ungarischen Gerichte zuständig.",
        ],
      },
    ],
  },

  privacy: {
    title: "Datenschutzerklärung",
    intro:
      "Diese Erklärung beschreibt, welche personenbezogenen Daten {site} verarbeitet, zu welchem Zweck und wie lange, und welche Rechte Sie haben. Kurz gesagt: Ihr Dokument wird nicht hochgeladen, es gibt keine Registrierung und kein Tracking, und die vom Handy gesendete Unterschrift wird nach einer Stunde automatisch gelöscht.",
    sections: [
      {
        id: "verantwortlicher",
        title: "Der Verantwortliche",
        blocks: [
          "Verantwortlicher für die Verarbeitung personenbezogener Daten ist:",
          { operator: true },
          "Bei Fragen zum Datenschutz erreichen Sie uns unter {operatorEmail}.",
        ],
      },
      {
        id: "dokumente",
        title: "Die Dokumente",
        blocks: [
          "Die geöffneten PDF- und Word-Dokumente werden von Ihrem Browser auf Ihrem eigenen Gerät verarbeitet: Das Öffnen, die Umwandlung der Word-Datei in PDF, das Platzieren der Unterschrift und die Erstellung des herunterzuladenden PDF finden dort statt. Den Inhalt des Dokuments übermitteln wir nicht an unseren Server, und wir speichern ihn nicht.",
          "Falls der Dienst in einer bestimmten Betriebsumgebung einen serverseitigen Word-Konverter nutzt, gelangt die Word-Datei nur für die Dauer der Umwandlung auf den Server und wird danach sofort gelöscht.",
          "Der Dateiname des Dokuments wird in die Sitzung für die Unterschrift per Handy übernommen (siehe unten), damit auf dem Handy zu sehen ist, was Sie unterschreiben.",
        ],
      },
      {
        id: "sitzung",
        title: "Die Sitzung für die Unterschrift per Handy",
        blocks: [
          "Wenn Sie ein Dokument öffnen, erstellt der Dienst eine Sitzung mit einer zufälligen Kennung und zeigt deren Link als QR-Code an. In der Sitzung speichern wir folgende Daten:",
          {
            list: [
              "die zufällige Kennung der Sitzung und ihren Ablaufzeitpunkt;",
              "den Dateinamen des Dokuments;",
              "ob sich das Handy verbunden hat;",
              "während des Zeichnens die aktuellen Linien der Unterschrift (dies ist die Live-Vorschau am Computer);",
              "die gesendete Unterschrift in Vektorform: Form und Farbe der Linien sowie den Zeitpunkt des Sendens.",
            ],
          },
          "Zweck der Verarbeitung ist es, die auf dem Handy gezeichnete Unterschrift auf Ihren Computer zu übertragen. Rechtsgrundlage ist die Erbringung des von Ihnen angeforderten Dienstes (Art. 6 Abs. 1 lit. b DSGVO).",
          "Die Sitzungsdaten werden höchstens 1 Stunde lang gespeichert und danach automatisch und endgültig gelöscht. Wir speichern nur die endgültige Form der Linien, nicht den zeitlichen Verlauf des Zeichnens (Geschwindigkeit, Druck), und wir identifizieren anhand der Unterschrift niemanden.",
        ],
      },
      {
        id: "protokolle",
        title: "Technische Daten und Protokolle",
        blocks: [
          "Wie bei jeder Website protokollieren die Server des Hosting-Anbieters automatisch technische Daten der Anfragen (IP-Adresse, Browsertyp, aufgerufene Seite und Zeitpunkt). Diese Daten verarbeiten wir zur Gewährleistung eines sicheren Betriebs und zur Fehlersuche auf Grundlage berechtigter Interessen (Art. 6 Abs. 1 lit. f DSGVO); der Hosting-Anbieter speichert sie nach seinen eigenen Regeln für kurze Zeit.",
        ],
      },
      {
        id: "cookies",
        title: "Cookies",
        blocks: [
          "Wir verwenden keine Werbe- oder Tracking-Cookies und keine Webanalyse. Wir setzen nur ein einziges Cookie ein: Wenn Sie eine Sprache auswählen, speichern wir Ihre Wahl für 1 Jahr im Cookie NEXT_LOCALE, damit die Seite auch beim nächsten Mal in dieser Sprache angezeigt wird. Dieses Cookie ist für die von Ihnen gewünschte Funktion des Dienstes erforderlich, daher holen wir dafür keine gesonderte Einwilligung ein.",
          "Die Schriftarten laden wir von unserem eigenen Server, sodass beim Aufrufen der Seite kein externer Schriftarten-Anbieter Daten über Sie erhält.",
        ],
      },
      {
        id: "auftragsverarbeiter",
        title: "Auftragsverarbeiter und Datenübermittlung",
        blocks: [
          "Die Daten werden in unserem Auftrag von folgenden Auftragsverarbeitern verarbeitet:",
          {
            list: [
              "Hosting und Anwendungsserver: {hosting};",
              "Datenbank der Sitzungen: {storage} — Speicherort der Daten: {storageRegion}.",
            ],
          },
          "Beide Anbieter sind US-amerikanische Unternehmen, daher können Daten auch in Länder außerhalb des Europäischen Wirtschaftsraums übermittelt werden. Die Übermittlung erfolgt auf Grundlage des EU-US-Datenschutzrahmens (EU-U.S. Data Privacy Framework) und/oder der von der Europäischen Kommission erlassenen Standarddatenschutzklauseln.",
          "Wir verkaufen keine personenbezogenen Daten und verwenden sie nicht zu Werbezwecken.",
        ],
      },
      {
        id: "sicherheit",
        title: "Datensicherheit",
        blocks: [
          "Die Seite ist ausschließlich über eine verschlüsselte Verbindung (HTTPS) erreichbar. Die Kennungen der Sitzungen sind zufällig und nicht zu erraten, und die Daten werden nach einer Stunde von selbst gelöscht. Geben Sie den QR-Code und den Link nicht an andere weiter: Wer sie kennt, kann bis zum Ablauf eine Unterschrift an die Sitzung senden.",
        ],
      },
      {
        id: "rechte",
        title: "Ihre Rechte",
        blocks: [
          "Nach der Datenschutz-Grundverordnung (DSGVO) haben Sie das Recht,",
          {
            list: [
              "Auskunft über die zu Ihrer Person verarbeiteten Daten und Zugang zu ihnen zu verlangen;",
              "die Berichtigung unrichtiger Daten zu verlangen;",
              "die Löschung der Daten oder die Einschränkung ihrer Verarbeitung zu verlangen;",
              "der auf berechtigten Interessen beruhenden Verarbeitung zu widersprechen;",
              "die Herausgabe Ihrer Daten in einem übertragbaren Format zu verlangen.",
            ],
          },
          "Ihr Anliegen können Sie an {operatorEmail} senden; wir antworten spätestens innerhalb eines Monats. Da es keine Registrierung gibt und die Sitzungsdaten innerhalb einer Stunde gelöscht werden, verarbeiten wir zum Zeitpunkt Ihrer Anfrage sehr wahrscheinlich keine Daten mehr über Sie.",
          "Wenn Sie der Ansicht sind, dass wir Ihre Rechte verletzt haben, können Sie Beschwerde bei der ungarischen Nationalen Behörde für Datenschutz und Informationsfreiheit (Nemzeti Adatvédelmi és Információszabadság Hatóság – NAIH, 1055 Budapest, Falk Miksa utca 9–11., www.naih.hu) oder bei der Datenschutzaufsichtsbehörde an Ihrem Wohnort einlegen und sich auch an ein Gericht wenden.",
        ],
      },
      {
        id: "kinder",
        title: "Kinder",
        blocks: ["Der Dienst richtet sich nicht an Kinder unter 16 Jahren, und wir verarbeiten wissentlich keine Daten über sie."],
      },
      {
        id: "aktualisierungen",
        title: "Änderungen",
        blocks: [
          "Wir können diese Erklärung von Zeit zu Zeit aktualisieren. Die jeweils gültige Fassung ist auf dieser Seite zusammen mit dem Datum des Inkrafttretens abrufbar. In Fragen, die den Betrieb des Dienstes betreffen, gelten die [Allgemeinen Geschäftsbedingungen](terms).",
        ],
      },
    ],
  },
};

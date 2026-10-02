import type { LegalTexts } from "./types";

export const legal: LegalTexts = {
  terms: {
    title: "Allgemeine Geschäftsbedingungen",
    intro:
      "Diese Bedingungen regeln die Nutzung des Webdienstes {site} ({siteUrl}, der „Dienst“) und das Abonnement dieses Dienstes. Mit der Nutzung des Dienstes oder der Bestellung des Abonnements akzeptieren Sie diese Bedingungen; wenn Sie mit ihnen nicht einverstanden sind, nutzen Sie den Dienst bitte nicht.",
    sections: [
      {
        id: "betreiber",
        title: "Der Betreiber",
        blocks: ["Der Dienst wird von folgendem Betreiber erbracht (der „Betreiber“):", { operator: true }],
      },
      {
        id: "leistung",
        title: "Der Dienst",
        blocks: [
          "{site} ist ein Online-Werkzeug, mit dem Sie ein PDF- oder Word-Dokument öffnen, Ihre handschriftliche Unterschrift auf Ihrem Handy (nach dem Scannen eines auf dem Bildschirm angezeigten QR-Codes) oder am Computer mit der Maus zeichnen, die Unterschrift an einer beliebigen Stelle des Dokuments platzieren und das unterschriebene PDF herunterladen können.",
          "Das Öffnen von Dokumenten, das Zeichnen und Platzieren von Unterschriften sowie die Vorschau des Ergebnisses sind kostenlos. Für das Herunterladen des unterschriebenen PDF ist ein Abonnement erforderlich (siehe Abschnitt 3).",
          "Die Dokumente werden in Ihrem Browser auf Ihrem eigenen Gerät verarbeitet; ihr Inhalt wird nicht an den Betreiber übermittelt. Einzelheiten dazu finden Sie in der [Datenschutzerklärung](privacy).",
        ],
      },
      {
        id: "abonnement",
        title: "Abonnement und Entgelte",
        blocks: [
          "Das Abonnement beginnt mit einem Einführungszeitraum von {days} Tagen, für den ein Entgelt von {trial} anfällt. In diesem Zeitraum kann der Dienst vollständig und ohne Einschränkungen genutzt werden.",
          "Wenn Sie das Abonnement nicht bis zum Ende des Einführungszeitraums kündigen, wird es ab Tag {next} automatisch als Abonnement mit einem monatlichen Entgelt von {monthly} fortgesetzt und verlängert sich jeden Monat, bis Sie es kündigen. Das monatliche Entgelt wird jeweils zu Beginn des Zeitraums über die Zahlungsart eingezogen, die Sie bei der Bestellung angegeben haben.",
          "Der zu zahlende Gesamtbetrag wird Ihnen vor Abgabe Ihrer Bestellung auf der Zahlungsseite deutlich angezeigt. Die Bestellung geben Sie ab, indem Sie die Schaltfläche betätigen, die auf die Zahlungspflicht hinweist (bzw. die Schaltfläche der gewählten Zahlungsart).",
          "Über Änderungen der Entgelte informieren wir Abonnenten mindestens 30 Tage vor deren Inkrafttreten per E-Mail; wenn Sie die Änderung nicht akzeptieren, können Sie Ihr Abonnement bis dahin kündigen.",
        ],
      },
      {
        id: "zahlung",
        title: "Zahlung",
        blocks: [
          "Die Zahlungen werden von Stripe Payments Europe, Ltd. (Irland) abgewickelt. Die verfügbaren Zahlungsarten hängen von Ihrem Gerät, Ihrem Browser und Ihrem Land ab und können Debit- und Kreditkarten, Apple Pay, Google Pay, PayPal und Link umfassen. Der Betreiber sieht und speichert Ihre Kartendaten nicht.",
          "Stripe sendet Ihnen für jede erfolgreiche Zahlung einen Zahlungsbeleg per E-Mail. Die gesetzlich vorgeschriebene Rechnung stellt der Betreiber aus.",
          "Schlägt eine monatliche Abbuchung fehl, versucht Stripe sie innerhalb weniger Tage erneut; gelingt sie auch dann nicht, endet das Abonnement und damit auch Ihr Zugang zum Herunterladen.",
        ],
      },
      {
        id: "kuendigung",
        title: "Kündigung",
        blocks: [
          "Sie können Ihr Abonnement jederzeit ohne Angabe von Gründen auf der Seite [Mein Konto](account) (Anmeldung mit einem Code, den wir Ihnen per E-Mail senden) mit einem Klick über die sichere Oberfläche von Stripe kündigen.",
          "Die Kündigung wird zum Ende des laufenden Zeitraums wirksam: Bis dahin behalten Sie Ihren Zugang, und es erfolgen keine weiteren Abbuchungen. Wenn Sie während des Einführungszeitraums kündigen, wird ab Tag {next} kein monatliches Entgelt berechnet.",
          "Das Entgelt für einen bereits begonnenen Zeitraum wird nicht erstattet, außer wenn Sie Ihr Widerrufsrecht ausüben, sowie in den sonstigen gesetzlich vorgeschriebenen Fällen.",
        ],
      },
      {
        id: "widerruf",
        title: "Widerrufsrecht",
        blocks: [
          "Wenn Sie das Abonnement als Verbraucher bestellen, können Sie den Vertrag innerhalb von 14 Tagen ab der Bestellung ohne Angabe von Gründen widerrufen. Ihren Entschluss, den Vertrag zu widerrufen, können Sie dem Betreiber mittels einer eindeutigen Erklärung mitteilen (zum Beispiel per E-Mail an {operatorEmail}); Sie können dafür das Muster-Widerrufsformular aus Anhang I Teil B der Richtlinie 2011/83/EU verwenden, sind dazu aber nicht verpflichtet.",
          "Da Sie bei der Bestellung ausdrücklich verlangen, dass mit der Erbringung des Dienstes sofort begonnen wird, müssen Sie im Falle eines Widerrufs ein anteiliges Entgelt für den bis zum Widerruf genutzten Zeitraum zahlen. Den verbleibenden Betrag erstatten wir Ihnen innerhalb von 14 Tagen ab dem Tag, an dem Sie uns über Ihren Widerruf informieren, über die für die Zahlung verwendete Zahlungsart.",
          "Das Widerrufsrecht lässt Ihre Möglichkeit unberührt, das Abonnement jederzeit zu kündigen (siehe Abschnitt 5).",
        ],
      },
      {
        id: "konto",
        title: "Konto und Anmeldung",
        blocks: [
          "Eine gesonderte Registrierung mit Passwort gibt es nicht. Ihr Konto ist mit der E-Mail-Adresse verknüpft, die Sie bei der Zahlung angeben: In dem Browser, in dem Sie bezahlt haben, werden Sie automatisch angemeldet, und auf anderen Geräten können Sie sich mit einem 6-stelligen Code anmelden, der Ihnen per E-Mail zugesandt wird und 10 Minuten lang gültig ist.",
          "Geben Sie Ihren Anmeldecode an niemanden weiter. Das Abonnement ist für die persönliche Nutzung bestimmt; die Weitergabe oder der Weiterverkauf des Zugangs ist nicht gestattet.",
        ],
      },
      {
        id: "unterschrift",
        title: "Art und Rechtswirkung der Unterschrift",
        blocks: [
          "Die mit dem Dienst erstellte Unterschrift ist ein Abbild Ihrer handschriftlichen Unterschrift, das in Vektorform in das Dokument eingefügt wird. Sie gilt als einfache elektronische Signatur im Sinne der Verordnung (EU) Nr. 910/2014 (eIDAS): Sie ist weder eine fortgeschrittene noch eine qualifizierte elektronische Signatur und identifiziert die unterzeichnende Person nicht.",
          "Für bestimmte Willenserklärungen und Dokumente können Rechtsvorschriften die Schriftform, eine qualifizierte elektronische Signatur, Zeugen oder eine andere Form der Beglaubigung vorschreiben. Es liegt in Ihrer Verantwortung zu entscheiden, ob eine solche Unterschrift für das jeweilige Dokument geeignet ist; holen Sie im Zweifel rechtlichen Rat ein.",
          "Der Betreiber ist nicht Partei der Rechtsverhältnisse zwischen Ihnen und Dritten und prüft den Inhalt der Dokumente nicht.",
        ],
      },
      {
        id: "nutzung",
        title: "Nutzungsregeln",
        blocks: [
          "Sie dürfen den Dienst nur zu rechtmäßigen Zwecken und im Einklang mit diesen Bedingungen nutzen. Insbesondere verpflichten Sie sich:",
          {
            list: [
              "nur Dokumente zu unterschreiben, zu deren Unterzeichnung Sie berechtigt sind;",
              "im Namen anderer nur mit entsprechender Bevollmächtigung zu unterschreiben und nicht die Unterschrift anderer nachzuahmen;",
              "den Dienst nicht für Betrug, Urkundenfälschung oder andere rechtswidrige Zwecke zu nutzen;",
              "nicht zu versuchen, sich unbefugt Zugang zum Dienst zu verschaffen, seine Sicherheits- oder Zahlungsmechanismen zu umgehen oder seinen Betrieb zu behindern (zum Beispiel durch automatisierte Massenanfragen);",
              "den QR-Code und den zugehörigen Link nicht an Unbefugte weiterzugeben — wer ihn kennt, kann bis zum Ablauf der Sitzung (höchstens 1 Stunde) eine Unterschrift an Ihr Dokument senden.",
            ],
          },
          "Wenn die verarbeiteten Dokumente personenbezogene Daten anderer Personen enthalten, sind Sie für den rechtmäßigen Umgang mit diesen Daten verantwortlich.",
          "Der Betreiber kann den Zugang einschränken oder beenden, um Missbrauch zu verhindern; bei einem schwerwiegenden Verstoß gegen diese Bedingungen kann das Abonnement mit sofortiger Wirkung gekündigt werden.",
        ],
      },
      {
        id: "geistiges-eigentum",
        title: "Geistiges Eigentum",
        blocks: [
          "Die Software, die Gestaltung, das Logo und die Texte des Dienstes sind geistiges Eigentum des Betreibers; sie dürfen über die bestimmungsgemäße Nutzung des Dienstes hinaus weder vervielfältigt noch verbreitet werden.",
          "Der Dienst nutzt außerdem Open-Source-Komponenten (etwa Mozilla pdf.js, pdf-lib, perfect-freehand und docx-preview), für die jeweils eigene Lizenzbedingungen gelten.",
          "Die Dokumente, die Sie öffnen, und die Unterschriften, die Sie zeichnen, gehören weiterhin Ihnen; der Betreiber erwirbt daran keinerlei Rechte.",
        ],
      },
      {
        id: "haftung",
        title: "Haftung",
        blocks: [
          "Der Betreiber bemüht sich nach Kräften um einen durchgehenden und fehlerfreien Betrieb des Dienstes, übernimmt jedoch keine Gewähr dafür, dass der Dienst ohne Unterbrechungen oder Fehler verfügbar ist. Prüfen Sie das heruntergeladene Dokument vor der Verwendung, insbesondere die Position der Unterschrift und die Vollständigkeit des Inhalts, und bewahren Sie stets eine Kopie Ihrer Originaldateien auf.",
          "Der Betreiber haftet — im größtmöglichen gesetzlich zulässigen Umfang — nicht für mittelbare Schäden, entgangenen Gewinn oder Datenverlust, die sich aus der Nutzung oder der Nichtnutzbarkeit des Dienstes ergeben, und auch nicht für Folgen, die mit der Gültigkeit, der Rechtswirkung oder der Verwendung der unterschriebenen Dokumente zusammenhängen. Diese Beschränkung gilt nicht für die Haftung für vorsätzlich oder grob fahrlässig verursachte Schäden sowie für Vertragsverletzungen, die zu einer Verletzung des Lebens, des Körpers oder der Gesundheit führen, und lässt die Rechte, die Verbrauchern von Gesetzes wegen zustehen, unberührt.",
        ],
      },
      {
        id: "verfuegbarkeit",
        title: "Verfügbarkeit und Änderungen",
        blocks: [
          "Der Betreiber ist berechtigt, den Dienst weiterzuentwickeln und zu ändern. Wird der Dienst dauerhaft eingestellt, beenden wir die Abonnements und erstatten das Entgelt für den nicht genutzten Zeitraum anteilig.",
        ],
      },
      {
        id: "datenschutz",
        title: "Datenschutz",
        blocks: ["Einzelheiten zur Verarbeitung personenbezogener Daten finden Sie in der [Datenschutzerklärung](privacy)."],
      },
      {
        id: "aenderungen",
        title: "Änderung der Bedingungen",
        blocks: [
          "Der Betreiber ist berechtigt, diese Bedingungen zu ändern. Änderungen werden mit der Veröffentlichung auf dieser Seite zu dem oben im Dokument angegebenen Datum des Inkrafttretens wirksam. Über wesentliche Änderungen zu ihrem Nachteil informieren wir Abonnenten mindestens 30 Tage im Voraus per E-Mail; wenn sie die Änderungen nicht akzeptieren, können sie ihr Abonnement vor deren Inkrafttreten kündigen.",
        ],
      },
      {
        id: "recht",
        title: "Anwendbares Recht und Streitigkeiten",
        blocks: [
          "Für diese Bedingungen gilt slowakisches Recht. Wenn Sie den Dienst als Verbraucher nutzen, wird Ihnen durch diese Rechtswahl nicht der Schutz entzogen, den Ihnen die zwingenden Verbraucherschutzvorschriften des Staates Ihres Wohnsitzes gewähren.",
          "Wir bemühen uns, Streitigkeiten gütlich beizulegen: Ihre Beschwerde können Sie an {operatorEmail} senden, und wir antworten innerhalb von 30 Tagen. Wenn wir Ihre Beschwerde zurückweisen oder nicht innerhalb von 30 Tagen antworten, können Sie als Verbraucher ein Verfahren zur alternativen Streitbeilegung bei der Slowakischen Handelsinspektion (Slovenská obchodná inšpekcia, https://www.soi.sk) oder bei einer anderen Streitbeilegungsstelle einleiten, die in der Liste des slowakischen Wirtschaftsministeriums geführt wird. Sie können sich auch an die Verbraucherschutzbehörde und die Gerichte Ihres Wohnorts wenden.",
        ],
      },
      {
        id: "kontakt",
        title: "Kontakt",
        blocks: ["Mit Fragen, Anmerkungen oder Beschwerden können Sie sich unter folgender E-Mail-Adresse an den Betreiber wenden: {operatorEmail}."],
      },
    ],
  },

  privacy: {
    title: "Datenschutzerklärung",
    intro:
      "Gemäß der Verordnung (EU) 2016/679 (Datenschutz-Grundverordnung, DSGVO) erläutert diese Erklärung, welche personenbezogenen Daten wir verarbeiten, wenn Sie {site} ({siteUrl}) nutzen, zu welchem Zweck, auf welcher Rechtsgrundlage und wie lange, und welche Rechte Sie haben.",
    sections: [
      {
        id: "verantwortlicher",
        title: "Der Verantwortliche",
        blocks: [{ operator: true }, "In Datenschutzangelegenheiten erreichen Sie uns unter {operatorEmail}."],
      },
      {
        id: "kurzfassung",
        title: "Das Wichtigste in Kürze",
        blocks: [
          {
            list: [
              "Ihre Dokumente werden von Ihrem Browser auf Ihrem eigenen Gerät geöffnet und unterschrieben; ihr Inhalt gelangt nie zu uns.",
              "Die Unterschrift, die Sie auf Ihrem Handy zeichnen, gelangt über unseren Server auf Ihren Computer und wird spätestens nach 1 Stunde automatisch gelöscht.",
              "Es gibt keine Registrierung mit Passwort. Wenn Sie ein Abonnement abschließen, verarbeiten wir Ihre E-Mail-Adresse und Ihre Abonnementdaten.",
              "Zahlungen werden von Stripe abgewickelt; Ihre Kartendaten sehen und speichern wir nicht.",
              "Wir nutzen keine Webanalyse. Die Google-Ads-Conversion-Messung läuft nur, wenn Sie sie im Cookie-Banner erlauben; ansonsten setzen wir nur Cookies ein, die für die Anmeldung, die Zahlung und Ihre Sprachauswahl erforderlich sind.",
            ],
          },
        ],
      },
      {
        id: "dokumente",
        title: "Ihre Dokumente",
        blocks: [
          "Die PDF- und Word-Dokumente, die Sie öffnen, werden von Ihrem Browser auf Ihrem eigenen Gerät verarbeitet: Das Öffnen, die Umwandlung von Word-Dateien in PDF, das Platzieren der Unterschrift und die Erstellung des herunterzuladenden PDF finden dort statt. Wir haben keinen Zugriff auf den Inhalt Ihrer Dokumente und speichern ihn nicht.",
          "Falls der Dienst in einer bestimmten Betriebsumgebung einen serverseitigen Word-Konverter nutzt, befindet sich die Word-Datei nur für die Dauer der Umwandlung auf dem Server und wird unmittelbar danach gelöscht.",
          "Solange die Zahlungsseite geöffnet ist, speichert Ihr Browser das unterschriebene PDF bis zu 60 Minuten lang auf Ihrem eigenen Gerät (IndexedDB), damit es nicht verloren geht, wenn Sie eine Zahlungsart auf eine andere Seite weiterleitet (etwa zu PayPal). Auch diese Datei gelangt nicht zu uns.",
          "Der Dateiname des Dokuments wird in die Sitzung für die Unterschrift per Handy übernommen (siehe unten), damit Ihr Handy anzeigen kann, was Sie unterschreiben.",
        ],
      },
      {
        id: "sitzung",
        title: "Die Sitzung für die Unterschrift per Handy",
        blocks: [
          "Wenn Sie ein Dokument öffnen, erstellt der Dienst eine Sitzung mit einer zufälligen Kennung und zeigt deren Link als QR-Code an. In der Sitzung wird Folgendes gespeichert:",
          {
            list: [
              "die zufällige Kennung der Sitzung und ihr Ablaufzeitpunkt;",
              "der Dateiname des Dokuments;",
              "ob sich ein Handy verbunden hat;",
              "während des Zeichnens die aktuellen Linien der Unterschrift (die Live-Vorschau auf Ihrem Computer);",
              "die gesendete Unterschrift in Vektorform: die Form der Linien, ihre Farbe und der Zeitpunkt des Sendens.",
            ],
          },
          "Zweck: die Übertragung der auf Ihrem Handy gezeichneten Unterschrift auf Ihren Computer. Rechtsgrundlage: die Erbringung des Dienstes auf Ihre Anforderung (Art. 6 Abs. 1 lit. b DSGVO).",
          "Speicherdauer: Die Sitzungsdaten werden höchstens 1 Stunde lang gespeichert und danach automatisch und endgültig gelöscht. Wir speichern nur die endgültige Form der Linien, nicht den zeitlichen Verlauf des Zeichnens (Geschwindigkeit, Druck), und wir identifizieren niemanden anhand seiner Unterschrift.",
        ],
      },
      {
        id: "abonnement",
        title: "Abonnement und Zahlung",
        blocks: [
          "Wenn Sie ein Abonnement abschließen, werden die Daten, die Sie auf der Zahlungsseite eingeben, von Stripe verarbeitet; wir erhalten die Daten, die wir benötigen, um Ihr Abonnement zu erfassen.",
          {
            list: [
              "Verarbeitete Daten: E-Mail-Adresse, die von Stripe vergebenen Kunden- und Abonnementkennungen, Status und Zeiträume des Abonnements, Betrag und Datum der Zahlungen, die Art des Zahlungsmittels (zum Beispiel Karte und deren letzte 4 Ziffern) sowie — sofern die Zahlungsseite danach fragt — Rechnungsland und Postleitzahl.",
              "Zweck: Abschluss und Erfüllung des Abonnements, Einzug der Entgelte, Prüfung der Zugangsberechtigung, Rechnungsstellung und Kundenservice.",
              "Rechtsgrundlage: Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO); für die Aufbewahrung der Buchhaltungsunterlagen eine rechtliche Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO).",
              "Speicherdauer: solange das Abonnement besteht; nach dessen Ende bewahren wir die Buchhaltungsunterlagen gemäß § 35 des slowakischen Rechnungslegungsgesetzes (Gesetz Nr. 431/2002 Slg.) 10 Jahre lang auf. Die übrigen Daten löschen wir nach Ende des Abonnements auf Ihren Wunsch.",
            ],
          },
          "Die Zahlungen werden von Stripe Payments Europe, Ltd. (1 Grand Canal Street Lower, Grand Canal Dock, Dublin, D02 H210, Irland) abgewickelt, die in Bezug auf die Zahlungsdaten und die Betrugsprävention eigenständig Verantwortlicher ist. Informationen zu ihrer Datenverarbeitung finden Sie unter https://stripe.com/privacy.",
        ],
      },
      {
        id: "anmeldung",
        title: "Anmeldung mit einem E-Mail-Code",
        blocks: [
          "Auf anderen Geräten können Sie sich mit einem Einmalcode anmelden, der Ihnen per E-Mail zugesandt wird.",
          {
            list: [
              "Verarbeitete Daten: E-Mail-Adresse, der Anmeldecode in gehashter Form, sein Ablaufzeitpunkt und die Anzahl der Versuche.",
              "Zweck: Anmeldung und Schutz Ihres Kontos.",
              "Rechtsgrundlage: Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO).",
              "Speicherdauer: Der Code ist 10 Minuten lang gültig, und wir löschen ihn unmittelbar nach der Verwendung.",
            ],
          },
          "Die Anmelde-E-Mails versendet Resend, Inc. (https://resend.com) als Auftragsverarbeiter.",
        ],
      },
      {
        id: "protokolle",
        title: "Technische Protokolle",
        blocks: [
          "Beim Ausliefern der Seite zeichnen die Server des Hosting-Anbieters — wie bei jeder Website — technische Daten auf.",
          {
            list: [
              "Verarbeitete Daten: IP-Adresse, Zeitpunkt der Anfrage, Adresse der aufgerufenen Seite, Browsertyp und -version.",
              "Zweck: der sichere und unterbrechungsfreie Betrieb des Dienstes sowie die Erkennung von Fehlern und Missbrauch.",
              "Rechtsgrundlage: das berechtigte Interesse des Betreibers (Art. 6 Abs. 1 lit. f DSGVO).",
              "Speicherdauer: für kurze Zeit, gemäß den Aufbewahrungsregeln des Hosting-Anbieters.",
            ],
          },
        ],
      },
      {
        id: "cookies",
        title: "Cookies und lokale Speicherung",
        blocks: [
          "Die folgenden Cookies sind für das Funktionieren des Dienstes erforderlich; diese bedürfen keiner Einwilligung:",
          {
            list: [
              "ds_session: hält Sie angemeldet (180 Tage);",
              "ds_signed_in: teilt der Seite mit, dass Sie angemeldet sind (180 Tage);",
              "ds_login: der Anmeldevorgang mit Code (10 Minuten);",
              "NEXT_LOCALE: speichert die Sprache, die Sie in der Sprachauswahl gewählt haben (1 Jahr);",
              "ds_consent: speichert Ihre Auswahl im Cookie-Banner (180 Tage).",
            ],
          },
          "Werbe-Cookies – nur mit Ihrer Einwilligung: Wenn Sie im Cookie-Banner auf „Akzeptieren“ klicken, laden wir das Google-Tag der Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irland), um zu messen, ob unsere Google-Ads-Anzeigen zu Käufen führen (Conversion-Messung). Google setzt dann eigene Cookies (zum Beispiel _gcl_au, bis zu 90 Tage) und erhält Ihre IP-Adresse, Browserdaten, die Adresse der besuchten Seite und die Kennung des Anzeigenklicks. Rechtsgrundlage: Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Ohne Ihre Einwilligung wird das Google-Tag überhaupt nicht geladen. Sie können Ihre Einwilligung jederzeit über den Link „Cookie-Einstellungen“ unten auf der Seite erteilen oder widerrufen; der Widerruf berührt nicht die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung. Google kann Daten auch in die USA übermitteln (EU-US-Datenschutzrahmen); Datenschutzerklärung von Google: https://policies.google.com/privacy.",
          "Auf der Zahlungsseite verwendet Stripe eigene Cookies, um die Zahlung sicher abzuwickeln und Betrug zu verhindern. Analyse-Cookies verwenden wir nicht. Die Schriftarten laden wir von unserem eigenen Server, sodass kein externer Schriftarten-Anbieter Daten über Sie erhält.",
        ],
      },
      {
        id: "auftragsverarbeiter",
        title: "Auftragsverarbeiter und Datenübermittlung",
        blocks: [
          "Die folgenden Auftragsverarbeiter verarbeiten Daten in unserem Auftrag:",
          {
            list: [
              "Hosting und Anwendungsserver: {hosting};",
              "Datenbank für die Sitzungen zur Unterschrift per Handy: {storage} — Speicherort der Daten: {storageRegion};",
              "Versand der Anmelde-E-Mails: Resend, Inc., USA.",
            ],
          },
          "Diese Anbieter haben ihren Sitz in den Vereinigten Staaten von Amerika, daher können Daten auch in Länder außerhalb des Europäischen Wirtschaftsraums übermittelt werden. Solche Übermittlungen erfolgen mit geeigneten Garantien (dem EU-US-Datenschutzrahmen – EU-U.S. Data Privacy Framework – und/oder den von der Europäischen Kommission erlassenen Standardvertragsklauseln).",
          "Abgesehen von der Google-Ads-Conversion-Messung, in die Sie einwilligen (siehe „Cookies und lokale Speicherung“), geben wir Ihre Daten an keine weiteren Dritten weiter und verkaufen sie nicht.",
        ],
      },
      {
        id: "sicherheit",
        title: "Datensicherheit",
        blocks: [
          "Alle Verbindungen zwischen der Seite und dem Server sind verschlüsselt (HTTPS). Die Anmelde-Cookies sind signiert und können nicht von Skripten gelesen werden. Die Sitzungskennungen sind zufällig und nicht zu erraten, und die Sitzungsdaten löschen sich nach einer Stunde von selbst. Geben Sie den QR-Code und den zugehörigen Link nicht an andere weiter: Wer ihn kennt, kann bis zum Ablauf eine Unterschrift an die Sitzung senden.",
        ],
      },
      {
        id: "rechte",
        title: "Ihre Rechte",
        blocks: [
          "Nach der DSGVO haben Sie folgende Rechte:",
          {
            list: [
              "Recht auf Information und Auskunft (Art. 15);",
              "Recht auf Berichtigung (Art. 16);",
              "Recht auf Löschung (Art. 17);",
              "Recht auf Einschränkung der Verarbeitung (Art. 18);",
              "Recht auf Datenübertragbarkeit (Art. 20);",
              "Recht auf Widerspruch gegen eine auf berechtigtem Interesse beruhende Verarbeitung (Art. 21).",
            ],
          },
          "Ihr Anliegen können Sie an {operatorEmail} senden; wir antworten spätestens innerhalb eines Monats. Ihre E-Mail-Adresse können Sie auch selbst auf der Seite [Mein Konto](account) über die Oberfläche von Stripe ändern.",
        ],
      },
      {
        id: "rechtsbehelfe",
        title: "Rechtsbehelfe",
        blocks: [
          "Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen geltendes Recht verstößt, können Sie Beschwerde bei der für den Sitz des Verantwortlichen zuständigen Aufsichtsbehörde einlegen, dem Amt für den Schutz personenbezogener Daten der Slowakischen Republik (Úrad na ochranu osobných údajov Slovenskej republiky; Hraničná 12, 820 07 Bratislava 27; https://dataprotection.gov.sk), oder bei der Datenschutzaufsichtsbehörde Ihres Wohnorts oder Arbeitsorts — in Ungarn zum Beispiel bei der Nationalen Behörde für Datenschutz und Informationsfreiheit (Nemzeti Adatvédelmi és Információszabadság Hatóság, NAIH; 1055 Budapest, Falk Miksa utca 9–11.; https://naih.hu).",
          "Werden Ihre Rechte verletzt, können Sie sich auch an ein Gericht wenden; Sie können die Klage vor den Gerichten des Mitgliedstaats Ihres Wohnorts erheben.",
        ],
      },
      {
        id: "kinder",
        title: "Kinder",
        blocks: ["Der Dienst richtet sich nicht an Kinder unter 16 Jahren, und wir verarbeiten nicht wissentlich Daten von ihnen."],
      },
      {
        id: "aenderungen",
        title: "Änderungen dieser Erklärung",
        blocks: [
          "Wir aktualisieren diese Erklärung, wenn sich der Dienst ändert; das Datum des Inkrafttretens ist oben im Dokument angegeben. Die Bedingungen für die Nutzung des Dienstes sind in den [Allgemeinen Geschäftsbedingungen](terms) festgelegt.",
        ],
      },
    ],
  },
};

import type { LegalTexts } from "./types";

// Magyar jogi szövegek — az angol (en.ts) fordítása.
export const legal: LegalTexts = {
  terms: {
    title: "Általános Szerződési Feltételek",
    intro:
      "Ez a dokumentum a {site} webes szolgáltatás ({siteUrl}, a továbbiakban: Szolgáltatás) használatának és az arra szóló előfizetésnek a feltételeit tartalmazza. A Szolgáltatás használatával vagy az előfizetés megrendelésével elfogadod ezeket a feltételeket; ha nem értesz egyet velük, kérjük, ne használd a Szolgáltatást.",
    sections: [
      {
        id: "uzemelteto",
        title: "Az üzemeltető",
        blocks: ["A Szolgáltatást az alábbi üzemeltető nyújtja (a továbbiakban: Üzemeltető):", { operator: true }],
      },
      {
        id: "szolgaltatas",
        title: "A Szolgáltatás",
        blocks: [
          "A {site} egy online eszköz, amellyel PDF- vagy Word-dokumentumot nyithatsz meg, a kézzel írt aláírásodat megrajzolhatod a telefonodon (a képernyőn megjelenő QR-kód beolvasása után) vagy a számítógépeden egérrel, az aláírást a dokumentum tetszőleges helyére teheted, és letöltheted az aláírt PDF-et.",
          "A dokumentumok megnyitása, az aláírások megrajzolása és elhelyezése, valamint az eredmény előnézete ingyenes. Az aláírt PDF letöltéséhez előfizetés szükséges (lásd a 3. pontot).",
          "A dokumentumok feldolgozása a böngésződben, a saját eszközödön történik; a tartalmuk nem jut el az Üzemeltetőhöz. A részleteket az [Adatvédelmi tájékoztató](privacy) tartalmazza.",
        ],
      },
      {
        id: "elofizetes",
        title: "Előfizetés és díjak",
        blocks: [
          "Az előfizetés egy {days} napos bevezető időszakkal indul, amelynek díja {trial}. Ebben az időszakban a Szolgáltatás teljes körűen, korlátozás nélkül használható.",
          "Ha a bevezető időszak végéig nem mondod le az előfizetést, az a {next}. naptól automatikusan havi {monthly} díjú előfizetésként folytatódik, és havonta megújul, amíg le nem mondod. A havidíj terhelése minden időszak elején történik, a megrendeléskor megadott fizetési módra.",
          "A fizetendő teljes összeg a megrendelés leadása előtt egyértelműen megjelenik a fizetési oldalon. A megrendelést a fizetési kötelezettséget jelző gomb (vagy a kiválasztott fizetési mód gombja) megnyomásával adod le.",
          "A díjak változásáról az előfizetőket legalább 30 nappal a változás hatálybalépése előtt e-mailben értesítjük; ha nem fogadod el, addig lemondhatod az előfizetésedet.",
        ],
      },
      {
        id: "fizetes",
        title: "Fizetés",
        blocks: [
          "A fizetéseket a Stripe Payments Europe, Ltd. (Írország) dolgozza fel. Az elérhető fizetési módok az eszközödtől, a böngésződtől és az országodtól függenek; ezek között lehet a betéti és a hitelkártya, az Apple Pay, a Google Pay, a PayPal és a Link. Az Üzemeltető nem látja és nem tárolja a kártyaadataidat.",
          "Minden sikeres fizetésről a Stripe e-mailben nyugtát küld neked. A jogszabály által előírt számlát az Üzemeltető állítja ki.",
          "Ha egy havi terhelés nem sikerül, a Stripe néhány napon belül újra megpróbálja; ha ez sem sikerül, az előfizetés a letöltési hozzáféréseddel együtt megszűnik.",
        ],
      },
      {
        id: "lemondas",
        title: "Lemondás",
        blocks: [
          "Az előfizetésedet bármikor, indoklás nélkül lemondhatod a [Fiókom](account) oldalon (az e-mailben kapott kóddal lépsz be), egy kattintással, a Stripe biztonságos felületén.",
          "A lemondás az aktuális időszak végén lép hatályba: addig megmarad a hozzáférésed, és további terhelés nem történik. Ha a bevezető időszakban mondod le, a {next}. naptól nem számítunk fel havidíjat.",
          "A már megkezdett időszak díját nem térítjük vissza, kivéve, ha élsz az elállási jogoddal, valamint a jogszabály által előírt egyéb esetekben.",
        ],
      },
      {
        id: "elallas",
        title: "Elállási jog",
        blocks: [
          "Ha fogyasztóként rendeled meg az előfizetést, a megrendeléstől számított 14 napon belül indoklás nélkül elállhatsz a szerződéstől. Elállási szándékodat egyértelmű nyilatkozattal jelezheted az Üzemeltetőnek (például a(z) {operatorEmail} címre küldött e-mailben); ehhez használhatod a 2011/83/EU irányelv I. mellékletének B. részében található elállási nyilatkozatmintát, de nem kötelező.",
          "Mivel a megrendeléskor kifejezetten kéred a Szolgáltatás azonnali megkezdését, elállás esetén az elállásig igénybe vett időszakra arányos díjat kell fizetned. A fennmaradó összeget attól a naptól számított 14 napon belül visszatérítjük a fizetéshez használt fizetési módra, amikor az elállásodról tájékoztatsz minket.",
          "Az elállási jog nem érinti azt a lehetőségedet, hogy az előfizetést bármikor lemondd (lásd az 5. pontot).",
        ],
      },
      {
        id: "fiok",
        title: "Fiók és belépés",
        blocks: [
          "Külön, jelszavas regisztráció nincs. A fiókod a fizetéskor megadott e-mail-címedhez kapcsolódik: abban a böngészőben, amelyben fizettél, automatikusan be vagy jelentkezve, más eszközökön pedig egy e-mailben kapott, 10 percig érvényes, 6 jegyű kóddal léphetsz be.",
          "A belépési kódodat senkivel ne oszd meg. Az előfizetés személyes használatra szól; a hozzáférés megosztása vagy továbbértékesítése nem megengedett.",
        ],
      },
      {
        id: "alairas",
        title: "Az aláírás jellege és joghatása",
        blocks: [
          "A Szolgáltatással létrehozott aláírás a kézzel írt aláírásod képe, amely vektoros formában kerül a dokumentumba. Ez az Európai Unió 910/2014/EU rendelete (eIDAS) szerinti egyszerű elektronikus aláírásnak minősül: nem fokozott biztonságú és nem minősített elektronikus aláírás, és nem azonosítja az aláíró személyét.",
          "Egyes jognyilatkozatokhoz és dokumentumokhoz jogszabály írásbeli alakot, minősített elektronikus aláírást, tanúkat vagy más hitelesítést írhat elő. A te felelősséged eldönteni, hogy az adott dokumentumhoz megfelelő-e az ilyen aláírás; kétség esetén kérd jogász tanácsát.",
          "Az Üzemeltető nem fél a közted és harmadik személyek között létrejövő jogviszonyokban, és nem vizsgálja a dokumentumok tartalmát.",
        ],
      },
      {
        id: "felhasznalas",
        title: "A használat feltételei",
        blocks: [
          "A Szolgáltatást csak jogszerű célra és a jelen feltételeknek megfelelően használhatod. Különösen vállalod, hogy:",
          {
            list: [
              "csak olyan dokumentumot írsz alá, amelynek aláírására jogosult vagy;",
              "más nevében csak megfelelő felhatalmazással írsz alá, és nem utánzod más aláírását;",
              "nem használod a Szolgáltatást csalásra, okirat-hamisításra vagy más jogellenes célra;",
              "nem kísérelsz meg jogosulatlanul hozzáférni a Szolgáltatáshoz, megkerülni a biztonsági vagy fizetési intézkedéseit, és nem akadályozod a működését (például automatizált tömeges kérésekkel);",
              "a QR-kódot és a hozzá tartozó linket nem osztod meg illetéktelenekkel — aki ismeri, a munkamenet lejártáig (legfeljebb 1 óra) aláírást küldhet a dokumentumodhoz.",
            ],
          },
          "Ha a feldolgozott dokumentumok más személyek személyes adatait tartalmazzák, ezeknek az adatoknak a jogszerű kezeléséért te felelsz.",
          "Az Üzemeltető a visszaélések megelőzése érdekében korlátozhatja vagy megszüntetheti a hozzáférést; a jelen feltételek súlyos megsértése esetén az előfizetés azonnali hatállyal megszüntethető.",
        ],
      },
      {
        id: "szellemi-tulajdon",
        title: "Szellemi tulajdon",
        blocks: [
          "A Szolgáltatás szoftvere, megjelenése, logója és szövegei az Üzemeltető szellemi tulajdonát képezik; ezeket a Szolgáltatás rendeltetésszerű használatán túl nem másolhatod és nem terjesztheted.",
          "A Szolgáltatás nyílt forráskódú összetevőket is használ (például Mozilla pdf.js, pdf-lib, perfect-freehand és docx-preview), amelyekre a saját licencfeltételeik vonatkoznak.",
          "A megnyitott dokumentumok és a megrajzolt aláírások a tieid maradnak; az Üzemeltető ezekre semmilyen jogot nem szerez.",
        ],
      },
      {
        id: "felelosseg",
        title: "Felelősség",
        blocks: [
          "Az Üzemeltető mindent megtesz a Szolgáltatás folyamatos és helyes működéséért, de nem garantálja, hogy az megszakítás és hiba nélkül elérhető lesz. A letöltött dokumentumot felhasználás előtt ellenőrizd, különösen az aláírás helyét és a tartalom teljességét, és az eredeti fájljaidról mindig őrizz meg egy másolatot.",
          "Az Üzemeltető — a jogszabályok által megengedett legnagyobb mértékben — nem felel a Szolgáltatás használatából vagy használhatatlanságából eredő közvetett károkért, elmaradt haszonért vagy adatvesztésért, sem az aláírt dokumentumok érvényességével, joghatásával vagy felhasználásával összefüggő következményekért. Ez a korlátozás nem vonatkozik a szándékosan vagy súlyos gondatlansággal okozott kárért, valamint az emberi életet, testi épséget vagy egészséget megsértő szerződésszegésért való felelősségre, és nem érinti a fogyasztókat jogszabály alapján megillető jogokat.",
        ],
      },
      {
        id: "rendelkezesre-allas",
        title: "Rendelkezésre állás és változások",
        blocks: [
          "Az Üzemeltető jogosult a Szolgáltatást fejleszteni és módosítani. Ha a Szolgáltatás véglegesen megszűnik, az előfizetéseket megszüntetjük, és a fel nem használt időszak díját időarányosan visszatérítjük.",
        ],
      },
      {
        id: "adatvedelem",
        title: "Adatvédelem",
        blocks: ["A személyes adatok kezelésének részleteit az [Adatvédelmi tájékoztató](privacy) tartalmazza."],
      },
      {
        id: "modositas",
        title: "A feltételek módosítása",
        blocks: [
          "Az Üzemeltető jogosult a jelen feltételeket módosítani. A módosítások az ezen az oldalon történő közzététellel, a dokumentum tetején feltüntetett hatálybalépési napon lépnek hatályba. A számukra hátrányos lényeges változásokról az előfizetőket legalább 30 nappal előre e-mailben értesítjük; ha nem fogadják el a változásokat, a hatálybalépésük előtt lemondhatják az előfizetésüket.",
        ],
      },
      {
        id: "jog",
        title: "Irányadó jog és jogviták",
        blocks: [
          "A jelen feltételekre a szlovák jog az irányadó. Ha fogyasztóként használod a Szolgáltatást, ez a jogválasztás nem foszt meg attól a védelemtől, amelyet a lakóhelyed szerinti ország kötelező fogyasztóvédelmi szabályai biztosítanak számodra.",
          "Az esetleges vitákat igyekszünk békés úton rendezni: panaszodat a(z) {operatorEmail} címre küldheted, és 30 napon belül válaszolunk. Ha a panaszodat elutasítjuk, vagy 30 napon belül nem válaszolunk, fogyasztóként alternatív vitarendezési eljárást kezdeményezhetsz a Szlovák Kereskedelmi Felügyeletnél (Slovenská obchodná inšpekcia, https://www.soi.sk) vagy a szlovák Gazdasági Minisztérium listáján szereplő más vitarendezési testületnél. A lakóhelyed szerinti fogyasztóvédelmi hatósághoz és bírósághoz is fordulhatsz.",
        ],
      },
      {
        id: "kapcsolat",
        title: "Kapcsolat",
        blocks: ["Kérdéseiddel, észrevételeiddel vagy panaszaiddal az alábbi e-mail-címen fordulhatsz az Üzemeltetőhöz: {operatorEmail}."],
      },
    ],
  },

  privacy: {
    title: "Adatvédelmi tájékoztató",
    intro:
      "Az (EU) 2016/679 rendelet (általános adatvédelmi rendelet, GDPR) alapján ez a tájékoztató elmondja, milyen személyes adatokat kezelünk, amikor a {site} szolgáltatást ({siteUrl}) használod, milyen célból, milyen jogalapon és meddig, valamint hogy milyen jogaid vannak.",
    sections: [
      {
        id: "adatkezelo",
        title: "Az adatkezelő",
        blocks: [{ operator: true }, "Adatvédelmi ügyekben a(z) {operatorEmail} címen érsz el minket."],
      },
      {
        id: "roviden",
        title: "Röviden",
        blocks: [
          {
            list: [
              "A dokumentumaidat a böngésződ nyitja meg és írja alá, a saját eszközödön; a tartalmuk soha nem jut el hozzánk.",
              "A telefonodon megrajzolt aláírás a szerverünkön keresztül jut el a számítógépedre, és legkésőbb 1 óra múlva automatikusan törlődik.",
              "Jelszavas regisztráció nincs. Ha előfizetsz, kezeljük az e-mail-címedet és az előfizetésed adatait.",
              "A fizetéseket a Stripe dolgozza fel; a kártyaadataidat nem látjuk és nem tároljuk.",
              "Nem használunk webanalitikát és reklámcélú követést. Csak a belépéshez, a fizetéshez és a nyelvválasztásodhoz szükséges sütiket használjuk.",
            ],
          },
        ],
      },
      {
        id: "dokumentumok",
        title: "A dokumentumaid",
        blocks: [
          "A megnyitott PDF- és Word-dokumentumokat a böngésződ dolgozza fel a saját eszközödön: a megnyitás, a Word-fájl PDF-fé alakítása, az aláírás elhelyezése és a letöltendő PDF elkészítése is ott történik. A dokumentumaid tartalmához nem férünk hozzá, és nem tároljuk.",
          "Ha a Szolgáltatás egy adott üzemeltetési környezetben szerveroldali Word-átalakítót használ, a Word-fájl csak az átalakítás idejére kerül a szerverre, és utána azonnal törlődik.",
          "Amíg a fizetési oldal nyitva van, a böngésződ legfeljebb 60 percig a saját eszközödön (IndexedDB) őrzi az aláírt PDF-et, hogy ne vesszen el, ha egy fizetési mód másik oldalra irányít át (például a PayPal oldalára). Ez a fájl sem jut el hozzánk.",
          "A dokumentum fájlneve bekerül a telefonos aláírás munkamenetébe (lásd alább), hogy a telefonod megmutathassa, mit írsz alá.",
        ],
      },
      {
        id: "munkamenet",
        title: "A telefonos aláírás munkamenete",
        blocks: [
          "Amikor megnyitsz egy dokumentumot, a Szolgáltatás egy véletlenszerű azonosítójú munkamenetet hoz létre, és ennek linkjét QR-kódként jeleníti meg. A munkamenet a következőket tárolja:",
          {
            list: [
              "a munkamenet véletlenszerű azonosítóját és lejárati idejét;",
              "a dokumentum fájlnevét;",
              "azt, hogy csatlakozott-e telefon;",
              "rajzolás közben az aláírás pillanatnyi vonalait (ez az élő előnézet a számítógépen);",
              "az elküldött aláírást vektoros formában: a vonalak alakját, színét és az elküldés időpontját.",
            ],
          },
          "Cél: a telefonon megrajzolt aláírás eljuttatása a számítógépedre. Jogalap: a Szolgáltatás általad kért nyújtása (GDPR 6. cikk (1) bekezdés b) pont).",
          "Időtartam: a munkamenet adatait legfeljebb 1 óráig tároljuk, utána automatikusan és véglegesen törlődnek. Csak a vonalak végső alakját tároljuk, a rajzolás időbeli lefolyását (sebesség, nyomás) nem, és az aláírás alapján senkit sem azonosítunk.",
        ],
      },
      {
        id: "elofizetes",
        title: "Előfizetés és fizetés",
        blocks: [
          "Ha előfizetsz, a fizetési oldalon megadott adatokat a Stripe kezeli; mi az előfizetésed nyilvántartásához szükséges adatokat kapjuk meg.",
          {
            list: [
              "Kezelt adatok: e-mail-cím, a Stripe által kiosztott ügyfél- és előfizetés-azonosítók, az előfizetés állapota és időszakai, a fizetések összege és dátuma, a fizetési mód típusa (például kártya, és annak utolsó 4 számjegye), valamint — ha a fizetési oldal bekéri — a számlázási ország és irányítószám.",
              "Cél: az előfizetés létrehozása és teljesítése, a díjak beszedése, a hozzáférés ellenőrzése, a számlázás és az ügyfélszolgálat.",
              "Jogalap: szerződés teljesítése (GDPR 6. cikk (1) bekezdés b) pont); a számviteli nyilvántartások megőrzése esetén jogi kötelezettség (GDPR 6. cikk (1) bekezdés c) pont).",
              "Időtartam: az előfizetés fennállásáig; megszűnése után a számviteli nyilvántartásokat a szlovák számviteli törvény (431/2002 Z. z. sz. törvény) 35. §-a alapján 10 évig őrizzük meg. A többi adatot az előfizetés megszűnése után kérésedre töröljük.",
            ],
          },
          "A fizetéseket a Stripe Payments Europe, Ltd. (1 Grand Canal Street Lower, Grand Canal Dock, Dublin, D02 H210, Írország) dolgozza fel, amely a fizetési adatok és a csalásmegelőzés tekintetében önálló adatkezelő. Az adatkezeléséről a https://stripe.com/privacy oldalon tájékozódhatsz.",
        ],
      },
      {
        id: "belepes",
        title: "Belépés e-mailes kóddal",
        blocks: [
          "Más eszközökön egy e-mailben kapott, egyszer használatos kóddal léphetsz be.",
          {
            list: [
              "Kezelt adatok: e-mail-cím, a belépési kód hash-elt formája, a lejárati ideje és a próbálkozások száma.",
              "Cél: a belépés és a fiókod védelme.",
              "Jogalap: szerződés teljesítése (GDPR 6. cikk (1) bekezdés b) pont).",
              "Időtartam: a kód 10 percig érvényes, és felhasználás után azonnal töröljük.",
            ],
          },
          "A belépési e-maileket adatfeldolgozóként a Resend, Inc. (https://resend.com) küldi ki.",
        ],
      },
      {
        id: "naplok",
        title: "Technikai naplók",
        blocks: [
          "Az oldal kiszolgálásakor — mint minden weboldal esetén — a tárhelyszolgáltató szerverei technikai adatokat rögzítenek.",
          {
            list: [
              "Kezelt adatok: IP-cím, a kérés időpontja, a kért oldal címe, a böngésző típusa és verziója.",
              "Cél: a Szolgáltatás biztonságos és zavartalan működése, a hibák és a visszaélések felderítése.",
              "Jogalap: az Üzemeltető jogos érdeke (GDPR 6. cikk (1) bekezdés f) pont).",
              "Időtartam: rövid ideig, a tárhelyszolgáltató adatmegőrzési szabályai szerint.",
            ],
          },
        ],
      },
      {
        id: "sutik",
        title: "Sütik és helyi tárolás",
        blocks: [
          "Csak a Szolgáltatás működéséhez szükséges sütiket használjuk; ezekhez nem kell hozzájárulás:",
          {
            list: [
              "ds_session: bejelentkezve tart (180 nap);",
              "ds_signed_in: jelzi az oldalnak, hogy be vagy jelentkezve (180 nap);",
              "ds_login: a belépési kód folyamata (10 perc);",
              "NEXT_LOCALE: megjegyzi a nyelvválasztóban kiválasztott nyelvet (1 év).",
            ],
          },
          "A fizetési oldalon a Stripe saját sütiket használ a fizetés biztonságos feldolgozásához és a csalások megelőzéséhez. Analitikai és reklámsütiket nem használunk. A betűtípusokat a saját szerverünkről töltjük be, így külső betűtípus-szolgáltató nem kap rólad adatot.",
        ],
      },
      {
        id: "adatfeldolgozok",
        title: "Adatfeldolgozók és adattovábbítás",
        blocks: [
          "A megbízásunkból a következő adatfeldolgozók kezelnek adatokat:",
          {
            list: [
              "tárhely és alkalmazásszerver: {hosting};",
              "a telefonos aláírási munkamenetek adatbázisa: {storage} — az adatok tárolási helye: {storageRegion};",
              "a belépési e-mailek küldése: Resend, Inc., USA.",
            ],
          },
          "Ezeknek a szolgáltatóknak az Amerikai Egyesült Államokban van a székhelyük, ezért az adatok az Európai Gazdasági Térségen kívülre is kerülhetnek. Az ilyen adattovábbítás megfelelő garanciák mellett történik (az EU–USA adatvédelmi keretrendszer és/vagy az Európai Bizottság által elfogadott általános adatvédelmi kikötések alapján).",
          "Az adataidat más harmadik féllel nem osztjuk meg, és nem adjuk el.",
        ],
      },
      {
        id: "biztonsag",
        title: "Adatbiztonság",
        blocks: [
          "Az oldal és a szerver közötti minden kapcsolat titkosított (HTTPS). A belépési sütik aláírtak, és szkriptekből nem olvashatók. A munkamenet-azonosítók véletlenszerűek és kitalálhatatlanok, a munkamenetek adatai pedig egy óra után maguktól törlődnek. A QR-kódot és a linkjét ne oszd meg másokkal: aki ismeri, a lejáratig aláírást küldhet a munkamenetbe.",
        ],
      },
      {
        id: "jogok",
        title: "A jogaid",
        blocks: [
          "A GDPR alapján a következő jogok illetnek meg:",
          {
            list: [
              "tájékoztatáshoz és hozzáféréshez való jog (15. cikk);",
              "helyesbítéshez való jog (16. cikk);",
              "törléshez való jog (17. cikk);",
              "az adatkezelés korlátozásához való jog (18. cikk);",
              "adathordozhatósághoz való jog (20. cikk);",
              "a jogos érdeken alapuló adatkezelés elleni tiltakozás joga (21. cikk).",
            ],
          },
          "Kérésedet a(z) {operatorEmail} címre küldheted; legkésőbb egy hónapon belül válaszolunk. Az e-mail-címedet a [Fiókom](account) oldalon, a Stripe felületén magad is módosíthatod.",
        ],
      },
      {
        id: "jogorvoslat",
        title: "Jogorvoslat",
        blocks: [
          "Ha úgy érzed, hogy a személyes adataid kezelése sérti a jogszabályokat, panaszt tehetsz az adatkezelő székhelye szerinti felügyeleti hatóságnál, a Szlovák Köztársaság Személyesadat-védelmi Hivatalánál (Úrad na ochranu osobných údajov Slovenskej republiky; Hraničná 12, 820 07 Bratislava 27; https://dataprotection.gov.sk), vagy a lakóhelyed, illetve munkahelyed szerinti adatvédelmi hatóságnál — Magyarországon például a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH; 1055 Budapest, Falk Miksa utca 9–11.; https://naih.hu).",
          "Jogaid megsértése esetén bírósághoz is fordulhatsz; a pert a lakóhelyed szerinti tagállam bíróságai előtt is megindíthatod.",
        ],
      },
      {
        id: "gyermekek",
        title: "Gyermekek",
        blocks: ["A Szolgáltatás nem 16 év alatti gyermekeknek szól, és tudatosan nem kezelünk róluk adatot."],
      },
      {
        id: "valtozasok",
        title: "A tájékoztató változásai",
        blocks: [
          "Ezt a tájékoztatót a Szolgáltatás minden változásakor frissítjük; a hatálybalépés dátuma a dokumentum tetején látható. A Szolgáltatás használatának feltételeit az [Általános Szerződési Feltételek](terms) tartalmazzák.",
        ],
      },
    ],
  },
};

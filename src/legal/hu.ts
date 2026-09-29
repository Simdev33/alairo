import type { LegalTexts } from "./types";

export const legal: LegalTexts = {
  terms: {
    title: "Általános Szerződési Feltételek",
    intro:
      "Ez a dokumentum a {site} webes szolgáltatás (a továbbiakban: Szolgáltatás) használatának feltételeit tartalmazza. Kérjük, a Szolgáltatás használata előtt olvasd el figyelmesen.",
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
          "A {site} egy ingyenes, böngészőben működő eszköz. Segítségével PDF- vagy Word-dokumentumot nyithatsz meg, a képernyőn megjelenő QR-kód beolvasása után a telefonodon kézzel aláírást rajzolhatsz (vagy a számítógépeden megrajzolhatod egérrel), majd az aláírást a dokumentum tetszőleges helyére téve letöltheted az aláírt PDF-et.",
          "A használathoz nem kell regisztrálni, és nem kell alkalmazást telepíteni. A dokumentum feldolgozása a böngésződben történik; a részleteket az [Adatvédelmi tájékoztató](privacy) írja le.",
        ],
      },
      {
        id: "elfogadas",
        title: "A feltételek elfogadása",
        blocks: [
          "A Szolgáltatás használatával elfogadod a jelen feltételeket. Ha nem értesz egyet velük, kérjük, ne használd a Szolgáltatást.",
        ],
      },
      {
        id: "dijak",
        title: "Díjak",
        blocks: [
          "A Szolgáltatás ingyenes. Az Üzemeltető a jövőben díjköteles funkciókat vezethet be; ezekről előre, egyértelműen tájékoztat, és díjat csak a kifejezett elfogadásod után számíthat fel.",
        ],
      },
      {
        id: "alairas",
        title: "Az aláírás jellege és joghatása",
        blocks: [
          "A Szolgáltatással létrehozott aláírás a kézzel rajzolt aláírásod képe, amely vektoros formában kerül a dokumentumba. Ez az Európai Unió 910/2014/EU rendelete (eIDAS) szerinti egyszerű elektronikus aláírásnak minősül: nem fokozott biztonságú és nem minősített elektronikus aláírás, és nem azonosítja az aláíró személyét.",
          "Egyes jognyilatkozatokhoz és dokumentumokhoz jogszabály írásbeli alakot, minősített elektronikus aláírást, tanúkat vagy más hitelesítést írhat elő. A te felelősséged eldönteni, hogy az adott dokumentumhoz megfelelő-e az ilyen aláírás; kétség esetén kérd jogász tanácsát.",
          "Az Üzemeltető nem fél a közted és harmadik személyek között létrejövő jogviszonyokban, és nem vizsgálja a dokumentumok tartalmát.",
        ],
      },
      {
        id: "kotelezettsegek",
        title: "A felhasználó kötelezettségei",
        blocks: [
          "A Szolgáltatás használata során vállalod, hogy:",
          {
            list: [
              "csak olyan dokumentumot írsz alá, amelynek aláírására jogosult vagy;",
              "más nevében csak megfelelő felhatalmazással írsz alá, és nem utánzod más aláírását;",
              "nem használod a Szolgáltatást csalásra, okirat-hamisításra vagy más jogellenes célra;",
              "nem kísérelsz meg jogosulatlanul hozzáférni a Szolgáltatáshoz, és nem zavarod a működését (például automatizált tömeges kérésekkel);",
              "a QR-kódot és a hozzá tartozó linket nem osztod meg illetéktelenekkel — aki ismeri, a munkamenet lejártáig (legfeljebb 1 óra) aláírást küldhet a dokumentumodhoz.",
            ],
          },
          "Jogellenes használat gyanúja esetén az Üzemeltető a Szolgáltatáshoz való hozzáférést korlátozhatja.",
        ],
      },
      {
        id: "mukodes",
        title: "Rendelkezésre állás",
        blocks: [
          "Az Üzemeltető törekszik a Szolgáltatás folyamatos működésére, de nem vállal garanciát a megszakításmentes és hibátlan működésre. A Szolgáltatás karbantartás, fejlesztés vagy külső szolgáltatók hibája miatt átmenetileg elérhetetlen lehet. Az Üzemeltető a Szolgáltatást bármikor módosíthatja vagy megszüntetheti.",
          "A letöltött dokumentumot felhasználás előtt ellenőrizd, különösen az aláírás helyét és a tartalom teljességét.",
        ],
      },
      {
        id: "felelosseg",
        title: "Felelősség",
        blocks: [
          "A Szolgáltatás ingyenesen, „ahogy van” alapon érhető el. Az Üzemeltető — a jogszabályok által megengedett legnagyobb mértékben — nem felel a Szolgáltatás használatából vagy használhatatlanságából eredő közvetett károkért, elmaradt haszonért, adatvesztésért, sem az aláírt dokumentumok érvényességével, joghatásával vagy felhasználásával összefüggő következményekért.",
          "A felelősség korlátozása nem vonatkozik a szándékosan vagy súlyos gondatlansággal okozott kárért, valamint az emberi életet, testi épséget vagy egészséget megsértő szerződésszegésért való felelősségre, és nem érinti a fogyasztókat jogszabály alapján megillető jogokat.",
        ],
      },
      {
        id: "szellemi-tulajdon",
        title: "Szellemi tulajdon",
        blocks: [
          "A Szolgáltatás szoftvere, megjelenése, logója és szövegei az Üzemeltető szellemi tulajdonát képezik; ezeket a rendeltetésszerű használaton túl nem másolhatod és nem terjesztheted.",
          "A megnyitott dokumentumok és a megrajzolt aláírások a tieid maradnak; az Üzemeltető ezekre semmilyen jogot nem szerez.",
        ],
      },
      {
        id: "adatvedelem",
        title: "Adatvédelem",
        blocks: ["A személyes adatok kezeléséről az [Adatvédelmi tájékoztató](privacy) rendelkezik."],
      },
      {
        id: "panasz",
        title: "Kapcsolat és panaszkezelés",
        blocks: [
          "Kérdéseidet, észrevételeidet és panaszaidat a(z) {operatorEmail} e-mail-címre küldheted. Az Üzemeltető a panaszokat legkésőbb 30 napon belül érdemben megválaszolja.",
          "Ha fogyasztó vagy, a lakóhelyed szerint illetékes békéltető testülethez is fordulhatsz.",
        ],
      },
      {
        id: "modositas",
        title: "A feltételek módosítása",
        blocks: [
          "Az Üzemeltető a feltételeket módosíthatja; a módosítás az ezen az oldalon történő közzététellel, a feltüntetett hatálybalépési napon lép hatályba. A Szolgáltatás további használatával elfogadod a módosított feltételeket.",
        ],
      },
      {
        id: "jog",
        title: "Irányadó jog",
        blocks: [
          "A jelen feltételekre a magyar jog az irányadó. Ha fogyasztó vagy, ez nem foszt meg azoktól a kötelező védelmet nyújtó rendelkezésektől, amelyek a szokásos tartózkodási helyed szerinti jog alapján megilletnek. A jogviták elbírálására — a fogyasztókat védő kötelező illetékességi szabályok sérelme nélkül — a magyar bíróságok jogosultak.",
        ],
      },
    ],
  },

  privacy: {
    title: "Adatvédelmi tájékoztató",
    intro:
      "Ez a tájékoztató elmondja, milyen személyes adatokat kezel a {site}, milyen célból és meddig, valamint hogy milyen jogaid vannak. Röviden: a dokumentumodat nem töltjük fel, nincs regisztráció és nincs követés, a telefonról küldött aláírás pedig egy óra múlva automatikusan törlődik.",
    sections: [
      {
        id: "adatkezelo",
        title: "Az adatkezelő",
        blocks: [
          "A személyes adatok kezelője:",
          { operator: true },
          "Adatvédelmi kérdésekben a(z) {operatorEmail} címen érsz el minket.",
        ],
      },
      {
        id: "dokumentumok",
        title: "A dokumentumok",
        blocks: [
          "A megnyitott PDF- és Word-dokumentumokat a böngésződ dolgozza fel a saját eszközödön: a megnyitás, a Word-fájl PDF-fé alakítása, az aláírás elhelyezése és a letöltendő PDF elkészítése is ott történik. A dokumentum tartalmát nem továbbítjuk a szerverünkre, és nem tároljuk.",
          "Ha a Szolgáltatás egy adott üzemeltetési környezetben szerveroldali Word-átalakítót használ, a Word-fájl csak az átalakítás idejére kerül a szerverre, és utána azonnal törlődik.",
          "A dokumentum fájlneve bekerül a telefonos aláírás munkamenetébe (lásd alább), hogy a telefonon látszódjon, mit írsz alá.",
        ],
      },
      {
        id: "munkamenet",
        title: "A telefonos aláírás munkamenete",
        blocks: [
          "Amikor megnyitsz egy dokumentumot, a Szolgáltatás egy véletlenszerű azonosítójú munkamenetet hoz létre, és ennek linkjét QR-kódként jeleníti meg. A munkamenetben a következő adatokat tároljuk:",
          {
            list: [
              "a munkamenet véletlenszerű azonosítóját és lejárati idejét;",
              "a dokumentum fájlnevét;",
              "azt, hogy a telefon csatlakozott-e;",
              "rajzolás közben az aláírás pillanatnyi vonalait (ez az élő előnézet a számítógépen);",
              "az elküldött aláírást vektoros formában: a vonalak alakját, színét és az elküldés időpontját.",
            ],
          },
          "Az adatkezelés célja, hogy a telefonon megrajzolt aláírás eljusson a számítógépedre. Jogalapja a Szolgáltatás általad kért nyújtása (GDPR 6. cikk (1) bekezdés b) pont).",
          "A munkamenet adatai legfeljebb 1 óráig tárolódnak, utána automatikusan és véglegesen törlődnek. Csak a vonalak végső alakját tároljuk; a rajzolás időbeli lefolyását (sebesség, nyomás) nem, és az aláírás alapján senkit sem azonosítunk.",
        ],
      },
      {
        id: "naplok",
        title: "Technikai adatok és naplók",
        blocks: [
          "Mint minden weboldal esetén, a tárhelyszolgáltató szerverei automatikusan naplózzák a kérések technikai adatait (IP-cím, böngésző típusa, a kért oldal és az időpont). Ezeket a biztonságos működés és a hibakeresés érdekében, jogos érdek alapján (GDPR 6. cikk (1) bekezdés f) pont) kezeljük; a tárhelyszolgáltató a saját szabályai szerint, rövid ideig őrzi meg őket.",
        ],
      },
      {
        id: "sutik",
        title: "Sütik",
        blocks: [
          "Nem használunk reklám- vagy követő sütit, és nem használunk webanalitikát. Egyetlen sütit alkalmazunk: ha kiválasztasz egy nyelvet, a választásodat a NEXT_LOCALE nevű sütiben 1 évig megjegyezzük, hogy legközelebb is ezen a nyelven jelenjen meg az oldal. Ez a süti a Szolgáltatás általad kért működéséhez szükséges, ezért nem kérünk hozzá külön hozzájárulást.",
          "A betűtípusokat a saját szerverünkről töltjük be, így az oldal megnyitásakor külső betűtípus-szolgáltató nem kap rólad adatot.",
        ],
      },
      {
        id: "adatfeldolgozok",
        title: "Adatfeldolgozók és adattovábbítás",
        blocks: [
          "Az adatokat az alábbi adatfeldolgozók kezelik a megbízásunkból:",
          {
            list: [
              "tárhely és alkalmazásszerver: {hosting};",
              "a munkamenetek adatbázisa: {storage} — az adatok tárolási helye: {storageRegion}.",
            ],
          },
          "Mindkét szolgáltató amerikai vállalat, ezért az adatok az Európai Gazdasági Térségen kívülre is kerülhetnek. Az adattovábbítás az EU–USA adatvédelmi keretrendszer és/vagy az Európai Bizottság által elfogadott általános adatvédelmi kikötések alapján történik.",
          "Személyes adatot nem adunk el, és reklámcélra nem használunk.",
        ],
      },
      {
        id: "biztonsag",
        title: "Adatbiztonság",
        blocks: [
          "Az oldal kizárólag titkosított (HTTPS) kapcsolaton érhető el. A munkamenetek azonosítója véletlenszerű és kitalálhatatlan, az adatok pedig egy óra után maguktól törlődnek. A QR-kódot és a linket ne oszd meg másokkal: aki ismeri, a lejáratig aláírást küldhet a munkamenetbe.",
        ],
      },
      {
        id: "jogok",
        title: "A jogaid",
        blocks: [
          "Az általános adatvédelmi rendelet (GDPR) alapján jogosult vagy:",
          {
            list: [
              "tájékoztatást kérni a rólad kezelt adatokról, és hozzáférni azokhoz;",
              "kérni a pontatlan adatok helyesbítését;",
              "kérni az adatok törlését vagy kezelésük korlátozását;",
              "tiltakozni a jogos érdeken alapuló adatkezelés ellen;",
              "kérni az adataid hordozható formában való kiadását.",
            ],
          },
          "Kérésedet a(z) {operatorEmail} címre küldheted; legfeljebb egy hónapon belül válaszolunk. Mivel regisztráció nincs, és a munkamenetek adatai egy órán belül törlődnek, a kérésed idején jó eséllyel már nem kezelünk rólad adatot.",
          "Ha úgy érzed, hogy megsértettük a jogaidat, panaszt tehetsz a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH, 1055 Budapest, Falk Miksa utca 9–11., www.naih.hu) vagy a lakóhelyed szerinti adatvédelmi hatóságnál, és bírósághoz is fordulhatsz.",
        ],
      },
      {
        id: "gyermekek",
        title: "Gyermekek",
        blocks: ["A Szolgáltatás nem 16 év alatti gyermekeknek szól, és tudatosan nem kezelünk róluk adatot."],
      },
      {
        id: "valtozasok",
        title: "Változások",
        blocks: [
          "Ezt a tájékoztatót időnként frissíthetjük. A mindenkor hatályos változat ezen az oldalon olvasható, a hatálybalépés dátumával együtt. A működést érintő ügyekben az [Általános Szerződési Feltételek](terms) irányadók.",
        ],
      },
    ],
  },
};

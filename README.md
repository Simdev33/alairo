# DoneSignIn — aláírás telefonról, egy QR-kóddal

**donesignin.com** · Üzemeltető: TourCierge s. r. o.

Tölts fel egy PDF-et vagy Word-dokumentumot, olvasd be a QR-kódot a telefonoddal, írd alá az ujjaddal,
és húzd az aláírást a dokumentum bármelyik oldalára. A feltöltés, aláírás és elhelyezés ingyenes;
az aláírt PDF letöltéséhez előfizetés kell: **7 nap 2,99 €, utána 9,90 €/hó** (Stripe).

## Helyi futtatás

```bash
npm install
cp .env.example .env.local   # majd töltsd ki a Stripe teszt-kulcsokkal
npm run dev
```

Gépen: http://localhost:3238 — a QR-kód automatikusan a gép helyi hálózati címére mutat
(pl. `http://192.168.1.110:3238/s/…`), így a telefon **ugyanazon a Wi-Fi-n** eléri.
Ha több hálózati kártya van, a QR-kártyán a „Won’t open on your phone?” alatt lehet másik címet választani.

## Nyelvek és jogi oldalak

- Fő nyelv az **angol**, előtag nélkül a gyökérben (`/`, `/terms`, `/privacy`, `/account`); a többi nyelv
  előtaggal: `/hu`, `/de`, `/fr`, `/es`. A `/en/…` címek a gyökérre irányítanak.
  A főoldal első látogatáskor a böngésző nyelvére irányít; a nyelvválasztó a döntést a `NEXT_LOCALE` sütiben megjegyzi.
  A telefonos oldal a gép nyelvén nyílik meg.
- Szövegek: `src/i18n/dictionaries/*.ts` — az **`en.ts` a forrás** (belőle jön a `Dictionary` típus), a többi követi.
- ÁSZF és adatvédelmi tájékoztató: `src/legal/*.ts` (az `en.ts` a forrás). Az üzemeltető adatai a
  `src/config/site.ts`-ben vannak; **az üzemeltető e-mail-címe még hiányzik** — addig a jogi oldalakon
  „to be completed” jelölés látszik.
- Minta-szerződés nyelvenként: `public/samples/{nyelv}.pdf`.

## Előfizetés (Stripe)

- Adatbázis nincs: a Stripe az igazság forrása. A belépés aláírt, httpOnly sütivel történik (`ds_session`);
  más eszközön e-mailben küldött 6 jegyű kóddal lehet belépni (Resend). A **Fiókom** oldalról
  (`/account`) a Stripe ügyfélportálja nyílik: lemondás, kártyacsere, számlák.
- Az árak és a termék első használatkor jönnek létre a Stripe-ban (`donesignin` termék, lookup key-ekkel).
- A Stripe-fiókon a ConvertPDFNow is osztozik, ezért minden DoneSignIn-objektum (ügyfél, előfizetés, termék,
  portálbeállítás) `metadata.app = "donesignin"` jelölést kap, és a hozzáférés csak ezeket veszi figyelembe.
- Ha egy fizetési mód elnavigál (pl. PayPal), az aláírt PDF addig a böngészőben (IndexedDB) vár, és a
  visszatérés után magától letöltődik.
- A letöltés-kapu böngészőoldali (a PDF a böngészőben készül, a szerver csak a hozzáférésről dönt).

## Feltöltés Vercelre

1. GitHubról importáld a projektet a Vercelen (a Next.js beállításokat magától felismeri).
2. **Storage → Upstash for Redis**, „KV” előtaggal kötve a projekthez (a telefonos munkamenetekhez).
3. **Settings → Environment Variables:** `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`,
   `SESSION_SECRET` (új, hosszú véletlen szöveg), és a kódos belépéshez `RESEND_API_KEY` + `EMAIL_FROM`.
4. **Settings → Domains:** `donesignin.com`. A Stripe expressz fizetési gombjaihoz (Apple Pay, Google Pay)
   a domaint a Stripe-ban is regisztrálni kell (Settings → Payment method domains).
5. Deploy / Redeploy.

## Hogyan működik

- **PDF**: a böngésző nyitja meg (pdf.js), és a böngésző írja bele az aláírást (pdf-lib) — nem kerül fel a szerverre.
  Az aláírás **vektorosan** kerül a PDF-be, forgatott és levágott oldalakon is pontos helyre.
  Titkosított PDF-nél az oldalak képként mentődnek.
- **Word**: ha a szerveren van LibreOffice (vagy `SOFFICE_PATH`) vagy Windowson Microsoft Word, a szerver alakítja
  PDF-fé; különben (pl. **Vercelen**) a **böngésző** alakítja át a `.docx`-et, oldalanként képpé renderelve.
- **Telefon ↔ gép**: a munkamenet egy óráig él. Helyben memóriában + Server-Sent Events; Redisszel (Vercelen)
  a gép rövid időközönként kérdez rá, és csak változáskor kap adatot.

## Környezeti változók

Lásd `.env.example`. A fentieken kívül: `<ELŐTAG>_REST_API_URL/TOKEN` (Upstash, pl. `KV_…`), `NEXT_PUBLIC_SITE_URL`
(az élő cím, alapból `https://donesignin.com`), `PUBLIC_BASE_URL` (a QR-kód címe, ha eltér), `SOFFICE_PATH`,
`DISABLE_SERVER_CONVERT=1`, `STRIPE_PRICE_TRIAL` / `STRIPE_PRICE_MONTHLY` (meglévő Price ID-k).

A DoneSignIn egyszerű elektronikus aláírást (a kézi aláírás képét) helyez el a dokumentumban; ez nem minősített
elektronikus aláírás.

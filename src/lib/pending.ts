"use client";

/**
 * Az aláírt PDF a fizetés idejére ezen az eszközön vár (IndexedDB, sosem kerül
 * fel): egyes fizetési módok (PayPal) elnavigálnak és visszajönnek, ami a
 * memóriában lévő eredményt elvesztené. Egy óra után lejár.
 */
const DB_NAME = "donesignin";
const STORE = "pending";
const KEY = "signed";
export const PENDING_MINUTES = 60;

export interface SignedResult {
  data: Uint8Array;
  name: string;
  rasterized: boolean;
}

type Pending = SignedResult & { expiresAt: number };

function open() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function run<T>(mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>) {
  const db = await open();
  try {
    return await new Promise<T>((resolve, reject) => {
      const request = action(db.transaction(STORE, mode).objectStore(STORE));
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } finally {
    db.close();
  }
}

/** Eltárolja az eredményt; visszaadja, mikor jár le. */
export async function savePending(result: SignedResult) {
  const expiresAt = Date.now() + PENDING_MINUTES * 60_000;
  try {
    await run("readwrite", (store) => store.put({ ...result, expiresAt } satisfies Pending, KEY));
  } catch (error) {
    console.warn("[pending] could not store the signed file", error);
  }
  return expiresAt;
}

export async function loadPending(): Promise<(SignedResult & { expiresAt: number }) | null> {
  try {
    const pending = await run<Pending | undefined>("readonly", (store) => store.get(KEY));
    if (!pending) return null;
    if (pending.expiresAt < Date.now()) {
      await clearPending();
      return null;
    }
    return pending;
  } catch {
    return null;
  }
}

export async function clearPending() {
  try {
    await run("readwrite", (store) => store.delete(KEY));
  } catch {
    // Nincs tárolva semmi (vagy a tárolás tiltva).
  }
}

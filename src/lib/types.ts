/** Egy aláírás vektoros formában: kitöltendő SVG-útvonal a saját koordináta-rendszerében. */
export type Signature = {
  id: string;
  d: string;
  width: number;
  height: number;
  color: string;
  source: "phone" | "desktop";
  createdAt: number;
};

/** Élő előnézet a telefonról, rajzolás közben (a rajzfelület koordinátáiban). */
export type LivePreview = { d: string; width: number; height: number; color: string; at: number };

export type SessionMeta = { id: string; fileName: string; expiresAt: number };

/** A munkamenet állapota; a `signatures` csak a `have` utániakat tartalmazza (a lista csak bővül). */
export type SessionDelta = SessionMeta & {
  version: number;
  phoneConnected: boolean;
  drawing: boolean;
  preview: LivePreview | null;
  sigCount: number;
  signatures: Signature[];
};

/** Hogyan kapja a gép a frissítéseket: helyben SSE, Vercelen (Redis) rövid lekérdezések. */
export type Transport = "sse" | "poll";

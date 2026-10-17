import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy ke Go API chatbot.
 * Kenapa lewat sini: jangan biarkan frontend memanggil backend langsung
 * (CORS + sembunyikan origin backend). Rewrite lama di next.config.js
 * diganti route ini supaya gagal ayamnya terlihat jelas:
 * - backend mati      => 502 + log penyebab
 * - backend lambat    => 504 (cut-off di 30 detik)
 * - payload salah     => 400
 * - backend error N   => diteruskan apa adanya
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BACKEND_URL = "https://api.nurdinahmadalawiyah.web.id/api/chat";
const BACKEND_TIMEOUT_MS = 30_000;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { status: "error", message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const message =
    typeof (body as { message?: unknown })?.message === "string"
      ? (body as { message: string }).message.trim()
      : "";
  if (!message) {
    return NextResponse.json(
      { status: "error", message: "Field 'message' is required" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ message }),
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
      cache: "no-store",
    });

    const text = await res.text();

    if (!res.ok) {
      console.error(`[chatbot] backend ${res.status}:`, text.slice(0, 300));
      return NextResponse.json(
        { status: "error", message: `Backend error ${res.status}` },
        { status: 502 }
      );
    }

    // teruskan respons backend apa adanya ({ data: { reply } })
    return new NextResponse(text, {
      status: 200,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  } catch (err) {
    const aborted =
      err instanceof Error &&
      (err.name === "TimeoutError" || err.name === "AbortError");
    console.error(
      `[chatbot] upstream ${aborted ? "timeout" : "unreachable"}:`,
      err
    );
    return NextResponse.json(
      {
        status: "error",
        message: aborted
          ? `Backend timeout (${BACKEND_TIMEOUT_MS / 1000}s)`
          : "Backend unreachable",
      },
      { status: aborted ? 504 : 502 }
    );
  }
}

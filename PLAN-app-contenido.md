# app.contenido.com.py — Build Plan

Paraguayan-voice social clip generator. Internal tool first, SaaS-able later.
Decoupled from contenido.com.py (the marketing site) — separate repo, separate deploy.

## Architecture

- **contenido.com.py** — existing static Vite site, stays on Hostinger, unchanged.
- **app.contenido.com.py** — new repo, Next.js (App Router) on Vercel, DNS CNAME to Vercel.
- **DB**: Neon Postgres + Drizzle ORM.
- **File storage**: Cloudflare R2 (voice samples, rendered MP4s, generated captions/JSON).
- **Background visuals**: Higgsfield (existing 6,000 credits/mo) until subscription lapses, then swap provider behind the same interface.
- **Voice**: zero-shot cloning via Replicate/fal.ai (F5-TTS or Chatterbox — commercially clean licenses).
- **Captions**: faster-whisper (Replicate) for word-level timestamps.
- **Video render**: Remotion (primary), prototype HyperFrames alongside before committing.

## Pipeline

```
User input (business, offer, city, voice, language mode)
  → LLM script generation (Claude, Jopará-aware system prompt) → JSON {hook, body, cta}
  → phonetic remap dictionary (fixes Guaraní/city-name pronunciation before TTS)
  → TTS (Replicate, cloned voice) → narration.mp3 → R2
  → faster-whisper → word-level timestamps JSON
  → Remotion composition (audio + captions + logo + bg visual + CTA) → render MP4 → R2
  → saved to Postgres (status: draft/approved/posted), shown in dashboard
```

## Scope tiers (ship in order, don't skip ahead)

1. Paraguayan Spanish only
2. + Jopará code-switching
3. (later, only if demand proven) pure Guaraní

## MVP roadmap (4 weeks)

**Week 1 — Voice bank & TTS validation**
- Record 3–4 Paraguayan speakers, 30–60s each, natural Jopará delivery, written consent (AI/commercial use, duration, platforms, right to revoke).
- Test F5-TTS and Chatterbox on Replicate against those samples.
- Gate: does it sound paraguayo? If not, try another model before building anything downstream.

**Week 2 — Script + phonetic layer**
- LLM prompt producing the JSON script shape above.
- Phonetic remap dictionary (starts empty, grows as mispronunciations are found — Ypacaraí, Caaguazú, common Guaraní loanwords).

**Week 3 — Captions + Remotion template**
- Wire faster-whisper output into 1–2 Remotion 9:16 templates: word-pop captions, logo, WhatsApp CTA.
- Side-by-side test: same template in HyperFrames, compare dev experience and output quality.

**Week 4 — Full pipeline + real test**
- Chain end to end locally (no dashboard needed yet — CLI script is enough).
- Generate 10 clips for real Asunción businesses (restaurant, dentist, real estate — reuse existing site portfolio as prospects).
- Decision point: does anyone want to pay for this?

## After MVP validated

- Move from local CLI to the actual Next.js app: dashboard, auth, project/brand management, Neon-backed job history.
- Deploy app.contenido.com.py to Vercel.
- Add content calendar + multi-platform posting (YouTube, Meta, X) as phase 2 — separate scope, don't build before clip generation is proven.
- Revisit voice fine-tuning (real recorded hours vs. zero-shot) only once there's a paying reason to.

## Cost (see prior estimate)

- Infra: $0–20/month (Neon free tier, R2 pennies, Vercel free until commercial use).
- Per clip: ~$0.05–0.20 (LLM + TTS + Whisper + render), often less since Higgsfield visuals are already paid for.
- Real expense only appears if/when fine-tuning voices with rented GPU hours — deferred until justified.

## Explicit non-goals for MVP

- No DaVinci/desktop NLE automation.
- No pure Guaraní TTS.
- No multi-platform scheduler.
- No client billing/auth — internal use only until proven.

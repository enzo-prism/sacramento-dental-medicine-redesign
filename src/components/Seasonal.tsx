import type { CSSProperties } from "react";
import { activeSeason, buildSeasonScript } from "@/lib/seasonal";
import { SeasonPlay } from "@/components/SeasonalClient";

/*
 * October seasonal art. Every piece is decorative, `aria-hidden`, hidden by
 * default (`.sdm-season-only`), and only revealed by the <html
 * data-sdm-season> attribute the head script sets before first paint.
 * See AGENTS.md "Seasonal layer (October)".
 */

/**
 * Sets <html data-sdm-season> before first paint while a season is active
 * (or previewed). Render inside the root layout's <head>.
 */
export function SeasonScript() {
  if (!activeSeason) return null;
  return (
    <script
      id="sdm-season"
      dangerouslySetInnerHTML={{ __html: buildSeasonScript(activeSeason) }}
    />
  );
}

/** Friendly ghost-tooth: a molar crown whose roots become a ghost's hem. */
export function GhostTooth({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 72" fill="none" aria-hidden="true" className={className}>
      <path
        d="M14 25c0-10.5 8-17 16-14.6 1 .3 1.6.6 2 .6s1-.3 2-.6C42 8 50 14.5 50 25v32.6c0 1.3-1.5 2-2.5 1.2l-3.3-2.7a2 2 0 0 0-2.5 0l-3.4 2.8a2 2 0 0 1-2.5 0l-3.5-2.8a2 2 0 0 0-2.5 0l-3.5 2.8a2 2 0 0 1-2.5 0l-3.4-2.8a2 2 0 0 0-2.5 0l-3.3 2.7c-1 .8-2.6.1-2.6-1.2V25Z"
        fill="#ffffff"
        stroke="var(--brand-ink)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <ellipse cx="25.5" cy="31" rx="2.6" ry="3.4" fill="var(--ink)" />
      <ellipse cx="38.5" cy="31" rx="2.6" ry="3.4" fill="var(--ink)" />
      <path d="M27.5 39.5c2.6 2.6 6.4 2.6 9 0" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20.5" cy="37.5" r="2.6" fill="#f0a3a0" opacity="0.6" />
      <circle cx="43.5" cy="37.5" r="2.6" fill="#f0a3a0" opacity="0.6" />
    </svg>
  );
}

/** A jack-o'-lantern carved with a perfect, healthy smile. */
export function ToothGrinPumpkin({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 48 44" aria-hidden="true" className={className} style={style}>
      <path
        d="M22.4 9.6c-.2-3.3 1-6 3.6-7.6.9-.5 1.9.4 1.4 1.3-1 1.8-1.4 3.8-1.1 6.3Z"
        fill="var(--sdm-harvest-stem)"
      />
      <ellipse cx="15" cy="26" rx="11" ry="14" fill="var(--sdm-harvest-amber-deep)" />
      <ellipse cx="33" cy="26" rx="11" ry="14" fill="var(--sdm-harvest-amber-deep)" />
      <ellipse cx="24" cy="26" rx="11.5" ry="15" fill="var(--sdm-harvest-amber)" />
      <path d="M24 11.5v29" stroke="var(--sdm-harvest-amber-deep)" strokeWidth="1.2" opacity="0.55" />
      <path d="M14.6 23.6 18 18.4l3.4 5.2Z" fill="var(--sdm-harvest-carve)" />
      <path d="M26.6 23.6 30 18.4l3.4 5.2Z" fill="var(--sdm-harvest-carve)" />
      <path d="M13.5 28.2Q24 38.4 34.5 28.2 24 32.4 13.5 28.2Z" fill="var(--sdm-harvest-carve)" />
      <g fill="#ffffff">
        <rect x="17.4" y="29.7" width="2.9" height="2.6" rx="0.7" />
        <rect x="20.9" y="30.2" width="2.9" height="2.8" rx="0.7" />
        <rect x="24.4" y="30.2" width="2.9" height="2.8" rx="0.7" />
        <rect x="27.9" y="29.7" width="2.9" height="2.6" rx="0.7" />
      </g>
    </svg>
  );
}

/** Small four-point star used in the night-band sky. */
function Sparkle({ style }: { style: CSSProperties }) {
  return (
    <svg viewBox="0 0 10 10" aria-hidden="true" className="sdm-star" style={style}>
      <path d="M5 0 6.1 3.9 10 5 6.1 6.1 5 10 3.9 6.1 0 5 3.9 3.9Z" fill="currentColor" />
    </svg>
  );
}

const MOON_BOX =
  "right-5 top-[5.25rem] size-16 lg:-right-10 lg:-top-12 lg:size-32";

/**
 * Harvest moon rising behind the top-right corner of the hero photo
 * (desktop) or in the hero's top band (mobile). Render before the photo
 * card so it sits behind it on desktop.
 */
export function HarvestMoon() {
  return (
    <div
      aria-hidden="true"
      className={`sdm-season-only sdm-moon pointer-events-none absolute z-[1] lg:z-auto ${MOON_BOX}`}
    >
      <svg viewBox="0 0 100 100" className="block size-full">
        <defs>
          <radialGradient id="sdm-moon-face" cx="38%" cy="34%" r="70%">
            <stop offset="0%" stopColor="#fff8e4" />
            <stop offset="55%" stopColor="var(--sdm-harvest-moon)" />
            <stop offset="100%" stopColor="#f1c86f" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#sdm-moon-face)" />
        <g fill="#e2b45c" opacity="0.35">
          <circle cx="64" cy="38" r="7" />
          <circle cx="40" cy="64" r="9" />
          <circle cx="68" cy="66" r="4.5" />
          <circle cx="34" cy="34" r="3.5" />
        </g>
      </svg>
    </div>
  );
}

/** Same box as the moon, so the client bats lift off its face. */
export const harvestMoonBox = MOON_BOX;

/** A ghost-tooth peeking out from behind the hero photo (desktop only). */
export function HeroGhost() {
  return (
    <div
      aria-hidden="true"
      className="sdm-season-only pointer-events-none absolute -left-16 bottom-10 w-20"
    >
      <div className="hidden lg:block">
        <GhostTooth className="sdm-ghost-peek block w-full drop-shadow-[0_12px_18px_rgba(13,27,46,0.18)]" />
      </div>
    </div>
  );
}

/** "Happy Halloween" chip above the hero headline. */
export function SeasonalGreeting() {
  return (
    <div className="sdm-season-only mb-4">
      <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/85 py-1.5 pl-2 pr-3.5 text-xs font-semibold text-ink-soft shadow-sm backdrop-blur">
        <GhostTooth className="size-5 shrink-0" />
        Happy Halloween from Antelope
      </p>
    </div>
  );
}

/** Hand-drawn candlelight underline that draws itself under a word. */
export function SeasonalUnderline() {
  return (
    <svg
      viewBox="0 0 120 10"
      aria-hidden="true"
      className="sdm-season-only sdm-underline pointer-events-none absolute -bottom-[0.24em] left-0 h-auto w-full"
    >
      <path
        d="M3 6.5c11-4.2 21-4.4 31-1s20 3.8 30 .2 20-4.4 30-1c7.4 2.5 14.2 2.3 23-.5"
        pathLength={1}
        fill="none"
        stroke="var(--sdm-harvest-amber)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const stars: CSSProperties[] = [
  { top: "18%", right: "22%", width: 15, animationDelay: "0s" },
  { top: "34%", right: "9%", width: 11, animationDelay: "0.5s" },
  { top: "12%", right: "40%", width: 9, animationDelay: "0.9s" },
  { top: "58%", right: "31%", width: 8, animationDelay: "0.3s" },
  { top: "72%", right: "6%", width: 12, animationDelay: "0.7s" },
  { top: "24%", left: "46%", width: 8, animationDelay: "1.1s" },
  { top: "80%", left: "38%", width: 9, animationDelay: "0.2s" },
];

/** Crescent moon and a few stars for the home scheduling night band. */
export function NightBandSky() {
  return (
    <SeasonPlay className="sdm-season-only sdm-sky pointer-events-none absolute inset-0" ariaHidden>
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="sdm-crescent absolute right-5 top-5 size-10 sm:right-10 sm:top-8 sm:size-14"
      >
        <path d="M27 4.5A16 16 0 1 0 35.5 31 13.2 13.2 0 1 1 27 4.5Z" fill="var(--sdm-harvest-moon)" />
      </svg>
      {stars.map((style, index) => (
        <Sparkle key={index} style={style} />
      ))}
    </SeasonPlay>
  );
}

const pumpkins = [
  { width: "2.1rem", delay: "0s" },
  { width: "2.75rem", delay: "0.18s" },
  { width: "1.8rem", delay: "0.36s" },
];

/** Footer greeting with a little patch of tooth-grin pumpkins. */
export function FooterPumpkins() {
  return (
    <SeasonPlay className="sdm-season-only sdm-patch mt-12">
      <div className="flex flex-wrap items-end gap-x-5 gap-y-3">
        <div aria-hidden="true" className="flex items-end gap-1.5">
          {pumpkins.map((pumpkin) => (
            <ToothGrinPumpkin
              key={pumpkin.delay}
              className="sdm-pumpkin block h-auto"
              style={{ width: pumpkin.width, animationDelay: pumpkin.delay }}
            />
          ))}
        </div>
        <p className="pb-1 text-sm text-white/70">
          Happy Halloween from all of us at Sacramento Dental Medicine.
        </p>
      </div>
    </SeasonPlay>
  );
}

/** 404 seasonal art: the ghost-tooth floating in front of the harvest moon. */
export function SeasonalNotFoundArt() {
  return (
    <div aria-hidden="true" className="sdm-season-only mb-10">
      <div className="sdm-porthole relative mx-auto grid size-40 place-items-center overflow-hidden rounded-full shadow-xl ring-4 ring-white">
        <GhostTooth className="sdm-ghost-float relative w-16 drop-shadow-[0_10px_18px_rgba(10,20,36,0.45)]" />
      </div>
    </div>
  );
}

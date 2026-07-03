const wrapper = document.getElementById('fl-wrapper');
const img     = document.getElementById('fl');

const IMAGES = [
  './img/fl-vanilla.webp',
  './img/fl-choco.webp',
  './img/fl-mm.webp',
  './img/fl-straw.webp',
];

img.addEventListener('load', () => {
  const r = wrapper.getBoundingClientRect();
  elW = r.width;
  elH = r.height;
  x = Math.min(x, winW - elW);
  y = Math.min(y, winH - elH);
});


// Physics state — tracked in JS, never read from the DOM each frame
let x = 0;
let y = 0;
let vx = 0;
let vy = 0;

// Cached measurements, updated on resize
let winW = 0;
let winH = 0;
let elW  = 0;
let elH  = 0;

let currentIdx = 0;
let rafId      = null;


// ─── Image selection ──────────────────────────────────────────────────────────

function pickNextImage() {
  let next;
  do {
    next = Math.floor(Math.random() * IMAGES.length);
  } while (next === currentIdx && IMAGES.length > 1);
  currentIdx = next;
  img.src = IMAGES[next];
}


// ─── Measurement & sizing ─────────────────────────────────────────────────────

function measure() {
  winW = window.innerWidth;
  winH = window.innerHeight;
  // The wrapper has a fixed CSS size (vmin-based), so this only changes on resize.
  // We read it once and cache it — no per-frame DOM access.
  const r = wrapper.getBoundingClientRect();
  elW = r.width;
  elH = r.height;
}

// Keep x/y in bounds after a resize
function clampPosition() {
  x = Math.max(0, Math.min(x, winW - elW));
  y = Math.max(0, Math.min(y, winH - elH));
}


// ─── Rendering ────────────────────────────────────────────────────────────────

// transform: translate is compositor-only — no layout, no paint each frame
function applyTransform() {
  wrapper.style.transform = `translate(${x | 0}px, ${y | 0}px)`;
}


// ─── Main loop ────────────────────────────────────────────────────────────────

function tick() {
  x += vx;
  y += vy;

  let bounced = false;

  // Horizontal walls
  if (x + elW >= winW) {
    x  = winW - elW;
    vx = -Math.abs(vx); // always push away from wall, avoids sticking
    bounced = true;
  } else if (x <= 0) {
    x  = 0;
    vx = Math.abs(vx);
    bounced = true;
  }

  // Vertical walls
  if (y + elH >= winH) {
    y  = winH - elH;
    vy = -Math.abs(vy);
    bounced = true;
  } else if (y <= 0) {
    y  = 0;
    vy = Math.abs(vy);
    bounced = true;
  }

  // Change image exactly once per bounce event (covers corner hits too)
  if (bounced) pickNextImage();

  applyTransform();
  rafId = requestAnimationFrame(tick);
}


// ─── Init ─────────────────────────────────────────────────────────────────────

function init() {
  measure();

  // Speed: ~0.35% of the shorter screen dimension per frame (at 60 fps).
  // Clamped to 2–6 px so it feels right on both tiny phones and large monitors.
  const speed = Math.max(2, Math.min(Math.min(winW, winH) * 0.0035, 6));

  // 45° angle for clean bounces and an authentic DVD-screensaver feel
  vx = speed;
  vy = speed;

  // Start 20% in from top-left so the first bounce isn't immediately off-screen
  x = winW * 0.2;
  y = winH * 0.2;

  applyTransform();

  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(tick);
}

// Re-measure on resize; keep position valid without restarting the animation
function onResize() {
  measure();
  clampPosition();
  // Re-scale speed to new viewport — keep the 45° direction
  const speed = Math.max(2, Math.min(Math.min(winW, winH) * 0.0035, 6));
  const signX = vx >= 0 ? 1 : -1;
  const signY = vy >= 0 ? 1 : -1;
  vx = signX * speed;
  vy = signY * speed;
}

window.addEventListener('DOMContentLoaded', init);
window.addEventListener('resize', onResize);

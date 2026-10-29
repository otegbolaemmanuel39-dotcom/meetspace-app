// =====================================================
// MeetSpace - app.js
// All page behaviour lives here. Sections:
// 1. Navbar menu   2. Toast messages   3. Demo buttons
// 4. Service worker
// =====================================================

// ----- 1. NAVBAR MENU (mobile) -----
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  // classList.toggle adds "open" if missing, removes it if present
  const isOpen = navMenu.classList.toggle("open");
  // Keep screen readers informed
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close the mobile menu after tapping a link
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ----- 2. TOAST MESSAGES -----
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer); // cancel any earlier hide timer
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

// ----- 3. DEMO BUTTONS -----
// Buttons with data-soon="..." are honest placeholders:
// real accounts arrive in Milestone 3 (Supabase).
document.querySelectorAll("[data-soon]").forEach((btn) => {
  btn.addEventListener("click", () => {
    showToast(btn.dataset.soon + " is coming in Milestone 3, when we connect Supabase.");
  });
});

// ----- 4. SERVICE WORKER (lets the site be installed like an app) -----
// Only on a real website (https), never on localhost, so it
// never serves stale files while you are developing.
if ("serviceWorker" in navigator && location.protocol === "https:") {
  navigator.serviceWorker.register("service-worker.js").catch((err) => {
    console.warn("Service worker not registered:", err);
  });
}

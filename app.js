/* ============ YM Marketing — interactivity ============ */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---- Theme (also driven by Tweaks) ---- */
  const root = document.documentElement;
  const THEME_KEY = "ym-theme";
  // one-time style used to suppress transitions during a theme swap so
  // var-backed color/background don't get stuck at the previous value
  const ntStyle = document.createElement("style");
  ntStyle.textContent = ".__theme-swapping *{transition:none !important}";
  document.head.appendChild(ntStyle);
  function applyTheme(t, persist = true) {
    root.classList.add("__theme-swapping");
    root.setAttribute("data-theme", t);
    // force reflow so the new computed values commit before transitions resume
    void root.offsetHeight;
    requestAnimationFrame(() => root.classList.remove("__theme-swapping"));
    if (persist) try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
    window.__ymTheme = t;
    document.dispatchEvent(new CustomEvent("ym:theme", { detail: t }));
  }
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) applyTheme(saved, false);
  } catch (e) {}
  window.ymSetTheme = applyTheme;
  const themeBtn = $("#themeBtn");
  if (themeBtn) themeBtn.addEventListener("click", () =>
    applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark"));

  /* ---- Nav scroll state ---- */
  const nav = $("#nav");
  const hero = $("#hero");
  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 40);
    // is nav still over the hero?
    if (hero) {
      const overHero = hero.getBoundingClientRect().bottom > 72;
      nav.classList.toggle("on-hero", overHero);
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // swap nav logo to maroon mark when not on hero in light theme (white logo invisible on light bg)
  const navLogo = $("#navLogo");
  function updateNavLogo() {
    const onHero = nav.classList.contains("on-hero") && !nav.classList.contains("scrolled");
    const dark = root.getAttribute("data-theme") === "dark";
    // white logo works on hero (maroon) and on dark bg; maroon mark on light bg
    navLogo.src = (onHero || dark) ? "assets/logo-white.png" : "assets/logo-mark.png";
  }
  updateNavLogo();
  window.addEventListener("scroll", updateNavLogo, { passive: true });
  document.addEventListener("ym:theme", updateNavLogo);

  /* ---- Mobile menu ---- */
  const menu = $("#mobileMenu");
  const openMenu = () => { menu.classList.add("open"); document.body.style.overflow = "hidden"; };
  const closeMenu = () => { menu.classList.remove("open"); document.body.style.overflow = ""; };
  $("#burger").addEventListener("click", openMenu);
  $("#mmClose").addEventListener("click", closeMenu);
  $$("[data-mm]").forEach((a) => a.addEventListener("click", closeMenu));

  /* ---- Year ---- */
  $("#year").textContent = new Date().getFullYear();

  /* ---- Contact form ---- */
  const form = $("#contactForm");
  if (form) form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#cf-name"), email = $("#cf-email");
    let ok = true;
    [name, email].forEach((f) => {
      const bad = !f.value.trim() || (f.type === "email" && !/^[^@]+@[^@]+\.[^@]+$/.test(f.value));
      f.style.borderColor = bad ? "#ff9aa2" : "";
      if (bad) ok = false;
    });
    if (!ok) return;
    $("#formFields").style.display = "none";
    $("#formSuccess").classList.add("show");
  });

  /* ---- Reveal on scroll + count-up (re-bind after dynamic render) ---- */
  function bindReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    $$(".reveal:not(.in)").forEach((el) => io.observe(el));
  }

  // Safety: if the page can't actually scroll (some embedded/preview frames),
  // IntersectionObserver may never fire for below-fold sections — reveal them all
  // so content is never stuck hidden. Real browsers scroll fine and keep the stagger.
  function revealFallback() {
    const canScroll = document.documentElement.scrollHeight > window.innerHeight + 40;
    if (!canScroll) { $$(".reveal").forEach((el) => el.classList.add("in")); return; }
    const before = window.scrollY;
    window.scrollTo(0, before + 12);
    const moved = window.scrollY !== before;
    window.scrollTo(0, before);
    if (!moved) $$(".reveal").forEach((el) => el.classList.add("in"));
  }

  function bindCounters() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        const el = en.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const decimals = (String(target).split(".")[1] || "").length;
        const dur = 1400, start = performance.now();
        function tick(now) {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = (target * eased).toFixed(decimals);
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    $$("[data-count]").forEach((el) => io.observe(el));
  }

  function init() { bindReveal(); bindCounters(); }
  if (document.readyState !== "loading") init();
  else window.addEventListener("DOMContentLoaded", init);
  // dynamic content (services/work/quotes) is injected on DOMContentLoaded by data.js
  document.addEventListener("ym:rendered", () => { bindReveal(); setTimeout(revealFallback, 700); });
  window.addEventListener("load", () => setTimeout(revealFallback, 600));
})();

/* ============ YM Marketing — content + rendering ============ */
(function () {
  const ic = (p) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;

  const services = [
    { n: "01", t: "Social Media Management",
      d: "Always-on content, community and calendars that keep your brand top-of-feed and on-message.",
      i: ic('<circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>') },
    { n: "02", t: "Search Engine Optimization",
      d: "Technical fixes, content and authority building so the right buyers find you on Google first.",
      i: ic('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/>') },
    { n: "03", t: "Paid Advertising",
      d: "Google &amp; Meta campaigns engineered around return on spend — tested, scaled, never set-and-forget.",
      i: ic('<path d="M3 11l18-7-7 18-2.5-8.5L3 11z"/>') },
    { n: "04", t: "Content Creation &amp; Marketing",
      d: "Strategy-led content — copy, video and design — that earns attention and moves people to act.",
      i: ic('<path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h8M8 16h5"/>') },
    { n: "05", t: "Email &amp; Automation",
      d: "Lifecycle flows and broadcasts that nurture leads on autopilot and bring buyers back.",
      i: ic('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>') },
    { n: "06", t: "Conversion Rate Optimization",
      d: "Landing pages and funnels tested relentlessly to turn the traffic you already have into revenue.",
      i: ic('<path d="M3 17l6-6 4 4 7-8"/><path d="M14 7h7v7"/>') },
    { n: "07", t: "Digital Branding &amp; Strategy",
      d: "Positioning, identity and the roadmap that ties every channel into one compounding growth engine.",
      i: ic('<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18" opacity=".4"/><circle cx="12" cy="12" r="3.4"/>') },
  ];

  const work = [
    { img: "assets/case-cafe.png", url: "https://instagram.com/innovationcafe.qa", handle: "@innovationcafe.qa",
      tag: "Social · Community", name: "Innovation Café",
      d: "Content and community management for Qatar’s leading hub for startups and entrepreneurs in Lusail — a daily feed that turned a café into a movement.",
      m: [["11.1K", "Followers"], ["524", "Posts"], ["Lusail", "Qatar"]] },
    { img: "assets/case-gabo.png", url: "https://instagram.com/gabojassoum", handle: "@gabojassoum",
      tag: "Social · Content", name: "Ghada Aboujassom",
      d: "Social media and content for a certified family &amp; life-skills coach — building an engaged education community around self-awareness and balanced family life.",
      m: [["918", "Followers"], ["313", "Posts"], ["Education", "Coaching"]] },
    { img: "assets/case-streams.png", url: "https://instagram.com/innovationstreams.qa", handle: "@innovationstreams.qa",
      tag: "Branding · Content", name: "Innovation Streams",
      d: "Brand presence and content for an innovation hub at The Pearl, Doha — a clean, consistent identity carried across the whole feed.",
      m: [["424", "Followers"], ["48", "Posts"], ["The Pearl", "Doha"]] },
    { img: "assets/case-falak.png", url: "https://instagram.com/falakqatar", handle: "@falakqatar",
      tag: "Strategy · Content", name: "Falak Qatar",
      d: "Digital branding and content for an entrepreneurship platform — startup directory, newsroom and consultations powering Qatar’s innovation ecosystem.",
      m: [["379", "Followers"], ["39", "Posts"], ["Platform", "falak.qa"]] },
  ];

  const quotes = [
    { slot: "q1", stars: 5, text: "YM didn’t just run our ads — she found the gaps we couldn’t see and rebuilt the whole funnel. Bookings have never been this consistent.",
      name: "Operations Lead", role: "Innovation Café" },
    { slot: "q2", stars: 5, text: "Clear, fast and genuinely strategic. Our brand finally feels like it has a voice, and the numbers in the dashboard back it up.",
      name: "Ghada Aboujassom", role: "@gabojassoum" },
    { slot: "q3", stars: 5, text: "From launch strategy to email automation, everything connected. We went to market with a real plan instead of guesswork.",
      name: "Marketing Manager", role: "Falak Qatar" },
  ];

  const star = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"/></svg>`;
  const arrow = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>`;

  window.addEventListener("DOMContentLoaded", () => {
    // Services
    document.getElementById("svcGrid").innerHTML = services.map((s, i) => `
      <article class="svc reveal" data-d="${(i % 3) + 1}">
        <div class="svc-top">
          <div class="svc-ic">${s.i}</div>
          <div class="svc-num">${s.n}</div>
        </div>
        <h3>${s.t}</h3>
        <p>${s.d}</p>
        <div class="svc-arrow">${arrow}</div>
      </article>`).join("");

    // Work
    document.getElementById("workGrid").innerHTML = work.map((w, i) => `
      <article class="case reveal" data-d="${(i % 2) + 1}">
        <div class="case-media">
          <span class="case-tag">${w.tag}</span>
          <img class="case-img" src="${w.img}" alt="${w.name} — Instagram" loading="lazy">
        </div>
        <div class="case-body">
          <div class="row"><h3>${w.name}</h3><span class="yr">${w.handle}</span></div>
          <p>${w.d}</p>
          <div class="case-metrics">
            ${w.m.map(([b, s]) => `<div class="cm"><b>${b}</b><span>${s}</span></div>`).join("")}
          </div>
          <a class="case-link" href="${w.url}" target="_blank" rel="noopener">View on Instagram ${arrow}</a>
        </div>
      </article>`).join("");

    // Quotes
    document.getElementById("quoteGrid").innerHTML = quotes.map((q, i) => `
      <article class="quote reveal" data-d="${(i % 3) + 1}">
        <div class="q-mark">”</div>
        <div class="stars">${star.repeat(q.stars)}</div>
        <p>${q.text}</p>
        <div class="who">
          <image-slot id="${q.slot}" shape="circle" placeholder=""></image-slot>
          <div><b>${q.name}</b><span>${q.role}</span></div>
        </div>
      </article>`).join("");

    document.dispatchEvent(new Event("ym:rendered"));
  });
})();

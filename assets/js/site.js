/* ==========================================================================
   ANAKRASIS — site script
   Edit the CONFIG and LEXICON below; nothing else needs to change.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- CONFIG ---------- */
  const CONFIG = {
    // Where demo requests are sent when no form service is configured.
    contactEmail: "hello@anakrasis.com",   // TODO: replace with the real address
    // Optional form service (e.g. Formspree: "https://formspree.io/f/xxxxxxx").
    // Leave empty to fall back to the visitor's email client (mailto).
    formEndpoint: "",
  };

  /* ---------- LEXICON (footer carousel) ----------
     One word, one short explanation (max two lines).
     Placeholder entries: replace with the campaign words.            */
  const LEXICON = [
    ["ἀνάκρασις", "anákrasis", "A mixing in the right proportion: separate elements blended into one whole."],
    ["χάος", "cháos", "The shapeless void that, in Greek myth, came before everything else."],
    ["κόσμος", "kósmos", "Order, arrangement. Only later: the universe seen as an ordered whole."],
    ["κρίσις", "krísis", "From krínein, to separate and to judge: the moment in which one decides."],
    ["τάξις", "táxis", "Arrangement: putting things in their place and in their sequence."],
    ["ἑρμηνεία", "hermēneía", "Interpretation: making a meaning understandable to someone else."],
    ["σύνοψις", "sýnopsis", "Seeing together: the whole, taken in at a single glance."],
    ["κυβερνήτης", "kybernḗtēs", "The helmsman: the one who holds the course."],
  ];
  const LEX_SECONDS = 6.5;

  /* ---------- footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  /* ---------- lexicon carousel ---------- */
  const stage = document.getElementById("lex-stage");
  if (stage) {
    const bar = document.getElementById("lex-bar"), counter = document.getElementById("lex-n");
    const pad = n => String(n).padStart(2, "0");
    stage.innerHTML = LEXICON.map(([g, t, m]) =>
      `<div class="lx"><span class="g" lang="grc">${g}</span><span class="t lab">${t}</span><span class="m">${m}</span></div>`).join("");
    const items = [...stage.children];
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0, timer = null, paused = false;

    const run = () => {
      clearTimeout(timer);
      bar.style.transition = "none"; bar.style.width = "0";
      if (paused || still) return;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        bar.style.transition = `width ${LEX_SECONDS}s linear`; bar.style.width = "100%";
      }));
      timer = setTimeout(() => show(i + 1), LEX_SECONDS * 1000);
    };
    const show = n => {
      const prev = items[i];
      prev.classList.remove("on"); prev.classList.add("out");
      setTimeout(() => prev.classList.remove("out"), 800);
      i = (n + items.length) % items.length;
      items[i].classList.add("on");
      counter.textContent = `${pad(i + 1)} / ${pad(items.length)}`;
      run();
    };
    items[0].classList.add("on");
    counter.textContent = `01 / ${pad(items.length)}`;
    document.getElementById("lex-next").onclick = () => show(i + 1);
    document.getElementById("lex-prev").onclick = () => show(i - 1);
    stage.onclick = () => show(i + 1);
    const lex = document.getElementById("lex");
    lex.addEventListener("mouseenter", () => { paused = true; run(); });
    lex.addEventListener("mouseleave", () => { paused = false; run(); });
    run();
  }

  /* ---------- home: instrument names reveal their line ---------- */
  const names = document.querySelectorAll("#names a");
  const desc = document.getElementById("names-desc");
  names.forEach(a => a.addEventListener("mouseenter", () => {
    names.forEach(x => x.classList.toggle("on", x === a));
    if (desc && a.dataset.desc) desc.textContent = a.dataset.desc;
  }));

  /* ---------- the dialogue: demo request form ---------- */
  const form = document.getElementById("dialogue-form");
  if (form) {
    const params = new URLSearchParams(location.search);
    if (params.get("email")) form.elements.email.value = params.get("email");

    form.addEventListener("submit", async e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      if (data.website) return; // honeypot
      delete data.website;

      if (CONFIG.formEndpoint) {
        try {
          const r = await fetch(CONFIG.formEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(data),
          });
          if (!r.ok) throw new Error(r.status);
          form.hidden = true;
          document.getElementById("thanks").hidden = false;
          return;
        } catch (err) { /* fall through to email */ }
      }
      const body = `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\n\n${data.message}`;
      location.href = `mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent("Demo request — " + (data.company || data.name))}&body=${encodeURIComponent(body)}`;
    });
  }
})();

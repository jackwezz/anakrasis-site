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
    ["ἀνάκρασις", "anákrasis", "A mixing together: separate elements blended into one whole."],
    ["χάος", "cháos", "The yawning gap that, in Hesiod, came into being first of all."],
    ["κόσμος", "kósmos", "Order, arrangement, also adornment. Later: the universe seen as an ordered whole."],
    ["κρίσις", "krísis", "From krínein, to separate and to judge: decision; in medicine, the turning point."],
    ["σαφήνεια", "saphḗneia", "Clearness, distinctness: the quality of what is plain to see."],
    ["τάξις", "táxis", "Arrangement, order: things set in their place, as troops in their ranks."],
    ["ἑρμηνεία", "hermēneía", "Interpretation, expression: putting a meaning into words for someone else."],
    ["λόγος", "lógos", "Word, account, reason: what can be said and given reasons for."],
    ["σύνοψις", "sýnopsis", "Seeing together: the whole, taken in at a single glance."],
    ["ἀλήθεια", "alḗtheia", "Truth. By its roots: what does not escape notice, what is not hidden."],
    ["δόξα", "dóxa", "Opinion, what seems: for Plato, belief not yet grounded in knowledge."],
    ["ἐπιστήμη", "epistḗmē", "Knowledge, understanding: what is known with its reasons."],
    ["φρόνησις", "phrónēsis", "Practical wisdom: knowing what to do in the particular case."],
    ["καιρός", "kairós", "The right moment: the time in which acting makes sense."],
    ["μέτρον", "métron", "Measure: a rule or standard; also the right amount."],
    ["ἀνάλυσις", "análysis", "A loosening, an undoing: resolving a whole into its parts."],
    ["σύνθεσις", "sýnthesis", "A putting together: composition, one whole made out of parts."],
    ["διάγνωσις", "diágnōsis", "Discernment: telling one thing apart from another; also a decision."],
    ["θεωρία", "theōría", "Looking at, being a spectator; later: contemplation."],
    ["ἁρμονία", "harmonía", "A joint, a fitting together; then agreement, and the tuning of a scale."],
    ["μέθοδος", "méthodos", "A following after: the pursuit of knowledge, a way of inquiry."],
    ["σημεῖον", "sēmeîon", "Sign, mark: something that points to something else."],
    ["ἰδέα", "idéa", "Look, form: from ideîn, to see. For Plato, the Form of a thing."],
    ["σκοπός", "skopós", "A lookout, a watcher; then the mark one keeps in sight: the aim."],
    ["πρόνοια", "prónoia", "Foresight, forethought; later also providence."],
    ["ἀκρίβεια", "akríbeia", "Exactness, precision: strict care for detail."],
    ["ὅρος", "hóros", "A boundary stone, a limit; in logic, a definition."],
    ["διάνοια", "diánoia", "Thought, intention; for Plato, thinking that proceeds step by step."],
    ["γνῶσις", "gnôsis", "Knowing, recognition: the act of coming to know."],
    ["ἀρχή", "archḗ", "Beginning and principle: where something starts and what governs it."],
    ["τέλος", "télos", "End, purpose: what a thing is for."],
    ["τέχνη", "téchnē", "Craft: knowing how to make something well."],
    ["πρᾶξις", "prâxis", "Doing, action: also a deal, a transaction."],
    ["φῶς", "phôs", "Light; contracted from the older form pháos."],
    ["κυβερνήτης", "kybernḗtēs", "The helmsman, the pilot: the one who steers. The root of govern."],
  ];
  const LEX_SECONDS = 6.5;

  /* ---------- footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  /* ---------- lexicon carousel ---------- */
  const stage = document.getElementById("lex-stage");
  if (stage) {
    const bar = document.getElementById("lex-bar");
    stage.innerHTML = LEXICON.map(([g, t, m]) =>
      `<div class="lx"><span class="g" lang="grc">${g}</span><span class="t lab">${t}</span><span class="m">${m}</span></div>`).join("");
    const items = [...stage.children];
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // The word follows the clock, so every page shows the same word at the same moment
    // and the footer does not restart on each click. Nothing is stored on the device.
    const T = LEX_SECONDS * 1000;
    let i = Math.floor(Date.now() / T) % items.length, timer = null, paused = false;

    const run = (left = T) => {
      clearTimeout(timer);
      bar.style.transition = "none"; bar.style.width = `${(1 - left / T) * 100}%`;
      if (paused || still) return;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        bar.style.transition = `width ${left / 1000}s linear`; bar.style.width = "100%";
      }));
      timer = setTimeout(() => show(i + 1), left);
    };
    const show = n => {
      const prev = items[i];
      prev.classList.remove("on"); prev.classList.add("out");
      setTimeout(() => prev.classList.remove("out"), 800);
      i = (n + items.length) % items.length;
      items[i].classList.add("on");
      run();
    };
    items[i].classList.add("on");
    const lex = document.getElementById("lex");
    lex.addEventListener("mouseenter", () => { paused = true; run(); });
    lex.addEventListener("mouseleave", () => { paused = false; run(); });
    run(T - Date.now() % T);
  }

  /* ---------- small screens: bring the current station into view ---------- */
  const trail = document.querySelector(".trail"), here = trail && trail.querySelector("[aria-current]");
  if (here && trail.scrollWidth > trail.clientWidth) trail.scrollLeft = here.offsetLeft - 18;

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

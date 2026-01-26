/* ==========================================
   Santa Cruz Electric & Power - script.js
   Simple, clean interactions (no frameworks)
   ========================================== */

(function () {
  // Smooth scroll for in-page links (e.g., #services, #contact)
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const href = a.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Make any element with data-call call the number
  // Example in HTML: <a class="btn btn-primary" data-call>Call Now</a>
  const callButtons = document.querySelectorAll("[data-call]");
  callButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "tel:+19493443449";
    });
  });

  // Make any element with data-text open SMS
  // Example in HTML: <a class="btn btn-outline" data-text>Text Me</a>
  const textButtons = document.querySelectorAll("[data-text]");
  textButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      // Pre-fill a simple message
      const msg = encodeURIComponent("Hi, I found you online. Can I get a quote?");
      window.location.href = `sms:+19493443449?&body=${msg}`;
    });
  });

  // Optional: highlight current section while scrolling (if nav links exist)
  const sectionIds = ["services", "reviews", "about", "contact"];
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const navLinks = Array.from(document.querySelectorAll('a[href^="#"]'));

  if (sections.length && navLinks.length) {
    const setActive = () => {
      const y = window.scrollY + 120;
      let activeId = null;

      for (const sec of sections) {
        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;
        if (y >= top && y < bottom) {
          activeId = sec.id;
          break;
        }
      }

      navLinks.forEach((link) => {
        const href = link.getAttribute("href") || "";
        link.classList.toggle("active", activeId && href === `#${activeId}`);
      });
    };

    window.addEventListener("scroll", setActive, { passive: true });
    setActive();
  }

  // Safety: if page loads with a hash, scroll nicely
  window.addEventListener("load", () => {
    const hash = window.location.hash;
    if (!hash) return;
    const target = document.querySelector(hash);
    if (!target) return;
    setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
  });
})();

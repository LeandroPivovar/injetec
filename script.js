(() => {
  const header = document.querySelector(".header");
  const hero = document.querySelector(".hero__frame");
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu-mobile");

  // Header ganha fundo quando o topo do hero sai da tela
  if (header && hero && "IntersectionObserver" in window) {
    const sentinel = document.createElement("div");
    sentinel.style.cssText = "position:absolute;top:120px;left:0;width:1px;height:1px;pointer-events:none";
    hero.appendChild(sentinel);
    new IntersectionObserver(([entry]) => {
      header.classList.toggle("is-solid", !entry.isIntersecting);
    }).observe(sentinel);
  }

  // Menu mobile
  const closeMenu = () => {
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    toggle.innerHTML = '<i class="ph ph-list" aria-hidden="true"></i>';
  };
  toggle?.addEventListener("click", () => {
    const open = menu.hidden;
    if (!open) return closeMenu();
    menu.hidden = false;
    header.classList.add("is-solid");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fechar menu");
    toggle.innerHTML = '<i class="ph ph-x" aria-hidden="true"></i>';
  });
  menu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) closeMenu(); });

  // Revelar ao rolar, com leve escalonamento entre irmãos
  const items = document.querySelectorAll(".reveal");
  items.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    el.style.setProperty("--d", `${Math.min(siblings.indexOf(el), 5) * 0.07}s`);
  });
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("is-in"));
  }

  // Carrossel de depoimentos
  const track = document.querySelector(".depo__track");
  document.querySelectorAll(".depo__nav .round").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = track.querySelector(".quote");
      const step = card ? card.getBoundingClientRect().width + 16 : 400;
      track.scrollBy({ left: step * Number(btn.dataset.dir), behavior: "smooth" });
    });
  });

  // FAQ: mantém só um item aberto
  const details = document.querySelectorAll(".faq details");
  details.forEach((d) => d.addEventListener("toggle", () => {
    if (d.open) details.forEach((o) => { if (o !== d) o.open = false; });
  }));

  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();

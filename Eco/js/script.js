const navbar = document.getElementById("navbar");
let isNavbarVisible = false;
let scrollTimeout;

window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);

  if (!isNavbarVisible) {
    navbar.classList.add("navbar-visible");
    isNavbarVisible = true;
  }

  scrollTimeout = setTimeout(() => {
    navbar.classList.remove("navbar-visible");
    isNavbarVisible = false;
  }, 200);
});

// seleciona todos os links da barra de navegação
const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
const sections = document.querySelectorAll(".content div[id]");

// adiciona um evento de clique a cada link
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // previne o comportamento padrão do link

    // adiciona a classe "active" ao link clicado e remove essa classe de todos os outros links
    navLinks.forEach((navLink) => {
      navLink.classList.remove("active");
    });
    link.classList.add("active");

    const sectionId = link.getAttribute("href"); // obtém o id da seção correspondente

    document.querySelector(sectionId).scrollIntoView({
      // rola para a seção
      behavior: "smooth",
    });
  });
});

// adiciona um evento de scroll na janela
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  // verifica cada seção para ver se está visível na janela
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop - 50 &&
      scrollPosition < sectionTop + sectionHeight - 50
    ) {
      // adiciona a classe "active" ao link correspondente e remove essa classe de todos os outros links
      navLinks.forEach((navLink) => {
        navLink.classList.remove("active");
        if (navLink.getAttribute("href") === `#${sectionId}`) {
          navLink.classList.add("active");
        }
      });
    }
  });
});

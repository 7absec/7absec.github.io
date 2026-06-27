const progressBar = document.querySelector('.scroll-progress');
const hero = document.querySelector('.hero');
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const sections = Array.from(document.querySelectorAll('main section[id]'));
const revealTargets = Array.from(document.querySelectorAll('.card, .badge-card, .hero-card, .section-heading, .hero-actions, .hero-highlights li'));

const applyReveal = () => {
  revealTargets.forEach((element, index) => {
    const delay = index * 70;
    element.style.transitionDelay = `${delay}ms`;
    element.classList.add('reveal');
  });
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

const updateScrollProgress = () => {
  if (!progressBar) return;

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
};

const updateActiveNav = () => {
  const scrollPosition = window.scrollY + 140;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`));
    }
  });
};

applyReveal();
revealTargets.forEach((element) => revealObserver.observe(element));

window.addEventListener('scroll', () => {
  updateScrollProgress();
  updateActiveNav();
}, { passive: true });

window.addEventListener('load', () => {
  updateScrollProgress();
  updateActiveNav();
});

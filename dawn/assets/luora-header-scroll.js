// Toggles a hairline/shadow cue on the sticky header once the page has
// scrolled past the top, since the header is a translucent white blur over
// a white page and needs an edge cue instead of a color shift to stay
// legible. Ref: luora-website-redesign-concept-v2.md §05.
(() => {
  const header = document.querySelector('.header-wrapper');
  if (!header) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setScrolled = () => {
    header.classList.toggle('header-wrapper--scrolled', window.scrollY > 12);
  };

  setScrolled();
  window.addEventListener('scroll', setScrolled, { passive: true });

  if (prefersReduced) {
    header.style.transition = 'none';
  }
})();

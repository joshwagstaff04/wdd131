const yearEl = document.getElementById('year');
const lastModEl = document.getElementById('last-modified');
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastModEl) lastModEl.textContent = document.lastModified;


const menuBtn = document.getElementById('menu');
const nav = document.getElementById('primary-nav');

function toggleMenu() {
  if (!nav || !menuBtn) return;
  const isOpen = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(isOpen));
  menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  menuBtn.textContent = isOpen ? '✕' : '☰';
}
if (menuBtn && nav) {
  menuBtn.addEventListener('click', toggleMenu);
}


const gallery = document.getElementById('gallery'); 
const filterLinks = document.querySelectorAll('[data-filter]');

function showAll() {
  if (!gallery) return;
  gallery.querySelectorAll('.card').forEach(c => (c.hidden = false));
}

function applyFilter(type) {
  if (!gallery) return;
  const cards = gallery.querySelectorAll('.card');
  cards.forEach(card => {
    const era = card.dataset.era;     
    const size = card.dataset.size;   
    let show = true;

    if (type === 'old')   show = era === 'old';
    if (type === 'new')   show = era === 'new';
    if (type === 'large') show = size === 'large';
    if (type === 'small') show = size === 'small';

    card.hidden = !show;
  });
}

function setActive(linkEl) {
  filterLinks.forEach(l => {
    l.classList.remove('active');
    l.removeAttribute('aria-current');
  });
  linkEl.classList.add('active');
  linkEl.setAttribute('aria-current', 'page');
}

filterLinks.forEach(link => {
  function handleActivate(e) {
    if (e) e.preventDefault();
    const type = link.getAttribute('data-filter'); 
    if (type === 'home') {
      showAll();
    } else {
      applyFilter(type);
    }
    setActive(link);

    if (window.matchMedia('(max-width: 699px)').matches && nav?.classList.contains('open')) {
      toggleMenu();
    }
  }

  link.addEventListener('click', handleActivate);

  link.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') handleActivate(e);
  });
});


showAll();
if (filterLinks.length) setActive(filterLinks[0]);
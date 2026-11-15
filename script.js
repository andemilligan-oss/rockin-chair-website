const schalter = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#hauptnavigation');

if (schalter && navigation) {
  schalter.addEventListener('click', () => {
    const offen = schalter.getAttribute('aria-expanded') === 'true';
    schalter.setAttribute('aria-expanded', String(!offen));
    schalter.setAttribute('aria-label', offen ? 'Menü öffnen' : 'Menü schließen');
    navigation.classList.toggle('is-open', !offen);
  });
  navigation.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navigation.classList.remove('is-open');
      schalter.setAttribute('aria-expanded', 'false');
      schalter.setAttribute('aria-label', 'Menü öffnen');
    });
  });
  document.addEventListener('keydown', ereignis => {
    if (ereignis.key === 'Escape') {
      navigation.classList.remove('is-open');
      schalter.setAttribute('aria-expanded', 'false');
      schalter.setAttribute('aria-label', 'Menü öffnen');
    }
  });
}
document.querySelector('#jahr').textContent = new Date().getFullYear();

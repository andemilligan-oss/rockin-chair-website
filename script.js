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


const formular = document.querySelector('#kontaktformular');
if (formular) {
  formular.addEventListener('submit', async (ereignis) => {
    ereignis.preventDefault();
    const status = document.querySelector('#formular-status');
    if (!formular.reportValidity()) {
      status.textContent = 'Bitte alle Pflichtfelder ausfüllen.';
      return;
    }
    const schaltflaeche = formular.querySelector('button[type="submit"]');
    schaltflaeche.disabled = true;
    status.textContent = 'Die Anfrage wird gesendet …';
    try {
      const felder = new FormData();
      felder.append('_subject', 'Buchungsanfrage Rockin’ Chair');
      felder.append('_template', 'table');
      felder.append('name', formular.elements.namedItem('name').value.trim());
      felder.append('email', formular.elements.namedItem('email').value.trim());
      felder.append('Veranstaltungsdatum', formular.elements.namedItem('datum').value || 'Noch offen');
      felder.append('Veranstaltungsort', formular.elements.namedItem('ort').value.trim() || 'Noch offen');
      felder.append('Nachricht', formular.elements.namedItem('nachricht').value.trim());
      const antwort = await fetch(formular.action, {
        method: 'POST',
        headers: {Accept: 'application/json'},
        body: felder
      });
      const ergebnis = await antwort.json();
      if (!antwort.ok || ergebnis.success === false || ergebnis.success === 'false') {
        throw new Error('Versand nicht bestätigt');
      }
      formular.reset();
      status.textContent = 'Deine Anfrage wurde übermittelt. Vielen Dank!';
    } catch (fehler) {
      status.textContent = 'Die Anfrage konnte nicht gesendet werden. Bitte versuche es erneut oder nutze Instagram.';
    } finally {
      schaltflaeche.disabled = false;
    }
  });
}

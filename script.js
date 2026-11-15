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
  formular.addEventListener('submit', (ereignis) => {
    ereignis.preventDefault();
    const status = document.querySelector('#formular-status');
    if (!formular.reportValidity()) {
      status.textContent = 'Bitte fülle die Pflichtfelder aus.';
      return;
    }
    const daten = new FormData(formular);
    const name = String(daten.get('name') || '').trim();
    const email = String(daten.get('email') || '').trim();
    const datum = String(daten.get('datum') || '').trim();
    const ort = String(daten.get('ort') || '').trim();
    const nachricht = String(daten.get('nachricht') || '').trim();
    if (!name || !email || !nachricht) {
      status.textContent = 'Bitte fülle die Pflichtfelder aus.';
      return;
    }
    const betreff = 'Buchungsanfrage Rockin’ Chair' + (datum ? ' – ' + datum : '');
    const inhalt = [
      'Buchungsanfrage über die Rockin’-Chair-Website',
      '',
      'Name: ' + name,
      'E-Mail: ' + email,
      'Veranstaltungsdatum: ' + (datum || 'Noch offen'),
      'Veranstaltungsort: ' + (ort || 'Noch offen'),
      '',
      'Nachricht:',
      nachricht
    ].join('\n');
    const url = 'mailto:ande.milligan@googlemail.com?subject=' +
      encodeURIComponent(betreff) + '&body=' + encodeURIComponent(inhalt);
    status.textContent = 'Die Nachricht wird in deinem E-Mail-Programm geöffnet. Bitte dort noch absenden.';
    window.location.href = url;
  });
}

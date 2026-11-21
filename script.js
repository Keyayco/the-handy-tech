const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
menuButton?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.mobile-menu a').forEach((link) => link.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('[data-service]').forEach((link) => link.addEventListener('click', () => {
  const select = document.querySelector('#service');
  const requested = link.dataset.service;
  [...select.options].forEach((option) => { if (option.value === requested) select.value = requested; });
}));

document.querySelectorAll('[data-property]').forEach((link) => link.addEventListener('click', () => {
  const select = document.querySelector('#property');
  const requested = link.dataset.property;
  [...select.options].forEach((option) => { if (option.value === requested) select.value = requested; });
}));

const form = document.querySelector('#quote-form');
const status = document.querySelector('#form-status');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    status.textContent = 'Please complete the required fields before continuing.';
    status.classList.add('error');
    return;
  }
  const data = new FormData(form);
  const message = [
    'Hi The Handy Tech, I would like to request a security installation quotation.',
    '',
    `Name: ${data.get('name')}`,
    `Contact number: ${data.get('phone')}`,
    `Email: ${data.get('email') || 'Not provided'}`,
    `Property type: ${data.get('property')}`,
    `Project type: ${data.get('project')}`,
    `Service: ${data.get('service')}`,
    `Installation location: ${data.get('location')}`,
    `Additional requirements: ${data.get('details') || 'None provided'}`
  ].join('\n');
  status.classList.remove('error');
  status.textContent = 'Opening WhatsApp with your enquiry…';
  window.open(`https://wa.me/27764340958?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

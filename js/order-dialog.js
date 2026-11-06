/* Быстрая заявка в Bootstrap-модальном окне (#orderModal) */
document.addEventListener('DOMContentLoaded', () => {
  const modalEl = document.getElementById('orderModal');
  if (!modalEl) return;

  const form = document.getElementById('modal-form');
  const product = document.getElementById('modal-product');
  const success = document.getElementById('modal-success');
  const sendBtn = document.getElementById('modal-send');
  const phone = document.getElementById('modal-phone');

  /* при открытии подставляем название мастер-класса из кнопки */
  modalEl.addEventListener('show.bs.modal', (e) => {
    const btn = e.relatedTarget;
    product.textContent = (btn && btn.dataset.mk) || '—';
    form.reset();
    form.classList.remove('was-validated');
    form.hidden = false;
    sendBtn.hidden = false;
    success.classList.add('d-none');
  });

  /* маска телефона */
  phone.addEventListener('input', () => {
    let d = phone.value.replace(/\D/g, '');
    if (d.startsWith('7') || d.startsWith('8')) d = d.slice(1);
    d = d.slice(0, 10);
    let out = '+7';
    if (d.length > 0) out += ' (' + d.slice(0, 3);
    if (d.length >= 3) out += ')';
    if (d.length > 3) out += ' ' + d.slice(3, 6);
    if (d.length > 6) out += '-' + d.slice(6, 8);
    if (d.length > 8) out += '-' + d.slice(8, 10);
    phone.value = d.length ? out : '';
  });

  /* отправка с проверкой */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.classList.add('was-validated');
    if (!form.checkValidity()) return;
    form.hidden = true;
    sendBtn.hidden = true;
    success.classList.remove('d-none');
  });
});
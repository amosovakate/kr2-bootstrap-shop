document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('order-page-form');
  const select = document.getElementById('p-topic');
  const chipsBox = document.getElementById('p-chips');
  const guests = document.getElementById('p-guests');
  const success = document.getElementById('p-success');
  const $ = (id) => document.getElementById(id);

  /* данные мастер-классов для боковой панели */
  const MK = {
    newyear:   { level: 'Для начинающих', time: '2 часа',   price: 1800 },
    flower:    { level: 'Для начинающих', time: '3 часа',   price: 2500 },
    abstract:  { level: 'Для начинающих', time: '2,5 часа', price: 2200 },
    sea:       { level: 'Средний',        time: '3 часа',   price: 2800 },
    gilding:   { level: 'Средний',        time: '3,5 часа', price: 3200 },
    minimal:   { level: 'Для начинающих', time: '2 часа',   price: 1900 },
    landscape: { level: 'Продвинутый',    time: '4 часа',   price: 3000 },
    desert:    { level: 'Для начинающих', time: '2,5 часа', price: 2300 }
  };

  const fmt = (n) => n.toLocaleString('ru-RU') + ' ₽';

  /* ---------- чипы ---------- */
  const chips = [];
  Array.from(select.options).forEach((opt) => {
    if (!opt.value) return;
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'mk-chip';
    chip.dataset.value = opt.value;
    chip.setAttribute('role', 'radio');
    chip.textContent = opt.textContent;
    chip.addEventListener('click', () => {
      select.value = opt.value;
      $('p-topic-error').classList.remove('is-shown');
      refresh();
    });
    chipsBox.appendChild(chip);
    chips.push(chip);
  });

  /* ---------- боковая панель ---------- */
  function refresh() {
    chips.forEach((c) => {
      const on = c.dataset.value === select.value;
      c.classList.toggle('is-active', on);
      c.setAttribute('aria-checked', on ? 'true' : 'false');
    });

    const n = Number(guests.value) || 1;
    $('sum-guests').textContent = n;

    const mk = MK[select.value];
    if (mk) {
      const label = select.options[select.selectedIndex].textContent;
      $('sum-title').textContent = label;
      $('sum-level').textContent = mk.level;
      $('sum-time').textContent = mk.time;
      $('sum-total').textContent = fmt(mk.price * n);
    } else {
      $('sum-title').textContent = 'Выберите мастер-класс';
      $('sum-level').textContent = '—';
      $('sum-time').textContent = '—';
      $('sum-total').textContent = '—';
    }
  }

  /* ---------- мастер-класс из ссылки: order.html?mk=gilding ---------- */
  const fromUrl = new URLSearchParams(location.search).get('mk');
  if (fromUrl && MK[fromUrl]) select.value = fromUrl;

  /* ---------- счётчик ---------- */
  document.querySelectorAll('.counter__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = Number(guests.value) + Number(btn.dataset.step);
      guests.value = Math.min(Number(guests.max), Math.max(Number(guests.min), next));
      refresh();
    });
  });

  /* ---------- дата: не раньше сегодняшней ---------- */
  const date = $('p-date');
  const today = new Date();
  date.min = today.getFullYear() + '-' +
    String(today.getMonth() + 1).padStart(2, '0') + '-' +
    String(today.getDate()).padStart(2, '0');

  /* ---------- маска телефона ---------- */
  const phone = $('p-phone');
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

  /* ---------- счётчик символов ---------- */
  const comment = $('p-comment');
  const count = $('p-comment-count');
  comment.addEventListener('input', () => { count.textContent = comment.value.length; });

  /* ---------- отправка ---------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.classList.add('was-validated');
    $('p-topic-error').classList.toggle('is-shown', !select.value);

    if (!form.checkValidity()) {
      const bad = form.querySelector(':invalid:not(select)') || chipsBox;
      bad.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (bad.focus) bad.focus({ preventScroll: true });
      return;
    }

    form.hidden = true;
    success.classList.add('is-shown');
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  /* ---------- сброс и «записаться ещё» ---------- */
  form.addEventListener('reset', () => {
    form.classList.remove('was-validated');
    $('p-topic-error').classList.remove('is-shown');
    setTimeout(() => { count.textContent = 0; refresh(); }, 0);
  });

  $('p-again').addEventListener('click', () => {
    success.classList.remove('is-shown');
    form.hidden = false;
    form.reset();
  });

  refresh();
});
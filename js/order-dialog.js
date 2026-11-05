document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('order-dialog');
  const form = document.getElementById('order-form');
  const select = document.getElementById('topic');
  const chipsBox = document.getElementById('mk-chips');
  if (!dialog || !form || !select || !chipsBox) return;

  /* ---------- 1. чипы мастер-классов ---------- */
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
      select.dispatchEvent(new Event('change', { bubbles: true }));
      syncChips();
    });
    chipsBox.appendChild(chip);
    chips.push(chip);
    /* ---------- счётчик символов комментария ---------- */
    const comment = document.getElementById('order-comment');
    const commentCount = document.getElementById('comment-count');
    if (comment && commentCount) {
    const updateCount = () => { commentCount.textContent = comment.value.length; };
    comment.addEventListener('input', updateCount);
    form.addEventListener('reset', () => setTimeout(updateCount, 0));
    updateCount();
}
  });

  function syncChips() {
    chips.forEach((chip) => {
      const on = chip.dataset.value === select.value;
      chip.classList.toggle('is-active', on);
      chip.setAttribute('aria-checked', on ? 'true' : 'false');
    });
  }

  // main.js выбирает мастер-класс при клике на «Записаться»,
  // поэтому обновляем чипы каждый раз, когда окно открывается
  new MutationObserver(() => {
    if (dialog.open) {
      syncChips();
      dialog.scrollTop = 0;
    }
  }).observe(dialog, { attributes: true, attributeFilter: ['open'] });

  form.addEventListener('reset', () => setTimeout(syncChips, 0));
  syncChips();

  /* ---------- 2. счётчик ---------- */
  const guests = document.getElementById('guests');
  document.querySelectorAll('.counter__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const min = Number(guests.min) || 1;
      const max = Number(guests.max) || 6;
      const next = Number(guests.value || min) + Number(btn.dataset.step);
      guests.value = Math.min(max, Math.max(min, next));
      guests.dispatchEvent(new Event('input', { bubbles: true }));
    });
  });

  /* ---------- 3. сообщение об успехе в окне ---------- */
  const oldMessage = document.getElementById('success-message');

  function showSuccess() {
    dialog.classList.add('is-sent');
    if (!dialog.open) dialog.showModal();
  }

  function closeSuccess() {
    dialog.close();
    dialog.classList.remove('is-sent');
    form.reset();
    syncChips();
  }

  // когда main.js показывает старое сообщение — прячем его и показываем наше
  if (oldMessage) {
    new MutationObserver(() => {
      if (!oldMessage.hidden) {
        oldMessage.hidden = true;
        showSuccess();
      }
    }).observe(oldMessage, { attributes: true, attributeFilter: ['hidden'] });
  }

  document.getElementById('success-close').addEventListener('click', closeSuccess);
  dialog.addEventListener('close', () => dialog.classList.remove('is-sent'));
});
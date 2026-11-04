// ===== Модальное окно записи на главной =====
document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('order-dialog');
  const openButtons = document.querySelectorAll('[data-product]');
  const closeBtn = document.getElementById('close-order-dialog');
  const selectedInput = document.getElementById('selected-product');
  const topicSelect = document.getElementById('topic');
  const form = document.getElementById('order-form');
  const success = document.getElementById('success-message');

  // Открытие диалога с подстановкой мастер-класса
  openButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mk = btn.dataset.product;
      if (selectedInput) selectedInput.value = mk;
      if (topicSelect) {
        Array.from(topicSelect.options).forEach((opt) => {
          if (opt.text === mk || opt.value === mk) opt.selected = true;
        });
      }
      if (dialog) dialog.showModal();
    });
  });

  if (closeBtn && dialog) {
    closeBtn.addEventListener('click', () => dialog.close());
  }

  // Закрытие по клику на backdrop
  if (dialog) {
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) dialog.close();
    });
  }

  // Отправка формы с валидацией
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (success) success.hidden = false;
      form.reset();
      if (dialog) dialog.close();
    });
  }
});
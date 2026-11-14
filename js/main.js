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

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn-primary, .btn-outline-primary');
  
  // Применяем только на устройствах с мышкой
  if (window.matchMedia("(pointer: fine)").matches) {
    buttons.forEach(btn => {
      btn.classList.add('btn-magnetic');

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Двигаем кнопку на 30% от положения курсора
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }
});





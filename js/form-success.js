/* ===== УНИВЕРСАЛЬНОЕ УВЕДОМЛЕНИЕ ОБ УСПЕШНОЙ ОТПРАВКЕ ФОРМ ===== */
document.addEventListener('DOMContentLoaded', () => {
  const toast      = document.getElementById('form-toast');
  if (!toast) return;

  const closeBtn   = toast.querySelector('.form-toast__close');
  const textEl     = toast.querySelector('.form-toast__text');
  let hideTimer    = null;

  /* Показать уведомление */
  const showToast = (message) => {
    if (message) {
      textEl.innerHTML = `<strong>Заявка отправлена!</strong>${message}`;
    }
    toast.hidden = false;
    toast.classList.remove('is-hiding');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideToast, 5000); // автоматически скрыть через 5 сек
  };

  /* Скрыть уведомление */
  const hideToast = () => {
    toast.classList.add('is-hiding');
    setTimeout(() => {
      toast.hidden = true;
      toast.classList.remove('is-hiding');
    }, 260);
  };

  closeBtn.addEventListener('click', hideToast);

  /* ===== Перехватываем отправку ВСЕХ форм на странице =====
     Исключаем формы поиска и фильтров (у них нет полей заявки).
  --------------------------------------------------------- */
  const forms = document.querySelectorAll('form');

  forms.forEach((form) => {
    // Пропускаем формы, которые не являются формами заявки
    if (form.id === 'chat-form' || form.classList.contains('filters-form')) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Проверяем встроенную валидацию браузера
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        // подсветить первый невалидный элемент и проскроллить к нему
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) {
          firstInvalid.focus();
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // Форма валидна — показываем уведомление
      showToast();

      // Находим модальное окно, если форма внутри него
      const dialog = form.closest('.order-dialog');
      if (dialog) {
        // Показываем экран успеха внутри модалки
        dialog.classList.add('is-sent');
      }

      // Очищаем форму, кроме скрытых полей с выбранным мастер-классом
      form.reset();
      form.classList.remove('was-validated');
    });
  });
});
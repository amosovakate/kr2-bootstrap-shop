document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. РАБОТА ФИЛЬТРОВ
  // ==========================================
  const filterForm = document.getElementById('filter-form');
  const cards = document.querySelectorAll('.mk-card');
  const noResults = document.getElementById('no-results');

  if (filterForm) {
    filterForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const checkedLevels = Array.from(document.querySelectorAll('input[name="level"]:checked')).map(cb => cb.value);
      const priceFrom = parseInt(document.getElementById('price-from').value) || 0;
      const priceTo = parseInt(document.getElementById('price-to').value) || Infinity;

      let visibleCount = 0;

      cards.forEach(card => {
        const cardLevel = card.dataset.level;
        const cardPrice = parseInt(card.dataset.price);

        const levelMatch = checkedLevels.length === 0 || checkedLevels.includes(cardLevel);
        const priceMatch = cardPrice >= priceFrom && cardPrice <= priceTo;

        const show = levelMatch && priceMatch;
        // прячем всю колонку сетки (col-*), а не только карточку
        card.closest('.mk-col').classList.toggle('d-none', !show);
        if (show) visibleCount++;
      });

      if (visibleCount === 0) {
        noResults.style.display = 'block';
      } else {
        noResults.style.display = 'none';
      }
    });
  }

  // ==========================================
  // 2. МОДАЛЬНОЕ ОКНО ПОДРОБНОСТЕЙ
  // ==========================================
  const dialog = document.getElementById('details-dialog');
  const openBtns = document.querySelectorAll('.open-details-btn');
  const closeBtn = document.getElementById('close-details-btn');

  const dImg = document.getElementById('dialog-img');
  const dTitle = document.getElementById('dialog-title');
  const dDesc = document.getElementById('dialog-desc');
  const dLevel = document.getElementById('dialog-level');
  const dTime = document.getElementById('dialog-time');
  const dPrice = document.getElementById('dialog-price');
  const dMaterialsList = document.getElementById('dialog-materials-list');

  if (dialog) {
    openBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.mk-card');
        
        // Подставляем картинку
        dImg.src = card.dataset.img;
        
        // Текст
        dTitle.textContent = card.dataset.title;
        dDesc.textContent = card.dataset.desc;
        dTime.textContent = card.dataset.time;
        dPrice.textContent = parseInt(card.dataset.price).toLocaleString('ru-RU') + ' ₽';
        
        // Уровень
        const levels = {
          'beginner': 'Для начинающих',
          'middle': 'Средний',
          'advanced': 'Продвинутый'
        };
        dLevel.textContent = levels[card.dataset.level] || card.dataset.level;

        // Материалы (разбиваем строку по запятой и создаем li)
        dMaterialsList.innerHTML = '';
        if (card.dataset.materials) {
          const materialsArray = card.dataset.materials.split(',');
          materialsArray.forEach(mat => {
            const li = document.createElement('li');
            li.textContent = mat.trim();
            dMaterialsList.appendChild(li);
          });
        }

        // Показываем окно
        dialog.showModal();
      });
    });

    // Закрытие
    closeBtn.addEventListener('click', () => dialog.close());

    // Клик по фону
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (e.clientX >= rect.left && e.clientX <= rect.right && 
                           e.clientY >= rect.top && e.clientY <= rect.bottom);
      if (!isInDialog) dialog.close();
    });
  }

});
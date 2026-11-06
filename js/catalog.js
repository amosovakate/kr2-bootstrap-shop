/* Фильтры каталога: уровень и цена */
document.addEventListener('DOMContentLoaded', () => {
  const filterForm = document.getElementById('filter-form');
  const cards = document.querySelectorAll('.mk-card');
  const noResults = document.getElementById('no-results');
  if (!filterForm) return;

  filterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const checkedLevels = Array.from(document.querySelectorAll('input[name="level"]:checked')).map((cb) => cb.value);
    const priceFrom = parseInt(document.getElementById('price-from').value) || 0;
    const priceTo = parseInt(document.getElementById('price-to').value) || Infinity;

    let visibleCount = 0;

    cards.forEach((card) => {
      const cardPrice = parseInt(card.dataset.price);
      const levelMatch = checkedLevels.length === 0 || checkedLevels.includes(card.dataset.level);
      const priceMatch = cardPrice >= priceFrom && cardPrice <= priceTo;
      const show = levelMatch && priceMatch;

      // прячем всю колонку сетки (col-*), а не только карточку
      card.closest('.mk-col').classList.toggle('d-none', !show);
      if (show) visibleCount++;
    });

    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  });
});
(function () {
  'use strict';

  // Собираем МК прямо из DOM — данные всегда актуальны
  function collectMasterClasses() {
    const cards = document.querySelectorAll('.product-card');
    const items = [];

    cards.forEach(card => {
      const name = card.querySelector('.product-card__title')?.textContent.trim();
      if (!name) return;

      const meta  = card.querySelector('.product-card__meta')?.textContent.trim() || '';
      const desc  = card.querySelector('.product-card__description')?.textContent.trim() || '';
      const price = card.querySelector('.product-card__price')?.textContent.trim() || '';
      const image = card.querySelector('.product-card__image')?.getAttribute('src') || '';
      const link  = card.querySelector('a[href]')?.getAttribute('href') || '#';

      items.push({ name, meta, desc, price, image, url: link });
    });

    return items;
  }

  // Убираем дубли по названию (если карточки есть на нескольких блоках)
  function uniqueByName(items) {
    const seen = new Set();
    return items.filter(item => {
      if (seen.has(item.name)) return false;
      seen.add(item.name);
      return true;
    });
  }

  const MASTER_CLASSES = uniqueByName(collectMasterClasses());
  console.log('[random-mk] найдено мастер-классов:', MASTER_CLASSES.length);

  const btn = document.getElementById('random-mk-btn');
  const dialog = document.getElementById('random-dialog');
  if (!btn || !dialog) return;
  if (!MASTER_CLASSES.length) {
    console.warn('[random-mk] карточки .product-card не найдены');
    return;
  }

  const body    = document.getElementById('random-mk-body');
  const imgEl   = document.getElementById('random-mk-image');
  const nameEl  = document.getElementById('random-mk-name');
  const metaEl  = document.getElementById('random-mk-meta');
  const descEl  = document.getElementById('random-mk-desc');
  const priceEl = document.getElementById('random-mk-price');
  const bookEl  = document.getElementById('random-mk-book');
  const againBtn = document.getElementById('random-mk-again');
  const closeBtn = document.getElementById('random-mk-close');

  let lastIndex = -1;
  let spinTimer = null;

  function pickRandom() {
    if (MASTER_CLASSES.length === 1) return MASTER_CLASSES[0];
    let i;
    do { i = Math.floor(Math.random() * MASTER_CLASSES.length); }
    while (i === lastIndex);
    lastIndex = i;
    return MASTER_CLASSES[i];
  }

  function render(item) {
    imgEl.src = item.image || '';
    imgEl.alt = item.name;
    nameEl.textContent  = item.name;
    metaEl.textContent  = item.meta;
    descEl.textContent  = item.desc;
    priceEl.textContent = item.price ? 'Стоимость: ' + item.price : '';
    bookEl.href = item.url;
  }

  function showResult(item) {
    body.classList.remove('is-spinning');
    render(item);
    body.classList.add('is-revealed');
    void body.offsetWidth;
  }

  function spin() {
    body.classList.remove('is-revealed');
    body.classList.add('is-spinning');
    
    let ticks = 0;
    // Было: 12 + Math.random() * 6
    // Стало: 18 + Math.random() * 8 (дольше крутит)
    const total = 18 + Math.floor(Math.random() * 8); 
    
    clearInterval(spinTimer);
    spinTimer = setInterval(() => {
      render(MASTER_CLASSES[Math.floor(Math.random() * MASTER_CLASSES.length)]);
      ticks++;
      if (ticks >= total) {
        clearInterval(spinTimer);
        spinTimer = null;
        showResult(pickRandom());
      }
    }, 120); // Было: 70. Стало: 120 (медленнее переключение)
  }

  btn.addEventListener('click', () => {
    if (!dialog.open) dialog.showModal();
    spin();
  });
  againBtn.addEventListener('click', spin);
  closeBtn.addEventListener('click', () => {
    clearInterval(spinTimer); spinTimer = null; dialog.close();
  });
  dialog.addEventListener('cancel', () => {
    clearInterval(spinTimer); spinTimer = null;
  });
  dialog.addEventListener('click', e => {
    if (e.target === dialog) {
      clearInterval(spinTimer); spinTimer = null; dialog.close();
    }
  });
})();
document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('gallery-dialog');
  if (!dialog) return;

  const $ = (id) => document.getElementById(id);

  const fillList = (el, text) => {
    el.innerHTML = '';
    text.split(',').forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item.trim();
      el.appendChild(li);
    });
  };

  const open = (item) => {
    const d = item.dataset;
    const img = item.querySelector('img');

    $('gd-img').src = img.src;
    $('gd-img').alt = img.alt;
    $('gd-title').textContent = d.title;
    $('gd-author').textContent = 'Автор: ' + d.author;
    $('gd-level').textContent = d.level;
    $('gd-time').textContent = d.time;
    $('gd-mk').textContent = d.mk;
    fillList($('gd-techniques'), d.techniques);
    fillList($('gd-materials'), d.materials);

    dialog.showModal();
  };

  document.querySelectorAll('.gallery-item[data-title]').forEach((item) => {
    item.addEventListener('click', () => open(item));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(item);
      }
    });
  });

  $('gd-close').addEventListener('click', () => dialog.close());

  // клик по затемнённому фону закрывает окно
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
});
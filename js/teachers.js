document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('teacher-dialog');
  if (!dialog) return;

  const $ = (id) => document.getElementById(id);
  const split = (text) => text.split(',').map((s) => s.trim()).filter(Boolean);

  const open = (card) => {
    const d = card.dataset;

    $('td-photo').src = d.photo;
    $('td-photo').alt = d.name;
    $('td-name').textContent = d.name;
    $('td-role').textContent = d.role;
    $('td-bio').textContent = d.bio;

    const mks = $('td-mks');
    mks.innerHTML = '';
    split(d.mks).forEach((name) => {
      const li = document.createElement('li');
      li.textContent = name;
      mks.appendChild(li);
    });

    const works = $('td-works');
    works.innerHTML = '';
    split(d.works).forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Работа преподавателя ' + d.name + ', ' + (i + 1);
      img.loading = 'lazy';
      works.appendChild(img);
    });

    dialog.showModal();
    dialog.scrollTop = 0;
  };

  document.querySelectorAll('.teacher-card[data-name]').forEach((card) => {
    card.addEventListener('click', () => open(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(card);
      }
    });
  });

  $('td-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
});
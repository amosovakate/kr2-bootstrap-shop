document.addEventListener('DOMContentLoaded', () => {
  /* данные мастер-классов */
  const MK = {
    newyear:   { title: 'Новогодний шар', img: 'images/pic8.png', level: 'Для начинающих', time: '2 часа', price: 1800,
      desc: 'Рельефный ёлочный шар с золотой поталью. Вы создадите уникальное украшение на ёлку или подарок близким.',
      materials: 'Деревянная основа-шар, текстурная паста, мастихин, акрил, поталь, лента', teacher: 'Анна Соколова',
      badge: '❄ Зимняя новинка', badgeClass: 'product-card__badge--ny' },
    flower:    { title: 'Объёмный цветок текстурной пастой', img: 'images/pic1.png', level: 'Для начинающих', time: '3 часа', price: 2500,
      desc: 'Создадим рельефный 3D-цветок мастихином, добавим поталь для акцента. Вы научитесь работать с текстурной пастой и создавать объёмные лепестки.',
      materials: 'Текстурная паста, мастихин, холст 30х30, акрил, поталь, кисти', teacher: 'Анна Соколова',
      badge: 'Хит', badgeClass: 'product-card__badge--hit' },
    abstract:  { title: 'Абстракция мастихином', img: 'images/pic2.png', level: 'Для начинающих', time: '2,5 часа', price: 2200,
      desc: 'Свободные мазки, работа с цветом и фактурой. Научитесь чувствовать мастихин и создавать динамичные абстрактные композиции.',
      materials: 'Текстурная паста, мастихин, холст 40х40, акриловые краски', teacher: 'Нелли Левина' },
    sea:       { title: 'Морской рельеф с песком', img: 'images/pic3.png', level: 'Средний', time: '3 часа', price: 2800,
      desc: 'Текстурная паста + песок + акрил. Мы создадим объёмную морскую гладь, которая будет переливаться на свету.',
      materials: 'Текстурная паста, морской песок, мастихин, холст 40х30, акрил', teacher: 'Нелли Левина' },
    gilding:   { title: 'Золотая поталь', img: 'images/pic20.png', level: 'Средний', time: '3,5 часа', price: 3200,
      desc: 'Интерьерная картина с листовой поталью. Узнаете секреты золочения и создадите роскошную фактуру.',
      materials: 'Текстурная паста, клей для потали, листовая поталь, мастихин, холст 40х50', teacher: 'Александра Иванина' },
    minimal:   { title: 'Минимализм: текстура и монохром', img: 'images/pic5.jpg', level: 'Для начинающих', time: '2 часа', price: 1900,
      desc: 'Сдержанная палитра, игра света и тени на рельефе. Идеально для создания современного интерьерного искусства.',
      materials: 'Текстурная паста, шпатель, холст 30х40, акрил (белый, чёрный, серый)', teacher: 'Анна Соколова' },
    landscape: { title: 'Фактурный пейзаж', img: 'images/pic6.png', level: 'Продвинутый', time: '4 часа', price: 3000,
      desc: 'Объёмные горы, небо и вода. Комплексная работа с текстурной пастой и мастихином на большом холсте.',
      materials: 'Текстурная паста, мастихины (набор), холст 50х60, акрил, губка', teacher: 'Нелли Левина, Александра Иванина' },
    desert:    { title: 'Пустыня и дюны', img: 'images/pic7.png', level: 'Для начинающих', time: '2,5 часа', price: 2300,
      desc: 'Тёплая терракотовая палитра, песок и мягкие волны рельефа. Спокойная работа, которая отлично подходит для первого раза.',
      materials: 'Текстурная паста, декоративный песок, мастихин, холст 40х30, акрил', teacher: 'Александра Иванина' }
  };

  const key = new URLSearchParams(location.search).get('mk');
  const id = MK[key] ? key : 'flower';
  const m = MK[id];
  const $ = (x) => document.getElementById(x);
  const price = m.price.toLocaleString('ru-RU') + ' ₽';

  document.title = m.title + ' — Фактура';
  $('p-crumb').textContent = m.title;
  $('p-title').textContent = m.title;
  $('p-desc').textContent = m.desc;
  $('p-price').textContent = price;
  $('p-img').src = m.img;
  $('p-img').alt = m.title;
  $('t-level').textContent = m.level;
  $('t-time').textContent = m.time;
  $('t-price').textContent = price;
  $('t-teacher').textContent = m.teacher;
  $('p-order').href = 'order.html?mk=' + id;
  $('p-quick').dataset.mk = m.title;

  const list = $('t-materials');
  m.materials.split(',').forEach((x) => {
    const li = document.createElement('li');
    li.textContent = x.trim();
    list.appendChild(li);
  });

  if (m.badge) {
    const b = $('p-badge');
    b.textContent = m.badge;
    b.classList.add(m.badgeClass);
    b.hidden = false;
  }
});
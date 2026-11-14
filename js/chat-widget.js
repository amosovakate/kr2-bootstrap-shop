/* ===== ВИДЖЕТ ЧАТА С КОНСУЛЬТАНТОМ ===== */
document.addEventListener('DOMContentLoaded', () => {
  const widget     = document.getElementById('chat-widget');
  const toggle     = document.getElementById('chat-toggle');
  const win        = document.getElementById('chat-window');
  const closeBtn   = document.getElementById('chat-close');
  const form       = document.getElementById('chat-form');
  const input      = document.getElementById('chat-input');
  const messages   = document.getElementById('chat-messages');
  const quickBox   = document.getElementById('chat-quick');
  const badge      = document.getElementById('chat-badge');

  if (!widget || !toggle || !win) return;

  /* ----- Хранилище простых ответов ----- */
  const answers = {
    'сколько стоит мастер-класс?':
      'Цены от 1 800 ₽ до 3 200 ₽ — зависит от техники и длительности. Все материалы уже включены. Нажмите «Записаться», чтобы выбрать дату.',
    'нужен ли опыт рисования?':
      'Совсем нет! Большинство мастер-классов для начинающих: мастер показывает каждый шаг. Уходите с готовой картиной в тот же день.',
    'какие есть свободные даты?':
      'Ближайшие занятия: 12 ноября — «Объёмный цветок», 15 ноября — «Абстракция мастихином». Полное расписание — в разделе «Мастер-классы».',
    'можно прийти с ребёнком?':
      'Да, у нас есть семейные мастер-классы и праздники для детей от 6 лет. Уточните возраст — подскажем подходящий формат.',
  };

  const fallback =
    'Спасибо за вопрос! Передал его нашему администратору — он ответит в течение пары минут. ' +
    'А пока можете посмотреть расписание или записаться прямо на сайте.';

  /* ----- Утилиты ----- */
  const scrollToBottom = () => {
    messages.scrollTop = messages.scrollHeight;
  };

  const addMessage = (text, who = 'bot') => {
    const el = document.createElement('div');
    el.className = `chat-msg chat-msg--${who}`;
    const p = document.createElement('p');
    p.textContent = text;
    el.appendChild(p);
    messages.appendChild(el);
    scrollToBottom();
  };

  const showTyping = () => {
    const el = document.createElement('div');
    el.className = 'chat-msg chat-msg--typing';
    el.id = 'chat-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(el);
    scrollToBottom();
    return el;
  };

  const removeTyping = () => {
    const el = document.getElementById('chat-typing');
    if (el) el.remove();
  };

  /* Ответ бота с задержкой «печатает…» */
  const botReply = (text) => {
    showTyping();
    setTimeout(() => {
      removeTyping();
      addMessage(text, 'bot');
    }, 900 + Math.random() * 600);
  };

  /* ----- Открытие / закрытие ----- */
  const openChat = () => {
    win.hidden = false;
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Закрыть чат');
    badge.hidden = true;
    setTimeout(() => input.focus(), 150);
  };

  const closeChat = () => {
    win.hidden = true;
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Открыть чат с консультантом');
  };

  toggle.addEventListener('click', () => {
    win.hidden ? openChat() : closeChat();
  });

  closeBtn.addEventListener('click', closeChat);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !win.hidden) closeChat();
  });

  /* ----- Быстрые вопросы ----- */
  quickBox.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-question]');
    if (!btn) return;

    const question = btn.dataset.question;
    addMessage(question, 'user');
    quickBox.remove(); // прячем чипы после первого вопроса

    const key = question.toLowerCase();
    botReply(answers[key] || fallback);
  });

  /* ----- Отправка своего сообщения ----- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';

    // ищем совпадение по ключевым словам
    const key = text.toLowerCase();
    let answer = null;

    for (const k in answers) {
      const words = k.replace(/[?.,!]/g, '').split(' ');
      if (words.some((w) => w.length > 4 && key.includes(w))) {
        answer = answers[k];
        break;
      }
    }

    botReply(answer || fallback);
  });

  /* ----- Приветственный бейдж через 4 секунды ----- */
  setTimeout(() => {
    if (win.hidden) badge.hidden = false;
  }, 4000);
});
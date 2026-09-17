/*
 * Налаштування сайту — усі змінні дані в одному місці.
 * ДЕМО: ім'я, контакти, реквізити, цифри вигадані. Замініть перед запуском.
 */
window.SITE = {
  name: 'Ганна Верес',
  role: 'фінансова консультантка',
  city: 'Київ · онлайн',

  contacts: {
    telegram: 'https://t.me/hanna_veres_demo',       // ЗАГЛУШКА
    telegramLabel: '@hanna_veres_demo',
    viber: 'viber://chat?number=%2B380670000000',    // ЗАГЛУШКА
    whatsapp: 'https://wa.me/380670000000',          // ЗАГЛУШКА
    instagram: 'https://instagram.com/hanna_veres_demo', // ЗАГЛУШКА
    instagramLabel: '@hanna_veres_demo',
    email: 'hello@hanna-veres.demo',                  // ЗАГЛУШКА
    phone: '+380670000000',                           // ЗАГЛУШКА
    phoneLabel: '+380 67 000 00 00'
  },

  legal: {
    fop: 'ФОП Верес Ганна Олександрівна',  // ЗАГЛУШКА
    rnokpp: '0000000000',                   // ЗАГЛУШКА
    year: 2026
  },

  // Програма «Сімейний капітал» — лише чесні дані
  program: {
    start: '2026-10-19T19:00:00+03:00',
    startLabel: '19 жовтня 2026',
    seatsTotal: 20,
    seatsLeft: 7
  },

  /*
   * Заявки:
   *  'demo'     — заявка лише виводиться в консоль браузера;
   *  'proxy'    — POST JSON на ваш endpoint (Cloudflare Worker / Vercel Function, див. worker-example.js);
   *  'telegram' — напряму в Telegram Bot API. ЛИШЕ ДЛЯ ТЕСТІВ: токен у фронтенді бачить будь-хто!
   */
  form: {
    mode: 'demo',
    endpoint: '',        // для 'proxy', напр. https://leads.your-worker.workers.dev
    telegramToken: '',   // для 'telegram' (тести)
    telegramChatId: ''   // для 'telegram' (тести)
  },

  analytics: {
    ga4: '',        // напр. G-XXXXXXXXXX
    metaPixel: ''   // напр. 1234567890
  }
};

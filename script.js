(function () {
  'use strict';

  var S = window.SITE || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var get = function (path) { return path.split('.').reduce(function (o, k) { return o ? o[k] : undefined; }, S); };
  var fmt = function (n) { return Math.round(n).toLocaleString('uk-UA').replace(/\s/g, ' '); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Аналітика ---------- */
  var consent = null;
  try { consent = localStorage.getItem('hv_cookie'); } catch (e) {}
  function track(name, params) {
    params = params || {};
    if (window.gtag) window.gtag('event', name, params);
    if (window.fbq) window.fbq('trackCustom', name, params);
  }
  function loadAnalytics() {
    var a = S.analytics || {};
    if (a.ga4) {
      var g = document.createElement('script');
      g.async = true; g.src = 'https://www.googletagmanager.com/gtag/js?id=' + a.ga4;
      document.head.appendChild(g);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date()); window.gtag('config', a.ga4);
    }
    if (a.metaPixel) {
      /* eslint-disable */
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */
      window.fbq('init', a.metaPixel); window.fbq('track', 'PageView');
    }
  }
  var cookie = $('#cookie');
  if (consent === 'yes') loadAnalytics();
  else if (!consent && cookie) cookie.hidden = false;
  $$('[data-cookie]').forEach(function (b) {
    b.addEventListener('click', function () {
      var v = b.getAttribute('data-cookie');
      try { localStorage.setItem('hv_cookie', v); } catch (e) {}
      cookie.hidden = true;
      if (v === 'yes') loadAnalytics();
    });
  });
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-track]');
    if (t) track(t.getAttribute('data-track'), { label: (t.textContent || '').trim().slice(0, 60) });
  });

  /* ---------- Дані з config.js ---------- */
  $$('[data-cfg]').forEach(function (el) { var v = get(el.getAttribute('data-cfg')); if (v != null) el.textContent = v; });
  $$('[data-text]').forEach(function (el) { var v = get(el.getAttribute('data-text')); if (v != null) el.textContent = v; });
  $$('[data-href]').forEach(function (el) {
    var raw = el.getAttribute('data-href'), m = raw.match(/^(mailto:|tel:)?(.+)$/), v = get(m[2]);
    if (v) el.setAttribute('href', (m[1] || '') + v);
  });

  /* ---------- Шапка й меню ---------- */
  var hdr = $('.hdr'), nav = $('#nav'), burger = $('.burger');
  function onScroll() { hdr.classList.toggle('scrolled', window.scrollY > 8); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  function setMenu(open) {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню');
    document.body.classList.toggle('lock', open);
  }
  burger.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 1080 && nav.classList.contains('open')) setMenu(false); });

  // випадаючий список «Послуги»
  var dd = $('.nav-dd'), ddBtn = $('.nav-dd-btn');
  function setDd(open) { dd.classList.toggle('open', open); ddBtn.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  if (dd) {
    ddBtn.addEventListener('click', function (e) { e.stopPropagation(); setDd(!dd.classList.contains('open')); });
    dd.addEventListener('click', function (e) { if (e.target.closest('.dd a')) setDd(false); });
    document.addEventListener('click', function (e) { if (!e.target.closest('.nav-dd')) setDd(false); });
    dd.addEventListener('keydown', function (e) { if (e.key === 'Escape' && dd.classList.contains('open')) { e.stopPropagation(); setDd(false); ddBtn.focus(); } });
    dd.addEventListener('focusout', function (e) { if (window.innerWidth > 1080 && !dd.contains(e.relatedTarget)) setDd(false); });
  }

  // активний пункт меню
  var navLinks = $$('.nav > a[href^="#"]:not(.btn)');
  if ('IntersectionObserver' in window) {
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
        if (ddBtn) ddBtn.classList.toggle('active', ['services', 'program', 'b2b'].indexOf(en.target.id) > -1);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(function (a) { var s = $(a.getAttribute('href')); if (s) secObs.observe(s); });
    ['services', 'program', 'b2b'].forEach(function (id) { var s = document.getElementById(id); if (s) secObs.observe(s); });
  }

  /* ---------- Поява й лічильники ---------- */
  function countUp(el) {
    var end = +el.getAttribute('data-count');
    if (reduced) { el.textContent = fmt(end); return; }
    var t0 = null, dur = 1400;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(end * e);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        $$('[data-count]', en.target).forEach(countUp);
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(function (el, i) {
      var sib = el.parentElement ? $$(':scope > .reveal', el.parentElement).indexOf(el) : 0;
      if (sib > 0) el.style.transitionDelay = Math.min(sib * 70, 350) + 'ms';
      io.observe(el);
    });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Метод: будинок росте разом зі скролом ---------- */
  var mb = $('.method-build');
  if (mb && 'IntersectionObserver' in window) {
    var floors = $$('.floor', mb), band = $('.beam-band', mb), mSteps = $$('.step');
    var bands = [[470, 44], [330, 140], [306, 36], [192, 126], [92, 100]];
    var setLevel = function (n) {
      floors.forEach(function (f) {
        var k = +(f.getAttribute('class').match(/f(\d)/) || [0, 0])[1];
        f.classList.toggle('on', k <= n);
      });
      mSteps.forEach(function (st, i) { st.classList.toggle('on', i < n); });
      var b = bands[n - 1];
      band.style.transform = 'translateY(' + b[0] + 'px) scaleY(' + (b[1] / 100) + ')';
    };
    setLevel(1);
    var stepObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setLevel(mSteps.indexOf(en.target) + 1); });
    }, { rootMargin: '-42% 0px -42% 0px' });
    mSteps.forEach(function (st) { stepObs.observe(st); });
  } else if (mb) {
    $$('.floor', mb).forEach(function (f) { f.classList.add('on'); });
    $$('.step').forEach(function (st) { st.classList.add('on'); });
  }

  /* ---------- Модальні вікна ---------- */
  var lastFocus = null, openModalEl = null;
  function openModal(id) {
    var m = $('#m-' + id);
    if (!m) return;
    if (openModalEl) closeModal();
    lastFocus = document.activeElement;
    m.hidden = false; openModalEl = m;
    document.body.classList.add('lock');
    var f = $('.modal-x', m); if (f) f.focus();
    if (id === 'test') startTest();
  }
  function closeModal() {
    if (!openModalEl) return;
    openModalEl.hidden = true; openModalEl = null;
    document.body.classList.remove('lock');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.addEventListener('click', function (e) {
    var o = e.target.closest('[data-open]');
    if (o) { e.preventDefault(); openModal(o.getAttribute('data-open')); return; }
    if (e.target.closest('[data-close]')) { closeModal(); }
    else if (e.target.classList && e.target.classList.contains('modal')) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { if (openModalEl) closeModal(); else if (nav.classList.contains('open')) setMenu(false); }
    if (e.key === 'Tab' && openModalEl) {
      var f = $$('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])', openModalEl).filter(function (x) { return !x.disabled && x.offsetParent !== null; });
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  // друк лише вікна
  $$('[data-print]').forEach(function (b) {
    b.addEventListener('click', function () {
      var m = b.closest('.modal');
      document.body.classList.add('printing'); m.classList.add('printing-now');
      track('gift_pdf');
      window.print();
      setTimeout(function () { document.body.classList.remove('printing'); m.classList.remove('printing-now'); }, 500);
    });
  });

  /* ---------- Вибір продукту → форма ---------- */
  var sel = $('#fProduct');
  function goForm(product) {
    if (product && sel && $('option[value="' + product + '"]', sel)) sel.value = product;
    closeModal();
    var c = $('#contact');
    if (c) c.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    setTimeout(function () { var n = $('#fName'); if (n) n.focus({ preventScroll: true }); }, reduced ? 0 : 700);
  }
  document.addEventListener('click', function (e) {
    var p = e.target.closest('[data-product]');
    if (!p) return;
    e.preventDefault();
    goForm(p.getAttribute('data-product'));
  });

  /* ---------- Додатки до заявки (тест, калькулятор) ---------- */
  var extras = {};
  var attach = $('#attach');
  function renderAttach() {
    var keys = Object.keys(extras);
    if (!keys.length) { attach.hidden = true; attach.innerHTML = ''; return; }
    attach.hidden = false;
    attach.innerHTML = '<div><b>До заявки додано:</b><br>' + keys.map(function (k) { return extras[k]; }).join('<br>') + '</div><button type="button" aria-label="Прибрати додане">×</button>';
    $('button', attach).onclick = function () { extras = {}; renderAttach(); };
  }

  /* ---------- Тест ---------- */
  var Q = [
    ['Чи знаєте ви, скільки сім’я витрачає за місяць?', ['Так, точно', 'Приблизно', 'Ні, гроші «розтікаються»']],
    ['Чи є у вас резерв на випадок втрати доходу?', ['Так, на 3 місяці й більше', 'Є, але менше ніж на 3 місяці', 'Немає']],
    ['Чи є борги на кредитках або в розстрочках?', ['Немає', 'Є, але ми їх контролюємо', 'Беремо нові, щоб закрити старі']],
    ['Як у вашій сім’ї говорять про гроші?', ['Спокійно й регулярно', 'Буває, сваримося', 'Уникаємо цієї теми']],
    ['Чи лишається щось після всіх витрат?', ['Так, відкладаємо регулярно', 'Іноді', 'Ні']],
    ['Чи є накопичення на цілі дітей (навчання, житло)?', ['Так, і є план', 'Щось відкладаємо без плану', 'Ні']],
    ['Чи захищена сім’я, якщо з годувальником щось станеться?', ['Так, є страхування й резерв', 'Частково', 'Ні']],
    ['Де ви зберігаєте накопичення?', ['У кількох місцях, частина — у валюті', 'Усе в одному місці', 'Накопичень немає']],
    ['Чи відкладаєте ви на пенсію?', ['Так, регулярно', 'Думаємо, але не почали', 'Ні, про це рано думати']],
    ['Якщо дохід завтра зникне, скільки ви проживете?', ['6 місяців і більше', '1–3 місяці', 'Менше місяця']]
  ];
  var LV = [
    { t: 'Зона ризику', c: 'lvl-0', d: 'Зараз сім’я вразлива: будь-яка непередбачена подія може вибити з колії. Добра новина — саме тут перші кроки дають найбільший ефект.', s: ['Почніть облік витрат на 2 місяці — без економії, просто спостерігайте.', 'Зберіть першу міні-подушку: 10 000 грн або один місяць витрат.', 'Складіть список боргів і порядок їх закриття.'] },
    { t: 'Фундамент будується', c: 'lvl-1', d: 'Основа є, але в системі є «діри». Кілька точних рішень зроблять фінанси сім’ї значно стійкішими.', s: ['Доведіть подушку до 3–6 місяців витрат.', 'Порахуйте цілі дітей і щомісячний внесок на кожну.', 'Домовтеся про регулярну сімейну «фінансову раду».'] },
    { t: 'Міцна основа', c: 'lvl-2', d: 'Ви вже зробили багато правильного. Наступний рівень — довгострокова стратегія й капітал.', s: ['Перевірте, чи захищені від інфляції ваші накопичення.', 'Порахуйте пенсійний капітал і термін його формування.', 'Перегляньте страховий захист сім’ї.'] }
  ];
  var ans = [], qi = 0;
  var tBody = $('#testBody'), tBar = $('#testBar'), tCount = $('#testCount'), tBack = $('#testBack');
  function startTest() { if (qi >= Q.length) { ans = []; qi = 0; } renderQ(); }
  function renderQ() {
    tBar.style.transform = 'scaleX(' + ((qi + 1) / Q.length) + ')';
    tCount.hidden = false;
    tCount.textContent = 'Питання ' + (qi + 1) + ' з ' + Q.length;
    tBack.hidden = qi === 0;
    var q = Q[qi];
    tBody.innerHTML = '<div class="q"><h3>' + q[0] + '</h3><div class="opts">' +
      q[1].map(function (o, i) { return '<button type="button" class="opt' + (ans[qi] === 2 - i ? ' sel' : '') + '" data-v="' + (2 - i) + '">' + o + '</button>'; }).join('') + '</div></div>';
    var first = $('.opt', tBody); if (first && openModalEl) first.focus();
  }
  function renderRes() {
    var sc = ans.reduce(function (a, b) { return a + b; }, 0);
    var lv = sc <= 7 ? 0 : sc <= 14 ? 1 : 2, L = LV[lv];
    tBar.style.transform = 'scaleX(1)'; tCount.hidden = true; tBack.hidden = true;
    tBody.innerHTML = '<div class="res"><div class="eyebrow">Ваш результат</div>' +
      '<div class="res-score">' + sc + ' <small>з 20</small></div>' +
      '<span class="res-level ' + L.c + '">' + L.t + '</span>' +
      '<p>' + L.d + '</p><b>Що варто зробити першим:</b><ul class="res-list">' + L.s.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' +
      '<div class="btns"><button type="button" class="btn btn-gold" id="testToForm">Розібрати результат на діагностиці</button><button type="button" class="btn btn-line" id="testAgain">Пройти ще раз</button></div>' +
      '<p class="tiny">Тест — самоперевірка, а не фінансова оцінка чи порада.</p></div>';
    track('test_complete', { score: sc });
    $('#testToForm').onclick = function () {
      extras.test = 'Тест «Фінансовий захист сім’ї» — ' + sc + ' з 20 (' + L.t + ')';
      renderAttach(); goForm('checkup');
    };
    $('#testAgain').onclick = function () { ans = []; qi = 0; renderQ(); };
    $('#testToForm').focus();
  }
  if (tBody) {
    tBody.addEventListener('click', function (e) {
      var o = e.target.closest('.opt'); if (!o) return;
      ans[qi] = +o.getAttribute('data-v');
      $$('.opt', tBody).forEach(function (x) { x.classList.toggle('sel', x === o); });
      setTimeout(function () { qi++; if (qi < Q.length) renderQ(); else renderRes(); }, reduced ? 0 : 220);
    });
    tBack.addEventListener('click', function () { if (qi > 0) { qi--; renderQ(); } });
  }

  /* ---------- Таймер і місця ---------- */
  var P = S.program || {};
  var timer = $('#timer');
  if (timer && P.start) {
    var end = new Date(P.start).getTime();
    var cells = { d: $('[data-t=d]', timer), h: $('[data-t=h]', timer), m: $('[data-t=m]', timer), s: $('[data-t=s]', timer) };
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var tick = function () {
      var diff = Math.max(0, end - Date.now());
      var d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
      cells.d.textContent = pad(d); cells.h.textContent = pad(h); cells.m.textContent = pad(m); cells.s.textContent = pad(s);
      if (diff === 0) { clearInterval(iv); var lb = $('.launch-date small'); if (lb) lb.textContent = 'Потік стартував'; }
    };
    var iv = setInterval(tick, 1000); tick();
  }
  if (P.seatsTotal) {
    $('#seatsLeft').textContent = P.seatsLeft;
    $('#seatsTotal').textContent = P.seatsTotal;
    var bar = $('#seatsBar');
    var fill = function () { bar.style.transform = 'scaleX(' + ((P.seatsTotal - P.seatsLeft) / P.seatsTotal) + ')'; };
    if ('IntersectionObserver' in window) {
      var so = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { fill(); so.disconnect(); } });
      so.observe(bar.parentNode);
    } else fill();
  }

  /* ---------- Подарунок: таблиця бюджету (CSV) ---------- */
  function downloadBudget() {
    var rows = [
      ['Сімейний бюджет — шаблон від Ганни Верес', '', '', ''],
      ['Місяць:', '', '', ''],
      ['', '', '', ''],
      ['ДОХОДИ', 'План, грн', 'Факт, грн', 'Коментар'],
      ['Зарплата 1', '', '', ''],
      ['Зарплата 2', '', '', ''],
      ['Підробіток / ФОП', '', '', ''],
      ['Допомоги, інше', '', '', ''],
      ['Разом доходи', '=SUM(B5:B8)', '=SUM(C5:C8)', ''],
      ['', '', '', ''],
      ['ОБОВ’ЯЗКОВІ ВИТРАТИ', 'Ліміт, грн', 'Факт, грн', 'Коментар'],
      ['Житло (оренда / іпотека)', '', '', ''],
      ['Комунальні послуги', '', '', ''],
      ['Продукти', '', '', ''],
      ['Транспорт / пальне', '', '', ''],
      ['Зв’язок та інтернет', '', '', ''],
      ['Діти: садок, школа, гуртки', '', '', ''],
      ['Здоров’я, ліки', '', '', ''],
      ['Кредити, розстрочки', '', '', ''],
      ['Разом обов’язкові', '=SUM(B12:B19)', '=SUM(C12:C19)', ''],
      ['', '', '', ''],
      ['ГНУЧКІ ВИТРАТИ', 'Ліміт, грн', 'Факт, грн', 'Коментар'],
      ['Кафе й доставка', '', '', ''],
      ['Одяг', '', '', ''],
      ['Розваги, хобі', '', '', ''],
      ['Подарунки', '', '', ''],
      ['Підписки', '', '', ''],
      ['Особисті гроші партнера 1', '', '', ''],
      ['Особисті гроші партнера 2', '', '', ''],
      ['Інше', '', '', ''],
      ['Разом гнучкі', '=SUM(B23:B30)', '=SUM(C23:C30)', ''],
      ['', '', '', ''],
      ['НАКОПИЧЕННЯ', 'План, грн', 'Факт, грн', 'Мета'],
      ['Подушка безпеки', '', '', '3–6 місяців обов’язкових витрат'],
      ['Цілі дітей', '', '', ''],
      ['Відпустка', '', '', ''],
      ['Пенсійний капітал', '', '', ''],
      ['Разом накопичення', '=SUM(B34:B37)', '=SUM(C34:C37)', ''],
      ['', '', '', ''],
      ['ЗАЛИШОК', '=B9-B20-B31-B38', '=C9-C20-C31-C38', 'Має бути ≥ 0']
    ];
    var csv = rows.map(function (r) { return r.map(function (c) { return /[";\n]/.test(c) ? '"' + c.replace(/"/g, '""') + '"' : c; }).join(';'); }).join('\r\n');
    var blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
    var url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = 'simeinyi-biudzhet-hanna-veres.csv';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    track('gift_download', { item: 'budget' });
  }
  var dl = $('#dlBudget'); if (dl) dl.addEventListener('click', downloadBudget);
  $$('[data-dl-budget]').forEach(function (b) { b.addEventListener('click', downloadBudget); });

  /* ---------- Форма заявки ---------- */
  var form = $('#leadForm');
  if (form) {
    var fName = $('#fName'), fPhone = $('#fPhone'), fAgree = $('#fAgree'), btn = $('#fSubmit');
    var showErr = function (input, errId, bad) {
      $('#' + errId).hidden = !bad;
      var f = input.closest('.fld'); if (f) f.classList.toggle('invalid', bad);
      input.setAttribute('aria-invalid', bad ? 'true' : 'false');
      if (bad) input.setAttribute('aria-describedby', errId); else input.removeAttribute('aria-describedby');
    };
    var phoneOk = function (v) { var d = v.replace(/\D/g, ''); return d.length >= 10 && d.length <= 15; };
    fName.addEventListener('input', function () { if (fName.value.trim().length >= 2) showErr(fName, 'fNameErr', false); });
    fPhone.addEventListener('input', function () { if (phoneOk(fPhone.value)) showErr(fPhone, 'fPhoneErr', false); });
    fAgree.addEventListener('change', function () { if (fAgree.checked) $('#fAgreeErr').hidden = true; });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var badName = fName.value.trim().length < 2, badPhone = !phoneOk(fPhone.value), badAgree = !fAgree.checked;
      showErr(fName, 'fNameErr', badName);
      showErr(fPhone, 'fPhoneErr', badPhone);
      $('#fAgreeErr').hidden = !badAgree;
      if (badName) { fName.focus(); return; }
      if (badPhone) { fPhone.focus(); return; }
      if (badAgree) { fAgree.focus(); return; }

      var data = {
        name: fName.value.trim(),
        phone: fPhone.value.trim(),
        messenger: ($('input[name=messenger]:checked', form) || {}).value,
        product: sel.options[sel.selectedIndex].text,
        comment: $('#fComment').value.trim(),
        extras: Object.keys(extras).map(function (k) { return extras[k]; }),
        page: location.href,
        time: new Date().toLocaleString('uk-UA')
      };
      btn.classList.add('loading'); btn.disabled = true;
      var label = btn.textContent; btn.textContent = 'Надсилаю…';

      send(data).then(function () {
        track('form_submit', { product: data.product });
        form.reset(); extras = {}; renderAttach();
        openModal('thanks');
      }).catch(function (err) {
        console.error(err);
        alert('Не вдалося надіслати заявку. Спробуйте ще раз або напишіть напряму в Telegram.');
      }).then(function () {
        btn.classList.remove('loading'); btn.disabled = false; btn.textContent = label;
      });
    });
  }

  function send(data) {
    var cfg = S.form || {};
    var text = '🆕 Заявка з сайту\n' +
      '👤 ' + data.name + '\n📞 ' + data.phone + ' (' + data.messenger + ')\n' +
      '🎯 ' + data.product + (data.comment ? '\n💬 ' + data.comment : '') +
      (data.extras.length ? '\n📎 ' + data.extras.join('\n📎 ') : '') + '\n🕒 ' + data.time;
    if (cfg.mode === 'proxy' && cfg.endpoint) {
      return fetch(cfg.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); });
    }
    if (cfg.mode === 'telegram' && cfg.telegramToken && cfg.telegramChatId) {
      return fetch('https://api.telegram.org/bot' + cfg.telegramToken + '/sendMessage', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: cfg.telegramChatId, text: text })
      }).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); });
    }
    // демо-режим
    return new Promise(function (res) {
      setTimeout(function () { console.info('[ДЕМО] Заявка:', data, '\n' + text); res(); }, 900);
    });
  }

  /* ---------- Плаваюча кнопка ховається біля форми ---------- */
  var fab = $('.fab'), contact = $('#contact');
  if (fab && contact && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { fab.classList.toggle('hide', en[0].isIntersecting); }, { threshold: 0.15 }).observe(contact);
  }
})();

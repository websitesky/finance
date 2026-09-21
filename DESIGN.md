---
name: Ганна Верес, фінансова консультантка
description: "Розріз будинку": вапняна побілка, графітовий штрих, ялиновий та охра; сімейні гроші будуються знизу вгору.
colors:
  ground: "#ECEFEA"
  ground-tint: "#E3E8E1"
  paper: "#F7F8F5"
  graphite: "#1E2326"
  ink-muted: "#4B5459"
  spruce: "#17332C"
  spruce-raised: "#1F4238"
  spruce-deep: "#0F241F"
  ochre: "#E6A82E"
  ochre-deep: "#8A5A06"
  sage: "#7D9A85"
  on-dark: "#EAF0EA"
  on-dark-muted: "#B9C9BD"
  error: "#A3271F"
typography:
  display:
    fontFamily: "Prata, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.5rem, 5.3vw, 5rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-.02em"
  headline:
    fontFamily: "Prata, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2rem, 3.7vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-.015em"
  title:
    fontFamily: "Prata, Georgia, 'Times New Roman', serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-.005em"
  body:
    fontFamily: "'Golos Text', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "'JetBrains Mono', ui-monospace, Consolas, monospace"
    fontSize: ".75rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: ".02em"
  figure:
    fontFamily: "'JetBrains Mono', ui-monospace, Consolas, monospace"
    fontSize: "clamp(2.2rem, 4.4vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-.045em"
rounded:
  pill: "999px"
  core: "22px"
  tray: "28px"
  inner: "16px"
spacing:
  gutter: "clamp(20px, 5vw, 56px)"
  section: "clamp(84px, 11vw, 144px)"
  wrap: "1200px"
  gap-grid: "30px"
components:
  button-primary:
    backgroundColor: "{colors.ochre}"
    textColor: "{colors.graphite}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "12px 64px 12px 26px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "#EDB544"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    rounded: "{rounded.pill}"
    padding: "12px 64px 12px 26px"
    height: "56px"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.core}"
    padding: "34px 28px 28px"
  card-dark-core:
    backgroundColor: "{colors.spruce}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.inner}"
    padding: "18px 20px"
  nav-pill:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.pill}"
    height: "64px"
  input:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.inner}"
    padding: "14px 18px"
    height: "54px"
  chip:
    textColor: "{colors.graphite}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
---

# Design System: Ганна Верес, фінансова консультантка

## Overview

**Creative North Star: "Розріз будинку"**

Сторінка є будинком у розрізі. Метод «Сімейний фундамент» зростає поверх за поверхом від тонкої лінії фундаменту до даху, а скрол піднімається разом з ним. Ґрунт світлий і холодний, як вапняна побілка; графітові плити розрізу дають вагу; ялиновий замикає темні блоки; охра є єдиним активним акцентом і працює як промінь сонця, що позначає поточний поверх.

Щільність помірна: багато повітря між секціями, тонкі архітектурні лінії замість рамок, мономірні позначки як підписи креслення. Тон спокійний і конкретний.

Попередній візуальний світ (темна вишня та золото, Geologica) живе у гілці `lyubov` для порівняння. Гілка `redesign` замінює його візуально; тексти, порядок блоків, ціни й функції збережено.

**Key Characteristics:**
- Холодна вапняна основа, графіт і ялина для ваги, охра лише для активного.
- Хайрлайн-лінії замість заливок і рамок.
- Подвійний контур карток (лоток і серцевина), кнопки-пігулки з диском зі стрілкою.
- Плаваюча скляна пігулка-навігація, ледь помітне фіксоване зерно.
- Prata для заголовків, Golos Text для тексту, JetBrains Mono для цифр, грошей і підписів.

## Colors

Прохолодна пастельна основа, дві темні глибини й один теплий промінь.

### Primary
- **Ялиновий** (spruce): темні блоки секцій, «результат», ліва колонка порівняння, лого-диск. Похідні raised і deep для вкладених панелей і таймера.
- **Охра** (ochre): кнопки дії, підкреслення в заголовках, активний поверх методу, прапорці, зірки.

### Secondary
- **Шавлія** (sage): тихі позначки, колір скролбару. Не несе тексту.

### Neutral
- **Вапняна основа** (ground): фон сторінки і полів вводу.
- **Тонована основа** (ground-tint): чергові секції, нейтральні блоки.
- **Папір** (paper): картки, форма, випадаючі панелі.
- **Графіт** (graphite): текст, плити розрізу, футер, лінії.
- **Приглушений чорнильний** (ink-muted): вторинний текст. **On-dark** і **on-dark-muted**: текст на ялиновому.
- **Охра глибока** (ochre-deep): охра як текст, лінки й фокус на світлому фоні.
- **Помилка** (error): лише валідація форми.

### Named Rules
**The Sunbeam Rule.** Охра позначає те, що активне або обране зараз: дія, поточний поверх, відкрите питання. Не використовувати її як декоративну заливку.

**The Deep Ochre Rule.** Охра як текст або обведення на світлому завжди ochre-deep; яскрава охра лише як заливка з графітовим текстом.

## Typography

**Display Font:** Prata (з Georgia, serif), вага 400
**Body Font:** Golos Text (з system-ui, sans-serif)
**Label/Mono Font:** JetBrains Mono

**Character:** Контрастна антиква для довіри, Golos для чистого українського тексту; моно додає відчуття креслярських позначок і точних сум.

### Hierarchy
- **Display** (400, clamp(2.5rem, 5.3vw, 5rem), 1.02): заголовок першого екрана.
- **Headline** (400, clamp(2rem, 3.7vw, 3.5rem), 1.08): h2 секцій.
- **Title** (400, 1.3 до 1.8rem, 1.2): h3 карток, кроків, тарифів.
- **Body** (400, 1.0625rem, 1.65): основний текст; вторинний 0.875 до 0.97rem; лід 1.1875rem до 46ch.
- **Label** (500, .6875 до .8125rem, mono): рівні секцій, підписи, лічильники.
- **Figure** (500, mono, tabular-nums): статистика, ціни, таймер.

### Named Rules
**The Money In Mono Rule.** Усі суми, відсотки й лічильники набираються JetBrains Mono з табличними цифрами.

**The Ground Line Rule.** Акцент у заголовку це охрове підкреслення (.07em), не курсив і не колір.

## Layout

Контейнер 1200px плюс адаптивний бічний відступ (20 до 56px); вузький 880px. Ритм секцій clamp(84px, 11vw, 144px), чергування ground і ground-tint з темними ялиновими блоками. Перший екран: грід 1.02fr/.98fr, ліворуч текст і дві кнопки в колонку, праворуч великий розріз будинку. Метод: липкий SVG будинку (top 120px) поруч зі сходинками висотою 44vh; на вузьких екранах будинок стає липкою смугою зверху. Картки в гридах по 3 (gap 30px) з subgrid, щоб рядки збігались. Брейкпоінти: 1180, 1100, 1080 (бургер), 980, 960, 900, 760, 600, 520px. Позначки рівнів на межах секцій.

## Elevation & Depth

Гібрид: тональні шари й хайрлайни, плюс довгі розсіяні тіні лише для того, що «парить». Картка стоїть на шарі, а не на тіні.

### Shadow Vocabulary
- **Tray** (`inset 0 0 0 1px rgba(30,35,38,.07)` на псевдоелементі inset -6px, фон rgba(30,35,38,.045)): зовнішній лоток картки; на hover тепліє до охри.
- **Core** (`inset 0 1px 0 rgba(255,255,255,.95), 0 1px 2px rgba(30,35,38,.05)`): серцевина картки.
- **Float** (`0 22px 44px -26px rgba(30,35,38,.45)` з хайрлайном): навігація, випадаючі, cookies.
- **CTA lift** (`0 18px 30px -20px rgba(30,35,38,.45)`): охрова кнопка.
- **Grain**: фіксований шум, opacity .05.

### Named Rules
**The Double Bezel Rule.** Картка завжди має лоток і серцевину; радіуси 28 і 22px, зазор 6px.

**The Hairline First Rule.** Розділяти хайрлайном (rgba графіту .14 до .26) до того, як додавати тінь чи заливку.

## Shapes

Пігулка (999px) для всього інтерактивного: кнопки, чіпси, навігація, прапорці. М'які прямокутники 22/28px для контейнерів, 16px для вкладених блоків і полів. Круглі диски (32 до 62px) для стрілок, номерів кроків, лого. У самому будинку прямі кути й міter-стики даху.

## Components

### Buttons
- **Shape:** пігулка (999px), мін. висота 56px (двохрядкова 64px, мала 44px).
- **Primary:** охра з графітовим текстом, правий відступ 64px під диск 40px зі стрілкою.
- **Line:** прозора з внутрішнім обведенням 1.5px; на темному світла версія.
- **Hover / Focus:** диск зсувається (2px, -1px) і росте до 1.08; active scale .98; фокус 2px ochre-deep (на темному ochre), offset 3px; крива cubic-bezier(.32,.72,0,1).

### Cards / Containers
- Папір, радіус 22px, лоток 28px; hover на пристроях з мишею піднімає на 4px. Padding 26 до 34px. Темні панелі ялинові з охровим радіальним відблиском у куті. «Гарячий» тариф: охрове обведення 2px і прапорець.

### Inputs / Fields
- Мін. висота 54px, радіус 16px, фон ground з внутрішнім хайрлайном; фокус: білий фон і обведення 2px ochre-deep. Помилка: обведення error. Вибір-чіпи пігулками, обраний заливається графітом.

### Navigation
- Плаваюча скляна пігулка (висота 64px, блюр 18px, папір .74), лого-диск ялиновий з монограмою охрою; посилання 0.9rem з охровим підкресленням, що виїжджає зліва; випадаюча панель «Послуги». Нижче 1080px бургер і повноекранне матове меню з Prata та каскадною появою.

### House in section (signature)
- SVG будинку: графітові плити, хайрлайни, дах 12px, мономірні позначки рівнів, охровий промінь. На першому екрані малюється знизу вгору (clip-path, 1.8s); у методі кожен поверх з'являється при скролі, охрова смуга показує поточний. У темному блоці інвертується на on-dark. При prefers-reduced-motion усе видиме без анімації.

### Section level marks
- Мономірна пігулка на межі секції з номером рівня.

## Do's and Don'ts

### Do:
- **Do** будувати нове з хайрлайнів, паперових карток і подвійного контуру.
- **Do** тримати охру для активного, а на світлому тексті використовувати ochre-deep.
- **Do** набирати суми моно з табличними цифрами.
- **Do** давати інтерактивному форму пігулки, а кнопкам диск зі стрілкою.
- **Do** вирівнювати рядки карток через subgrid.
- **Do** поважати prefers-reduced-motion.

### Don't:
- **Don't** повертатись до вишні, золота й Geologica: це гілка `lyubov`.
- **Don't** робити банківський темно-синій із золотом або кремову антикву консультанта.
- **Don't** ставити яскраву охру текстом на світлому.
- **Don't** використовувати короткі жорсткі зсунуті тіні; лише довгі розсіяні.
- **Don't** робити іконки символами чи емодзі; іконки це SVG.

## Provenance

Усі растри на сторінці це портрети, згенеровані клієнтом у Gemini; у `assets/` лежать локально оптимізовані копії (hero-1200, hero-1920, about-900 у jpg і webp, og.jpg). Фавікон `assets/favicon.svg` авторський SVG. Збірка велась через код без макета.

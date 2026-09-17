/**
 * Приклад проксі для заявок: Cloudflare Worker.
 * Токен бота зберігається в секретах Worker, а не на сайті.
 *
 * 1. Cloudflare → Workers & Pages → Create Worker → вставте цей код.
 * 2. Settings → Variables → додайте секрети:
 *      TG_TOKEN   — токен бота від @BotFather
 *      TG_CHAT_ID — ID чату, куди надсилати заявки
 *      ALLOWED_ORIGIN — адреса сайту, напр. https://hanna-veres.com.ua
 * 3. У config.js: form.mode = 'proxy', form.endpoint = 'https://<ваш-worker>.workers.dev'
 */
export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: cors });

    let d;
    try { d = await request.json(); } catch { return new Response('Bad JSON', { status: 400, headers: cors }); }

    const clean = (v, max = 500) => String(v || '').replace(/[<>]/g, '').slice(0, max);
    const digits = clean(d.phone, 30).replace(/\D/g, '');
    if (clean(d.name).trim().length < 2 || digits.length < 10) {
      return new Response('Invalid', { status: 422, headers: cors });
    }

    const extras = Array.isArray(d.extras) ? d.extras.map(x => '📎 ' + clean(x, 300)).join('\n') : '';
    const text = [
      '🆕 Заявка з сайту',
      '👤 ' + clean(d.name, 80),
      '📞 ' + clean(d.phone, 30) + ' (' + clean(d.messenger, 20) + ')',
      '🎯 ' + clean(d.product, 120),
      d.comment ? '💬 ' + clean(d.comment, 1000) : '',
      extras,
      '🕒 ' + clean(d.time, 40)
    ].filter(Boolean).join('\n');

    const tg = await fetch(`https://api.telegram.org/bot${env.TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: env.TG_CHAT_ID, text })
    });

    return new Response(tg.ok ? 'ok' : 'telegram error', { status: tg.ok ? 200 : 502, headers: cors });
  }
};

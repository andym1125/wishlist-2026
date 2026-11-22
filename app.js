const order = { high: 0, medium: 1, low: 2 };

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}

function safeUrl(u) {
  try { const url = new URL(u, location.href); return /^https?:$/.test(url.protocol) ? url.href : null; }
  catch { return null; }
}

fetch('wishlist.json', { cache: 'no-store' })
  .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then(data => {
    if (data.title) { document.getElementById('title').textContent = data.title; document.title = data.title; }
    if (data.subtitle) document.getElementById('subtitle').textContent = data.subtitle;
    const list = document.getElementById('list');
    list.innerHTML = '';
    const items = (data.items || []).slice().sort((a, b) =>
      (order[a.priority] ?? 3) - (order[b.priority] ?? 3));
    if (!items.length) { list.append(el('p', 'status', 'Nothing on the list yet.')); return; }
    for (const item of items) {
      const card = el('article', 'card');
      const img = item.image && safeUrl(item.image);
      if (img) { const i = el('img'); i.src = img; i.alt = item.name || ''; i.loading = 'lazy'; card.append(i); }
      const body = el('div', 'body');
      body.append(el('h2', 'name', item.name || 'Untitled'));
      const meta = el('div', 'meta');
      if (item.price) meta.append(el('span', 'price', item.price));
      if (item.priority) meta.append(el('span', 'badge ' + item.priority, item.priority));
      if (meta.childNodes.length) body.append(meta);
      if (item.notes) body.append(el('p', 'notes', item.notes));
      const link = item.link && safeUrl(item.link);
      if (link) { const a = el('a', 'link', 'View item →'); a.href = link; a.target = '_blank'; a.rel = 'noopener'; body.append(a); }
      card.append(body);
      list.append(card);
    }
  })
  .catch(() => {
    document.getElementById('list').innerHTML = '<p class="status">Couldn\'t load wishlist.json. Check that it\'s valid JSON.</p>';
  });

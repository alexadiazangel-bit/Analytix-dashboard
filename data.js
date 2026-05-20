// ============================================================
//  Analytix — Lógica principal del Dashboard
// ============================================================

const STORAGE_KEY = 'analytix_notes_2026';
let notes = {};
let selected = null;

// ── Persistencia de notas ──────────────────────────────────
function loadNotes() {
  try { notes = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
  catch(e) { notes = {}; }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// ── Render lista de clientes ──────────────────────────────
function renderList() {
  const container = document.getElementById('client-list');
  container.innerHTML = '';
  const maxComps = Math.max(...CLIENTS.map(c => c.comps || 0));

  CLIENTS.forEach((c, i) => {
    const row = document.createElement('div');
    row.className = 'client-row' + (selected === i ? ' selected' : '');
    row.onclick = () => selectClient(i);
    const isOk = c.graph === 'OK';
    const pct = maxComps ? Math.round((c.comps / maxComps) * 100) : 0;
    const noteCount = (notes[i] || []).length;
    row.innerHTML = `
      <span class="dot ${isOk ? 'dot-ok' : 'dot-pend'}" title="${c.graph}"></span>
      <div class="client-name">
        ${c.name}
        <span class="client-cat">${c.cat}</span>
      </div>
      <div class="prog-track"><div class="prog-fill" style="width:${pct}%"></div></div>
      <span class="client-num">${c.comps.toLocaleString('es-CO')} comp.</span>
      <span class="client-num">${c.conns} conex.</span>
      ${noteCount > 0 ? `<span class="badge badge-info">${noteCount} nota${noteCount>1?'s':''}</span>` : ''}
      <span class="badge ${isOk ? 'badge-ok' : 'badge-pend'}">${c.graph}</span>
    `;
    container.appendChild(row);
  });
}

// ── Selección y detalle de cliente ───────────────────────
function selectClient(i) {
  if (selected === i) { closeDetail(); return; }
  selected = i;
  renderList();
  const c = CLIENTS[i];
  document.getElementById('detail-panel').style.display = 'block';
  document.getElementById('detail-title').textContent = c.name;
  const isOk = c.graph === 'OK';
  document.getElementById('detail-fields').innerHTML = `
    <div class="detail-field"><span class="detail-field-label">Categoría</span><span class="detail-field-val">${c.cat}</span></div>
    <div class="detail-field"><span class="detail-field-label">Estado grafo</span><span class="detail-field-val"><span class="badge ${isOk ? 'badge-ok' : 'badge-pend'}">${c.graph}</span></span></div>
    <div class="detail-field"><span class="detail-field-label">Componentes</span><span class="detail-field-val">${c.comps.toLocaleString('es-CO')}</span></div>
    <div class="detail-field"><span class="detail-field-label">Conexiones</span><span class="detail-field-val">${c.conns}</span></div>
    <div class="detail-field"><span class="detail-field-label">Observación</span><span class="detail-field-val">${c.obs !== 'Sin observaciones' ? `<span class="obs-chip">${c.obs}</span>` : c.obs}</span></div>
  `;
  renderNotes(i);
  setTimeout(() => document.getElementById('detail-panel').scrollIntoView({ behavior:'smooth', block:'nearest' }), 50);
}

function closeDetail() {
  selected = null;
  document.getElementById('detail-panel').style.display = 'none';
  renderList();
}

// ── Notas de seguimiento ──────────────────────────────────
function addNote() {
  const input = document.getElementById('note-input');
  const text = input.value.trim();
  if (!text || selected === null) return;
  if (!notes[selected]) notes[selected] = [];
  const now = new Date();
  const ts = now.toLocaleDateString('es-CO', { day:'2-digit', month:'short', year:'numeric' })
    + ' ' + now.toLocaleTimeString('es-CO', { hour:'2-digit', minute:'2-digit' });
  notes[selected].unshift({ text, ts, user: 'Gerencia' });
  input.value = '';
  saveNotes();
  renderNotes(selected);
  renderList();
}

function deleteNote(ci, ni) {
  if (!confirm('¿Eliminar esta nota?')) return;
  notes[ci].splice(ni, 1);
  saveNotes();
  renderNotes(ci);
  renderList();
}

function renderNotes(i) {
  const list = document.getElementById('notes-list');
  const arr = notes[i] || [];
  if (!arr.length) {
    list.innerHTML = '<p class="no-notes">Sin notas aún. Agrega la primera nota arriba.</p>';
    return;
  }
  list.innerHTML = arr.map((n, ni) => `
    <div class="note-item">
      <span>${n.text}</span>
      <div style="display:flex;gap:8px;align-items:center;flex-shrink:0;">
        <span class="note-ts">${n.ts}${n.user ? ' · ' + n.user : ''}</span>
        <span class="note-del" onclick="deleteNote(${i},${ni})" title="Eliminar">&#x2715;</span>
      </div>
    </div>
  `).join('');
}

// ── Tabs ──────────────────────────────────────────────────
function switchTab(tab) {
  document.getElementById('tab-clientes').style.display    = tab === 'clientes'    ? 'block' : 'none';
  document.getElementById('tab-componentes').style.display = tab === 'componentes' ? 'block' : 'none';
  document.querySelectorAll('.tab-btn').forEach((btn, i) => {
    btn.classList.toggle('active', (i === 0 && tab === 'clientes') || (i === 1 && tab === 'componentes'));
  });
  if (tab === 'componentes') renderBars();
}

// ── Gráfico de barras ─────────────────────────────────────
function renderBars() {
  const container = document.getElementById('bar-chart');
  container.innerHTML = '';
  const sorted = [...CLIENTS].filter(c => c.comps > 0).sort((a, b) => b.comps - a.comps);
  const maxVal = sorted[0]?.comps || 1;
  sorted.forEach(c => {
    const pct = Math.max(Math.round((c.comps / maxVal) * 100), 5);
    const div = document.createElement('div');
    div.className = 'bar-row';
    div.innerHTML = `
      <span class="bar-label" title="${c.name}">${c.name}</span>
      <div class="bar-fill" style="width:${pct}%"><span class="bar-val">${c.comps.toLocaleString('es-CO')}</span></div>
    `;
    container.appendChild(div);
  });
}

// ── Exportar JSON ─────────────────────────────────────────
function exportNotes() {
  const data = { exportado: new Date().toISOString(), notas: {} };
  Object.keys(notes).forEach(k => {
    if (notes[k] && notes[k].length) data.notas[CLIENTS[k].name] = notes[k];
  });
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'analytix_notas_' + new Date().toISOString().slice(0,10) + '.json';
  a.click();
}

// ── Exportar CSV (NUEVO) ──────────────────────────────────
function exportCSV() {
  const BOM = '\uFEFF'; // UTF-8 BOM para Excel en español
  const headers = ['Cliente','Categoría','Estado Grafo','Componentes','Conexiones','Observación','Notas de Seguimiento'];

  const rows = CLIENTS.map((c, i) => {
    const clientNotes = (notes[i] || []).map(n => `[${n.ts}] ${n.text}`).join(' | ');
    return [
      c.name,
      c.cat,
      c.graph,
      c.comps,
      c.conns,
      c.obs,
      clientNotes || ''
    ].map(val => `"${String(val).replace(/"/g, '""')}"`).join(';'); // separador ; para Excel español
  });

  const csv = BOM + [headers.map(h => `"${h}"`).join(';'), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'analytix_reporte_' + new Date().toISOString().slice(0,10) + '.csv';
  a.click();
}

// ── Importar JSON ─────────────────────────────────────────
function importNotes() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.notas) {
          Object.keys(data.notas).forEach(clientName => {
            const idx = CLIENTS.findIndex(c => c.name === clientName);
            if (idx >= 0) notes[idx] = data.notas[clientName];
          });
          saveNotes();
          renderList();
          alert('Notas importadas correctamente.');
        } else { alert('Archivo no válido.'); }
      } catch(err) { alert('Error al leer el archivo.'); }
    };
    reader.readAsText(file);
  };
  input.click();
}

// ── Init ──────────────────────────────────────────────────
loadNotes();
renderList();

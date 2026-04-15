import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Status = 'new' | 'preparing' | 'ready' | 'done';

type Order = {
  id: number;
  directorate: string;
  location: string;
  personnel: string;
  items: string[];
  note: string;
  status: Status;
  createdAt: string;
};

const STATUS_META: Record<Status, { label: string; bg: string; color: string }> = {
  new: { label: 'Yeni', bg: '#fee2e2', color: '#b91c1c' },
  preparing: { label: 'Hazırlanıyor', bg: '#fef3c7', color: '#b45309' },
  ready: { label: 'Hazır', bg: '#dcfce7', color: '#15803d' },
  done: { label: 'Teslim Edildi', bg: '#e2e8f0', color: '#475569' },
};

const DIRECTORATES: Record<string, string[]> = {
  'Park ve Bahçeler Müdürlüğü': ['Mehmet Kılıç Parkı', 'Kemal Kahraman Parkı', 'Destek Ekibi', 'Kent Mobilya Atölyesi', 'Zincidere Deposu'],
  'Makine İkmal Müdürlüğü': ['Araç Bakım Atölyesi', 'Akaryakıt Birimi', 'Yedek Parça Deposu'],
  'Ulaşım Hizmetleri Müdürlüğü': ['Saha Ekibi', 'Merkez Ofis', 'Şantiye Alanı'],
};

const PERSONNEL: Record<string, string[]> = {
  'Park ve Bahçeler Müdürlüğü': ['Mehmet Kılıç', 'Kemal Kahraman', 'Mustafa Simer', 'Emre Karahan', 'Mustafa Kalem', 'Recep Bolat'],
  'Makine İkmal Müdürlüğü': ['Ali Fatih Şahin', 'Mustafa Kantarcı', 'Orhan Karakaya', 'Önder Bey'],
  'Ulaşım Hizmetleri Müdürlüğü': ['Saha Personeli 1', 'Saha Personeli 2'],
};

const INITIAL_ORDERS: Order[] = [
  {
    id: 104,
    directorate: 'Park ve Bahçeler Müdürlüğü',
    location: 'Mehmet Kılıç Parkı',
    personnel: 'Mehmet Kılıç',
    items: ['2 Çay', '1 Türk Kahvesi'],
    note: 'Az şekerli',
    status: 'new',
    createdAt: '14:22',
  },
  {
    id: 105,
    directorate: 'Makine İkmal Müdürlüğü',
    location: 'Araç Bakım Atölyesi',
    personnel: 'Ali Fatih Şahin',
    items: ['1 Tost', '1 Ayran'],
    note: 'Servis hızlı',
    status: 'preparing',
    createdAt: '14:25',
  },
  {
    id: 106,
    directorate: 'Ulaşım Hizmetleri Müdürlüğü',
    location: 'Şantiye Alanı',
    personnel: 'Saha Personeli 1',
    items: ['1 Çay'],
    note: '',
    status: 'ready',
    createdAt: '14:28',
  },
];

function nextStatus(current: Status): Status {
  if (current === 'new') return 'preparing';
  if (current === 'preparing') return 'ready';
  if (current === 'ready') return 'done';
  return 'done';
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#f1f5f9',
    padding: 24,
    fontFamily: 'Arial, sans-serif',
    color: '#0f172a',
  },
  shell: {
    maxWidth: 1600,
    margin: '0 auto',
  },
  header: {
    background: '#fff',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    gap: 16,
    flexWrap: 'wrap',
  },
  title: {
    margin: 0,
    fontSize: 42,
    lineHeight: 1.1,
  },
  subtitle: {
    margin: '8px 0 0',
    color: '#64748b',
  },
  buttonDark: {
    background: '#0f172a',
    color: '#fff',
    border: 'none',
    padding: '14px 20px',
    borderRadius: 12,
    cursor: 'pointer',
    fontWeight: 700,
  },
  buttonLight: {
    background: '#fff',
    color: '#0f172a',
    border: '1px solid #dbe2ea',
    padding: '10px 16px',
    borderRadius: 10,
    cursor: 'pointer',
    fontWeight: 600,
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '420px 1fr',
    gap: 24,
    alignItems: 'start',
  },
  formPanel: {
    background: '#fff',
    padding: 24,
    borderRadius: 24,
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  formTitle: {
    margin: '0 0 16px',
    fontSize: 28,
  },
  field: {
    width: '100%',
    padding: '14px 14px',
    borderRadius: 10,
    border: '1px solid #dbe2ea',
    background: '#fff',
    color: '#0f172a',
    outline: 'none',
    fontSize: 15,
  },
  textarea: {
    width: '100%',
    padding: 14,
    borderRadius: 10,
    border: '1px solid #dbe2ea',
    minHeight: 110,
    resize: 'vertical',
    outline: 'none',
    fontSize: 15,
    fontFamily: 'inherit',
  },
  submit: {
    background: '#0f172a',
    color: '#fff',
    border: 'none',
    padding: '16px',
    borderRadius: 12,
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 16,
  },
  filters: {
    display: 'flex',
    gap: 10,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '10px 16px',
    borderRadius: 10,
    border: '1px solid #dbe2ea',
    cursor: 'pointer',
    background: '#fff',
    fontWeight: 600,
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: 20,
  },
  card: {
    background: '#fff',
    borderRadius: 20,
    padding: 20,
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    border: '1px solid #eef2f7',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 16,
  },
  cardId: {
    margin: 0,
    fontSize: 28,
  },
  meta: {
    color: '#64748b',
    fontSize: 14,
    marginTop: 4,
  },
  badge: {
    padding: '8px 14px',
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 13,
    whiteSpace: 'nowrap',
  },
  detail: {
    marginBottom: 12,
    lineHeight: 1.5,
  },
  note: {
    background: '#fef9c3',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    color: '#92400e',
  },
  actions: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
  },
  actionBtn: {
    border: 'none',
    padding: '10px 14px',
    borderRadius: 10,
    cursor: 'pointer',
    fontWeight: 700,
  },
  list: {
    margin: '8px 0 0 18px',
    padding: 0,
  },
  responsive: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 24,
  },
};

export default function CafeOrderDisplay() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [filter, setFilter] = useState<'all' | Status>('all');
  const [soundOn, setSoundOn] = useState(true);
  const [form, setForm] = useState({
    directorate: 'Park ve Bahçeler Müdürlüğü',
    location: 'Mehmet Kılıç Parkı',
    personnel: 'Mehmet Kılıç',
    items: '',
    note: '',
  });

  const filteredOrders = useMemo(() => {
    if (filter === 'all') return orders;
    return orders.filter((o) => o.status === filter);
  }, [orders, filter]);

  const stats = useMemo(() => {
    const count = (s: Status) => orders.filter((o) => o.status === s).length;
    return {
      total: orders.length,
      new: count('new'),
      preparing: count('preparing'),
      ready: count('ready'),
      done: count('done'),
    };
  }, [orders]);

  const addOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedItems = form.items
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

    if (!parsedItems.length) return;

    const now = new Date();
    const createdAt = now.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newOrder: Order = {
      id: Math.max(...orders.map((o) => o.id), 100) + 1,
      directorate: form.directorate,
      location: form.location,
      personnel: form.personnel,
      items: parsedItems,
      note: form.note,
      status: 'new',
      createdAt,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setForm((prev) => ({ ...prev, items: '', note: '' }));

    if (soundOn && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(new SpeechSynthesisUtterance('Yeni sipariş geldi'));
    }
  };

  const updateStatus = (id: number) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: nextStatus(order.status) } : order,
      ),
    );
  };

  const deleteOrder = (id: number) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  const selectDirectorate = (directorate: string) => {
    const firstLocation = DIRECTORATES[directorate]?.[0] ?? '';
    const firstPersonnel = PERSONNEL[directorate]?.[0] ?? '';

    setForm((prev) => ({
      ...prev,
      directorate,
      location: firstLocation,
      personnel: firstPersonnel,
    }));
  };

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Çay Ocağı Sipariş Ekranı</h1>
            <p style={styles.subtitle}>Tek monitörde canlı sipariş takibi, durum yönetimi ve hızlı işlem akışı.</p>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button type="button" onClick={() => setSoundOn((v) => !v)} style={styles.buttonDark}>
              {soundOn ? 'Ses Açık' : 'Ses Kapalı'}
            </button>
            <button type="button" onClick={() => setOrders(INITIAL_ORDERS)} style={styles.buttonLight}>
              Örnek Veriyi Yükle
            </button>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
            gap: 18,
            marginBottom: 24,
          }}
        >
          {[
            ['Toplam', stats.total],
            ['Yeni', stats.new],
            ['Hazırlanıyor', stats.preparing],
            ['Hazır', stats.ready],
            ['Teslim', stats.done],
          ].map(([label, value]) => (
            <div key={String(label)} style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <div style={{ color: '#64748b', fontSize: 16 }}>{label}</div>
              <div style={{ marginTop: 12, fontSize: 34, fontWeight: 700 }}>{value}</div>
            </div>
          ))}
        </div>

        <div style={{ ...styles.grid, ...(window.innerWidth < 1100 ? styles.responsive : {}) }}>
          <div style={styles.formPanel}>
            <h2 style={styles.formTitle}>Yeni Sipariş Gir</h2>
            <form onSubmit={addOrder} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <select
                value={form.directorate}
                onChange={(e) => selectDirectorate(e.target.value)}
                style={styles.field}
              >
                {Object.keys(DIRECTORATES).map((directorate) => (
                  <option key={directorate} value={directorate}>
                    {directorate}
                  </option>
                ))}
              </select>

              <select
                value={form.location}
                onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                style={styles.field}
              >
                {DIRECTORATES[form.directorate].map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>

              <select
                value={form.personnel}
                onChange={(e) => setForm((prev) => ({ ...prev, personnel: e.target.value }))}
                style={styles.field}
              >
                {PERSONNEL[form.directorate].map((person) => (
                  <option key={person} value={person}>
                    {person}
                  </option>
                ))}
              </select>

              <textarea
                rows={5}
                placeholder={'Her satıra bir ürün yaz\n2 Çay\n1 Tost'}
                value={form.items}
                onChange={(e) => setForm((prev) => ({ ...prev, items: e.target.value }))}
                style={styles.textarea}
              />

              <textarea
                rows={3}
                placeholder="Sipariş notu"
                value={form.note}
                onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
                style={styles.textarea}
              />

              <button type="submit" style={styles.submit}>
                Sipariş Gönder
              </button>
            </form>
          </div>

          <div>
            <div style={styles.filters}>
              {['all', 'new', 'preparing', 'ready', 'done'].map((status) => {
                const key = status as 'all' | Status;
                const active = filter === key;
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFilter(key)}
                    style={{
                      ...styles.filterBtn,
                      background: active ? '#0f172a' : '#fff',
                      color: active ? '#fff' : '#0f172a',
                    }}
                  >
                    {status === 'all' ? 'Tümü' : STATUS_META[status as Status].label}
                  </button>
                );
              })}
            </div>

            <div style={styles.cardsGrid}>
              <AnimatePresence initial={false}>
                {filteredOrders.map((order) => {
                  const meta = STATUS_META[order.status];
                  return (
                    <motion.div
                      key={order.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      style={styles.card}
                    >
                      <div style={styles.cardTop}>
                        <div>
                          <h2 style={styles.cardId}>#{order.id}</h2>
                          <div style={styles.meta}>{order.createdAt} • {order.location}</div>
                          <div style={styles.meta}>{order.directorate}</div>
                          <div style={styles.meta}>Personel: {order.personnel}</div>
                        </div>

                        <div style={{ ...styles.badge, background: meta.bg, color: meta.color }}>
                          {meta.label}
                        </div>
                      </div>

                      <div style={styles.detail}>
                        <strong>Ürünler</strong>
                        <ul style={styles.list}>
                          {order.items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      {order.note ? (
                        <div style={styles.note}>
                          <strong>Not:</strong> {order.note}
                        </div>
                      ) : null}

                      <div style={styles.actions}>
                        {order.status !== 'done' ? (
                          <button
                            type="button"
                            onClick={() => updateStatus(order.id)}
                            style={{ ...styles.actionBtn, background: '#0f172a', color: '#fff' }}
                          >
                            Sonraki Durum
                          </button>
                        ) : null}

                        <button
                          type="button"
                          onClick={() => deleteOrder(order.id)}
                          style={{ ...styles.actionBtn, background: '#ef4444', color: '#fff' }}
                        >
                          Sil
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

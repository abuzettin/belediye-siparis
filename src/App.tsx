import "./App.css";

export default function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <h2>Belediye Sipariş</h2>
          <p>Yönetim Paneli</p>
        </div>

        <nav className="menu">
          <button className="menu-item active">Dashboard</button>
          <button className="menu-item">Sipariş Oluştur</button>
          <button className="menu-item">Siparişler</button>
          <button className="menu-item">Onay Bekleyenler</button>
          <button className="menu-item">Tamamlananlar</button>
          <button className="menu-item">Personel</button>
          <button className="menu-item">Ayarlar</button>
        </nav>
      </aside>

      <main className="content">
        <header className="topbar">
          <h1>Belediye Sipariş Sistemi</h1>
          <button className="profile-btn">Admin Paneli</button>
        </header>

        <section className="cards">
          <div className="card">
            <h3>Toplam Sipariş</h3>
            <p>124</p>
          </div>

          <div className="card">
            <h3>Bekleyen Sipariş</h3>
            <p>18</p>
          </div>

          <div className="card">
            <h3>Tamamlanan Sipariş</h3>
            <p>106</p>
          </div>
        </section>

        <section className="table-section">
          <h2>Son Siparişler</h2>

          <table>
            <thead>
              <tr>
                <th>Sipariş No</th>
                <th>Birim</th>
                <th>Talep</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1024</td>
                <td>Park ve Bahçeler</td>
                <td>Çim Tohumu</td>
                <td>Bekliyor</td>
              </tr>
              <tr>
                <td>#1025</td>
                <td>Fen İşleri</td>
                <td>Boya Malzemesi</td>
                <td>Tamamlandı</td>
              </tr>
              <tr>
                <td>#1026</td>
                <td>Temizlik İşleri</td>
                <td>Eldiven</td>
                <td>Onayda</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

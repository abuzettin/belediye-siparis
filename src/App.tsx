import "./App.css";
import { useState } from "react";

export default function App() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const menuItems = [
    "Dashboard",
    "Sipariş Oluştur",
    "Siparişler",
    "Onay Bekleyenler",
    "Tamamlananlar",
    "Personel",
    "Ayarlar",
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <h2>Belediye Sipariş</h2>
          <p>Yönetim Paneli</p>
        </div>

        <div className="menu">
          {menuItems.map((item) => (
            <button
              key={item}
              className={`menu-item ${
                activeMenu === item ? "active" : ""
              }`}
              onClick={() => setActiveMenu(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </aside>

      <main className="content">
        <div className="topbar">
          <h1>{activeMenu}</h1>
          <button className="profile-btn">Admin Paneli</button>
        </div>

        {activeMenu === "Dashboard" && (
          <>
            <div className="cards">
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
            </div>

            <div className="table-section">
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
            </div>
          </>
        )}

        {activeMenu === "Sipariş Oluştur" && (
          <div className="table-section">
            <h2>Yeni Sipariş Oluştur</h2>
            <p>Buraya sipariş formu gelecek.</p>
          </div>
        )}

        {activeMenu === "Siparişler" && (
          <div className="table-section">
            <h2>Tüm Siparişler</h2>
            <p>Sistemdeki tüm siparişler burada listelenecek.</p>
          </div>
        )}

        {activeMenu === "Onay Bekleyenler" && (
          <div className="table-section">
            <h2>Onay Bekleyen Siparişler</h2>
            <p>Onay sürecindeki siparişler burada görünecek.</p>
          </div>
        )}

        {activeMenu === "Tamamlananlar" && (
          <div className="table-section">
            <h2>Tamamlanan Siparişler</h2>
            <p>Tamamlanan siparişler burada listelenecek.</p>
          </div>
        )}

        {activeMenu === "Personel" && (
          <div className="table-section">
            <h2>Personel Yönetimi</h2>
            <p>Personel bilgileri burada olacak.</p>
          </div>
        )}

        {activeMenu === "Ayarlar" && (
          <div className="table-section">
            <h2>Sistem Ayarları</h2>
            <p>Panel ayarları burada düzenlenecek.</p>
          </div>
        )}
      </main>
    </div>
  );
}

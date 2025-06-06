# Psychologists Services

**Psychologists Services**, modern ve kullanıcı dostu arayüzüyle psikolog hizmetlerini dijital ortama taşıyan bir web uygulamasıdır. Kullanıcılar giriş yapabilir, psikolog profillerini inceleyebilir, randevu planlaması yapabilir, istedikleri psikologları favori listelerine ekleyebilir, eklediği psikolog listesini ayrı bir sayfada görebilir, tema seçenekleriyle göz zevkinize göre sitede gezinebilir ve gerçek zamanlı verilerle desteklenen bir deneyim yaşayabilirler.

🌐 **Canlı Link:** (Güncellenicek)

---

## 🧠 Temel Özellikler

- **Kullanıcı Kimlik Doğrulama:** Firebase üzerinden güvenli giriş ve kayıt sistemi
- **Gerçek Zamanlı Veriler:** Firebase Realtime Database entegrasyonu
- **Psikolog Listesi:** Farklı uzmanlık alanlarına sahip psikologların listelenmesi
- **Favorilere Ekleme:** Kullanıcılar beğendiği psikologları favorilere ekleyebilir
- **Psikolog Filtrelemesi:** Kullanıcılar psikologları isim sırasına, ücretlerine ve puanlarına göre listeleyebilir
- **Duyarlı Tasarım:** Tüm cihazlara uyumlu modern ve esnek kullanıcı arayüzü
- **Geri Bildirimler:** React Toastify ile kullanıcı bilgilendirmeleri

---

## 🛠️ Kullanılan Teknolojiler

- **React.js**
- **React Router DOM**
- **Redux Toolkit**
- **Custom React Hooks**
- **Firebase (Authentication + Realtime Database)**
- **React Toastify**
- **CSS3**
- **Vite**

---

## ⚙️ Kurulum

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edin:

```bash
# 1. Repoyu klonlayın
git (güncellenicek)
cd psychologists-services

# 2. Gerekli paketleri yükleyin
npm install

# 3. Geliştirme sunucusunu başlatın
npm run dev
```

👉 Sunucu başarıyla başlatıldığında:

```bash
➜ Local:   http://localhost:5173/
➜ Network: use --host to expose
```

---

## 📁 Notlar

- Firebase yapılandırması için `.env` dosyasına kendi API anahtarlarınızı ve proje yapılandırmanızı eklemeyi unutmayın.
- Uygulama boyunca kullanılan custom hooklar, state yönetimini ve veri işlemlerini sadeleştirmek için yazılmıştır.

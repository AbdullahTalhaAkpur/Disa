// api.js

const BASE_URL = "http://127.0.0.1:8000";

window.BASE_URL = BASE_URL; // Global erişim için tanımlandı

function getCurrentLang() {
  return localStorage.getItem("lang") || "tr";
}

const API = {
  // Belirli bir blog yazısını ID ile getir
  async getBlog(id) {
    const response = await fetch(`${BASE_URL}/blog/${id}/?lang=${getCurrentLang()}`);
    if (!response.ok) throw new Error("Blog verisi alınamadı");
    return await response.json();
  },

  // Sayfalı tüm blog yazılarını getir
  async getBlogsPaginated(page = 1) {
    const response = await fetch(`${BASE_URL}/blog/?page=${page}&lang=${getCurrentLang()}`);
    if (!response.ok) throw new Error("Sayfalı blog listesi alınamadı");
    return await response.json();
  },

  // Köşe Yazılarını getir
  async getKoseYazilariPaginated(page = 1) {
    const response = await fetch(`${BASE_URL}/kose-yazilari/?page=${page}&lang=${getCurrentLang()}`);
    if (!response.ok) throw new Error("Köşe yazıları alınamadı");
    return await response.json();
  },

  // Belirli bir köşe yazısını getir (slug ile)
  async getKoseYazisiBySlug(slug) {
    const response = await fetch(`${BASE_URL}/${getCurrentLang()}/kose-yazilari/${slug}/`);
    if (!response.ok) throw new Error("Köşe yazısı alınamadı");
    return await response.json();
  },

  // Etkinlikler
  async getEvents(showAll = false) {
    const showParam = showAll ? "&show_all=true" : "";
    const response = await fetch(`${BASE_URL}/events/?lang=${getCurrentLang()}${showParam}`);
    if (!response.ok) throw new Error("Etkinlikler alınamadı");
    return await response.json();
  },

  // Hakkımızda verisini getir
async getHakkimizda() {
  const response = await fetch(`${BASE_URL}/hakkimizda/`);
  if (!response.ok) throw new Error("Hakkımızda verisi alınamadı");
  return await response.json();
},

// Ekip üyelerini getir
async getEkip() {
  const response = await fetch(`${BASE_URL}/ekip/`);
  if (!response.ok) throw new Error("Ekip bilgisi alınamadı");
  return await response.json();
},

// Yayınlar 
async getYayinlar() {
  const response = await fetch(`${BASE_URL}/yayinlar/`);
  if (!response.ok) throw new Error("Yayınlar alınamadı");
  return await response.json();
},

  // İletişim
  async getIletisim() {
    const response = await fetch(`${BASE_URL}/iletisim/`);
    if (!response.ok) throw new Error("İletişim verisi alınamadı");
    return await response.json();
  }
};

window.API = API;
// blog-single.js (güncel)

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

async function fetchBlogDetail() {
  try {
    const lang = localStorage.getItem("lang") || "tr"; // dil öneki
    const response = await fetch(`${BASE_URL}/${lang}/blog/${slug}/`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Blog verisi alınamadı (Status: ${response.status}, Text: ${errorText})`);
    }

    const data = await response.json();

    document.getElementById("blog-title").textContent = data.title;
    document.getElementById("blog-image").src = data.image;
    document.getElementById("blog-date").textContent = formatDate(data.created_at);

    // HTML içeriği güvenli şekilde yazdırılır
    const clean = DOMPurify.sanitize(data.content);
    document.getElementById("blog-content").innerHTML = clean;

  } catch (error) {
    console.error("Blog detayı yüklenemedi:", error);
    document.getElementById("blog-content").innerHTML = `<p>Blog detay verisi alınamadı: ${error.message}</p>`;
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR");
}

document.addEventListener("DOMContentLoaded", fetchBlogDetail);

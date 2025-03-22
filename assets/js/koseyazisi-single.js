// koseyazisi-single.js

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

async function fetchKoseYazisiDetail() {
  try {
    const lang = localStorage.getItem("lang") || "tr";
    const response = await fetch(`${BASE_URL}/${lang}/kose-yazilari/${slug}/`);
    if (!response.ok) throw new Error("Köşe yazısı verisi alınamadı");

    const data = await response.json();

    const html = `
      <h2 class="mb-3">${data.title}</h2>

      <div class="vl-blg-thumb mb-4">
        <img class="w-100 rounded" src="${data.image}" alt="${data.title}">
      </div>

      <div class="vl-meta mb-3">
        <ul class="d-flex gap-4">
          <li>
            <span><img src="assets/img/icons/vl-user-1.1.svg" class="me-1"></span>
            <span class="text-dark">${data.author} - ${data.author_title}</span>
          </li>
          <li>
            <span><img src="assets/img/icons/vl-calender-1.1.svg" class="me-1"></span>
            <span class="text-dark">${new Date(data.created_at).toLocaleDateString("tr-TR")}</span>
          </li>
        </ul>
      </div>

      <div class="blog-content fs-5 lh-lg text-dark">${data.content}</div>
    `;

    document.getElementById("koseyazisi-detail").innerHTML = html;
  } catch (err) {
    console.error("Köşe yazısı detayı yüklenemedi:", err);
    document.getElementById("koseyazisi-detail").innerHTML = "<p>Köşe yazısı detayı yüklenemedi.</p>";
  }
}

document.addEventListener("DOMContentLoaded", fetchKoseYazisiDetail);

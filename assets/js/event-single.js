// event-single.js

// URL'den slug'ı al
const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

async function fetchEventDetail() {
  try {
    const lang = localStorage.getItem("lang") || "tr";
    const response = await fetch(`${BASE_URL}/${lang}/events/${slug}/`);
    if (!response.ok) throw new Error("Etkinlik verisi alınamadı");
    const data = await response.json();

    // Sayfadaki alanları doldur
    document.getElementById("event-title").textContent = data.title;
    document.getElementById("event-date").textContent = `${formatDate(
      data.start_date
    )} - ${formatDate(data.end_date)}`;
    document.getElementById("event-time").textContent = `${data.start_time} - ${data.end_time}`;
    document.getElementById("event-location").textContent = data.location.toUpperCase();
    document.getElementById("event-image").src = data.image;

    // HTML içeriği doğrudan içeri aktar
    document.getElementById("event-content").innerHTML = data.content;

    // Form butonu
    const registerBtn = document.getElementById("event-register-button");
    if (data.registration_link && data.registration_link.startsWith("http")) {
      registerBtn.href = data.registration_link;
      registerBtn.target = "_blank";
      registerBtn.classList.remove("disabled");
      registerBtn.style.pointerEvents = "auto";
    } else {
      registerBtn.href = "#";
      registerBtn.classList.add("disabled");
      registerBtn.style.pointerEvents = "none";
      registerBtn.title = "Kısıtlı veya geçersiz kayıt linki.";
    }
  } catch (error) {
    console.error("Etkinlik detayı yüklenemedi:", error);
    document.getElementById("event-content").innerHTML = "<p>Etkinlik bilgisi yüklenemedi.</p>";
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return date.toLocaleDateString("tr-TR", options);
}

fetchEventDetail();

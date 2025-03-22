// events.js

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("event-list");

  function loadEvents() {
    container.innerHTML = "<p>Yükleniyor...</p>";

    API.getEvents(true).then(data => {
      const events = data.results || [];
      container.innerHTML = "";

      if (events.length === 0) {
        container.innerHTML = "<p>Hiç etkinlik bulunamadı.</p>";
        return;
      }

      events.forEach(event => {
        const card = document.createElement("div");
        card.className = "col-lg-12 mb-50";
        card.innerHTML = `
          <div class="event-bg-flex">
            <div class="event-date">
              <h3 class="title">${new Date(event.start_date).getDate()}</h3>
              <p class="year">${new Date(event.start_date).toLocaleString("tr-TR", { month: "long" }).toUpperCase()}<br>${new Date(event.start_date).getFullYear()}</p>
            </div>
            <div class="event-content">
              <div class="event-meta">
                <p class="para">${event.start_time.slice(0, 5)} - ${event.end_time.slice(0, 5)}</p>
              </div>
              <a href="#" class="title">${event.title}</a>
              <p class="para">Yer: ${event.location}</p>
              <a href="event-single.html?slug=${event.slug}" class="details">Etkinlik Detayı <span><i class="fa-solid fa-arrow-right"></i></span></a>
            </div>
            <div class="event-thumb">
              <img class="w-100" src="${event.image || 'assets/img/event/placeholder.png'}" alt="${event.title}">
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    }).catch(err => {
      container.innerHTML = `<p>Etkinlik verileri yüklenemedi.</p>`;
      console.error("Etkinlik API hatası:", err);
    });
  }

  loadEvents();
});

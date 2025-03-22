async function renderTeamMembers() {
  try {
    const data = await API.getEkip();
    const container = document.getElementById("team-members");

    data.results.forEach(member => {
      const card = document.createElement("div");
      card.className = "col-lg-4 col-md-6";
      card.innerHTML = `
        <div class="single-team">
          <div class="team-thumb">
            <img class="w-100" src="assets/img/team/placeholder.png" alt="${member.isim_soyisim}">
          </div>
          <div class="p-relative">
            <div class="content-box">
              <div class="ssocial">
                <ul>
                  ${member.facebook ? `<li><a href="${member.facebook}" target="_blank"><span><i class="fa-brands fa-facebook-f"></i></span></a></li>` : ""}
                  ${member.instagram ? `<li><a href="${member.instagram}" target="_blank"><span><i class="fa-brands fa-instagram"></i></span></a></li>` : ""}
                  ${member.twitter ? `<li><a href="${member.twitter}" target="_blank"><span><i class="fa-brands fa-twitter"></i></span></a></li>` : ""}
                  ${member.linkedin ? `<li><a href="${member.linkedin}" target="_blank"><span><i class="fa-brands fa-linkedin"></i></span></a></li>` : ""}
                </ul>
              </div>
              <div class="text">
                <a href="#" class="title">${member.isim_soyisim}</a>
                <h5 class="deseg">${member.unvan}</h5>
              </div>
            </div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Ekip verileri alınamadı:", error);
  }
}

async function renderAboutContent() {
  try {
    const data = await fetch("http://127.0.0.1:8000/hakkimizda/").then(res => res.json());
    document.getElementById("about-content").innerHTML = data.content;
  } catch (error) {
    console.error("Hakkımızda verisi alınamadı:", error);
  }
}

async function renderMissionAndVision() {
  try {
    const [misyon, vizyon] = await Promise.all([
      fetch("http://127.0.0.1:8000/misyon/").then(res => res.json()),
      fetch("http://127.0.0.1:8000/vizyon/").then(res => res.json())
    ]);

    document.getElementById("mission-content").innerHTML = misyon.content;
    document.getElementById("vision-content").innerHTML = vizyon.content;
  } catch (error) {
    console.error("Misyon veya Vizyon verisi alınamadı:", error);
  }
}


renderAboutContent();
renderTeamMembers();
renderMissionAndVision();

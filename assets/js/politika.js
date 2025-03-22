// politika.js

document.addEventListener("DOMContentLoaded", () => {
          const container = document.getElementById("politika-list");
        
          function loadPolitikalar() {
            container.innerHTML = "<p>Yükleniyor...</p>";
        
            fetch(`${BASE_URL}/politika-belgeleri/?lang=${getCurrentLang()}`)
              .then(res => {
                if (!res.ok) throw new Error("Politika belgeleri alınamadı");
                return res.json();
              })
              .then(data => {
                const belgeler = data.results || [];
                container.innerHTML = "";
        
                if (belgeler.length === 0) {
                  container.innerHTML = "<p>Hiç politika belgesi bulunamadı.</p>";
                  return;
                }
        
                belgeler.forEach(item => {
                  const col = document.createElement("div");
                  col.className = "col-lg-6 mb-4";
        
                  col.innerHTML = `
                    <div class="vl-single-blg-item">
                      <div class="vl-blg-content">
                        <h3 class="title">${item.title}</h3>
                        <p class="para">${item.content}</p>
                        <a href="${item.file_link}" target="_blank" class="read-more">
                          Dosyayı Aç <span><i class="fa-solid fa-file-arrow-down"></i></span>
                        </a>
                      </div>
                    </div>
                  `;
        
                  container.appendChild(col);
                });
              })
              .catch(err => {
                container.innerHTML = `<p>Politika belgeleri yüklenemedi.</p>`;
                console.error("Politika API hatası:", err);
              });
          }
        
          loadPolitikalar();
        });
        
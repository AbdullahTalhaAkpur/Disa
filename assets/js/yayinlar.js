// yayinlar.js

document.addEventListener("DOMContentLoaded", () => {
          const container = document.getElementById("yayinlar-list");
        
          function loadYayinlar() {
            container.innerHTML = "<p>Yükleniyor...</p>";
        
            fetch(`${BASE_URL}/yayinlar/?lang=${getCurrentLang()}`)
              .then(res => {
                if (!res.ok) throw new Error("Yayınlar alınamadı");
                return res.json();
              })
              .then(data => {
                const yayinlar = data.results || [];
                container.innerHTML = "";
        
                if (yayinlar.length === 0) {
                  container.innerHTML = "<p>Hiç yayın bulunamadı.</p>";
                  return;
                }
        
                yayinlar.forEach(item => {
                  const col = document.createElement("div");
                  col.className = "col-lg-6 mb-4";
        
                  col.innerHTML = `
                    <div class="vl-single-blg-item">
                      <div class="vl-blg-content">
                        <h3 class="title">${item.title}</h3>
                        <p class="para">${item.content}</p>
                        <a href="${item.file_link}" target="_blank" class="read-more">
                          Yayını Aç <span><i class="fa-solid fa-arrow-right"></i></span>
                        </a>
                      </div>
                    </div>
                  `;
        
                  container.appendChild(col);
                });
              })
              .catch(err => {
                container.innerHTML = `<p>Yayınlar yüklenemedi.</p>`;
                console.error("Yayınlar API hatası:", err);
              });
          }
        
          loadYayinlar();
        });
        
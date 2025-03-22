// featured-slider.js

async function loadFeaturedSlider() {
          const container = document.querySelector(".slider-active-1");
          if (!container) return;
        
          try {
            const lang = localStorage.getItem("lang") || "tr";
            const response = await fetch(`${BASE_URL}/featured/?lang=${lang}`);
            if (!response.ok) throw new Error("Slider verisi alinamadi");
        
            const data = await response.json();
        
            container.innerHTML = ""; // Var olan slider'ı temizle
        
            data.forEach(item => {
              const url = item.type === "blog"
                ? `blog-single.html?slug=${item.slug}`
                : `koseyazisi-single.html?slug=${item.slug}`;
        
              const slide = document.createElement("div");
              slide.className = "vl-hero-slider vl-hero-bg";
              slide.style.backgroundImage = `url(${item.image})`;
        
              slide.innerHTML = `
                <div class="vl-hero-shape shape-1">
                  <img src="assets/img/shape/vl-hero-shape-1.1.png" alt="">
                </div>
                <div class="vl-hero-shape shape-2">
                  <img src="assets/img/shape/vl-hero-shape-1.2.png" alt="">
                </div>
                <div class="vl-hero-social d-none d-lg-block">
                  <h4 class="title">Takip Edin:</h4>
                  <div class="vl-hero-social-icon">
                    <ul>
                      <li><a href="#"><i class="fa-brands fa-facebook-f"></i></a></li>
                      <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                      <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                      <li><a href="#"><i class="fa-brands fa-youtube"></i></a></li>
                    </ul>
                  </div>
                </div>
                <div class="container">
                  <div class="row">
                    <div class="col-lg-7">
                      <div class="vl-hero-section-title">
                        <h5 class="vl-subtitle">
                          <span><img src="assets/img/icons/vl-sub-title-icon.svg" alt=""></span> Featured Content
                        </h5>
                        <h1 class="vl-title text-anime-style-3">${item.title}</h1>
                        <p>${item.content_summary}</p>
                        <div class="vl-hero-btn">
                          <a href="${url}" class="header-btn1">Devamını Oku <span><i class="fa-solid fa-arrow-right"></i></span></a>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-5"></div>
                  </div>
                </div>
              `;
        
              container.appendChild(slide);
            });
        
            // Slider plugin yeniden başlatılmalı (örn: Slick, Swiper vs.)
            // $('.slider-active-1').slick('refresh'); veya benzeri kod burada çalıştırılabilir
        
          } catch (err) {
            console.error("Slider verisi alinirken hata olustu:", err);
          }
        }
        
        document.addEventListener("DOMContentLoaded", loadFeaturedSlider);
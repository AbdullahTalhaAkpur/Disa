// blog.js

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("blog-list");
  const paginationContainer = document.querySelector(".theme-pagination ul");

  function loadBlogs(page = 1) {
    container.innerHTML = "<p>Yükleniyor...</p>";

    API.getBlogsPaginated(page).then(data => {
      const blogs = data.results || [];
      container.innerHTML = "";

      if (blogs.length === 0) {
        container.innerHTML = "<p>Hiç blog bulunamadı.</p>";
        return;
      }

      blogs.forEach(item => {
        const card = document.createElement("div");
        card.className = "col-lg-4 col-md-6";
        card.innerHTML = `
          <div class="vl-single-blg-item mb-30">
            <div class="vl-blg-thumb">
              <a href="blog-single.html?slug=${item.slug}">
                <img class="w-100" src="${item.image || 'assets/img/blog/placeholder.png'}" alt="${item.title}">
              </a>
            </div>
            <div class="vl-meta">
              <ul>
                <li><a href="#"><span class="top-minus"><img src="assets/img/icons/vl-calender-1.1.svg" alt=""></span> ${new Date(item.created_at).toLocaleDateString("tr-TR")}</a></li>
                <li><a href="#"><span class="top-minus"><img src="assets/img/icons/vl-user-1.1.svg" alt=""></span> ${item.author || ''}</a></li>
              </ul>
            </div>
            <div class="vl-blg-content">
              <h3 class="title"><a href="blog-single.html?slug=${item.slug}">${item.title}</a></h3>
              <p>${item.content_summary || '...'}</p>
              <a href="blog-single.html/tr/${item.slug}" class="read-more">Devamını Oku <span><i class="fa-solid fa-arrow-right"></i></span></a>
            </div>
          </div>
        `;
        container.appendChild(card);
      });

      const totalPages = Math.ceil(data.count / blogs.length);
      paginationContainer.innerHTML = "";

      if (page > 1) {
        paginationContainer.innerHTML += `<li><a href="#" data-page="${page - 1}"><i class="fa-solid fa-angle-left"></i></a></li>`;
      }

      for (let i = 1; i <= totalPages; i++) {
        paginationContainer.innerHTML += `<li><a href="#" data-page="${i}" class="${i === page ? 'active' : ''}">${String(i).padStart(2, '0')}</a></li>`;
      }

      if (page < totalPages) {
        paginationContainer.innerHTML += `<li><a href="#" data-page="${page + 1}"><i class="fa-solid fa-angle-right"></i></a></li>`;
      }

      paginationContainer.querySelectorAll("a[data-page]").forEach(link => {
        link.addEventListener("click", e => {
          e.preventDefault();
          const newPage = parseInt(e.target.closest("a").getAttribute("data-page"));
          loadBlogs(newPage);
        });
      });

    }).catch(err => {
      container.innerHTML = `<p>Blog verileri yüklenemedi.</p>`;
      console.error("Blog API hatası:", err);
    });
  }

  loadBlogs();
});

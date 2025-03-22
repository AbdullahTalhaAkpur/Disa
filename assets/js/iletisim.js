// iletisim.js

document.addEventListener("DOMContentLoaded", () => {
          API.getIletisim()
            .then(data => {
              document.getElementById("iletisim-email").href = `mailto:${data.email}`;
              document.getElementById("iletisim-email").textContent = data.email;
        
              document.getElementById("iletisim-tel").href = `tel:${data.telefon}`;
              document.getElementById("iletisim-tel").textContent = data.telefon;
        
              document.getElementById("iletisim-tel2").href = `tel:${data.telefon_2}`;
              document.getElementById("iletisim-tel2").textContent = data.telefon_2;
        
              document.getElementById("iletisim-adres").textContent = data.adres;
        
              document.getElementById("iletisim-facebook").href = data.facebook;
              document.getElementById("iletisim-instagram").href = data.instagram;
              document.getElementById("iletisim-twitter").href = data.twitter;
              document.getElementById("iletisim-youtube").href = data.youtube;
              document.getElementById("iletisim-linkedin").href = data.linkedin;
            })
            .catch(err => {
              console.error("İletişim verisi yüklenemedi:", err);
            });
        });
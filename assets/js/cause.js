// cause.js - Tüzük verisini API'den çekip görüntüle

async function loadTuzuk() {
          try {
            const response = await fetch("http://127.0.0.1:8000/tuzuk/");
            if (!response.ok) throw new Error("Tüzük verisi alınamadı");
        
            const data = await response.json();
        
            const container = document.getElementById("tuzuk-content");
            container.innerHTML = data.content; // HTML formatında old. için innerHTML
          } catch (err) {
            console.error("Tüzük verisi hatası:", err);
            document.getElementById("tuzuk-content").innerHTML = "<p>Tüzük verisi yüklenemedi.</p>";
          }
        }
        
        document.addEventListener("DOMContentLoaded", loadTuzuk);
        
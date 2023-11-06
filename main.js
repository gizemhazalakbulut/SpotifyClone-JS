import { API } from "./scripts/api.js";
import {
  ele,
  renderCards,
  renderLoader,
  renderPlayingInfo,
} from "./scripts/ui.js";

// class'ın bir örneğini oluşturma
const api = new API();

document.addEventListener("DOMContentLoaded", async () => {
  renderLoader();
  await api.getPopuler();
  renderCards(api.songs);
});

// müzik listesindeki tıklanma olaylarını izler
ele.list.addEventListener("click", (e) => {
  if (e.target.id === "play-btn") {
    // oynat butonuna en yakın olan .card classına
    // sahip elemanı alma
    const parent = e.target.closest(".card");

    // müziğin bilgilerini ekrana basma
    renderPlayingInfo(parent.dataset);
  }
});

// arama formu gönderildiğinde
ele.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // aratılan terime erişme
  const query = e.target[0].value;

  // form boşsa fonk. durur
  if (!query) return;

  // ekrana loading basma
  renderLoader();

  // başlığı güncelleme
  ele.title.innerHTML = `${query} İçin Sonuçlar`;

  // api'den şarkıları alma
  api.searchMusic(query);
});

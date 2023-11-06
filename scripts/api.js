// api işlemleri

import { url, options } from "./constant.js";
import { renderCards } from "./ui.js";

export class API {
  constructor() {
    this.songs = [];
  }

  // popüler müzikler için istek atma
  async getPopuler() {
    try {
      // api isteği atar
      const res = await fetch(url, options);
      const data = await res.json();
      // class'ta tuttuğumuz değişkeni günceller
      this.songs = data.tracks;
    } catch (error) {
      console.log("Popüler verileri alırken hata oluştu.", error);
    }
  }

  // aratılan içeriğe erişme
  async searchMusic(query) {
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}&locale=TR&offset=0&limit=20`,
      options
    );
    const data = await res.json();

    // bize gelen diziyi işliycez
    // objelerin içerisindeki track katmanını aradan kaldırıcaz
    //console.log(data.tracks.hits);

    const newData = data.tracks.hits.map((song) => ({
      ...song.track,
    }));

    // müzikleri ekrana basma
    renderCards(newData);
  }
}

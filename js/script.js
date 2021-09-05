/* Descrizione:
Attraverso una chiamata ajax all’API di boolean:
https://flynn.boolean.careers/exercises/api/array/music
avremo a disposizione una decina di dischi musicali.
Utilizzando vue, stampiamo a schermo una card per ogni album.
in allegato la cartellina col template fatto insieme e uno screen del risultato richiesto
BONUS:
Ordinare i dischi per anno di uscita.
Creare una select con tutti i generi dei dischi. In base a cosa scegliamo nella select, vedremo i corrispondenti cd. */

console.log("Ok Vue", Vue);
Vue.config.devtools = true;

const app = new Vue({
  el: "#app",
  data: {
    albums: [],
    selectedGenre: "All",
  },
  computed: {
    orderedAlbums() {
      return this.albums.sort((a, b) => {
        return a.year - b.year;
      });
    },
    genresList() {
      const genresList = [];
      this.albums.forEach((album) => {
        if (!genresList.includes(album.genre)) genresList.push(album.genre);
        });
      return genresList.sort();
    },
    filteredAlbums() {
      const albums = this.orderedAlbums;
      if (this.selectedGenre === "All") return albums;
      return albums.filter((album) => {
        return album.genre === this.selectedGenre;
      })
    }
  },
  methods: {},
  created() {
    axios
      .get("https://flynn.boolean.careers/exercises/api/array/music")
      .then((res) => {
        this.albums = res.data.response;
      });
  },
});

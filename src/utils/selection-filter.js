export default function selectionFilter({
  series,
  films,
  home,
  watchList,
} = []) {
  return {
    home: [
      {
        title: "Drama",
        data: films
          ?.filter((item) => item.genre === "drama")
          .map((item) => {
            item.id = Math.random();
            item.src = `/images/films/${item.genre}/${item.slug}/small.jpg`;
            return item;
          }),
      },
      {
        title: "Thriller",
        data: films
          ?.filter((item) => item.genre === "thriller")
          .map((item) => {
            item.id = Math.random();
            item.src = `/images/films/${item.genre}/${item.slug}/small.jpg`;
            return item;
          }),
      },
      {
        title: "Children",
        data: films
          ?.filter((item) => item.genre === "children")
          .map((item) => {
            item.id = Math.random();
            item.src = `/images/films/${item.genre}/${item.slug}/small.jpg`;
            return item;
          }),
      },
      {
        title: "Suspense",
        data: films
          ?.filter((item) => item.genre === "suspense")
          .map((item) => {
            item.id = Math.random();
            item.src = `/images/films/${item.genre}/${item.slug}/small.jpg`;
            return item;
          }),
      },
      {
        title: "Romance",
        data: films
          ?.filter((item) => item.genre === "romance")
          .map((item) => {
            item.id = Math.random();
            item.src = `/images/films/${item.genre}/${item.slug}/small.jpg`;
            return item;
          }),
      },
      {
        title: "Documentaries",
        data: series
          ?.filter((item) => item.genre === "documentaries")
          .map((item) => {
            item.id = Math.random();
            item.src = `/images/series/${item.genre}/${item.slug}/small.jpg`;
            return item;
          }),
      },
      {
        title: "Comedies",
        data: series
          ?.filter((item) => item.genre === "comedies")
          .map((item) => {
            item.id = Math.random();
            item.src = `/images/series/${item.genre}/${item.slug}/small.jpg`;
            return item;
          }),
      },

      {
        title: "Crime",
        data: series
          ?.filter((item) => item.genre === "crime")
          .map((item) => {
            item.id = Math.random();
            item.src = `/images/series/${item.genre}/${item.slug}/small.jpg`;
            return item;
          }),
      },
      {
        title: "Feel Good",
        data: series
          ?.filter((item) => item.genre === "feel-good")
          .map((item) => {
            item.id = Math.random();
            item.src = `/images/series/${item.genre}/${item.slug}/small.jpg`;
            return item;
          }),
      },
    ],
    series: [
      {
        title: "Documentaries",
        data: series
          ?.filter((item) => item.genre === "documentaries")
          .map((item) => {
            item.src = `/images/series/${item.genre}/${item.slug}/small.jpg`;
            return item;
          }),
      },
      {
        title: "Comedies",
        data: series
          ?.filter((item) => item.genre === "comedies")
          .map((item) => {
            item.src = `/images/series/${item.genre}/${item.slug}/small.jpg`;
            return item;
          }),
      },
      {
        title: "Children",
        data: series
          ?.filter((item) => item.genre === "children")
          .map((item) => {
            item.src = `/images/series/${item.genre}/${item.slug}/small.jpg`;
            return item;
          }),
      },
      {
        title: "Crime",
        data: series
          ?.filter((item) => item.genre === "crime")
          .map((item) => {
            item.src = `/images/series/${item.genre}/${item.slug}/small.jpg`;
            return item;
          }),
      },
      {
        title: "Feel Good",
        data: series
          ?.filter((item) => item.genre === "feel-good")
          .map((item) => {
            item.src = `/images/series/${item.genre}/${item.slug}/small.jpg`;
            return item;
          }),
      },
    ],
    films: [
      {
        title: "Drama",
        data: films
          ?.filter((item) => item.genre === "drama")
          .map((item) => {
            item.src = `/images/films/${item.genre}/${item.slug}/small.jpg`;
            return item;
          }),
      },
      {
        title: "Thriller",
        data: films
          ?.filter((item) => item.genre === "thriller")
          .map((item) => {
            item.src = `/images/films/${item.genre}/${item.slug}/small.jpg`;
            return item;
          }),
      },
      {
        title: "Children",
        data: films
          ?.filter((item) => item.genre === "children")
          .map((item) => {
            item.src = `/images/films/${item.genre}/${item.slug}/small.jpg`;
            return item;
          }),
      },
      {
        title: "Suspense",
        data: films
          ?.filter((item) => item.genre === "suspense")
          .map((item) => {
            item.src = `/images/films/${item.genre}/${item.slug}/small.jpg`;
            return item;
          }),
      },
      {
        title: "Romance",
        data: films
          ?.filter((item) => item.genre === "romance")
          .map((item) => {
            item.src = `/images/films/${item.genre}/${item.slug}/small.jpg`;
            return item;
          }),
      },
    ],
    watchList: [],
  };
}

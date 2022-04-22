export default function selectionFilter({ series, films } = []) {
  const arrayHashmap = (originalArray) => {
    let newArray = [];
    return originalArray.forEach((item) => {
      var newItem = { genre: item.genre, data: [] };
      originalArray.forEach((innerItem) => {
        if (innerItem.genre == item.genre) {
          newItem.data = newItem.data.concat(innerItem);
        }
      });
      newArray.push(newItem);
    });
  };
  return {
    series: [
      // arrayHashmap(series),
      {
        title: "Documentaries",
        data: series?.filter((item) => item.genre === "documentaries"),
      },
      {
        title: "Comedies",
        data: series?.filter((item) => item.genre === "comedies"),
      },
      {
        title: "Children",
        data: series?.filter((item) => item.genre === "children"),
      },
      {
        title: "Crime",
        data: series?.filter((item) => item.genre === "crime"),
      },
      {
        title: "Feel Good",
        data: series?.filter((item) => item.genre === "feel-good"),
      },
    ],
    films: [
      { title: "Drama", data: films?.filter((item) => item.genre === "drama") },
      {
        title: "Thriller",
        data: films?.filter((item) => item.genre === "thriller"),
      },
      {
        title: "Children",
        data: films?.filter((item) => item.genre === "children"),
      },
      {
        title: "Suspense",
        data: films?.filter((item) => item.genre === "suspense"),
      },
      {
        title: "Romance",
        data: films?.filter((item) => item.genre === "romance"),
      },
    ],
  };
}

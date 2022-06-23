import React from "react";
import { BrowseContainer } from "../containers/browse";
import { useContent } from "../hooks";
import { selectionFilter } from "../utils";

export default function Browse() {
  const { series } = useContent("series");
  const { films } = useContent("films");
  const { home } = useContent("home");
  const { watchList } = useContent("watchList");
  const slides = selectionFilter({ series, films, home, watchList });

  return (
    <>
      <BrowseContainer slides={slides} />
    </>
  );
}

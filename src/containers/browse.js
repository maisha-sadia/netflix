import React, { useState, useEffect, useContext } from "react";
import Fuse from "fuse.js";
import { Card, Header, Loading, Player } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../logo.svg";
import { FirebaseContext } from "../context/firebase";
import { ProfileSelectionContainer } from "./profiles";
import { FooterContainer } from "./footer";
import { db } from "../lib/firebase.prod";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";

export function BrowseContainer({ slides }) {
  const [category, setCategory] = useState("home");
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [slideRows, setSlideRows] = useState([]);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const { Firebase } = useContext(FirebaseContext);
  const user = Firebase.auth().currentUser || {};
  const movie = movies
    ? movies[Math.floor(Math.random() * movies.length)]
    : null;
  let data = slideRows ? slideRows.map((item) => item.data) : [];
  data = [].concat.apply([], data);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [profile.displayName]);

  useEffect(() => {
    setSlideRows(slides[category]);
  }, [slides, category]);

  useEffect(() => {
    const fuse = new Fuse(slideRows, {
      keys: ["data.description", "data.title", "data.genre"],
    });
    const results = fuse.search(searchTerm).map(({ item }) => item);

    if (slideRows.length > 0 && searchTerm.length > 3 && results.length > 0) {
      setSlideRows(results);
    } else {
      setSlideRows(slides[category]);
    }
  }, [searchTerm]);

  useEffect(() => {
    setMovies(data);
  }, [category]);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setSavedMovies(doc.data()?.watchList);
    });
  }, [user?.email]);
  const movieRef = doc(db, "users", `${user?.email}`);

  const deleteShow = async (passedID) => {
    try {
      const result = savedMovies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        watchList: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return profile.displayName ? (
    <>
      {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}
      {category === "home" ? (
        <Header
          src={
            movie
              ? `/images/${movie.category}/${movie.genre}/${movie.slug}/small.jpg`
              : "joker1"
          }
          dontShowOnSmallViewPort
        >
          <Header.Frame>
            <Header.Group>
              <Header.Logo to={ROUTES.HOME} src={logo} alt="Netflix" />

              <Header.TextLink
                active={category === "series" ? "true" : "false"}
                onClick={() => setCategory("series")}
              >
                Series
              </Header.TextLink>
              <Header.TextLink
                active={category === "films" ? "true" : "false"}
                onClick={() => setCategory("films")}
              >
                Films
              </Header.TextLink>
              <Header.TextLink
                active={category === "watchList" ? "true" : "false"}
                onClick={() => setCategory("watchList")}
              >
                Watch List
              </Header.TextLink>
            </Header.Group>
            <Header.Group>
              <Header.Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              <Header.Profile>
                <Header.Picture src={user.photoURL} />
                <Header.Dropdown>
                  <Header.Group>
                    <Header.Picture src={user.photoURL} />
                    <Header.TextLink>{user.displayName}</Header.TextLink>
                  </Header.Group>
                  <Header.Group>
                    <Header.TextLink onClick={() => Firebase.auth().signOut()}>
                      Sign out
                    </Header.TextLink>
                  </Header.Group>
                </Header.Dropdown>
              </Header.Profile>
            </Header.Group>
          </Header.Frame>
          <Header.Feature>
            <Header.FeatureCallOut>
              {movie ? movie.title : "Joker"}
            </Header.FeatureCallOut>
            <Header.Text>
              {" "}
              {movie
                ? movie.description
                : `Forever alone in a crowd, failed comedian Arthur Fleck seeks
            connection as he walks the streets of Gotham City. Arthur wears two
            masks -- the one he paints for his day job as a clown, and the guise
            he projects in a futile attempt to feel like he's part of the world
            around him.`}
            </Header.Text>
            <Player>
              <Player.Button />
              <Player.Video src="/videos/bunny.mp4" />
            </Player>
          </Header.Feature>
        </Header>
      ) : (
        <Header bg={false}>
          <Header.Frame>
            <Header.Group>
              <Header.Logo to={ROUTES.HOME} src={logo} alt="Netflix" />
              <Header.TextLink
                active={category === "home" ? "true" : "false"}
                onClick={() => setCategory("home")}
              >
                Home
              </Header.TextLink>
              <Header.TextLink
                active={category === "series" ? "true" : "false"}
                onClick={() => setCategory("series")}
              >
                Series
              </Header.TextLink>
              <Header.TextLink
                active={category === "films" ? "true" : "false"}
                onClick={() => setCategory("films")}
              >
                Films
              </Header.TextLink>
              <Header.TextLink
                active={category === "watchList" ? "true" : "false"}
                onClick={() => setCategory("watchList")}
              >
                Watch List
              </Header.TextLink>
            </Header.Group>
            <Header.Group>
              <Header.Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              <Header.Profile>
                <Header.Picture src={user.photoURL} />
                <Header.Dropdown>
                  <Header.Group>
                    <Header.Picture src={user.photoURL} />
                    <Header.TextLink>{user.displayName}</Header.TextLink>
                  </Header.Group>
                  <Header.Group>
                    <Header.TextLink onClick={() => Firebase.auth().signOut()}>
                      Sign out
                    </Header.TextLink>
                  </Header.Group>
                </Header.Dropdown>
              </Header.Profile>
            </Header.Group>
          </Header.Frame>
        </Header>
      )}

      {category !== "watchList" ? (
        <Card.Group>
          {slideRows.map((slideItem) => (
            <Card key={`${category}-${slideItem.title.toLowerCase()}`}>
              <Card.Title>{slideItem.title}</Card.Title>
              <Card.Entities>
                {slideItem.data.map((item) => (
                  <Card.Item key={item.docId} item={item}>
                    <Card.Image
                      src={
                        category === "home"
                          ? item.src
                          : `/images/${category}/${item.genre}/${item.slug}/small.jpg`
                      }
                    />
                    <Card.Meta>
                      <Card.SubTitle>{item.title}</Card.SubTitle>
                      <Card.Text>{item.description}</Card.Text>
                    </Card.Meta>
                  </Card.Item>
                ))}
              </Card.Entities>
              <Card.Feature category={category}>
                <Player>
                  <Player.Button />
                  <Player.Video src="/videos/bunny.mp4" />
                </Player>
              </Card.Feature>
            </Card>
          ))}
        </Card.Group>
      ) : (
        <Card.Group>
          {savedMovies
            ? savedMovies.map((slideItem) => (
                <Card key={`${slideItem.id}-${slideItem.title.toLowerCase()}`}>
                  <Card.Title>{slideItem.title}</Card.Title>
                  <Card.Entities>
                    <Card.Item key={slideItem.id} item={slideItem}>
                      <Card.Image src={slideItem.src} />
                      <button
                        onClick={() => deleteShow(slideItem.id)}
                        className="absolute text-red-300 top-4 right-4"
                      >
                        Remove
                      </button>
                    </Card.Item>
                  </Card.Entities>
                </Card>
              ))
            : null}
        </Card.Group>
      )}

      <FooterContainer />
    </>
  ) : (
    <ProfileSelectionContainer user={user} setProfile={setProfile} />
  );
}

import React, { useState, useContext, createContext } from "react";

import {
  Container,
  Group,
  Title,
  SubTitle,
  Text,
  Feature,
  FeatureTitle,
  FeatureText,
  FeatureClose,
  Maturity,
  Content,
  Meta,
  Entities,
  Item,
  Image,
} from "./styles/card";

import { arrayUnion, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { db } from "../../lib/firebase.prod";
import { FirebaseContext } from "../../context/firebase";
import { useEffect } from "react";

export const FeatureContext = createContext();
export const LikeContext = createContext();

export default function Card({ children, ...restProps }) {
  const [showFeature, setShowFeature] = useState(false);
  const [itemFeature, setItemFeature] = useState({});
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <FeatureContext.Provider
      value={{
        showFeature,
        setShowFeature,
        itemFeature,
        setItemFeature,
        like,
        setLike,
      }}
    >
      <Container {...restProps}>{children}</Container>
    </FeatureContext.Provider>
  );
}

Card.Group = function CardGroup({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>;
};

Card.Title = function CardTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Card.SubTitle = function CardSubTitle({ children, ...restProps }) {
  return <SubTitle {...restProps}>{children}</SubTitle>;
};

Card.Text = function CardText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Card.Entities = function CardEntities({ children, ...restProps }) {
  return <Entities {...restProps}>{children}</Entities>;
};

Card.Meta = function CardMeta({ children, ...restProps }) {
  return <Meta {...restProps}>{children}</Meta>;
};

Card.Item = function CardItem({ item, children, ...restProps }) {
  const { setShowFeature, setItemFeature } = useContext(FeatureContext);
  return (
    <Item
      onClick={() => {
        setItemFeature(item);
        setShowFeature(true);
      }}
      {...restProps}
    >
      {children}
    </Item>
  );
};

Card.Image = function CardImage({ ...restProps }) {
  return <Image {...restProps} />;
};

Card.Feature = function CardFeature({ children, category, ...restProps }) {
  const { Firebase } = useContext(FirebaseContext);
  const [saved, setSaved] = useState(false);
  const [movies, setMovies] = useState(false);

  const user = Firebase.auth().currentUser || {};
  const { showFeature, itemFeature, setShowFeature } =
    useContext(FeatureContext);
  const { like, setLike } = useContext(FeatureContext);
  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        watchList: arrayUnion({
          id: itemFeature.id,
          title: itemFeature.title,
          src: itemFeature.src,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.watchList);
    });
  }, [user?.email]);
  if (movies) {
    if (movies.filter((g) => g.id === itemFeature.id).length > 0) {
      setLike(true);
    } else {
      setLike(false);
    }
  }

  return showFeature ? (
    <Feature
      {...restProps}
      src={`/images/${category}/${itemFeature.genre}/${itemFeature.slug}/large.jpg`}
    >
      <Content>
        <FeatureTitle>{itemFeature.title}</FeatureTitle>
        <FeatureText>{itemFeature.description}</FeatureText>
        <FeatureClose onClick={() => setShowFeature(false)}>
          <img src="/images/icons/close.png" alt="Close" />
        </FeatureClose>

        <Group margin="30px 0" flexDirection="row" alignItems="center">
          <Maturity rating={itemFeature.maturity}>
            {itemFeature.maturity < 12 ? "PG" : itemFeature.maturity}
          </Maturity>
          <FeatureText fontWeight="bold">
            {itemFeature.genre.charAt(0).toUpperCase() +
              itemFeature.genre.slice(1)}
          </FeatureText>
          <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
            <button onClick={saveShow}>
              Like
              {like ? (
                <FaHeart className="absolute top-4 left-4 text-gray-300" />
              ) : (
                <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
              )}
            </button>
          </div>
        </Group>

        {children}
      </Content>
    </Feature>
  ) : null;
};

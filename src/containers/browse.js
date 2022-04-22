import { useState, useContext, useEffect } from "react";
import { Card, Header, Loading } from "../components";
import { FirebaseContext } from "../context/firebase";
import { ProfileSelectionContainer } from "./profiles";
import * as ROUTES from "../constants/routes";
import logo from "../logo.svg";

export function BrowseContainer({ slides }) {
  const [Category, setCategory] = useState("series");
  const [SearchTerm, setSearchTerm] = useState();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState({});
  const [SlideRows, setSlideRows] = useState([]);

  const { Firebase } = useContext(FirebaseContext);
  const user = Firebase.auth().currentUser || {};

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [profile.displayName]);

  useEffect(() => {
    setSlideRows(slides[Category]);
  }, [slides, Category]);

  return profile.displayName ? (
    <>
      {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}
      <Header src="joker1">
        <Header.Frame>
          <Header.Group>
            <Header.Logo to={ROUTES.HOME} src={logo} alt="Netfilx Logo" />
            <Header.TextLink>Series</Header.TextLink>
            <Header.TextLink>Films</Header.TextLink>
          </Header.Group>
          <Header.Group>
            <Header.Search
              searchTerm={SearchTerm}
              setSearchTerm={setSearchTerm}
            />
            <Header.Profile>
              <Header.Picture src={user.photoURL} alt="Profile picture" />
              <Header.Dropdown>
                <Header.Group>
                  <Header.Picture src={user.photoURL} alt="Profile picture" />
                  <Header.TextLink>{user.displayName}</Header.TextLink>
                </Header.Group>
                <Header.Group>
                  <Header.TextLink onClick={() => Firebase.auth().signOut()}>
                    Sign Out
                  </Header.TextLink>
                </Header.Group>
              </Header.Dropdown>
            </Header.Profile>
          </Header.Group>
        </Header.Frame>
        <Header.Feature>
          <Header.FeatureCallOut>Watch Joker Now</Header.FeatureCallOut>
          <Header.Text>
            Compiled successfully! You can now view netflix in the browser.
            Local: http://localhost:3000 On Your Network:
            http://192.168.0.167:3000 Note that the development build is not
            optimized. To create a production build, use npm run build. assets
            by status 3.18 MiB [cached] 2 assets assets by path . 680 bytes
            asset index.html 402 bytes [emitted] asset asset-manifest.json 278
            bytes [emitted] cached modules 2.94 MiB (javascript) 28.1 KiB
            (runtime) [cached] 190 modules ./src/containers/browse.js 3.35 KiB
            [built] webpack 5.69.1 compiled successfully in 115 ms
          </Header.Text>
          <Header.PlayButton>Play</Header.PlayButton>
        </Header.Feature>
      </Header>
      <Card.Group></Card.Group>
    </>
  ) : (
    <ProfileSelectionContainer user={user} setProfile={setProfile} />
  );
}

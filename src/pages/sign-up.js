import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../context/firebase";
import { Form } from "../components";
import { HeaderContainer } from "../containers/header";
import { FooterContainer } from "../containers/footer";
import * as ROUTES from "../constants/routes";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase.prod";

export default function SignUp() {
  const history = useNavigate();
  const { Firebase } = useContext(FirebaseContext);

  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid =
    password === "" || email === "" || forename === "" || surname === "";

  const handleSignUp = (event) => {
    event.preventDefault();

    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) =>
        result.user
          .updateProfile({
            displayName: forename + " " + surname,
            photoURL: Math.floor(Math.random() * 5) + 1,
          })
          .then(() => {
            history(ROUTES.BROWSE);
          })
      )
      .catch((error) => {
        setForename("");
        setSurname("");
        setEmail("");
        setPassword("");
        setError(error.message);
      });
    setDoc(doc(db, "users", email), { watchList: [] });
  };

  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign Up</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}
          <Form.Base onSubmit={handleSignUp} method="POST">
            <Form.Input
              placeholder="First name"
              value={forename}
              onChange={({ target }) => setForename(target.value)}
            />
            <Form.Input
              placeholder="Surname name"
              value={surname}
              onChange={({ target }) => setSurname(target.value)}
            />
            <Form.Input
              placeholder="Email address"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <Form.Input
              type="password"
              value={password}
              autoComplete="off"
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <Form.Submit
              disabled={isInvalid}
              type="submit"
              data-testid="sign-up"
            >
              Sign Up
            </Form.Submit>
          </Form.Base>

          <Form.Text>
            Already a user? <Form.Link to="/signin">Sign in now.</Form.Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. Learn more.
          </Form.TextSmall>
        </Form>
      </HeaderContainer>
      <FooterContainer />
    </>
  );
}

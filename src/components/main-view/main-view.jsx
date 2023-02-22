import { useState, useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);




  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://my-movies-rushdi.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            image: doc.ImageURL,
            description: doc.Description,
            releaseYear: doc.ReleaseYear,
            genre: {
              name: doc.Genre.Name,
              description: doc.Genre.Description,
            },
            director: {
              name: doc.Director.Name,
              bio: doc.Director.Bio,
              birth: doc.Director.Birth,
              death: doc.Director.Death,
            },
          };
        });

        setMovies(moviesFromApi);

      });
  }, [token]);

  return (
    <BrowserRouter >
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }} />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col xs={8} sm={6} md={6} lg={3}>
                    <MovieView movies={movies}
                      user={user} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4 moviemaincard" key={movie.id} xs={8} sm={6} md={4} lg={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : user.length === 0 ? (
                  <Col>No such user found!</Col>
                ) : (
                  <Col xs={6} sm={6} md={6} lg={6}>
                    <ProfileView user={user} movies={movies} />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
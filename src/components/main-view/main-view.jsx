import { useState, useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { SignupView } from "../signup-view/signup-view";


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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
            genre: doc.Genre.Name
          };
        });

        setMovies(moviesFromApi);

      });
  }, [token]);


  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <div>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >Logout</button>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}>
          Logout
        </button>
        <div>The list is empty!</div>
      </div>
    );
  }

  return (
    <>
      {
        movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))
      }
    </>
  );

};

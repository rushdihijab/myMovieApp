import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MovieCard } from "../movie-card/movie-card";
import Col from 'react-bootstrap/Col';

export const ProfileView = (props) => {
    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const favMovies = props.movies.filter((movie) => favoriteMovies.includes(movie.id));

    console.log("favMovies", favMovies)

    useEffect(() => {
        fetch(`https://my-movies-rushdi.herokuapp.com/users/${props.user.Username}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setFavoriteMovies(data.FavoriteMovies);
                console.log("Favorite movies:", data.FavoriteMovies);
            })
            .catch((error) => console.log(error));
    }, [props.user.Username, token]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,

        };


        fetch("https://my-movies-rushdi.herokuapp.com/users/" + props.user.Username, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
            },
        }).then((response) => {
            console.log(response);
            if (response.ok) {
                alert("Update successful");
            } else {
                alert("Update failed");
            }
        });
    };

    const handleDeregister = () => {
        fetch("https://my-movies-rushdi.herokuapp.com/users/" + props.user.Username, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.ok) {
                alert("Account successfully deleted");
                setToken(null);
                localStorage.clear();
            } else {
                alert("Something went wrong");
            }
        });
    };

    return (
        <div className="formset">
            <div className="profile-info">
                <h1>Profile-Info</h1>
                <div className="user-info">
                    <span className="label">Username: </span>
                    <span className="value">{props.user.Username}</span>
                </div>
                <div className="user-info">
                    <span className="label">Email: </span>
                    <span className="value">{props.user.Email}</span>
                </div>
            </div>
            <h1>Update form</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="signUpFormUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="signUpFormPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="signUpFormEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="signUpFormBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control type="date" placeholder="MM/DD/YYYY" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">Update</Button>
                <Button variant="danger" onClick={handleDeregister}>Deregister</Button>
            </Form>

            <h1>Favorite Movies</h1>
            <div className="favorite-movies">
                <div>
                    {favMovies.map((movie) => (
                        <MovieCard
                            key={movie._id}
                            movie={movie}
                        />
                    ))}
                </div>

            </div>

        </div >
    );

};
// export const ProfileView = ({ user, movies }) => {
//     const [favoriteMovies, setFavoriteMovies] = useState([]);

//     useEffect(() => {
//         const fetchUser = async () => {
//             const response = await fetch(
//                 `https://my-movies-rushdi.herokuapp.com/users/${user.Username}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 }
//             );
//             const userData = await response.json();
//             const favoriteMovieIds = userData.FavoriteMovies;
//             const favoriteMovies = movies.filter((m) =>
//                 favoriteMovieIds.includes(m._id)
//             );
//             setFavoriteMovies(favoriteMovies);
//         };
//         fetchUser();
//     }, [user, movies]);

//     const handleAddFavorite = async (movieId) => {
//         const response = await fetch(
//             `https://my-movies-rushdi.herokuapp.com/users/${user.Username}/movies/${movieId}`,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             }
//         );
//         if (response.ok) {
//             alert("Movie added to favorites");
//         } else {
//             alert("Failed to add movie to favorites");
//         }
//     };

//     return (
//         <div>
//             <h1>Favorite Movies</h1>
//             <div>
//                 {favoriteMovies.map((movie) => (
//                     <MovieCard
//                         key={movie._id}
//                         movie={movie}
//                         onAddFavorite={handleAddFavorite}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };


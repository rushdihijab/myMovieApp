import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MovieCard } from "../movie-card/movie-card";
import Col from 'react-bootstrap/Col';

export const ProfileView = ({ movies }) => {
    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [birthday, setBirthday] = useState();
    let favoriteMovies = movies.filter((m) =>
        user.FavoriteMovies.includes(m.id)
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,

        };


        fetch("https://my-movies-rushdi.herokuapp.com/users/" + user.Username, {
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
                window.location.reload();

            } else {
                alert("Update failed");
            }
        });
    };
    const handleDeregister = () => {
        fetch("https://my-movies-rushdi.herokuapp.com/users/" + user.Username, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.ok) {
                alert("Account successfully deleted");
                window.location.reload();
                setUser(null);
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
                    <span className="value">{user.Username}</span>
                </div>
                <div className="user-info">
                    <span className="label">Email: </span>
                    <span className="value">{user.Email}</span>
                </div>
            </div>
            <h1>Update form</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="signUpFormUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="5"
                        placeholder="Enter a name"
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter a password"
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter a email"
                    />
                </Form.Group>

                <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                        placeholder="Enter a birthday"
                    />
                </Form.Group>
                <div>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>

                <div><Button
                    onClick={() => handleDeregister(user._id)}
                    className="button-delete"
                    type="submit"
                    variant="danger"
                >
                    Delete Account
                </Button>
                </div>
            </Form>
            <>
                <p>Favorite Movies:</p>
                <ul>
                    {favoriteMovies.map(movie => (
                        <li key={movie._id}>{movie.title}
                        </li>

                    ))}
                </ul>
            </>
        </div >
    );
};

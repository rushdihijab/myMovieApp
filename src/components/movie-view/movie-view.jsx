import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from "react";
import "./movie-view.scss"


export const MovieView = ({ movies }) => {

    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);

    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [token] = useState(storedToken ? storedToken : null);
    const [user] = useState(storedUser ? storedUser : null);


    const handleFavorite = () => {
        fetch("https://my-movies-rushdi.herokuapp.com/users/" + user.Username + "/movies/" + movie.id, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((response) => {
            console.log(response);
            if (response.ok) {
                alert("Add movie to favorite");
                window.location.reload();
            } else {
                alert("add movie failed");
            }
        });
    };
    const handleRemoveFavorite = () => {
        fetch("https://my-movies-rushdi.herokuapp.com/users/" + user.Username + "/movies/" + movie.id, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Removed from favorites");
            } else {
                alert("Something went wrong");
            }
        });
    };


    return (

        <Container className="cardset; content">
            <Row>
                <Card bg="dark" text="light">
                    <Card.Header>
                        <div className="title text-center">
                            <span> {movie && movie.title} </span>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div>
                            <div>
                                <Card.Img
                                    className="cardimage"
                                    crossOrigin="anonymous"
                                    src={movie && movie.image}
                                />
                            </div>
                            <div>
                                <span className="labeltitle">Description: </span>
                                <span className="description">{movie && movie.description}</span>
                            </div>
                            <div>
                                <span className="labeltitle">Release Year: </span>
                                <span className="description">{movie && movie.releaseYear}</span>
                            </div>
                            <div>
                                <span className="labeltitle">Genre: </span>
                                <span className="description">{movie && movie.genre && movie.genre.name}</span>
                                <span className="labeltitle"> Description:</span>
                                <span className="description">{movie && movie.genre && movie.genre.description}</span>
                            </div>
                            <div>
                                <span className="labeltitle">Director: </span>
                                <span className="description">{movie && movie.director && movie.director.name}</span>
                                <div>
                                    <span className="labeltitle">Bio </span>
                                    <span className="description">{movie && movie.director && movie.director.bio}</span>
                                    <span className="labeltitle">Birht </span>
                                    <span className="description">{movie && movie.director && movie.director.birth}</span>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                    <Card.Footer>
                        <div>
                            <Link to="/">
                                <Button className="btn-back"> Back </Button>
                            </Link>
                        </div>

                        <Button
                            className="btn-add"
                            variant="success"
                            onClick={() => {
                                if (movie && movie.id) {
                                    handleFavorite(movie.id);
                                }
                            }}
                        >
                            + Add to Favorites
                        </Button>


                        <Button
                            className="btn-remove"
                            variant="danger"
                            onClick={() => {
                                if (movie && movie.id) {
                                    handleRemoveFavorite(movie.id);
                                }
                            }}
                        >
                            Remove from Favorites
                        </Button>

                    </Card.Footer>
                </Card>
            </Row>
        </Container>
    );
};


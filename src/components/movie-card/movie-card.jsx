import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";
export const MovieCard = ({ movie }) => {
    return (
        <div className="content">
            <Card className="h-80; moviecardview" bg="dark" text="light">
                <Card.Img className="imgcard" variant="top" crossOrigin="anonymous" src={movie.image} />
                <Card.Body>
                    <Card.Title className="title"> {movie.title} </Card.Title>
                    <Card.Text className="description">
                        Director Name: {movie.director.name}
                    </Card.Text>
                    <Card.Text className="genrecard"> {movie.genre.name} </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                        <Button className="btn-login">Open</Button>
                    </Link>
                </Card.Footer>
            </Card>
        </div>
    );
};


MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
    }).isRequired,
};
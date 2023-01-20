import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import "./movie-view.scss"


export const MovieView = ({ movies }) => {

    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);


    // const handleFavorite = () => {
    //     fetch("https://my-movies-rushdi.herokuapp.com/users/" + user.Username + "/movies/" + movie._id, {
    //         method: "POST",
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Content-Type": "application/json"
    //         }
    //     }).then((response) => {
    //         alert("Added to favorites!");
    //         return response.json();
    //     }).then(data => updateUser(data))
    //         .catch(err => {
    //             alert("Something went wrong");
    //         });
    // };

    // const handleRemoveFavorite = () => {
    //     fetch("https://my-movies-rushdi.herokuapp.com/users/" + user.Username + "/movies/" + movie._id, {
    //         method: "DELETE",
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Content-Type": "application/json"
    //         }
    //     }).then((response) => {
    //         if (response.ok) {
    //             alert("Removed from favorites");

    //             updateUser(newUser);
    //         } else {
    //             alert("Something went wrong");
    //         }
    //     });
    // };


    return (

        <Container className="cardset; content">
            <Row>
                <Card bg="dark" text="light">
                    <Card.Header>
                        <div className="title text-center">
                            <span> {movie.title} </span>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div>
                            <div>
                                <Card.Img
                                    className="cardimage"
                                    crossOrigin="anonymous"
                                    src={movie.image}
                                />
                            </div>
                            <div>
                                <span className="labeltitle">Description: </span>
                                <span className="description">{movie.description}</span>
                            </div>
                            <div>
                                <span className="labeltitle">Release Year: </span>
                                <span className="description">{movie.releaseYear}</span>
                            </div>
                            <div>
                                <span className="labeltitle">Genre: </span>
                                <span className="description">{movie.genre.name}</span>
                                <span className="labeltitle"> Description:</span>
                                <span className="description">{movie.genre.description}</span>
                            </div>
                            <div>
                                <span className="labeltitle">Director: </span>
                                <span className="description">{movie.director.name}</span>
                                <div>
                                    <span className="labeltitle">Bio </span>
                                    <span className="description">{movie.director.bio}</span>
                                    <span className="labeltitle">Birht </span>
                                    <span className="description">{movie.director.birth}</span>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                    <Card.Footer>
                        <Link to="/">
                            <Button className="btn-login"> Back </Button>
                        </Link>
                        {/* {
                            storedUser.FavoriteMovies.indexOf(movie._id) >= 0 ? (
                                <Button
                                    variant="danger"
                                    onClick={() => handleRemoveFavorite(movie._id, "add")}
                                >
                                    Remove from Favorites
                                </Button>
                            ) : (
                                <Button
                                    className="button-add-favorite"
                                    onClick={() => handleFavorite(movie._id, "add")}
                                >
                                    + Add to Favorites
                                </Button>
                            )
                        } */}
                    </Card.Footer>
                </Card>
            </Row>
        </Container>
    );
};

MovieView.propTypes = {
    movies: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }),
        Genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        }),
        Director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bie: PropTypes.string.isRequired,
            birth: PropTypes.string.isRequired,
        }),
    }).isRequired,
};
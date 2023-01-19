import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss"


export const MovieView = ({ movies }) => {

    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);
    return (
        <>
            <Card className="movieview">
                <div>
                    <img className="w-100" src={movie.image} />
                </div>
                <div>
                    <span>Title: </span>
                    <span>{movie.title}</span>
                </div>
                <div>
                    <span>Genre:</span>
                    <span>{movie.genre}</span>
                </div>
                <div>
                    <span>Description:</span>
                    <span>{movie.description}</span>
                </div>
                <Link to={`/`}>
                    <Button className="back-button">Back</Button>
                </Link>
            </Card>
        </>
    );

};
MovieView.propTypes = {
    movies: PropTypes.shape({
        title: PropTypes.string,
        genre: PropTypes.string,
        description: PropTypes.string

    }).isRequired,

};
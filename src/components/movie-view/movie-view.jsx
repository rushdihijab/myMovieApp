import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.image} />
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
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};
MovieView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
        genre: PropTypes.string,
        description: PropTypes.string

    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};
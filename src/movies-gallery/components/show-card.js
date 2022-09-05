import { Link } from "react-router-dom"

let ShowCard = ({ first_air_date, id, title, backdrop_path, release_date, name, overview, original_language, vote_average, poster_path }) =>
{

    return <Link onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }} to={`/movie/${ id }`} className="card-container">
        <div className="show-description" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${ backdrop_path })` }}>
            <h3>Title</h3>
            {title === undefined ? <h5>{name}</h5> : <h5>{title}</h5>}
            <h4>Description</h4>
            <p>{overview}</p>
            <div>
                <span>Rating</span>
                <span>Language</span>
                <span>Release Date</span>
            </div>
            <div>
                <span>{vote_average}</span>
                <span>{original_language}</span>
                {release_date === undefined ? <span>{first_air_date}</span> : <span>{release_date}</span>}
            </div>
        </div>
        <div className="card" >
            <img src={`https://image.tmdb.org/t/p/w500/${ poster_path }`} alt="" />
            <div className="card-details">
                <span>{vote_average}</span>
                {title === undefined ? <span>{name}</span> : <span>{title}</span>}
                <span>{original_language}</span>
            </div>
        </div>
    </Link>

}


export default ShowCard;
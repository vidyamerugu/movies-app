// import {Link} from 'react-router-dom'

import './index.css'

const MovieItem = props => {
  const {movieDetails} = props
  const {
    title,
    backdropPath,
    overView,
    runtime,
    releaseDate,
    adult,
  } = movieDetails

  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  const adultView = adult ? 'A' : 'U/A'
  const date = new Date(releaseDate)
  const year = date.getFullYear()

  /* const myStyle = {
    backgroundImage: `url(${posterPath})`,
    height: '900px',
    width: '1440px',
    marginTop: '0px',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  } */

  // console.log('Hi')
  return (
    // <Link to={`/movies/${id}`}>
    <div className="movie-item-container">
      <img
        src={backdropPath}
        alt={title}
        className="movie-item-background-image"
      />
      <h1 className="movie-item-heading">{title}</h1>
      <div className="movie-des1-content">
        <h3>{`${hours}h ${minutes}m`}</h3>
        <h3>{adultView}</h3>
        <h3>{year}</h3>
      </div>
      <p className="movie-des-content">{overView}</p>
      <button className="movie-btn-play" type="button">
        Play
      </button>
    </div>
    //  </Link>
  )
}

export default MovieItem

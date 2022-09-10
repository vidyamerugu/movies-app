import {Link} from 'react-router-dom'
import './index.css'

const HomeMoviePoster = props => {
  const {poster} = props
  const {title, path, overView, id} = poster

  // console.log(props)

  return (
    <div className="poster">
      <Link to={`/movies/${id}`}>
        <img src={path} alt={title} className="poster-image" />
      </Link>
      <div className="poster-text-container">
        <h1 className="poster-heading">{title}</h1>
        <p className="poster-overview">{overView}</p>
        <button type="button" className="poster-button">
          Play
        </button>
      </div>
    </div>
  )
}

export default HomeMoviePoster

//
//    <div style={myStyle} alt={title}>
//     backgroundImage: `url(${path})`,

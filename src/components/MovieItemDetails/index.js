import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaGoogle} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import MovieItem from '../MovieItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieItemDetails extends Component {
  state = {
    movieDetails: [],
    genre: [],
    languages: [],
    similarMovies: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = [data.movie_details].map(eachMovie => ({
        id: eachMovie.id,
        adult: eachMovie.adult,
        backdropPath: eachMovie.backdrop_path,
        budget: eachMovie.budget,
        title: eachMovie.title,
        overView: eachMovie.overview,
        rating: eachMovie.vote_average,
        count: eachMovie.vote_count,
        releaseDate: eachMovie.release_date,
        runtime: eachMovie.runtime,
        posterPath: eachMovie.poster_path,
      }))

      const genreData = data.movie_details.genres.map(eachGenre => ({
        id: eachGenre.id,
        name: eachGenre.name,
      }))

      const spokenLanguages = data.movie_details.spoken_languages.map(
        eachLanguage => ({
          id: eachLanguage.id,
          name: eachLanguage.english_name,
        }),
      )

      const similarMoviesData = data.movie_details.similar_movies.map(
        eachMovie => ({
          backdropPath: eachMovie.backdrop_path,
          id: eachMovie.id,
          overView: eachMovie.overview,
          posterPath: eachMovie.poster_path,
          title: eachMovie.title,
        }),
      )

      console.log('genreData')
      console.log(similarMoviesData)

      this.setState({
        movieDetails: updatedData,
        genre: genreData,
        languages: spokenLanguages,
        similarMovies: similarMoviesData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onClickRetry = () => {
    this.getMovieDetails()
  }

  renderFailureView = () => (
    <>
      <div className="movie-details-failure-view">
        <img
          src="https://res.cloudinary.com/dmof8q57d/image/upload/v1661598976/Background-Complete_gtk6lz.png"
          alt="failure view"
          className="movie-details-failure-view-image"
        />
        <p className="movie-details-failure-view-des">
          Something went wrong. Please try again
        </p>
        <Link to="/popular">
          <button
            type="button"
            className="movie-details-failure-view-button"
            onClick={this.onClickRetry}
          >
            Try Again
          </button>
        </Link>
      </div>
    </>
  )

  renderMovieDetailsView = () => {
    const {movieDetails, genre, languages, similarMovies} = this.state
    const newMovieDetails = {...movieDetails[0]}

    console.log('my day')
    console.log(newMovieDetails)

    const {budget, rating, count, releaseDate} = newMovieDetails
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const d = new Date(releaseDate)
    const date = d.getDate()
    const month = months[d.getMonth()]
    const year = d.getFullYear()

    const day = date.toString()

    let dateword
    if (day === '3') {
      dateword = 'rd'
    } else if (day === '1' || day === '21' || day === '31') {
      dateword = 'st'
    } else if (day === '2' || day === '22') {
      dateword = 'nd'
    } else {
      dateword = 'th'
    }

    return (
      <>
        {movieDetails.map(item => (
          <MovieItem movieDetails={item} key={item.id} />
        ))}

        <div className="movie-details-description-container">
          <div className="genres-container">
            <h1 className="genre-heading">Genres</h1>
            <ul className="remove-list">
              {genre.map(eachMovie => (
                <li className="list-genre-des" key={eachMovie.id}>
                  <p>{eachMovie.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="audio-container">
            <h1 className="audio-heading">Audio Available</h1>
            <ul className="remove-list">
              {languages.map(eachLang => (
                <li className="list-audio-des" key={eachLang.id}>
                  <p>{eachLang.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rating-container">
            <h1 className="rating-heading">Rating Count</h1>
            <p className="list-rating-des">{count}</p>
            <h1 className="rating-heading">Rating Average</h1>
            <p className="list-rating-des">{rating}</p>
          </div>
          <div className="budget-container">
            <h1 className="budget-heading">Budget</h1>
            <p className="list-budget-des">{budget}</p>
            <h1 className="budget-heading">Release Date</h1>
            <p className="list-budget-des">{`${date}${dateword} ${month} ${year}`}</p>
          </div>
        </div>
        <div className="more-like-this-container">
          <h1 className="more-like-this">more like this</h1>
          <ul className="movies-item-unordered-list">
            {similarMovies.map(eachMovie => (
              <Link to={`/movies/${eachMovie.id}`} key={eachMovie.id}>
                <li className="list-movies-item-images" key={eachMovie.id}>
                  <img
                    src={eachMovie.backdropPath}
                    alt={eachMovie.title}
                    className="movies-details-item-images"
                  />
                </li>
              </Link>
            ))}
          </ul>
          <Footer />
        </div>
      </>
    )
  }

  renderMovieDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMovieDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="movie-details-container">
          <Header />
          <div className="movie-details-poster-container">
            {this.renderMovieDetails()}
          </div>
        </div>
      </>
    )
  }
}
export default MovieItemDetails

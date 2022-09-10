import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'

import Search from '../Search'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Popular extends Component {
  state = {
    moviesList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getMoviesList()
  }

  getMoviesList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/popular-movies`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      const updatedData = data.results.map(eachMovie => ({
        path: eachMovie.backdrop_path,
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      console.log(updatedData)
      this.setState({
        moviesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onRetry = () => {
    this.getMoviesList()
  }

  renderFailureView = () => (
    <>
      <div>
        <img
          src="https://res.cloudinary.com/dmof8q57d/image/upload/v1661598976/Background-Complete_gtk6lz.png"
          alt="failure view"
        />
        <p>Something went wrong. Please try again</p>
        <Link to="/popular">
          <button type="button" onClick={this.onRetry}>
            Try Again
          </button>
        </Link>
      </div>
    </>
  )

  renderMoviesListView = () => {
    const {moviesList} = this.state
    // console.log(moviesList)

    return (
      <>
        <ul className="popular-movies-unordered-list">
          {moviesList.map(eachMovie => (
            <Link to={`/movies/${eachMovie.id}`} key={eachMovie.id}>
              <li key={eachMovie.id}>
                <img
                  src={eachMovie.path}
                  alt={eachMovie.title}
                  className="popular-movies-images"
                />
              </li>
            </Link>
          ))}
        </ul>
      </>
    )
  }

  renderAllMovies = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMoviesListView()
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
      <div className="popular-container">
        <Header />
        <div className="popular-movies-container">{this.renderAllMovies()}</div>
        <div className="foot-popular">
          <Footer />
        </div>
      </div>
    )
  }
}

export default Popular

// {this.renderAllMovies()}

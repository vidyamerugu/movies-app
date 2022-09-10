import {Component} from 'react'
import {FaGoogle} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Search extends Component {
  state = {
    searchInput: '',
    searchMoviesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getSearchMoviesList()
  }

  getSearchMoviesList = async () => {
    const {searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    console.log('url')
    console.log(url)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.results.map(eachMovie => ({
        path: eachMovie.backdrop_path,
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      // console.log(updatedData)
      this.setState({
        searchMoviesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  searchInput = text => {
    this.setState({searchInput: text}, this.getSearchMoviesList)
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <>
      <div>
        <img
          src="https://res.cloudinary.com/dmof8q57d/image/upload/v1661598976/Background-Complete_gtk6lz.png"
          alt="something went wrong"
        />
        <h1>Something went wrong. Please try again</h1>
        <Link to="/search">
          <button type="button">Retry</button>
        </Link>
      </div>
    </>
  )

  renderEmptyResultMovies = () => {
    const {searchInput} = this.state
    console.log('searchInput')
    console.log(searchInput)

    return (
      <div className="search-empty-result-view">
        <img
          src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657092588/Group_7394_jzwy1v.png"
          alt="no movies"
          className="search-image-failure-view"
        />
        <h1 className="search-image-failure-view-heading">
          Your search for {searchInput} did not find any matches.
        </h1>
      </div>
    )
  }

  renderSearchResultMoviesView = () => {
    const {searchMoviesList} = this.state

    return (
      <>
        {searchMoviesList.length > 0 ? (
          <>
            <div className="search-list-container">
              <ul className="search-order-list">
                {searchMoviesList.map(eachMovie => (
                  <Link to={`/movies/${eachMovie.id}`} key={eachMovie.id}>
                    <li key={eachMovie.id}>
                      <img
                        src={eachMovie.path}
                        alt={eachMovie.title}
                        className="search-image-view"
                      />
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </>
        ) : (
          this.renderEmptyResultMovies()
        )}
      </>
    )
  }

  renderSearchMoviesListView = () => {
    const {searchInput} = this.state
    const isInputEmpty = searchInput === ''
    console.log(isInputEmpty)

    return (
      <div>
        {isInputEmpty ? (
          <div>
            <p>Search the movie, by clicking on the search Icon</p>
          </div>
        ) : (
          this.renderSearchResultMoviesView()
        )}
      </div>
    )
  }

  renderSearchMovies = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSearchMoviesListView()
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
      <div className="search-movies-container">
        <Header searchInput={this.searchInput} />
        <div className="search-button-text">
          <button
            type="search"
            testid="searchButton"
            className="search-button-container"
          >
            {this.renderSearchMovies()}
          </button>
        </div>
      </div>
    )
  }
}

export default Search

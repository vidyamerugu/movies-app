import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import SlickCard from '../SlickCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TrendingNow extends Component {
  state = {
    trendingNowList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingMoviesList()
  }

  getTrendingMoviesList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/trending-movies`
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
      // console.log(updatedData)
      this.setState({
        trendingNowList: updatedData,
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

  onClickRetry = () => {
    this.getTrendingMoviesList()
  }

  renderFailureView = () => (
    <>
      <div>
        <img
          src="https://res.cloudinary.com/dmof8q57d/image/upload/v1661598976/Background-Complete_gtk6lz.png"
          alt="failure view"
        />
        <p>Something went wrong. Please try again</p>

        <button type="button" onClick={this.onClickRetry}>
          Try Again
        </button>
      </div>
    </>
  )

  renderTreningMoviesListView = () => {
    const {trendingNowList} = this.state
    // console.log(moviesList)

    return (
      <>
        <SlickCard movies={trendingNowList} />
      </>
    )
  }

  renderTreningMovies = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTreningMoviesListView()
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
      <div className="trending-movies-container">
        {this.renderTreningMovies()}
      </div>
    )
  }
}

export default TrendingNow

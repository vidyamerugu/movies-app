import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import HomeMoviePoster from '../HomeMoviePoster'
import Footer from '../Footer'
import TrendingNow from '../TrendingNow'
import Originals from '../Originals'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    displayPoster: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getHomePagePoster()
  }

  getHomePagePoster = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    /* if (jwtToken === undefined) {
      return <Redirect to="/login" />
    } */

    const url = `https://apis.ccbp.in/movies-app/originals`
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
      const fetchedDataLength = data.results.length
      // console.log(fetchedDataLength)
      const randomPoster =
        data.results[Math.floor(Math.random() * fetchedDataLength)]
      const updatedData = {
        path: randomPoster.backdrop_path,
        id: randomPoster.id,
        overView: randomPoster.overview,
        posterPath: randomPoster.poster_path,
        title: randomPoster.title,
      }
      // console.log(updatedData)
      this.setState({
        displayPoster: {...updatedData},
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  /* const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  } */

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onClickRetry = () => {
    this.getHomePagePoster()
  }

  renderFailureView = () => (
    <>
      <div>
        <img
          src="https://res.cloudinary.com/dmof8q57d/image/upload/v1661598976/Background-Complete_gtk6lz.png"
          alt="failure view"
        />
        <h1>Something went wrong. Please try again</h1>

        <button type="button" onClick={this.onClickRetry}>
          Try Again
        </button>
      </div>
    </>
  )

  renderDisplayHomePosterView = () => {
    const {displayPoster} = this.state
    // console.log('renderDisplayHomePosterView')
    // console.log(displayPoster)

    return (
      <>
        <HomeMoviePoster poster={displayPoster} />
      </>
    )
  }

  renderHomePoster = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderDisplayHomePosterView()
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
      <div className="home-container">
        <Header />
        <div>{this.renderHomePoster()}</div>
        <div className="sub-container">
          <h1 className="trending-now">Trending Now</h1>
          <div className="trending-now-home-container">
            <TrendingNow />
          </div>

          <h1 className="originals">Originals</h1>
          <div className="originals-now-home-container">
            <Originals />
          </div>
          <div className="home-footer-container">
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default Home

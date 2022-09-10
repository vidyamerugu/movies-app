import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 360,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
}

class SlickCard extends Component {
  renderSlider = () => {
    const {movies} = this.props
    return (
      <>
        <Slider {...settings}>
          {movies.map(each => (
            <Link to={`/movies/${each.id}`} key={each.id}>
              <li testid="MovieCard" key={each.id}>
                <img
                  className="slick-movie-img"
                  src={each.path}
                  alt={each.title}
                />
              </li>
            </Link>
          ))}
        </Slider>
      </>
    )
  }

  render() {
    return (
      <div className="slick-app-container">
        <div style={{width: '90%'}}>{this.renderSlider()}</div>
      </div>
    )
  }
}
export default withRouter(SlickCard)

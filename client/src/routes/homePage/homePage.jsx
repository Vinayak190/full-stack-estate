import { useContext } from 'react'
import SearchBar from '../../components/searchBar/SearchBar'
import './homePage.scss'
import { AuthContext } from '../../context/AuthContext'

function HomePage() {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p>
            Discover a wide range of properties tailored to your needs, from cozy apartments to luxurious estates. Whether you&apos;re buying, selling, or renting, our platform connects you with the
            best real estate opportunities in the market.
          </p>
          <SearchBar />
          {/* <div className="boxes">
            <div className="box">
              <h1>8+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>23</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>1000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div> */}
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  )
}

export default HomePage

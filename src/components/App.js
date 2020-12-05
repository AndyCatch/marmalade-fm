import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import FeaturedMix from './FeaturedMix'
import Header from './Header'
import Home from './Home'
import Archive from './Archive'
import About from './About'
import Show from './Show'
import Player from './Player'

// pull in mix data
import mixesData from '../data/mixes'
import actions from '../store/actions'

class App extends Component {
  fetchMixes = async () => {
    const { addMix } = this.props

    mixesData.map(async (id) => {
      try {
        const response = await fetch(`https://api.mixcloud.com/${id}`)
        const data = await response.json()

        addMix(data)
      } catch (error) {
        console.log('error:' + error)
      }
    })
  }

  componentDidMount() {
    this.fetchMixes()
  }

  render() {
    // this is an ES6 trick that creates a variable from something inside of an array
    // const [firstMix = {}] = this.props.mixes

    return (
      <Router>
        {/* // This <div> contains everything */}
        <div>
          {/* this div contains our page */}
          <div className="flex-l justify-end">
            {/* Featured Mix */}
            <FeaturedMix />
            <div className="w-50-l relative z-1">
              {/* Header */}
              <Header />
              {/* Routed page */}
              <Switch>
                <Route exact path="/" component={Home} />
                {/* Archive */}
                <Route path="/archive" component={Archive} />
                {/* About */}
                <Route path="/about" component={About} />
                {/* Show */}
                <Route path="/show/:slug" component={Show} />
              </Switch>
            </div>
          </div>
          {/* Audio Player */}
          <Player />
        </div>
      </Router>
    )
  }
}

export default connect((state) => state, actions)(App)

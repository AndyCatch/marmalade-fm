/*global Mixcloud*/
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import FeaturedMix from './FeaturedMix'
import Header from './Header'
import Home from './Home'
import Archive from './Archive'
import About from './About'
import Show from './Show'

// pull in mix data
import mixesData from '../data/mixes'

// https://www.mixcloud.com/NTSRadio/boards-of-canada-societas-x-tape-warp-30-23rd-june-2019/
const testMix = '/NTSRadio/p-rallel-19th-november-2020/'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playing: false, // is a mix currently playing
      currentMix: '', // the id of the current mix
      mixIds: mixesData,
      mix: null,
      mixes: [],
    }
  }

  fetchMixes = async () => {
    const { mixIds } = this.state
    console.log(mixIds)

    mixIds.map(async (id) => {
      try {
        const response = await fetch(`https://api.mixcloud.com/${id}`)
        const data = await response.json()
        this.setState((prevState, props) => ({
          mixes: [...prevState.mixes, data],
        }))
      } catch (error) {
        console.log('error:' + error)
      }
    })
  }

  mountAudio = async () => {
    // when we use the this keyword, our widget is now accessible
    // anywhere inside the component
    this.widget = Mixcloud.PlayerWidget(this.player)
    // here we wait for our widget to be ready before continuing
    await this.widget.ready

    // using the mixcloud widget events we can detect when our
    // audio has been paused, set playing state to false
    this.widget.events.pause.on(() =>
      this.setState({
        playing: false,
      })
    )
    this.widget.events.play.on(() =>
      this.setState({
        playing: true,
      })
    )
  }

  componentDidMount() {
    // this is an included 'Lifecycle' method. It only runs once the component is
    // rendered. This makes it the best time to call load-ready-dependent functions.
    this.mountAudio()
    this.fetchMixes()
  }

  actions = {
    // Grouping methods inside an object
    togglePlay: () => {
      // we want to toggle play on our widget
      this.widget.togglePlay()
    },

    playMix: (mixname) => {
      // if the mix name is the same as the currently playing mix
      // we want to pause it instead
      // const currentMix = this.state.currentMix
      const { currentMix } = this.state
      if (mixname === currentMix) {
        return this.widget.togglePlay()
      }

      // Update the current state with the mixname
      this.setState({
        currentMix: mixname,
      })

      this.widget.load(mixname, true)
    },
  }

  render() {
    // this is an ES6 trick that creates a variable from something inside of an array
    const [firstMix = {}] = this.state.mixes

    return (
      <Router>
        {/* // This <div> contains everything */}
        <div>
          {/* this div contains our page */}
          <div className="flex-l justify-end">
            {/* Featured Mix */}
            <FeaturedMix
              {...this.state}
              {...this.actions}
              {...firstMix}
              id={firstMix.key}
            />
            <div className="w-50-l relative z-1">
              {/* Header */}
              <Header />
              {/* Routed page */}
              <Route
                exact
                path="/"
                render={() => (
                  // We pass in our App state into the Home component, as well as our grouped methods
                  <Home {...this.state} {...this.actions} />
                )}
              />
              {/* Archive */}
              <Route
                path="/archive"
                render={() => <Archive {...this.state} {...this.actions} />}
              />
              <Route path="/about" render={() => <About {...this.state} />} />

              {/* <Show /> */}
              <Route
                path="/show/:slug"
                render={(routeParams) => (
                  <Show {...routeParams} {...this.state} />
                )}
              />
            </div>
          </div>
          {/* Audio Player */}
          <iframe
            title="Audio Player"
            width="100%"
            height="60"
            src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FNTSRadio%2Ffloating-points-four-tet-caribou-23rd-march-2015%2F"
            frameBorder="0"
            className="player db fixed bottom-0 z-5"
            // refs create an ID of sorts for the element
            ref={(player) => (this.player = player)}
          />
        </div>
      </Router>
    )
  }
}

export default App

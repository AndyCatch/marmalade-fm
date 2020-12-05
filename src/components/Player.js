/*global Mixcloud*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../store/actions'

class Player extends Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    // when the widget is not ready, we return and ignore all actions
    if (!nextProps.widgetReady) {
      return
    }

    //   if there's a new mix in the props
    if (nextProps.currentMix !== this.props.currentMix) {
      this.widget.load(nextProps.currentMix, true)
      // if the event hasn't come from Mixcloud, we want to toggle play/pause
    } else if (!nextProps.fromMixcloud) {
      this.widget.togglePlay()
    }
  }

  mountAudio = async () => {
    const { playMix, setWidgetReady } = this.props
    // when we use the this keyword, our widget is now accessible
    // anywhere inside the component
    this.widget = Mixcloud.PlayerWidget(this.player)
    // here we wait for our widget to be ready before continuing
    await this.widget.ready

    // here we set our widget state to be ready in redux so
    // we can block anything from happening before it's ready
    setWidgetReady(true)

    // using the mixcloud widget events we can detect when our
    // audio has been paused, set playing state to false
    this.widget.events.pause.on(() =>
      playMix({
        playing: false,
        fromMixcloud: true,
      })
    )
    // audio is playing again, set playing state to true
    this.widget.events.play.on(() =>
      playMix({
        playing: true,
        fromMixcloud: true,
      })
    )
  }

  componentDidMount() {
    // this is an included 'Lifecycle' method. It only runs once the component is
    // rendered. This makes it the best time to call load-ready-dependent functions.
    this.mountAudio()
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
    return (
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
    )
  }
}

export default connect((state) => state, actions)(Player)

import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import actions from '../store/actions'

// this component wraps around anything that when we click
// will start playing a mix for us. it provides us functioanlity
// rather than any design
const PlayMix = ({
  playMix,
  id,
  currentMix,
  playing,
  children,
  className,
  fromMixcloud,
}) => (
  // when our currently playing mix equals the id of the mix
  // that this component refers to, we will add a class name
  // of 'playing'
  <div
    className={classNames({
      // it's going to add our custom className only when true
      [className]: className,
      // classname on the left, true/false ont he right, we can test things from our Redux state
      playing: id === currentMix && playing && fromMixcloud,
      // when we request to play a mix, things are not loaded yet, so we
      loading: id === currentMix && !playing && !fromMixcloud,
    })}
    onClick={() => playMix({ currentMix: id, fromMixcloud: false })}>
    {children}
  </div>
)

export default connect((state) => state, actions)(PlayMix)

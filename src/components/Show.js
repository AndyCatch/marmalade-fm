import React, { Component } from 'react'
import { connect } from 'react-redux'
import Stat from './Stat'
import differenceInDays from 'date-fns/differenceInDays'
import parseISO from 'date-fns/parseISO'

import actions from '../store/actions'

const Tag = ({ name, url }) => (
  <div className="mr2 mb2 o-70">
    <a
      className="block f6 link blue b ba bw1 b--blue br2 pv1 ph2 lh-title"
      href={url}
      target="_blank"
      rel="noreferrer">
      {name}
    </a>
  </div>
)

const Tags = ({ tags = [] }) => (
  <div className="tags flex flex-wrap ">
    {tags.map((tag, index) => (
      <Tag {...tag} key={index} />
    ))}
  </div>
)

class Show extends Component {
  componentDidMount() {
    // when we mount our Show component, we want to set the featuredMix in our Redux state to be the currently viewed mix
    const { setFeaturedMix, id } = this.props

    setFeaturedMix(id)
  }

  componentWillUnmount() {
    const { setFeaturedMix } = this.props

    setFeaturedMix(false)
  }

  render() {
    const {
      tags,
      description,
      play_count,
      created_time,
      audio_length,
    } = this.props

    return (
      <div className="ph3 ph4-l pad-bottom">
        <div className="measure center lh-copy">
          <Tags tags={tags} />

          <p>{description}</p>
          {/* <p>{match.params.slug}</p> */}
          <Stat
            statName="Plays:"
            statNumber={play_count || 0}
            statWord=" times"
          />
          <Stat
            statName="Uploaded"
            statNumber={
              differenceInDays(new Date(), parseISO(created_time)) || 0
            }
            statWord=" days ago"
          />
          <Stat
            statName="Lasting for"
            statNumber={audio_length / 60 || 0}
            statWord=" minutes"
          />
        </div>
      </div>
    )
  }
}

const getMix = (mixes, slug) => {
  // here we grab the mix that has a slug that matches
  // our params from the url
  const [mix = {}] = mixes.filter((mix) => mix.slug === slug)
  return mix
}

export default connect(
  (state, props) => ({
    ...getMix(state.mixes, props.match.params.slug),
  }),
  actions
)(Show)

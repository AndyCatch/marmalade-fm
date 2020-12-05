import React from 'react'
import { connect } from 'react-redux'
import Stat from './Stat'

const About = ({ mixes }) => (
  <div className="ph4 ph4-l pad-bottom">
    <div className="measure center lh-copy">
      <p className="mt0">
        Marmalade.fm features the latest and greatest in grooves, beats and
        world music.
      </p>
      <p className="mb4">
        Whether you’re into hip hop, trip hop, classic jazz, fusion jazz, afro
        beat or break beat… we have you covered!
      </p>

      <Stat
        statName="Featuring..."
        statNumber={mixes.length}
        statWord=" mixes"
      />
      {/* Uses .reduce() method to calculate stats from mixes data */}
      <Stat
        statName="Commented..."
        statNumber={mixes.reduce(
          (accum, current) => accum + current.comment_count, // all the mixes returned 0 play counts, so an adjustment was made. Mixcloud API error?
          0
        )}
        statWord=" times"
      />
      <Stat
        statName="With..."
        statNumber={mixes.reduce(
          (accum, current) => accum + current.audio_length,
          0
        )}
        statWord=" seconds"
      />
    </div>
  </div>
)

// here we connect our component to the Redux state
export default connect((state) => state)(About)

import React from 'react'
import Counter from './Counter'

const Stat = ({ statName, statNumber, statWord, ...props }) => (
  <div className="mb4">
    <div className="f5 black mb0 b">{statName}</div>

    <Counter end={statNumber} duration={2} />

    <div className="f4 lh-1">{statWord}</div>
  </div>
)

const About = ({ mixes }) => (
  <div className="measure center">
    <div className="lh-copy mb4">
      <p className="mt0">
        Marmalade.fm features the latest and greatest in grooves, beats and
        world music.
      </p>
      <p>
        Whether you’re into hip hop, trip hop, classic jazz, fusion jazz, afro
        beat or break beat… we have you covered!
      </p>
    </div>

    <div className="">
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

export default About

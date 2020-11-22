import React from 'react'

const Stat = ({ statName, statNumber, statWord, ...props }) => (
  <div
    className="w-third tc pa3 ba bw2  b--light-gray"
    style={{ marginRight: -4 }}>
    <div className="f6 biryani ttu">{statName}</div>
    <div className="f5 b biryani-black ttu tracked">
      {statNumber}
      {statWord}
    </div>
  </div>
)

const About = ({ mixes }) => (
  <div className="ph3 ph4-l">
    <div className="measure center lh-copy f4 ph3">
      <p className="mt0">
        Marmalade.fm features the latest and greatest in grooves, beats and
        world music.
      </p>
      <p>
        Whether you’re into hip hop, trip hop, classic jazz, fusion jazz, afro
        beat or break beat… we have you covered!
      </p>
    </div>

    <div className="flex pt3">
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

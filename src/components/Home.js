import React from 'react'
import Mix from './Mix'

const Home = ({ mixes, ...props }) => (
  <div className="flex flex-wrap justify-between mixes ph3 ph4-l">
    {/* Here we loop through our mixes */}
    {mixes.slice(0, 6).map((mix, index) => (
      <div className="mix mb4">
        <Mix {...props} {...mix} id={mix.key} key={index} />
      </div>
    ))}
  </div>
)

export default Home

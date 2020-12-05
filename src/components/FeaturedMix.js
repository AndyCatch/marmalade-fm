import React from 'react'
import PlayMix from './PlayMix'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PlayButton from './PlayButton'

const FeaturedMix = ({
  name,
  pictures = {},
  picture_primary_color,
  title,
  id,
  slug,
  ...props
}) => (
  <div
    className="w-50-l vh-100 flex items-center justify-center cover bg-center pad-bottom fixed-l left-0 mix-overlay"
    style={{
      backgroundImage: `url(${pictures.extra_large})`,
      backgroundColor: `#${picture_primary_color}`,
    }}>
    <div className="w-100 tc pa3 relative z-2">
      <p className="b biryani f6 white ttu">{title}</p>
      <h1 className="mix-title mt0 mb3 anton white ttu">{name}</h1>
      <Link
        to={`/show/${slug}`}
        className="absolute absolute--fill z-3 pointer"
      />
      <PlayMix id={id} className="relative z-5 pointer">
        <PlayButton />
      </PlayMix>
    </div>
  </div>
)

//  On the Show page, we're going to set our featuredMix to be to be the currently viewed Mix
//  if there's a mix playing, we want to want to set that as our featured mix
// we want to display our first mix as our Featured Mix

const getMix = (state) => {
  // 1. if we have a featuredMix in Redux, we show that first
  // 2. if there's a currently playing mix, we show that next
  // 3. otherwise, just show the first mix
  let featuredMix

  if (state.featuredMix) {
    ;[featuredMix] = state.mixes.filter((mix) => mix.id === state.featuredMix)
  } else {
    ;[featuredMix] = state.mixes.filter((mix) => mix.id === state.currentMix)
  }

  const [firstMix = {}] = state.mixes
  // return featured mix if it exists, otherwise return the first mix
  return featuredMix || firstMix
}

const getTitle = (state) => {
  if (state.featuredMix) {
    return 'Currently viewing'
  } else if (state.currentMix && state.playing) {
    return 'Currently playing'
  } else {
    return 'Featured mix'
  }
}

export default connect((state) => ({
  ...getMix(state),
  title: getTitle(state),
}))(FeaturedMix)

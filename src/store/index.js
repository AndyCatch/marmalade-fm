const initialState = {
  mixes: [],
  currentMix: null,
  widgetReady: false,
  playing: false,
  fromMixcloud: false,
  featuredMix: null,
}

// This is an example of a 'pure' function
function mixesApp(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'PLAY_MIX':
      const { currentMix, playing } = payload
      return {
        ...state,
        ...payload,
        playing: currentMix === state.currentMix ? !playing : playing,
        // when the current mix inside of our payload, is the same as in our state we set play state to be off, otherwise, on
      }
    case 'ADD_MIX':
      return {
        ...state,
        mixes: [...state.mixes, { ...payload, id: payload.key }],
      }
    case 'SET_WIDGET_READY':
      return {
        ...state,
        widgetReady: true,
      }
    case 'SET_FEATURED_MIX':
      return {
        ...state,
        featuredMix: payload,
      }
    default:
      return state
  }
}

export default mixesApp

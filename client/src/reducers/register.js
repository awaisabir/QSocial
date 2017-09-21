const initialState = {
  fetching: false,
  fetched: false,
  data: {},
  errors: [],
}

export default (state=initialState, action) => {
  switch (action.type) {
    case 'REGISTERATION_FULFILLED' :
      return { ...state, fetched: true, fetching: false, data: { ...action.payload }}
    
    case 'REGISTERATION_REJECTED' :
      return { ...state, fetched: false, fetching: false, errors: [...action.payload]}

    case 'REGISTERATION_PENDING' :
      return { ...state, fetching: true, fetched: false}

    default:
      return state
  }
}
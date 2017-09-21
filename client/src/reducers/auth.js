const initialState = {
  token: '',
  fetching: false,
  fetched: false,
  errors: [],
}

export default (state=initialState, action) => {
  switch (action.type) {
    case 'TOKEN_FULFILLED' :
      return { ...state, token: action.payload}
    
    case 'TOKEN_REJECTED' :
      return { ...state, fetched: false, fetching: false, errors: [...action.payload]}

    case 'TOKEN_PENDING' :
      return { ...state, fetching: true}

    default:
      return state
  }
}
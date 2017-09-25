const initalState = {
  fetching: false,
  fetched : false,
  data: {},
  errors  : {}
}

export default (state=initalState, {type, payload}) => {
  switch (type) {
    case 'AUTHENTICATION_FULFILLED':
      return {
        ...state, fetched: true, fetching: false, data: {...payload}
      }
    case 'AUTHENTICATION_PENDING':
      return {
        ... state, fetched: false, fetching: true
      }
    case 'AUTHENTICATION_REJECTED':
    return {
      ...state, fetched: false, fetching: false, errors: {...payload}
    }
    default:
      return state
  }
}
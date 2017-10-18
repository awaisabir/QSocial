const initalState = {
  fetching: false,
  fetched : false,
  success : false,
  message: '',
  token: '',
  isTokenValid: false,
  loggedIn: false,
  errors  : {},
}

export default (state=initalState, {type, payload}) => {
  switch (type) {
    case 'AUTHENTICATION_FULFILLED':
      return {
        ...state, fetched: true, 
        fetching: false, 
        success: payload.data.success,
        message: payload.data.message,
        token: payload.data.token,
        loggedIn: true,
      }
    case 'AUTHENTICATION_PENDING':
      return {
        ...state, fetched: false, fetching: true, success: false, message: ''
      }
    case 'AUTHENTICATION_REJECTED':
    return {
      ...state, fetched: false, fetching: false, errors: {...payload}
    }
    case 'TOKEN_VALIDITY_FULFILLED':
      return {
        ...state, isTokenValid: payload.data.success,
      }
    case 'LOGOUT':
      return {
        ...initalState
      }
    default:
      return state
  }
}
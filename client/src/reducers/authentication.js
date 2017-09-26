const initalState = {
  fetching: false,
  fetched : false,
  success : false,
  message: '',
  data: {},
  loggedOut: true,
  errors  : {},
}

export default (state=initalState, {type, payload}) => {
  switch (type) {
    case 'AUTHENTICATION_FULFILLED':
      return {
        ...state, fetched: true, 
        fetching: false, 
        data: {...payload}, 
        success: payload.data.success,
        message: payload.data.message,
        loggedOut: false,
      }
    case 'AUTHENTICATION_PENDING':
      return {
        ...state, fetched: false, fetching: true, success: false, message: ''
      }
    case 'AUTHENTICATION_REJECTED':
    return {
      ...state, fetched: false, fetching: false, errors: {...payload}
    }
    case 'LOGOUT':
      return {
        ...initalState
      }
    default:
      return state
  }
}
const initialState = {
  fetching: false,
  fetched: false,
  success: false,
  message: '',
  post: {},
  errors: {},
};

export default (state=initialState, {type, payload}) => {
  switch(type) {
    case 'FETCH_POST_BY_ID_FULFILLED':
    return {
      ...state,
      fetched: true,
      fetching: false,
      success: payload.data.success,
      message: payload.data.message,
      post: {...payload.data.post},
    }

    case 'FETCH_POST_BY_ID_REJECTED':
      return {
        ...state,
        errors: {...payload}
    }

    case 'FETCH_POST_BY_ID_PENDING':
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
      
    default:
      return state;
  }
}
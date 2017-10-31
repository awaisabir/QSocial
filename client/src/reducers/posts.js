const initalState = {
  fetching: false,
  fetched: true,
  success: '',
  message: false,
  posts: [],
  errors: {}
};

export default (state=initalState, {type, payload}) => {
  switch(type) {
    case 'FETCH_POSTS_FULFILLED':
      return {
        ...state, 
        fetched: true, 
        fetching: false, 
        message: payload.data.message, 
        success: payload.data.success,
        posts: [...payload.data.posts],
        errors: {}
      }
    
    case 'FETCH_POSTS_REJECTED':
      return {
        ...state,
        fetched: false,
        fetching: false,
        message: '',
        success: false,
        posts: [],
        errors: {...payload}
      }

    case 'FETCH_POSTS_PENDING':
      return {
        ...state,
        fetched: false,
        fetching: true,
        message: '',
        success: false,
        posts: [],
        errors: {}
      }
      
    default:
      return state;
  }
}
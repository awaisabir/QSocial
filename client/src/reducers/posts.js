const initalState = {
  fetching: false,
  fetched: true,
  success: '',
  message: false,
  posts: [],
  count: 0,
  totalPosts: 0,
  page: 1,
  heading: '',
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
        count: payload.data.count,
        totalPosts: payload.data.totalPosts,
        errors: {}
      }
    
    case 'FETCH_POSTS_REJECTED':
      return {...state, errors: {...payload}}

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
    
    case 'ONSEARCH_INPUT':
      return {...state, heading: payload.input}

    case 'PAGE_INCREMENTED':
      return {...state, page: state.page+1}
      
    case 'PAGE_DECREMENTED':
      if (state.page === 1)
        return {...state, page: 1}

      return {...state, page: state.page-1}

    case 'RESET_PAGE':
      return {...state, page: 1}

    case 'SET_PAGE':
      return {...state, page: payload.page}
      
    default:
      return state;
  }
}
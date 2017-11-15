import axios from 'axios';

export const register = (username, password, email, firstName, lastName) => {
  return {
    type: 'REGISTRATION',
    payload: axios.post('http://localhost:4200/api/auth/register', {username, password, email, firstName, lastName})
  };
}

export const login = (username, password) => {
  return {
    type: 'AUTHENTICATION',
    payload: axios.post('http://localhost:4200/api/auth/login', {username, password})
  };
}

export const tokenValidity = token => {
  return {
    type: 'TOKEN_VALIDITY',
    payload: axios.get('http://localhost:4200/api/auth/authorize', {headers: {Authorization: token}})
  };
}

export const logout = () => {
  return {
    type: 'LOGOUT',
    payload: {
      loggedIn: false,
    }
  };
}

export const getPosts = (page, heading, order) => {
  return {
    type: 'FETCH_POSTS',
    payload: axios.get(`http://localhost:4200/api/posts?page=${page}&heading=${heading}&order=${order}`)
  };
}

export const getPostById = id => {
  return {
    type: 'FETCH_POST_BY_ID',
    payload: axios.get(`http://localhost:4200/api/posts/${id}`)
  };
}

export const createPost = (token, user_id, heading, content, categories) => {
  return {
    type: 'CREATE_POST',
    payload: axios.post(`http://localhost:4200/api/posts`, {user_id, heading, categories, content}, {headers: {Authorization: token}})
  }
}

export const createdPost = () => {
  return {
    type: 'POST_RETREIVED',
    paylaod: {},
  }
}
import axios from 'axios'

export const register = (username, password, email, firstName, lastName) => {
  return {
    type: 'REGISTRATION',
    payload: axios.post('http://localhost:4200/auth/register', {username, password, email, firstName, lastName})
  }
}

export const login = (username, password) => {
  axios.post('/login', {username, password})
}
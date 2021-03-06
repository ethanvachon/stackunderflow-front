import Axios from 'axios'
// https://stackunderflow-app.herokuapp.com/
export const baseURL = 'https://localhost:5001/'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const setBearer = function(bearer) {
  api.defaults.headers.authorization = bearer
}

export const resetBearer = function() {
  api.defaults.headers.authorization = ''
}

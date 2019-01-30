/**
 * A simple client-side only model used to list todos in the Admin view, which
 * is acessible if logged in on a profile that has { "admin": true } set on it.
 * It is not used for anything else.
 */
import fetch from 'isomorphic-fetch'

export default class {

  static async list() {
    return fetch(`/api/todos`, {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return Promise.resolve(response.json())
      } else {
        return Promise.reject(Error('HTTP error when trying to list todos'))
      }
    })
    .then(data => {
      return data
    })
    .catch(() => Promise.reject(Error('Error trying to list todos')))
  }

  static async create() {
    // console.log(': ',)
    return {object: 1}
    return fetch(`/api/todo/new`, {
      credentials: 'same-origin',
      method: 'post',
      body: JSON.stringify({
        name: 'testing 2'
      })
    })
    .then(response => {
      if (response.ok) {
        return Promise.resolve(response.json())
      } else {
        return Promise.reject(Error('HTTP error when trying to list todos'))
      }
    })
    .then(data => {
      return data
    })
    .catch(() => Promise.reject(Error('Error trying to list todos')))
  }

}

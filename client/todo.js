/**
 * A simple client-side only model used to list todos in the Admin view, which
 * is acessible if logged in on a profile that has { "admin": true } set on it.
 * It is not used for anything else.
 */
import fetch from 'isomorphic-fetch'

const URL = 'http://localhost:3000';

export default class {

  static async list() {
    return fetch(`${URL}/api/todos`, {
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

  static async findByListId(listId) {
    return fetch(`${URL}/api/todos?list_id=${listId}`, {
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
    .catch((err) => {
      console.log('err: ',err)
      return Promise.reject(Error('Error trying to list todos'))
    })
  }

  static async create(params) {
    // console.log('create params: ',params)

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return fetch(`${URL}/api/todo/create`, {
      credentials: 'include',
      method: 'POST',
      headers: headers,
      body: JSON.stringify(params)
    })
    .then(async response => {
      // console.log('create response: ',response)
      if (response.ok) {
        return Promise.resolve(response.json())
      } else {
        return Promise.reject(Error('HTTP error when trying to list todos'))
      }
    })
    .catch(() => Promise.reject(Error('Error trying to list todos')))
  }

  static async update(params) {
    // console.log('create params: ',params)

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return fetch(`${URL}/api/todo/edit`, {
      credentials: 'include',
      method: 'POST',
      headers: headers,
      body: JSON.stringify(params)
    })
    .then(async response => {
      // console.log('create response: ',response)
      if (response.ok) {
        return Promise.resolve(response.json())
      } else {
        return Promise.reject(Error('HTTP error when trying to list todos'))
      }
    })
    .catch(() => Promise.reject(Error('Error trying to list todos')))
  }

}

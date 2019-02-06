import fetch from 'isomorphic-fetch'

const URL = 'http://localhost:3000';

export default class {

  static async findOne(listId) {
    return fetch(`${URL}/api/listById?list_id=${listId}`, {
      credentials: 'same-origin',
    })
    .then(response => {
      // console.log('response: ',response)
      if (response.ok) {
        return Promise.resolve(response.json())
      } else {
        return Promise.reject(Error('HTTP error when trying to get list'))
      }
    })
    .then(data => {
      return data
    })
    .catch(() => Promise.reject(Error('Error trying to get the list')))
  }

  static async list() {
    return fetch(`${URL}/api/lists`, {
      credentials: 'same-origin'
    })
    .then(response => {
      // console.log('response: ',response)
      if (response.ok) {
        return Promise.resolve(response.json())
      } else {
        return Promise.reject(Error('HTTP error when trying to list lists'))
      }
    })
    .then(data => {
      return data
    })
    .catch(() => Promise.reject(Error('Error trying to list lists')))
  }

  static async create(params) {
    // console.log('create params: ',params)

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return fetch(`${URL}/api/list/create`, {
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
        return Promise.reject(Error('HTTP error when trying to create lists'))
      }
    })
    .catch(() => Promise.reject(Error('Error trying to create lists')))
  }

  static async update(params) {
    // console.log('create params: ',params)

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return fetch(`${URL}/api/list/edit`, {
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
        return Promise.reject(Error('HTTP error when trying to edit lists'))
      }
    })
    .catch(() => Promise.reject(Error('Error trying to edit lists')))
  }

}

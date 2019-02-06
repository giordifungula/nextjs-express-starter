/**
 * A simple client-side only model used to list users in the Admin view, which
 * is acessible if logged in on a profile that has { "admin": true } set on it.
 * It is not used for anything else.
 */
import fetch from 'isomorphic-fetch'

export default class {

  static async list({
    page = 0,
    size = 10
  } = {}) {
    return fetch(`/api/admin/users?page=${page}&size=${size}`, {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error('HTTP error when trying to list users')
      }
    })
  }

  // SAME THING
  //
  // static async list({
  //   page = 0,
  //   size = 10
  // } = {}) {
  //   const response = await fetch(`/api/admin/users?page=${page}&size=${size}`, {
  //     credentials: 'same-origin'
  //   });

  //   if (response.ok) {
  //     return response.json()
  //   } else {
  //     throw Error('HTTP error when trying to list users')
  //   }
  // }
}

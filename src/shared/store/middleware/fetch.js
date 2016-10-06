import fetch from 'isomorphic-fetch'
import { normalize } from 'normalizr'

// Action key that carries API call info interpreted by this Redux middleware.
export const FETCH_API = 'Fetch API'

export default function fetchMiddleware() {
  return (dispatch, getState) => {
    return next => action => {

      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const fetchAction = action[FETCH_API]
      if (typeof fetchAction === 'undefined') {
        return next(action)
      }

      const { config, types, schema, ...rest } = fetchAction; // eslint-disable-line no-redeclare

      const [REQUEST, SUCCESS, FAILURE] = types;

      // note: begin/complete props added for asyncs module support
      const begin = REQUEST
      const complete = REQUEST

      next({...rest, type: REQUEST, begin})

      const path = config.path || '/'
      const method = config.method || 'GET'
      const headers = config.headers
      const body = config.body
      const mode = config.mode || ''
      const responsePreHandler = config.responsePreHandler

      return fetch(path, {
        mode, method, headers,
        body: JSON.stringify(body)
      })
      .then( response => response.json() )
      .then( res => {
        if(responsePreHandler) {
          return responsePreHandler(res)
        }
        return res
      })
      .then(res => {
        const result = normalize(res, schema)
        return next({...rest, result, type: SUCCESS, complete})
      })
      .catch(error => {
        debug('fetch error:', error)
        return next({...rest, error, type: FAILURE, complete})
      })
    }
  }
}

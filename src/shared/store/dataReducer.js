import merge from 'lodash/merge'

export default function reducer(state = {}, action = {}) {
  switch(action.type) {
  case '@forte-exp/PAGE_LOAD':
    return {...state, ...action.data}
  case 'FETCH_SUCCESS':
    return merge({}, state, action.result.entities)
  }
  return state
}

export default function reducer(state = {}, action = {}){
  switch(action.type) {
  case '@forte-exp/PAGE_LOAD':
    return {...state, ...action.data}
  }
  return state
}
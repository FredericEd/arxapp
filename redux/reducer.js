import {combineReducers} from 'redux';
import {UPDATE_USER, UPDATE_CONTACT, UPDATE_LOADER, UPDATE_CASA} from './actions';

const contactReducer = (state = [], action) => {
  if (action.type === UPDATE_CONTACT) return [...state, action.payload]
  return state;
}

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return action.payload;
        default:
            return state;
    }
}
const casaReducer = (state = {}, action) => {
  switch (action.type) {
      case UPDATE_CASA:
          return action.payload;
      default:
          return state;
  }
}
const loaderReducer = (state = false, action) => {
  if (action.type === UPDATE_LOADER) return action.payload;
  return state;
}

const reducer = combineReducers({
  usuario: userReducer,
  contacts: contactReducer,
  casa: casaReducer,
  loader: loaderReducer,
})

export default reducer;
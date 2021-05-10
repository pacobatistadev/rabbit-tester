import { credentials as AT } from '../types/actionTypes';
import { Reducer, ReducerAction } from './reducer.type'

const initialState = {
  uri: ""
}

const credentialsReducer: Reducer<typeof initialState> = (state = initialState, action: ReducerAction) => {
  switch(action.type) {
    case AT.SET_URI: {
      return {
        uri: action.payload
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default credentialsReducer
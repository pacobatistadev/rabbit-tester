import { requests as AT } from "../types/actionTypes";
import { Reducer, ReducerAction } from "../types/generics";
import { Request, RequestStore } from "../types/requests";
import { v4 as uuid } from "uuid";
import _ from "lodash";

const initialState: RequestStore = {
  items: [],
  selected: null,
};

const credentialsReducer: Reducer<RequestStore, Request> = (
  state: RequestStore = initialState,
  action
) => {
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case AT.ADD_REQUEST: {
      const newRequest = _.cloneDeep<Request>(action.payload);
      newRequest.id = uuid();

      newState.items.push(newRequest);
      newState.selected = newRequest;

      return newState;
    }
    case AT.PUT_REQUEST: {
      debugger
      const index = newState.items.findIndex(
        (req) => req.id === action.payload.id
      );

      if (index >= 0) {
        newState.items[index] = action.payload;
      }

      if (newState.selected?.id === action.payload.id) {
        newState.selected = action.payload
      }
      return newState;
    }
    case AT.DELETE_REQUEST: {
      const index = newState.items.findIndex(
        (req) => req.id === action.payload.id
      );

      if (index >= 0) {
        newState.items.splice(index, 1);
      }
      if (newState.selected?.id === action.payload.id) {
        newState.selected = null;
      }
      return newState;
    }
    case AT.SELECT_REQUEST: {
      // Get the index of the selected request so we can get its reference
      const index = newState.items.findIndex(
        (req) => req.id === action.payload.id
      );

      if (index >= 0) {
        newState.selected = action.payload;
      }

      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default credentialsReducer;

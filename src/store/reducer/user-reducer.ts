import { Action } from "../action";
import { USER_DELETE, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_UPDATE } from "../action/user-action";
import { UserModel } from "../../app/users/user.model";
import { createReducer, on } from "@ngrx/store";
import * as ActionTypes from '../action/user-action';
export interface UserReducerState {
  loading: boolean;
  loaded: boolean;
  users: UserModel[];
}

const initialState: UserReducerState = {
  loaded: false,
  loading: false,
  users: []
};
export const userReducer = createReducer(
  initialState,
  on(ActionTypes.loadRequestAction, (state: any, { id }: any) => ({
    ...state,
    isLoading: true
  })),

  on(ActionTypes.loadSuccessAction, (state) => ({
    ...state,
    isLoading: false,
  })),


  on(ActionTypes.updateRequestAction, state => ({
    ...state,
    isLoading: true
  })),

  on(ActionTypes.updateSuccessAction, (state, { item }) => ({
    ...state,
    isLoading: false,
    selectedBook: item,
    error: null
  })),


  on(ActionTypes.deleteRequestAction, state => ({
    ...state,
    isLoading: true
  })),

  on(ActionTypes.deleteSuccessAction, (state, { id }) => ({
    ...state,
    isLoading: false,
    users: state.users.filter(x => x.id != id)
  })),
);

export function UserReducer(state = initialState, action: Action): UserReducerState | any {
  switch (action.type) {
    case USER_LIST_REQUEST: {
      return { ...state, loading: true };
    }
    case USER_LIST_SUCCESS: {
      const udpatedUser = state.users.concat(action.payload.data);
      return { ...state, loading: false, loaded: true, users: udpatedUser };
    }
    case USER_DELETE: {
      const Users = state.users.filter(data => data.id !== action.payload.id);
      return { ...state, ...{ Users } };
    }
    case USER_UPDATE: {
      const Users = state.users.filter(data => data.id !== action.payload.data.id)
      const updatedUser = Users.concat(action.payload.data);
      return { ...state, ...{ users: updatedUser } };

    }
    default: {
      return state;
    }
  }
}

//selectors

export const getLoading = (state: UserReducerState) => state.loading;
export const getLoaded = (state: UserReducerState) => state.loaded;
export const getUsers = (state: UserReducerState) => state.users;
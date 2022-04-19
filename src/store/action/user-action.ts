import { createAction, props } from "@ngrx/store";
import { UserModel } from "src/app/users/user.model";

export const USER_LIST_REQUEST = 'user list request';
export const USER_LIST_SUCCESS = 'user list success';
export const USER_DELETE = 'user delete';
export const USER_UPDATE = 'user update';

export enum ActionTypes {
  LOAD_REQUEST = '[User] Load Request',
  LOAD_FAILURE = '[User] Load Failure',
  LOAD_SUCCESS = '[User] Load Success',

  UPDATE_REQUEST = '[User] Update',
  UPDATE_FAILURE = '[User] Update Failure',
  UPDATE_SUCCESS = '[User] Update Success',

  DELETE_REQUEST = '[User] Delete',
  DELETE_FAILURE = '[User] Delete Failure',
  DELETE_SUCCESS = '[User] Delete Success'
}

export class UserListRequestAction {
  readonly type = USER_LIST_REQUEST;
}

export class UserDeleteAction {
  readonly type = USER_DELETE;

  constructor(public payload?: { id: number }) {
  }
}


export class UserUpdateAction {
  readonly type = USER_UPDATE;

  constructor(public payload?: { data: UserModel }) {
  }
}

export class UserListSuccessAction {
  readonly type = USER_LIST_SUCCESS;

  constructor(public payload?: { data: UserModel[] }) {
  }


}

// load users
export const loadRequestAction = createAction(
  ActionTypes.LOAD_REQUEST
);
export const loadSuccessAction = createAction(
  ActionTypes.LOAD_SUCCESS,
  props<{ items: UserModel[] }>()
);
// update
export const updateRequestAction = createAction(
  ActionTypes.UPDATE_REQUEST,
  props<{ item: any }>()
);

export const updateFailureAction = createAction(
  ActionTypes.UPDATE_FAILURE,
  props<{ error: string }>()
);

export const updateSuccessAction = createAction(
  ActionTypes.UPDATE_SUCCESS,
  props<{ item: any }>()
);

// delete
export const deleteRequestAction = createAction(
  ActionTypes.DELETE_REQUEST,
  props<{ id: number }>()
);

export const deleteFailureAction = createAction(
  ActionTypes.DELETE_FAILURE,
  props<{ error: string }>()
);

export const deleteSuccessAction = createAction(
  ActionTypes.DELETE_SUCCESS,
  props<{ id: number }>()
);

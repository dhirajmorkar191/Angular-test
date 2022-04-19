import { Injectable } from "@angular/core";
import { UserService } from "src/app/users/user.service";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { deleteRequestAction, deleteSuccessAction, loadRequestAction, loadSuccessAction, updateRequestAction, updateSuccessAction } from "../action/user-action";
import { map, switchMap } from "rxjs";
@Injectable()
export class UserEffects {

    constructor(private userService: UserService, private actions$: Actions) { }

    loadUsersEffects$ = createEffect(() => this.actions$.pipe(
        ofType(loadRequestAction),
        switchMap(action => {
            return this.userService.loadUsers().pipe(
                map((items: any[]) => {
                    return loadSuccessAction({ items })
                }),
            )
        })
    ))

    updateUserEffect$ = createEffect(() => this.actions$.pipe(
        ofType(updateRequestAction),
        switchMap(action => {
            return this.userService.updateData(action.item).pipe(
                map((item: any) => {
                    return updateSuccessAction({ item })
                }),
            )
        })
    ))

    deleteUserEffect$ = createEffect(() => this.actions$.pipe(
        ofType(deleteRequestAction),
        switchMap(action => {
            return this.userService.deleteUser(action.id).pipe(
                map((item: any) => {
                    return deleteSuccessAction({ id: action.id })
                }),
            )
        })
    ))
}
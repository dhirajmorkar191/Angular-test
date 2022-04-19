import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserModel } from './users/user.model';
import { UserService } from './users/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { getUserLoaded, getUserLoading, getUsers, RootReducerState } from '../store/reducer';
import { UserDeleteAction, UserListRequestAction, UserListSuccessAction, UserUpdateAction } from '../store/action/user-action';
import { combineLatest } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularTest';
  userData: any = [];
  userForm = new FormGroup({
    id: new FormControl(''),
    fullname: new FormControl(''),
    gender: new FormControl(''),
  });





  constructor(private http: HttpClient, private store: Store<RootReducerState>, private userService: UserService) { }

  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    const loading$ = this.store.select(getUserLoading);
    const loaded$ = this.store.select(getUserLoaded);
    const getUserData = this.store.select(getUsers);
    combineLatest([loaded$, loading$]).subscribe((data) => {
      if (!data[0] && !data[1]) {
        this.store.dispatch(new UserListRequestAction());
        this.userService.loadUsers().subscribe(data => {
          this.store.dispatch(new UserListSuccessAction({ data }));
        })
      }
    })

    getUserData.subscribe((data) => {
      this.userData = data
    })
  }
  deleteUser(id: number) {
    if (confirm('Are you sure want to delete user?')) {
      this.userService.deleteUser(id).subscribe((data) => {
        this.store.dispatch(new UserDeleteAction({id}));
        window.location.reload()
      })
    }
    
  }


  onUpdate() {
    this.userService.updateData(this.userForm.value).subscribe((data) => {
      this.store.dispatch(new UserUpdateAction(this.userForm.value));
      window.location.reload();
    })


  }
  onEditClick(user:any) {
    this.userForm.get('id')?.patchValue(user.id)
    this.userForm.get('fullname')?.patchValue(user.fullname)
    this.userForm.get('gender')?.patchValue(user.gender)
  }
}

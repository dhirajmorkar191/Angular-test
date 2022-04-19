import { Injectable } from "@angular/core";
import{HttpClient} from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Update } from '@ngrx/entity';
import { UserModel } from "./user.model";
@Injectable()
export class UserService{
    constructor (private http:HttpClient){}

    loadUsers(): Observable<UserModel[]> {
        return this.http.get("http://localhost:3000/users").pipe(map(data => data as UserModel[]));
    }
    updateUser(post:Update<UserModel>):Observable<UserModel>{
        return this.http.put<UserModel>(
            "http://localhost:3000/users"+"/"+post.id,
            {...post.changes}
        )
    }
    updateData(data:any) {
        return this.http.put(
          `http://localhost:3000/users/${data.id}`,
          data
        );
      }
    deleteUser(id:number):Observable<number>{
        return this.http.delete<number>("http://localhost:3000/users"+"/"+id);
    }
}
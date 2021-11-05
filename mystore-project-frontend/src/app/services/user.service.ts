import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http'; // access the HTTP methods to make requests to a server via an API
import { AuthenticateUserRes } from '../models/AuthenticateUserRes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  USER_STORAGE_KEY = 'USER_STORAGE_KEY'

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private http: HttpClient) {
      // initialize user in session storage
      if ( !this.storage.has(this.USER_STORAGE_KEY) ) {
        this.storage.set(this.USER_STORAGE_KEY, new User)
      }
  }

  isUserLoggedIn(): boolean {
    // inspect the User model for token
    return this.getUser().token !== ''
  }

  login(firstName: string, lastName: string, password: string): Observable<AuthenticateUserRes> {
    // call backend API to authenticate user
    const requestBody = {
      firstname: firstName,
      lastname: lastName,
      password: password
    }
  
    return this.http.post<AuthenticateUserRes>('http://mystorebackend-env-2.eba-upfexrmm.us-east-1.elasticbeanstalk.com/users/login', requestBody)
  }
  
  createAccount(firstName: string, lastName: string, password: string): Observable<AuthenticateUserRes> {
    // call backend API to create user
    const requestBody = {
      firstname: firstName,
      lastname: lastName,
      password: password
    }
  
    return this.http.post<AuthenticateUserRes>('http://mystorebackend-env-2.eba-upfexrmm.us-east-1.elasticbeanstalk.com/users/register', requestBody)
  }

  getUser(): User {
    // get user from session storage
    return this.storage.get(this.USER_STORAGE_KEY)
  }

  setUser(u: AuthenticateUserRes): void {
    const user:User = this.getUser()
    user.id = u.user.id
    user.firstName = u.user.firstname
    user.lastName = u.user.lastname
    user.token = u.token
    this.storage.set(this.USER_STORAGE_KEY, user)
  }

  logout(): void {
    this.storage.set(this.USER_STORAGE_KEY, new User)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserUrls } from 'src/app/config/ServiceUrls';
import { LoginRequest } from 'src/app/Interfaces/LoginRequest';
import { UpdatePasswordRequest } from 'src/app/Interfaces/UpdatePasswordRequest';
import { User } from 'src/app/Interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getReferees(){
    return this.http.get(UserUrls.getRefereesUrl());
  }

  createUser(user : User){
    return this.http.post(UserUrls.createUserUrl(), user);
  }

  login(loginRequest : LoginRequest){
    return this.http.post(UserUrls.loginUrl(), loginRequest);
  }

  forgetPassword(email: string){
    return this.http.get(UserUrls.forgetPasswordUrl(email));
  }

  updatePassword(model : UpdatePasswordRequest){
    return this.http.post(UserUrls.updatePasswordUrl(),model);
  }
}

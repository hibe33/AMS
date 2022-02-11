import { Injectable } from '@angular/core';
8
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  setSessionId(id : string){
    localStorage.setItem("session-id", id);
  }

  setSessionRole(role : string){
    localStorage.setItem("session-role", role);
  }

  getSessionId(){
    return localStorage.getItem("session-id");
  }

  getSessionRole(){
    return localStorage.getItem("session-role");
  }

  getSessionName(){
    return localStorage.getItem("session-name");
  }

  setSessionName(name : string){
    localStorage.setItem("session-name", name);
  }

  clearSession(){
    localStorage.clear();
  }

  isSessionExist(){
    if (localStorage.getItem("session-id")) {
      return true;
    }
    return false;
  }
}

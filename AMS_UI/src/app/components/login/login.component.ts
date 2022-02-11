import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/Backend/user.service';
import { SessionService } from 'src/app/services/Browser/session.service';
import { ToastService } from 'src/app/services/Browser/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidePass = true;
  loggingIn = false;

  email : string;
  password : string;
  
  constructor(private userService : UserService, private toast: ToastService,
    private session : SessionService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.loggingIn = true;
    this.userService.login({UserName : this.email, Password : this.password}).subscribe(res => {
      this.toast.writeMessage('success', "Login successfull !. Welcome", 2);
      let sessionVal = <{Role : string, Id : number, FullName: string}>res
      this.session.setSessionId(sessionVal.Id.toString());
      this.session.setSessionRole(sessionVal.Role);
      this.session.setSessionName(sessionVal.FullName);
      this.loggingIn = false;
      if (sessionVal.Role.toLowerCase() === "referee") {
        this.router.navigateByUrl("Referee")
      }
      else{
        this.router.navigateByUrl("ArticlePool")
      }
    }, err => {
      this.toast.writeMessage('danger', "Error occured !", 2)
      this.loggingIn = false;
    })
  }

}

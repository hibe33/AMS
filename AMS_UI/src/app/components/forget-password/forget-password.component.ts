import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/Backend/user.service';
import { SessionService } from 'src/app/services/Browser/session.service';
import { ToastService } from 'src/app/services/Browser/toast.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private userService : UserService, private toast : ToastService, private router : Router) { }

  email : string ;
  sendingMail : boolean = false;

  ngOnInit(): void {
  }

  sendNewPass(){
    this.sendingMail = true;
    this.userService.forgetPassword(this.email).subscribe(res => {
      this.toast.writeMessage('success', "New mail successfully sended !", 3);
      this.sendingMail = false;
      setTimeout(() => {
        this.router.navigateByUrl("Login");
      }, 2000);
    }, err => {
      this.toast.writeMessage('danger', "Please check mail adress !", 3);
      this.sendingMail = false;
    });
  }

}

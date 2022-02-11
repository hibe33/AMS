import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/Backend/user.service';
import { SessionService } from 'src/app/services/Browser/session.service';
import { ToastService } from 'src/app/services/Browser/toast.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  constructor(private toast : ToastService, private session : SessionService, private router : Router, private userService : UserService) { }

  updating : boolean = false;
  hidePass = true;

  newPass : string;
  newPassAgain : string;
  oldPass : string;

  ngOnInit(): void {
  }

  updatePassword(){
    if (this.newPass !== this.newPassAgain) {
      this.toast.writeMessage("danger", "Password validation is not matching !",4);
      return;
    }
    let userId : number = +this.session.getSessionId();
    this.userService.updatePassword(
        {UserId : userId, NewPassword : this.newPass, OldPassword : this.oldPass}
      ).subscribe(res => {
        this.toast.writeMessage("success", "Password sucessfully updated.",3);
        this.session.clearSession();
        setTimeout(() => {
          this.router.navigateByUrl("Login");
        }, 2500);
      }, err => {
        this.toast.writeMessage("danger", "Password updating failed, Please check your current password.",4);
      })
  }

}

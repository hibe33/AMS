import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/User';
import { UserService } from 'src/app/services/Backend/user.service';
import { ToastService } from 'src/app/services/Browser/toast.service';

@Component({
  selector: 'app-add-referee',
  templateUrl: './add-referee.component.html',
  styleUrls: ['./add-referee.component.css']
})
export class AddRefereeComponent implements OnInit {

  selectedRole = "Admin"
  userSending = false;

  constructor(private userService : UserService, private toast: ToastService, private router: Router) { }

  ngOnInit(): void {
  }

  onClickSubmit(formData){
    
    this.userSending = true;
    var data : User = {
      FirstName : formData.firstName,
      LastName : formData.lastName,
      Mail : formData.mail,
      Title : formData.title,
      Phone : formData.phone.toString(),
      Role : this.selectedRole,
      Id : 0
    }

    console.log(formData);

    this.userService.createUser(data).subscribe(res => {
      console.log(res)
      this.toast.writeMessage('success', "User creation successfull.", 3);
      this.userSending = false;
      this.router.navigateByUrl('/ArticlePool')
    }, err => {
      this.toast.writeMessage('danger', "Error Occurred."+ <string>err, 4);
      console.log(err)
      this.userSending = false;
    });
  }

}

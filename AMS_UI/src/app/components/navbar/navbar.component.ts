import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/Browser/session.service';
import { ToastService } from 'src/app/services/Browser/toast.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public session : SessionService, private toast: ToastService, private router : Router) { }

  userName : string;

  ngOnInit(): void {
  }

  logout(){
    this.session.clearSession();
    this.toast.writeMessage('info', "Logout Successfull", 3);
    this.router.navigateByUrl("Login");
  }

  navaigatUpdatePass(){
    this.router.navigateByUrl("UpdatePassword");
  }

}

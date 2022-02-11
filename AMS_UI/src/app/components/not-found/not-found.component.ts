import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/Browser/session.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private session : SessionService, private router : Router) { }

  ngOnInit(): void {
  }

  goMain(){
    let sessionRole = this.session.getSessionRole()
    if (sessionRole && sessionRole.toLowerCase() === "referee") {
      this.router.navigateByUrl("Referee")
    }
    else if(sessionRole && sessionRole.toLowerCase() === "admin"){
      this.router.navigateByUrl("ArticlePool")
    }
    else{
      this.router.navigateByUrl("Login")
    }
  }

}

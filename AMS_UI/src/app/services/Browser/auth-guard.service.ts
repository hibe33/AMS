import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SessionService } from './session.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private session: SessionService, private router: Router, private toast:ToastService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let logged = this.session.isSessionExist();

    if (logged) {
      return true;
    }
    else{
      this.toast.writeMessage('danger', "PERMISSON DENIED !!!", 4);
      this.router.navigateByUrl("Login");
      return false;
    }
  }
}

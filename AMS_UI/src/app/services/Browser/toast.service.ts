import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export declare type ToastType = 'danger' | 'warning' | 'info' | 'success' | 'notification' | 'mode_change';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private _snackBar: MatSnackBar) { }

  private write(
    message: string,
    action:string = "",
    durationInSeconds: number,
    horizontalPosition: MatSnackBarHorizontalPosition,
    verticalPosition: MatSnackBarVerticalPosition,
    panelClass:string[] | string = ["text-danger", "bg-dark"]
    ){
      this._snackBar.open(message, action,{
        duration: durationInSeconds * 1000,
        panelClass: panelClass,
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition
      });
    }

  writeMessage(type:ToastType, message:string, duration:number, action:string="", horizontalPosition: MatSnackBarHorizontalPosition = 'center', verticalPosition: MatSnackBarVerticalPosition = 'bottom'){
    let messagePanelClass:string[] | string;
    switch (type) {
      case 'danger':
        messagePanelClass="info-danger";
        break;
      case 'info':
        messagePanelClass="info-default";
        break;
      case 'success':
        messagePanelClass="info-success";
        break;
      case 'warning':
        messagePanelClass="info-warning";
        break;
      case 'notification':
        messagePanelClass="notification-message";
        break;
      default:
        messagePanelClass="info-default";
        break;
    }
    this.write(message,action, duration,horizontalPosition,verticalPosition,messagePanelClass);
  }

}

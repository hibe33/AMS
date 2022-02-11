import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Modules/material/material.module';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { LoadDocumentComponent } from './components/load-document/load-document.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { ArticlePoolComponent } from './components/article-pool/article-pool.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ArticleDetailDialogComponent } from './components/article-detail-dialog/article-detail-dialog.component';
import { RefereeComponent } from './components/referee/referee.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfReaderDialogComponent } from './components/pdf-reader-dialog/pdf-reader-dialog.component';
import { AddRefereeComponent } from './components/add-referee/add-referee.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AuthGuardService } from './services/Browser/auth-guard.service';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    LoginComponent,
    LoadDocumentComponent,
    ArticlePoolComponent,
    NotFoundComponent,
    ArticleDetailDialogComponent,
    RefereeComponent,
    PdfReaderDialogComponent,
    AddRefereeComponent,
    ForgetPasswordComponent,
    UpdatePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatFileUploadModule,
    PdfViewerModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

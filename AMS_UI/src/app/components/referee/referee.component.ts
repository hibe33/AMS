import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleLight } from 'src/app/Interfaces/Article';
import { ArticleService } from 'src/app/services/Backend/article.service';
import { SessionService } from 'src/app/services/Browser/session.service';
import { ToastService } from 'src/app/services/Browser/toast.service';
import { PdfReaderDialogComponent } from '../pdf-reader-dialog/pdf-reader-dialog.component';

@Component({
  selector: 'app-referee',
  templateUrl: './referee.component.html',
  styleUrls: ['./referee.component.css']
})
export class RefereeComponent implements OnInit {

  articles : Array<ArticleLight> = [];
  loadingArticles = false;

  constructor(
    public dialog: MatDialog,
    private toast: ToastService,
    private articleService : ArticleService,
    private session : SessionService) { }

  ngOnInit(): void {
    this.loadingArticles = true;
    this.articleService.getRefereeArticles(this.session.getSessionId()).subscribe(res => {
      this.articles = <ArticleLight[]>res;
      this.loadingArticles = false;
    }, err => {
      this.toast.writeMessage('danger', "Error occured while loading articles.", 4);
      this.loadingArticles = false;
    });
  }

  seeDetails(article : ArticleLight)
  {
    this.openDialog(article);
  }

  openDialog(data : ArticleLight): void {
    const dialogRef = this.dialog.open(PdfReaderDialogComponent, {
      width: '7000px',
      data: data,
    });

    this.toast.writeMessage('info' , "Loading Article Details... ", 2)

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Article, ArticleLight } from 'src/app/Interfaces/Article';
import { ArticleService } from 'src/app/services/Backend/article.service';
import { SessionService } from 'src/app/services/Browser/session.service';
import { ToastService } from 'src/app/services/Browser/toast.service';


@Component({
  selector: 'app-pdf-reader-dialog',
  templateUrl: './pdf-reader-dialog.component.html',
  styleUrls: ['./pdf-reader-dialog.component.css']
})
export class PdfReaderDialogComponent implements OnInit {

  dataLoaded : boolean = false;
  articleData : Article;
  errorOccured : boolean = false;

  scoreInput : number = 0;
  commentInput : string =""; 

  reviewed = true;

  rateControl = new FormControl("", [Validators.max(100), Validators.min(0)])

  pdfSrc = "";
  
  constructor(
    public dialogRef: MatDialogRef<PdfReaderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ArticleLight,
    private articleService : ArticleService,
    private toast : ToastService,
    private session : SessionService
  ) {}

  ngOnInit(): void {
    this.articleService.getArticleById(this.data.Id).subscribe(res => {
      this.articleData = <Article>res;
      this.pdfSrc = `http://localhost:5000/articles/${this.articleData.FileName}`;
      this.dataLoaded = true;
      this.toast.writeMessage('success', "Article successfully loaded.", 1);
      this.checkIfReviewed();
    }, err => {
      this.toast.writeMessage('danger', "Failed to load articles.", 2);
      this.errorOccured = true;
      console.log(err);
    })

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  writeReview(){
    if (this.commentInput !== "") {
      var refereeId: number = +this.session.getSessionId();
      this.articleService.rewiewArticle({
        ArticleId : this.articleData.Id,
        RefereeId : refereeId,
        Score : this.scoreInput,
        Comment : this.commentInput
      }).subscribe(res => {
        this.toast.writeMessage("success", "Review Sended !", 4);
        this.onNoClick();
      }, err =>{
        this.toast.writeMessage("danger", "Review sending failed !", 4);
      });
    }
  }

  checkIfReviewed(){
    console.log(this.articleData);
    let comments = this.articleData.ArticleComments;
    for (let index = 0; index < comments.length; index++) {
      if (comments[index].Referee.Id.toString() == this.session.getSessionId() && comments[index].Comment) {
        console.log("SESSION ID", this.session.getSessionId());
        this.reviewed = true;
        this.commentInput = comments[index].Comment;
        this.scoreInput = comments[index].Score;
        return;
      }
    }
    this.reviewed = false;
  }

}

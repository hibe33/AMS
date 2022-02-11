import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Article, ArticleLight } from 'src/app/Interfaces/Article';
import { ArticleService } from 'src/app/services/Backend/article.service';
import { ToastService } from 'src/app/services/Browser/toast.service';


@Component({
  selector: 'app-article-detail-dialog',
  templateUrl: './article-detail-dialog.component.html',
  styleUrls: ['./article-detail-dialog.component.css']
})
export class ArticleDetailDialogComponent implements OnInit {

  dataLoaded : boolean = false;
  articleData : Article;
  errorOccured : boolean = false;

  pdfSrc = "";

  constructor(
    public dialogRef: MatDialogRef<ArticleDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ArticleLight,
    private articleService : ArticleService,
    private toast : ToastService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.articleService.getArticleById(this.data.Id).subscribe(res => {
      this.articleData = <Article>res;
      this.pdfSrc = `http://localhost:5000/articles/${this.articleData.FileName}`;
      this.dataLoaded = true;
      this.toast.writeMessage('success', "Article successfully loaded.", 1);
    }, err => {
      this.toast.writeMessage('danger', "Failed to load articles.", 2);
      this.errorOccured = true;
    })

  }

  getDetailedArticle(articleLight : ArticleLight)
  {
    this.articleService.getArticleById(articleLight.Id).subscribe(res => {
      this.articleData = <Article>res;
    });
  }

}

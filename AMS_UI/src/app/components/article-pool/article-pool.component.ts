import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ArticleLight } from 'src/app/Interfaces/Article';
import { RedirectArticleModel } from 'src/app/Interfaces/RedirectArticleModel';
import { Referee, RefereeLight } from 'src/app/Interfaces/Referee';
import { ArticleService } from 'src/app/services/Backend/article.service';
import { UserService } from 'src/app/services/Backend/user.service';
import { ToastService } from 'src/app/services/Browser/toast.service';
import { ArticleDetailDialogComponent } from '../article-detail-dialog/article-detail-dialog.component';

@Component({
  selector: 'app-article-pool',
  templateUrl: './article-pool.component.html',
  styleUrls: ['./article-pool.component.css']
})
export class ArticlePoolComponent implements OnInit {

  displayedColumns: string[] = ['id', 'authorName', 'title', 'state'];
  dataSource : MatTableDataSource<ArticleLight>;
  clickedRows = new Set<ArticleLight>();
  referees = new Set<RefereeLight>();
  refereesFormControl = new FormControl();
  articleSending : boolean = false;

  constructor(
    public dialog: MatDialog, 
    private articleService : ArticleService,
    private userService: UserService,
    private toast : ToastService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.loadReferees();
    this.loadArticles()
  }

  loadReferees(){
    this.userService.getReferees().subscribe(res => {
      this.referees = new Set<RefereeLight>(<RefereeLight[]>res);
    }, err => {
      this.toast.writeMessage('danger', "Error occurred while loading Referees !", 3)
    });
  }

  loadArticles(){
    this.articleService.getArticles(true).subscribe( res => {
      this.dataSource = new MatTableDataSource(<ArticleLight[]>res)
    }, err => {
      this.toast.writeMessage('danger', "Error occurred while loading Articles !", 3)
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  selectArticle(article : ArticleLight)
  {
    if (this.clickedRows.has(article)) {
      this.clickedRows.delete(article);
    }
    else{
      this.clickedRows.add(article);
    }
  }

  seeDetails(article : ArticleLight)
  {
    this.openDialog(article);
  }

  openDialog(data : ArticleLight): void {
    const dialogRef = this.dialog.open(ArticleDetailDialogComponent, {
      width: '700px',
      data: data,
    });

    this.toast.writeMessage('info' , "Loading Article Details... ", 2)

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  removeArticle(article): void {
    this.clickedRows.delete(article);
  }

  redirectArticles(){

    if (this.refereesFormControl.value === null || this.refereesFormControl.value.length <= 0 ) {
      this.toast.writeMessage("danger", "You have to choose at least one referee!", 3);
      return;
    }

    if (this.clickedRows.size <= 0) {
      this.toast.writeMessage("danger", "You have to choose at least article!", 3);
      return;
    }

    this.articleSending = true;


    let modelLength = this.clickedRows.size * this.refereesFormControl.value.length;
    let articlesWithReferees: RedirectArticleModel[] = new Array(modelLength);
    let indexCounter = 0;
    for (let article of this.clickedRows) {
      for (let indexInner = 0; indexInner < this.refereesFormControl.value.length; indexInner++) {
        articlesWithReferees[indexCounter] = {
          ArticleId : article.Id,
          RefereeId : this.refereesFormControl.value[indexInner].Id
        }
        indexCounter++;
      }
    }

    console.log(articlesWithReferees);

    this.articleService.redirectArticle(articlesWithReferees).subscribe(res => {
      this.toast.writeMessage('success', "Articles sent successfully !", 3)
      this.articleSending = false;
    }, err => {
      this.toast.writeMessage('danger', "Error occurred. Please. An article has already been sent to the referees!", 5)
      this.articleSending = false;
    });
  }

}

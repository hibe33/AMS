import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleUrls } from 'src/app/config/ServiceUrls';
import { Article, ReviewModel } from 'src/app/Interfaces/Article';
import { RedirectArticleModel } from 'src/app/Interfaces/RedirectArticleModel';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  constructor(private http : HttpClient) { }

  public getArticles(withLightDtos : boolean) {
    return this.http.get(ArticleUrls.getArticlesUrl(withLightDtos));
  }

  public getRefereeArticles(refereeId : string) {
    return this.http.get(ArticleUrls.getRefereeArticlesUrl(refereeId));
  }

  public getArticlesByFilter(withLightDtos : boolean, filter : string) {
    return this.http.get(ArticleUrls.getArticlesUrl(withLightDtos,filter));
  }

  public getArticleById(articleId : number) {
    return this.http.get(ArticleUrls.getArticleByIdUrl(articleId));
  }

  public createArticle(article) {
    return this.http.post(ArticleUrls.createArticleUrl(), article);
  }  

  public deleteArticle(articleId : number){
    return this.http.delete(ArticleUrls.deleteArticleUrl(articleId));
  }

  public updateArticle(article : Article) {
    return this.http.put(ArticleUrls.updateArticleUrl(article.Id), article);
  }

  public uploadArticleFile(articleFile) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(ArticleUrls.uploadArticleFileUrl(), articleFile);
  }

  public redirectArticle(articlesWithReferees : RedirectArticleModel[]) {
    return this.http.post(ArticleUrls.redirectArticleUrl(), articlesWithReferees);
  }

  public rewiewArticle(review : ReviewModel) {
    return this.http.post(ArticleUrls.reviewArticleUrl(), review);
  }
}

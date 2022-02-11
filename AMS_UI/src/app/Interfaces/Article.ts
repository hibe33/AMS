import { Referee } from "./Referee";

export interface ArticleLight {
    Id : number;
    AuthorName: string;
    Title : string;
    State: string;
}

export interface Article {
    Id : number;
    AuthorFirstName : string;
    AuthorLastName : string;
    AuthorPhone : string;
    AuthorMail : string;
    Title : string;
    CreateDate : string;
    FileName : string;
    State : string;
    ArticleComments : ArticleComments[];
    AuthorNotes : string;
}

export interface ArticleComments{
    Referee : Referee;
    Comment : string;
    Score : number;
    Date : string;
}

export interface ReviewModel{
    ArticleId :number;
    RefereeId :number;
    Comment : string;
    Score : number 
}
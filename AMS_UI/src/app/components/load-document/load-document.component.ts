import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm, FormGroupDirective, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { finalize, mergeMap, takeUntil, take, catchError, flatMap } from 'rxjs/operators';
import { ArticleService } from 'src/app/services/Backend/article.service';
import { ToastService } from 'src/app/services/Browser/toast.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-load-document',
  templateUrl: './load-document.component.html',
  styleUrls: ['./load-document.component.css']
})
export class LoadDocumentComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  requiredFormControl = new FormControl('', [Validators.required]);

  didUploadedPdfFile = true;

  articleFile : FormData;

  loading = false;

  returnedFileName : string;

  uploadForm: FormGroup; 

  constructor(private toast : ToastService, private articleSerivce: ArticleService,
    private formBuilder: FormBuilder, private router : Router) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }

  handleFileInput(fileEvent: any) {
    let file : File = fileEvent.target.files[0];
    if (file.type !== "application/pdf") {
      this.didUploadedPdfFile = false
    }
    else{
      this.didUploadedPdfFile = true
      this.uploadForm.get('profile').setValue(file);
    }
  }

  sendFile(formData){
    const formDataFile = new FormData();
    formDataFile.append('article', this.uploadForm.get('profile').value);

    var fileUploadResult = this.articleSerivce.uploadArticleFile(formDataFile).subscribe(res => {
      this.returnedFileName = (<{addedFile : string}>res).addedFile;
      console.log(res);
    }, err => {
      this.toast.writeMessage('danger', "Upload failed. Please check your input !!", 4);
      this.loading = false;
    });

    setTimeout(() => {
      console.log(this.returnedFileName);
      this.articleSerivce.createArticle(
        {
          Title : formData.title,
          AuthorFirstName : formData.firstName,
          AuthorLastName : formData.lastName,
          AuthorMail : formData.email,
          AuthorNotes : formData.extras,
          AuthorPhone : formData.phone,
          FileName : this.returnedFileName
        }).subscribe(res => {
          this.toast.writeMessage('success', "Upload Successfull !", 4);
          this.loading = false;
          console.log(res);
        }, err => {
          this.toast.writeMessage('danger', "Upload failed. Please check your input !!", 4);
          this.loading = false;
        });
        
    }, 2000);
  }

  onClickSubmit(formData){
    if(!this.didUploadedPdfFile){
      this.toast.writeMessage('danger', "Only PDF files are accepted !!", 4);
      return;
    }
    this.loading = true;

    this.sendFile(formData);
    
  }

  matcher = new MyErrorStateMatcher();
}

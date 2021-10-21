import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { ArticleService } from './../common/articleService';
import { CreationArticle } from './../model/creationArticle';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(
    private serviceArt : ArticleService,
   
    private formB: FormBuilder) { }
   

  public artcileForm: any;

  public initForm() {
    this.artcileForm = this.formB.group({
    name: ['',[Validators.required,Validators.maxLength(45),Validators.minLength(3)]],
    content: ['',[Validators.required,Validators.minLength(3)]],
  });
   
  }
  
 

  ngOnInit(): void {
    this.initForm()
    
  }


  onsubmit() {
    
    const name: string = this.artcileForm.get('name').value;

    const content: string = this.artcileForm.get('content').value;

    let article:CreationArticle = new CreationArticle(name, content);

 console.log(article);

    this.serviceArt.createArticle(article).subscribe(
      data => {
        console.log(data);
      }


    );

}

}

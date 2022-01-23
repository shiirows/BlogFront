import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../common/AdminService';
import { ArticleService } from '../common/articleService';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(  private serviceArticle: ArticleService, private adminService : AdminService) { }


public continentsList : any[] ;
public continentsId: number;
public paysid: number;
public affichePaysSupr : string
public paysForm: FormGroup;


public paysList : any[] =[] // liste des pays







// contien les article par continent 
 
// -------------------------------------------------- appel de nos continents pour les placer dans le select --------------------------------------------------
  public getContinent(): any { 
    this.serviceArticle.getContinentList().subscribe(
      (data) => {
        this.continentsList = data;
        
      },
      (error) => {
        console.log(error);
      }
    );

    
  }


// -------------------------------------------------- on place l'id du pays dans la variable paysid--------------------

  public onChange2(event :any ) {
   this.paysid = event;
   console.log(this.paysid)
}





  public initForm() {
    this.paysForm = new FormGroup({
      pays: new FormControl('',( Validators.required, Validators.minLength(3))  )

    });
  }
  


 ngOnInit(): void {
    this.getContinent()
    this.initForm()
}



public onChangeContinents(event :any ) {
  this.continentsId = event;
}


 

// -------------------------------------------------- appel la liste des pays par continent --------------------

public onChange(event :any ) {
    this.continentsId = event;
    this.serviceArticle.getPays(event).subscribe(
      (data) => {
        this.paysList = data;
       
      },
      (error) => {
        console.log(error);
      }
    );
    
}


//------------------------------------------------------Ajoute un nouveau pays dans notre API ---------------------------


public onSubmit() {
  const pays: string = this.paysForm.get('pays').value;
  this.adminService.createPays( pays, this.continentsId ).subscribe(
    (data) => {
      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );

  
  console.log(pays)
}

// -------------------------------------------------- Modifie un pays --------------------------------------------------







public onSubmit2(){
  const pays: string = this.paysForm.get('pays').value;
  console.log(this.paysid + " " + pays)
  this.adminService.updatePays( pays, this.paysid ).subscribe(
    (data) => {
      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );
  location.reload();
}


//------------------------------------------------------Supprime un pays dans notre API ---------------------------

public onChange3(event :any ) {

  this.paysid = event;


}

public supr(){
  this.adminService.deletePays(this.paysid).subscribe(
    (data) => {
      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );
  location.reload();
}

}



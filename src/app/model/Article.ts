export class Article {
    public id : number;
    public titre: string;
    public content: string;
    public createdate: String;
    
  



    constructor(titre: string, content: string, createdate: String, id : number ) { 

        this.id = id;
        this.titre = titre;
        this.content = content;
        this.createdate = createdate;
    }




}
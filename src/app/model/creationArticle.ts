export class CreationArticle {
    public titre: string;
    public content: string;
    public pays: number;
    public continents: number;
  



    constructor(titre: string, content: string, pays: number, continents: number)  { 
        this.titre = titre;
        this.content = content;
        this.pays = pays;
        this.continents = continents;
    }


}
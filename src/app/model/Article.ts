export class Article {
    public id : number;
    public titre: string;
    public content: string;
    public createdate: number;
    public files : string;
    public name : string;
    public firstname : string;
    public avatar : string;
    public continents : any;
    public pays : any;
    

    constructor( id: number, titre: string, content: string, createdate: number, files : string,
              name : string, firstname : string, avatar : string, continents : any, pays : any) {

        this.id = id;
        this.titre = titre;
        this.content = content;
        this.createdate = createdate;
        this.files = files;
        this.name = name;
        this.firstname = firstname;
        this.avatar = avatar;
        this.continents = continents;
        this.pays = pays;
    }

 public getAvatar() {
    return this.avatar;
  }

    public getFiles() {
        return this.files;
    }

    public getId() {
        return this.id;
    }

    public getTitre() {
        return this.titre;
    }

    public getContent() {
        return this.content;
    }

    public getCreatedate() {
        return this.createdate;
    }

    public getName() {
        return this.name;
    }

    public getFirstname() {
        return this.firstname;
    }

    public getContinents() {
        return this.continents;
    }

    public getPays() {
        return this.pays;
    }

    public setId(id: number) {
        this.id = id;
    }

    public setTitre(titre: string) {
        this.titre = titre;
    }

    public setContent(content: string) {
        this.content = content;
    }

    public setCreatedate(createdate: number) {
        this.createdate = createdate;
    }

    public setFiles(files: string) {
        this.files = files;
    }

    public setName(name: string) {
        this.name = name;
    }

    public setFirstname(firstname: string) {
        this.firstname = firstname;
    }

    public setContinents(continents: any) {
        this.continents = continents;
    }

    public setPays(pays: any) {
        this.pays = pays;
    }

    public setAvatar(avatar: string) {
        this.avatar = avatar;
    }





}
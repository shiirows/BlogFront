export class UtilisateurInscription {
 
    public username: string;
    public name : string;
    public firstname: string;
    public password: string;
    public email: string;


    constructor(name : string, firstname: string, username: string, password: string, email: string) { 
      
        this.username = username;
        this.name = name;
        this.firstname = firstname;
        this.password = password;
        this.email = email;
    }


}
export class UtilisateurInscription {
 
    public username: string;
    public lastname : string;
    public firstname: string;
    public password: string;
    public email: string;


    constructor(lastname : string, firstname: string, username: string, password: string, email: string) { 
      
        this.username = username;
        this.lastname = lastname;
        this.firstname = firstname;
        this.password = password;
        this.email = email;
    }


}
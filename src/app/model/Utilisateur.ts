export class Utilisateur {
    public id:number;
     public number_phone : number;
    public city: string;
    public country: string;
    public description: string 
    public email: string;
   
    public password: string;
    public username: string;

    constructor(email: string, password: string, username: string, city: string,
         country: string, description: string)  { 
        
       
        this.email = email;
        this.password = password;
        this.username = username;
        this.city = city;
        this.country = country;
        this.description = description;
        
        
    }
    
    public setUsername(username: string): string {
       return  this.username = username;
    }

    public setEmail(email: string): string {
        return this.email = email
    }

}
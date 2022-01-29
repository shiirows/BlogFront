export class Utilisateur {
    public id:number;
     public numberPhone : number;
    public city: string;
    public country: string;
    public description: string 
    public email: string;
    public name : string;
    public firstname: string;
    public avatar: string;
   
    public password: string;
    public username: string;

    constructor(email: string, password: string, username: string, city: string,
         country: string, description: string , name : string , firstname: string , avatar: string )  { 
        
       
        this.email = email;
        this.password = password;
        this.username = username;
        this.city = city;
        this.country = country;
        this.description = description;
        this.avatar = avatar;
        
        
    }
    
   

}
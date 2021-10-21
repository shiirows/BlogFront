export class Utilisateur {
    public id:number=0;
    public city: string;
    public country: string;
    public description: string 
    public email: string;
    public number_phone : number;
    public password: string;
    public username: string;

    constructor(email: string, password: string, username: string, city: string,
         country: string, description: string, number_phone: number)  { 
        
       
        this.email = email;
        this.password = password;
        this.username = username;
        this.city = city;
        this.country = country;
        this.description = description;
        this.number_phone = number_phone;
        
    }
    
    public setUsername(username: string): string {
       return  this.username = username;
    }

    public setEmail(email: string): string {
        return this.email = email
    }

}
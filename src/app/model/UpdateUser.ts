export class User {

   
    public number_phone : number;


    public city: string;
    public country: string;
    public description: string 
    public name : string;
    public firstname: string;


   
    

    constructor(  firstname: string, city: string,  country: string, description: string , name: string, number_phone : number,  )  { 
        
       
    
        this.number_phone = number_phone;    
        this.city = city;
        this.country = country;
        this.description = description;
        this.name = name;
        this.firstname = firstname;
        
       
        
        
    }
    
   

}
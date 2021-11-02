export class User {

    public id: number;
    
    public city: string;
    public country: string;
    public description: string 
    public number_phone : number;


   
    

    constructor(  city: string, number_phone : number, country: string, description: string
     ,id: number   )  { 
        
       
        
     
        this.number_phone = number_phone;    
        this.city = city;
        this.country = country;
        this.description = description;
        this.id = id;
       
        
        
    }
    
   

}
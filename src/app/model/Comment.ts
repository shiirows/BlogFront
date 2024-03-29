export class commentaire {


    public id: number;
    public comment: string;
    public date: Date;
    public avatar: string;
    public lastname: string;
    public firstname: string;
    
    constructor(id: number, comment: string, date: Date,   avatar: string, lastname: string, firstname: string) {
        this.id = id;
        this.comment = comment;
        this.date = date;
        this.avatar = avatar;
        this.lastname = lastname;
        this.firstname = firstname;
    }

    //getter et setter

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getComment(): string {
        return this.comment;
    }

    public setComment(comment: string): void {
        this.comment = comment;
    }

    public getDate(): Date {
        return this.date;
    }

    public setDate(date: Date): void {
        this.date = date;
    }

    public getAvatar(): string {
        return this.avatar;
    }

    public setAvatar(avatar: string): void {
        this.avatar = avatar;
    }

    public getName(): string {
        return this.lastname;
    }

    public setName(lastname: string): void {
        this.lastname = lastname;
    }

    public getFirstname(): string {
        return this.firstname;
    }

    public setFirstname(firstname: string): void {
        this.firstname = firstname;
    }

    


}

export class CreateUpdateContactCommand {
    constructor() { }

    public id: string;
    public firstName: string;
    public surname: string;
    public address: string;
    public phoneNumber: string;
    public iban: string;
    public dateOfBirth: Date;
}
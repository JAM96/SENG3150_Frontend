export class EndUserProfile {
    constructor (
    public userID : string,
    public username : string,
    public userType: string,
    public dateCreated : string,
    public lastActive : string,
    public firstName : string,
    public lastName : string,
    public password : string,
    public email : string,

    public streetNo : string,
    public streetName : string,
    public city : string,
    public state : string,
    public country : string,
    public homeNo : string,
    public mobileNo : string,
    public birthDay : number,
    public birthMonth : number,
    public birthYear : number,
    public purchaseCount : number,
    public voucherCount : number,
    public familySize : number,
    public active : boolean,
    public deletionPeriod : string
    ){}
}
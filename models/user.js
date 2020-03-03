export default class User{
    constructor(options){
        this.first_name = options.first_name;
        this.last_name = options.last_name;
        this.email = options.email.toLowerCase();
        this.plainPassword = options.password
    }
}
var Respo = /** @class */ (function () {
    function Respo() {
    }
    return Respo;
}());
var User = /** @class */ (function () {
    function User(id, username, actualname, location, organization, email, img, 
    // 头像
    exp, 
    // 经验
    info, intro) {
        this.id = id;
        this.username = username;
        this.actualname = actualname;
        this.location = location;
        this.organization = organization;
        this.email = email;
        this.img = img;
        this.exp = exp;
        this.info = info;
        this.intro = intro;
    }
    return User;
}());
var response = JSON.stringify(new Respo());
console.log(typeof (response));
var a = new User(13, 'test');
var b = new User(19, 'yjw');
var c = { data: [a,], info: b };
console.log(JSON.stringify(c));
console.log(JSON.stringify(new User(1, '66')));

var Mock = require('mockjs')
var Random = Mock.Random;

module.exports = function() {
    var data = { users: [] }
    // Create 1000 users
    for (var i = 0; i < 100; i++) {
        data.users.push({ 
            id: i+1, 
            name: Random.name(),
            actualname: Random.name(),
            location: Random.city(),
            organization:Random.sentence(),
            email:Random.email(),
            img:Random.image(),
            about:Random.string(),
            exp:Random.string(),
            info:{
                followings:Random.natural(1,100),
                followers:Random.natural(1,100),
                likes:Random.natural(1,100),
                reports:Random.natural(1,100)
            },
            intro:Random.string()
        })
    }
    return data
  }


/*
{
    id: number;
    name: string;
    actualname: string;
    location: string;
    organization: string;
    email: string;
    img: string;
    about: string;
    exp: string;
    info: {
        followings: number;
        followers: number;
        likes: number;
        reports: number;
    };
    intro: string;
}
*/

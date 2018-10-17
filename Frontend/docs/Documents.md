# 用户类

### Me

**已登录**

```json
{
    "id": 5,
    "followed": false,
    "last_login": "2018-09-13T19:09:14.359089+08:00",
    "username": "test_2",
    "actualname": "",
    "organization": "",
    "email": "volltin@live.com",
    "avatar_url": "https://www.gravatar.com/avatar/276e1d84373bb09fa8f1145ac61f3570?s=328&r=g&d=identicon",
    "address": "",
    "site_url": "",
    "description": ""
}
```

**未登录**

```json
{
    "detail": "Not found."
}
```



### 失败

**用户名密码空**

```json
{
    "message": {
        "password": [
            "This field may not be blank."
        ],
        "username": [
            "This field may not be blank."
        ]
    },
    "success": false,
    "data": null
}
```
**用户名密码错误**
```json
{
    "message": {
        "non_field_errors": [
            "Username or password is incorrect."
        ]
    },
    "success": false,
    "data": null
}
```
**用户名不为空密码空**
```json
{
    "message": {
        "password": [
            "This field may not be blank."
        ]
    },
    "success": false,
    "data": null
}
```
### 成功
```json
{
    "message": "OK!",
    "success": true,
    "data": {
        "id": 1,
        "last_login": "2018-09-13T18:20:58.513437+08:00",
        "username": "test",
        "actualname": "",
        "organization": "",
        "email": "test@test.com",
        "avatar_url": "https://www.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=328&r=g&d=identicon",
        "address": "",
        "site_url": "",
        "description": ""
    }
}
```
## Register
### 失败

**密码不符合要求,用户名重复,邮箱空**

```json
// request
{
    "username": "test_1",
    "password": "a123456",
    "email": "test_1@test.com"
}
// response
{
    "message": {
        "password": [
            "Password should contain both numbers and English letters, with the length no less than 6 and no more than 20."
        ],
        "username": [
            "A user with that username already exists."
        ],
        "email": [
            "This field may not be blank."
        ]
    },
    "success": false,
    "data": null
}
```

**密码，用户名，邮箱错**

```json
// request
{
    "username": "test1",
    "password": "10",
    "email": "eofjiies"
}
// response
{
    "message": {
        "password": [
            "Password should contain both numbers and English letters, with the length no less than 6 and no more than 20."
        ],
        "username": [
            "A user with that username already exists."
        ],
        "email": [
            "Enter a valid email address."
        ]
    },
    "success": false,
    "data": null
}
```

### 成功

```json
// request
{
    "username": "test_1",
    "password": "a123456",
    "email": "test_1@test.com"
}
// response
{
    "message": "OK!",
    "success": true,
    "data": {
        "id": 4,
        "last_login": "2018-09-13T19:08:25.195728+08:00",
        "username": "test_1",
        "actualname": "",
        "organization": "",
        "email": "test_1@test.com",
        "avatar_url": "https://www.gravatar.com/avatar/63594402c17f83ce1e353513033b9a68?s=328&r=g&d=identicon",
        "address": "",
        "site_url": "",
        "description": ""
    }
}	
```



#　动作类

## Follow

### 失败





### 成功

```json
// response
{
    "success": true,
    "data": null,
    "message": "OK!"
}
```




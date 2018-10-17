## UserInfoProfileComponent组件介绍

这个组件类似siminfo组件，但是展示了更多信息

userinfoprofile: UserInfoProfile 需要以下的输入

```
export class UserInfoProfile {
  reports_number:number;
  following_number:number;
  followers_number:number;
  praises_number:number;
  location:string;
  email:string;
  organization:string;
  user_name:string;
  follow_or_unfollow:string;
  isVisible:boolean;
  follow_or_edit:boolean; // 设定这个按钮是follow还是edit，true时时follow，false时是edit
}
```

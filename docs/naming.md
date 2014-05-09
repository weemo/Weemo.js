# API Naming Rules

## Contents

* [Application Identifier](naming.md#wiki-application-identifier)
* [Uid](naming.md#uid)
* [Token](naming.md#token)
* [Display Name](naming.md#display-name)

### Application Identifier

N-character Application Identifier (provided by Weemo) <br/>

This referrer should be the Application Identifier set into Weemo Allocation database.

Referrer forbidden characters: 

```
  [space] 
# [hash]
% [percent]
& [amper]
+ [plus]
```

### Token 

Token is a unique identifier used for authentication process

* Min size = 6 characters; 
* Max size = 90 characters; 
* Authorized characters:  UTF8 - unicode - basic Latin, except: & " # \ % ? [space]

> <font color="red" size="+1">Case sensitive, no space character.

### Uid

UID is User Identifier

* Min size = 6 characters; 
* Max size = 90 characters; 
* Authorized characters: UTF8 - unicode - basic Latin, except: & " # \ % ? [space]

> <font color="red" size="+1">Case sensitive, no space character.

Correct UID examples:
* user_a
* user_b
* 123456
* john-smith@domain.com
* 123456-john-s

Bad UID examples:
* user a
* JoHn SmitH
* 999
* my_user %a

### Display Name 

Display Name is the user displayed name on call window<br/>

* String – max 127 characters<br/>
* Not Null<br/>
* UTF-8 Characters execpt: " ' 
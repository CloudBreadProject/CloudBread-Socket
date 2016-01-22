# Authentication

## Obtaining Token

```js
fetch.post(`/auth`)
```

### Params
* identifier: user's email or username
* password

### Response
* accessToken
* expireDate

## Test Token

Add `Authorization` header with `Bearer ${your token}`

```js
fetch.get(`/auth/token`)
```

# User

## Sign Up

```js
fetch.post(`/users`)
```

### Params
* email
* username
* password
* nickname

### Response
* user
	* username
	* nickname
	* email
* token
	* accessToken
	* expireDate
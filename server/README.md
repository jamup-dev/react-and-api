# Dummy API Server

This is a dummy REST API Server for our learning purpose. This has been forked
from [samie820](https://github.com/samie820/hooks-state-management-backend)'s
repository.

## GETTING STARTED

Clone this repository and install dependencies

```bash
yarn install
```

Now run the server with

```bash
yarn start
```

## API ENDPOINT

> `http://localhost:8000/api`

### `/login` Route (`POST`)

> `http://localhost:8000/api/login`

Do a `POST` request with following URLEncoded Form Data. Since we don't have
any database associated with it, it only accepts the following hardcoded values.

- `username` - _admin_
- `password` - _password_

This will return a JSON response of following structure

```json
{
  "success": true,
  "message": "Authentication successful!",
  "token": "some secret token",
  "user": {
    "firstName": "Admin",
    "lastName": "User"
  }
}
```

### `/songs` Route (`GET`)

> `http://localhost:8000/api/songs`

This is a protected route and would need the following Authentication header.

```
Authorization: Bearer <token>
```

Do a `GET` request with the above header and it will return following JSON.

```json
[
  {
    "id": 1,
    "name": "LOST IN TIME",
    "albumArt": "https://res.cloudinary.com/schms/image/upload/v1560029436/albumart2.png",
    "artist": "HOOKED",
    "rating": 5
  }
]
```

# URLake
NodeJS service to short URLs

Requirements:
 * [NodeJS](https://nodejs.org/en/download/) 
 * [MongoDB](https://www.mongodb.com/download-center) 

## Database
The chosen Database for this project is [MongoDB](https://www.mongodb.com/download-center) .

THe application will use 2 environment variables to access the Database: 

 * MONGODB_HOST
 * MONGODB_PORT

Set these and you're ready to go!

## Server
To install and run the application you'll need 2 simple steps: 

```javascript
From the project folder!
$ npm install
$ node server.js
```

Thats it, nows it's time to use the services!

## Tests
To run tests

```javascript
From the project folder!
$ npm test
```

Thats it, nows it's time to use the services!

## Endpoints


### GET /urls/:id
Redirect to the URL registered for the :id
```json
GET localhost:3005/urls/58defbbf96e87920900b63ce
```

### POST /users/:userid/urls
Register a new URL for the :userid user
```json
POST localhost:3005/users/jibao2
body: { "url": "https://github.com/anderson-amorim/URLake" }
```
Returns the new added URL as a JSON
```json
{
  "__v": 0,
  "url": "https://github.com/anderson-amorim/URLake",
  "_id": "58dffa23e61caf0af85e7e02",
  "shortUrl": "localhost:3005/WIhWGI",
  "user": {
    "_id": "58dec85985e28324f49460bb",
    "username": "jibao2",
    "__v": 0,
    "date": "2017-03-31T21:21:29.533Z"
  },
  "hits": 0,
  "date": "2017-04-01T19:06:11.761Z"
}
```

### GET /stats
Returns the general statistics of the system
```json
GET localhost:3005/stats
```

```json
{
  "hits": 495,
  "urlCount": 42,
  "topUrls": [
    {
      "_id": "58defbbf96e87920900b63ce",
      "url": "https://github.com/anderson-amorim/URLake",
      "shortUrl": "localhost:3005/mfS1DI",
      "user": "58dec85985e28324f49460bb",
      "__v": 0,
      "hits": 92,
      "date": "2017-04-01T01:00:47.876Z"
    },
    {
      "_id": "58defc2258e78031c424ad72",
      "url": "https://github.com/anderson-amorim/URLake2222",
      "shortUrl": "localhost:3005/aue2DI",
      "user": "58dec85985e28324f49460bb",
      "__v": 0,
      "hits": 42,
      "date": "2017-04-01T01:02:26.832Z"
    }
    ...
  ]
}
```

### GET /users/:userId
Similar to stat, returns the general statistics of the :userId user
```json
GET localhost:3005/users/jibao2
```

```json
{
  "hits": 135,
  "urlCount": 8,
  "topUrls": [
    {
      "_id": "58defbbf96e87920900b63ce",
      "url": "https://github.com/anderson-amorim/URLake",
      "shortUrl": "localhost:3005/mfS1DI",
      "user": "58dec85985e28324f49460bb",
      "__v": 0,
      "hits": 92,
      "date": "2017-04-01T01:00:47.876Z"
    },
    {
      "_id": "58defc2258e78031c424ad72",
      "url": "https://github.com/anderson-amorim/URLake2222",
      "shortUrl": "localhost:3005/aue2DI",
      "user": "58dec85985e28324f49460bb",
      "__v": 0,
      "hits": 42,
      "date": "2017-04-01T01:02:26.832Z"
    }
    ...
  ]
}
```

### GET /stats/:id
Returns the :id URL
```json
GET localhost:3005/stats/58defbbf96e87920900b63ce
```

```json
{
  "_id": "58defbbf96e87920900b63ce",
  "url": "https://github.com/anderson-amorim/URLake",
  "shortUrl": "localhost:3005/mfS1DI",
  "user": "58dec85985e28324f49460bb",
  "__v": 0,
  "hits": 92,
  "date": "2017-04-01T01:00:47.876Z"
}
```

### DELETE /urls/:id
Delete the :id URL
```json
DELETE localhost:3005/urls/58defbbf96e87920900b63ce
```

### POST /users/
Add a new user
```json
POST localhost:3005/users
body: { "username": "jibanelson" }
```
Returns the new added user
```json
{
  "__v": 0,
  "username": "jibanelson",
  "_id": "58dffe79cb20891180773746",
  "date": "2017-04-01T19:24:41.615Z"
}
```

### DELETE /user/:userId
Delete the :userId user
```json
DELETE localhost:3005/user/jibanelson
```

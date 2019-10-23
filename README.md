# html-host-service

Read more : [blog](https://hackernoon.com/vue-nuxt-firebase-auth-database-ssr-example-tutorial-facebook-login-setup-authentication-starter-app-a6dfde0133fc)

![alt text](https://miro.medium.com/max/1600/1*YU-y8w5pGS6RoumVtVJkbg.png "html-host-service")


## Setup Firebase keys
create `env.sh` in root directary, and setup your firebase key 
```
# ./env.sh
echo "set FIREBASE_API_KEY"
export FIREBASE_API_KEY="foo-key"
echo "set FIREBASE_AUTH_DOMAIN"
export FIREBASE_AUTH_DOMAIN="foo.firebaseapp.com"
echo "set FIREBASE_DB_URL"
export FIREBASE_DB_URL="https://foo.firebaseio.com"
echo "set FIREBASE_PROJECT_ID"
export FIREBASE_PROJECT_ID="foo"
echo "set FIREBASE_MESSAGEING_ID"
export FIREBASE_MESSAGEING_ID="foo-id"
echo "set FIREBASE_APP_ID"
export FIREBASE_APP_ID="app-id"
```

then run 
```
$ source env.sh
```

then run 
```
$ npm run dev
```


## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```


## Reference
 - [https://www.davidroyer.me/blog/nuxtjs-firebase-auth/](https://www.davidroyer.me/blog/nuxtjs-firebase-auth/)
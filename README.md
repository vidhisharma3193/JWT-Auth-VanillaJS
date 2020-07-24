# Auth with VanillaJS
## Using localstorage and JWT token

* **JWT token**: https://jwt.io/introduction/
* **LocalStorage**: Use the local storage API to store data locally that the browser can access later. Data is stored indefinitely, and must be a string. More details [here](https://gomakethings.com/using-localstorage-to-save-user-data-with-vanilla-javascript/).
* **Bearer token**: https://learning.postman.com/docs/sending-requests/authorization/#bearer-token

### Flow for setting up the Auth:
* `JWT token` will be generated on server side and sent to client, which will be stored inside `localstorage` for future `requests`
* `JWT token` will be generated when user `SignUp/LogIn`
* `JWT token` sent back to server with all other `requests` except(`SignUp/LogIn`) inside `headers` with `Bearer` keyword
* Server will take `JWT token` out of the `headers` of the `request` and `decode` it. If server able to `decode` the `token`, it will go to requested action method otherwise return error. 

### Steps to follow:
1. `gem install jwt`
2. In `ApplicationController`:
![](https://i.imgur.com/jhkVy2w.png)
    * `JWT.encode`takes 3 arguments => payload, secret, algorithm
    * 3rd argument is optional, by default the algo is `HS256`
3. QuerySelector function:
    ![](https://i.imgur.com/0qnSRJv.png)
4. For SignUp:(**Authentication**)
    * `backend`:
        * `create` action for `UsersController`:
        ![](https://i.imgur.com/72PFyWz.png)
        * If user is valid, `response` will be sent with `username` and `JWT token`
        * `JWT token` will be generated using `encode_token` method from `ApplicationController`
        * Payload: `{user_id: user.id}` because id is unique for each user
    * `frontend`:
        * `HTML` form:
        ![](https://i.imgur.com/guWDqTF.png)
        * `fetch` request for signUp:
        ![](https://i.imgur.com/KFb5AaO.png)
        * from `response` when we get back `JWT token` under a key called `token`, that can be stored inside `localstorage`. 
5. For LogIn:(**Authentication**)
    * `backend`:
        * `create` action for `AuthController`:
        ![](https://i.imgur.com/FxxFEP4.png)
    * `frontend`:
        * `HTML` form:
        ![](https://i.imgur.com/spzGKOW.png)
        * `fetch` request for LogIn:
        ![](https://i.imgur.com/weUVhbu.png)
6. Get data:(**Authorization**)
    * `frontend`:
        * `HTML` button:
        ![](https://i.imgur.com/rjLZEYJ.png)
        * `fetch` request for getting all the paintings:
        ![](https://i.imgur.com/7RXfTu6.png)
        * Since we are `LoggedIn`, we will have `JWT token` stored inside `localstorage`. 
        * `JWT token` with `Bearer` keyword sent back to server with all other `requests` except `LogIn/SignUp`.
        * **A note**: Now we will send `headers` with `get` requests also due to authorization.
    * `backend`:
        * In `ApplicationController`:
            ![](https://i.imgur.com/VBbaFal.png)
            * Get `JWT token` out of the `headers` of the `request`
            * Decode `JWT token` with same algo and secret
            * If user is found with the id from decoded `JWT token`, send to requested action method otherwise return error. 
            * before action:
            ![](https://i.imgur.com/LAfvIIM.png)
            * Restrict user from getting any other data without `LogIn`.
        * In `AuthController` and `UsersController`
            * skip before action:
            ![](https://i.imgur.com/h4xlpJx.png)
            * Make sure to skip before action for `LogIn and SignUp`.

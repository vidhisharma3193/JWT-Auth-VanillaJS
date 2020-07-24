function qs(selector){
    return document.querySelector(selector)
}

const signUpForm = qs("form#signUp")
const login = qs("form#login")
const btn = qs("button#getPaintings")

// Sign up
signUpForm.addEventListener("submit",() => {
    
    event.preventDefault()

    fetch("http://localhost:3000/api/v1/users", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                username: event.target[0].value,
                password: event.target[1].value
            })
        })
    .then(res => res.json())
    // .then(console.log)
    .then(userInfo => {
        if(userInfo.token){
            localStorage.token = userInfo.token
            console.log(localStorage)
        }
    })
})

// Login
login.addEventListener("submit",() => {
    event.preventDefault()

    fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: event.target[0].value,
            password: event.target[1].value
        })
    })
    .then(res =>  res.json())
    // .then(console.log)
    .then(userInfo => {
        if(userInfo.token){
            localStorage.token = userInfo.token
            console.log(localStorage)
        }
    })
})

// authorization to get paintings
btn.addEventListener("click",() => {
    fetch("http://localhost:3000/api/v1/paintings",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}` // sending auth token
      } 
    })
    .then(res => res.json())
    .then(console.log)
})

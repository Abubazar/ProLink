var state = "login"
var username
var password

const title = document.getElementById("title")
const  button = document.getElementById("continue")


function switcher(){
    if (state=="login"){
        state="signup"
        title.textContent = "Create A New Account"
        button.textContent = "Create Account"
    }
else{
        state="login"
        title.textContent = "Log Into Your Account"
        button.textContent = "Log In"
    }
}
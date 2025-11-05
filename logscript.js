var state = "login"
var username
var password

const title = document.getElementById("title")
const  button = document.getElementById("continue")
const  switchBtn = document.getElementById("switch")
const  warn = document.getElementById("warning")

warn.style.display = "none"

function switcher(){
    if (state=="login"){
        state="signup"
        title.textContent = "Create A New Account"
        button.textContent = "Create Account"
        switchBtn.textContent = "Login To Account"
        warn.style.display = "block"
    }
    else{
        state="login"
        title.textContent = "Log Into Your Account"
        button.textContent = "Log In"
        switchBtn.textContent = "Create An Account"
        warn.style.display = "none"
    }
}
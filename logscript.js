
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyCoHt7broeKSJ6m7_zU9dOQ-M7nu4kLF84",
authDomain: "pictoram-a.firebaseapp.com",
databaseURL: "https://pictoram-a-default-rtdb.firebaseio.com",
projectId: "pictoram-a",
storageBucket: "pictoram-a.firebasestorage.app",
messagingSenderId: "906801586543",
appId: "1:906801586543:web:4c553e8e6b77d689ac489a",
measurementId: "G-19HYV7CZWM"
};

firebase.initializeApp(firebaseConfig)
var userDat
firebase.auth().onAuthStateChanged((user) =>{
    if (user){
        console.log("yes you are logged in")
        userDat = user
    }
    else{
        console.log("not logged")
    }
})

// firebase.auth().signInAnonymously().then(() =>{
//     console.log("logged In")
// })

const db = firebase.database()



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

function log(){
    firebase.auth().signInAnonymously().then(() =>{
    
        firebase.database().ref("usersnames/"+usr).on("child_added", (snapshot) =>{
        const key = snapshot.val().user
        const item = snapshot.val().text
        const list = document.getElementById('list')
        const copy = document.getElementById('can')
        const li = copy.cloneNode(true)
        li.querySelector('#carn').textContent = item +" by "+ key
        console.log(item)
        list.appendChild(li)
    })
    })
}
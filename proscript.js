
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
        userDat = user
        
    }
    else{
        window.location.href = "login.html";
    }
})

const db = firebase.database()

const userText = document.getElementById("user")

const miniDialog = document.getElementById("miniDialog")
const verText = document.getElementById("verText")
const verAnswer = document.getElementById("verAnswer")

const titleLink = document.getElementById("titleLink")
const urlLink = document.getElementById("urlLink")

if (localStorage.getItem("username")) {
  userText.textContent=localStorage.getItem("username")
}

var answer = null
function addLink(){
    let num1 = Math.floor(Math.random() * 15) + 1
    let num2 = Math.floor(Math.random() * 15) + 1
    answer = num1+num2
    miniDialog.style.visibility = "visible"
    verText.textContent= num1 + "+" + num2
    verAnswer.value=""
    titleLink.value=""
    urlLink.value=""
}

function cancel(){
    miniDialog.style.visibility = "hidden"
}

function accept(){
    if (verAnswer.value == answer){
        miniDialog.style.visibility = "hidden"
    }
}
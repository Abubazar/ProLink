
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
        window.location.href = "profile.html";
    }
    else{
        console.log("not logged")
    }
})

const db = firebase.database()



var state = "login"
var username
var password

const title = document.getElementById("title")
const  button = document.getElementById("continue")
const  switchBtn = document.getElementById("switch")
const  warn = document.getElementById("warning")

const  usernameData = document.getElementById("username")
const  passwordData = document.getElementById("password")

warn.style.display = "none"

function switcher(){
    document.getElementById('userwarn').style.display = "none"
    document.getElementById('passwarn').style.display = "none"

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

const names =[]

function log() {
  const username = usernameData.value.trim();
  const password = passwordData.value.trim();

  const userWarn = document.getElementById('userwarn');
  const passWarn = document.getElementById('passwarn');

  userWarn.style.display = "none";
  passWarn.style.display = "none";

  if (username.length <= 5) {
    userWarn.style.display = "block";
    userWarn.textContent = "Username too short";
    return;
  }
  if (password.length <= 7) {
    passWarn.style.display = "block";
    passWarn.textContent = "Password too short";
    return;
  }

  const usersRef = firebase.database().ref("users");

  if (state === "signup") {

    usersRef.once("value").then(snapshot => {
      let exists = false;
      snapshot.forEach(child => {
        const data = child.val();
        if (data.username === username) {
          exists = true;
        }
      });

      if (exists) {
        userWarn.style.display = "block";
        userWarn.textContent = "Username already taken";
      } else {

        firebase.auth().signInAnonymously()
          .then(() => {
            console.log("Anonymous account created");
            localStorage.setItem("username", username);
            window.location.href = "profile.html";

            usersRef.push({
              username: username,
              password: password
            });
          })
          .catch(err => console.error("Auth error:", err));
      }
    });
  }

  else if (state === "login") {
    usersRef.once("value").then(snapshot => {
      let found = false;
      snapshot.forEach(child => {
        const data = child.val();
        if (data.username === username && data.password === password) {
          found = true;
        }
      });

      if (found) {
        localStorage.setItem("username", username);
        firebase.auth().signInAnonymously()
          .then(() => {
            window.location.href = "profile.html";
            console.log("Sign in successful");
          })
      } else {
        passWarn.style.display = "block";
        passWarn.textContent = "Invalid username or password";
      }
    });
  }
}

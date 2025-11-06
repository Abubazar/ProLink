
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
firebase.auth().onAuthStateChanged((user) => {
  // Check if Firebase Auth has initialized
  if (navigator.onLine) {  // ✅ Only run if online
    if (user) {
      userDat = user;
    } else {
      window.location.href = "login.html";
    }
  } else {
    console.warn("Offline — skipping auth check.");
  }
});

const db = firebase.database()

const userText = document.getElementById("user")

const logoutBtn = document.getElementById("logout")
const acceptlog = document.getElementById("acceptlog")

const miniDialog = document.getElementById("miniDialog")
const verText = document.getElementById("verText")
const verAnswer = document.getElementById("verAnswer")

const titleLink = document.getElementById("titleLink")
const urlLink = document.getElementById("urlLink")

const titleError = document.getElementById("titleError")
const urlError = document.getElementById("urlError")

var username

if (localStorage.getItem("username")) {
  userText.textContent=localStorage.getItem("username")
  username = localStorage.getItem("username")
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
const linksRef = firebase.database().ref("links/"+username);

function accept(){
    if (verAnswer.value == answer){
        if (titleLink.value==""){titleError.style.display="inline"; urlError.style.display="none"}
        else{
            if (urlLink.value==""){urlError.style.display="inline"; titleError.style.display="none"}
            else{
                linksRef.push({
                    title:titleLink.value,
                    link:urlLink.value
                })
                
            }
        }
    }
}

const linkList = document.getElementById("list")
const linkEntry = document.getElementById("listitem")

linksRef.on("child_added", (snapshot) => {
  const data = snapshot.val();

  const addToList = linkEntry.cloneNode(true)
  addToList.querySelector('#linkTxt').textContent = data.title
  addToList.querySelector('#linkUrl').textContent = data.link
  linkList.appendChild(addToList)
  addToList.style.display="flex"

  addToList.querySelector('#linkDel').addEventListener("click", () => {
    if(addToList.querySelector('#linkDel').textContent=="Delete"){
      addToList.querySelector('#linkDelAccept').style.display="block"
      addToList.querySelector('#linkDel').textContent="Cancel"
    }
    else{
      addToList.querySelector('#linkDelAccept').style.display="none"
      addToList.querySelector('#linkDel').textContent="Delete"
    }
  });

  addToList.querySelector('#linkDelAccept').addEventListener("click", () => {
    addToList.remove()
    deleteFromDataBase(addToList.querySelector('#linkTxt').textContent,addToList.querySelector('#linkUrl').textContent)
  });


  if (data.title == titleLink.value) {
    miniDialog.style.visibility = "hidden";

  }
});



var logLatch = false
function logout(){
    if(logLatch){
        acceptlog.style.display="none"
        logoutBtn.textContent="Log Out"
        logLatch=false
    }
    else{
        acceptlog.style.display="inline"
        logoutBtn.textContent="Cancel"
        logLatch=true
    }
}

function acceptlogout(){
    firebase.auth().signOut()
}

function deleteFromDataBase(title,link){
  linksRef.once("value").then(snapshot => {
  snapshot.forEach(child => {
    const data = child.val();

    if (data.title === title && data.link === link) {
      linksRef.child(child.key).remove()
    }
  });
});
}

function copyLink(){
  navigator.clipboard.writeText(window.location.href)
  document.getElementById("copyLink").textContent="Copied!"
  setTimeout(() => {
  document.getElementById("copyLink").textContent="Copy My Link"
}, 2000);
}
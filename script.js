
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


const db = firebase.database()

const params = new URLSearchParams(window.location.search)
const username = params.get("u")


if (username) {

    const dbRef = firebase.database().ref("links/"+username)

    dbRef.once("value").then(snapshot => {
    if (snapshot.exists()) {
        addGottenLinks()
        document.getElementById("notFound").style.display="none"
    } else {
        noUserFound()
    }
    });

} else {
    noUserFound()
}

function noUserFound(){
    document.getElementById("complete").style.display="none"
}

function addGottenLinks(){
    document.getElementById("user-name").textContent=username

    const dbRef = firebase.database().ref("links/"+username)
    dbRef.on("child_added", (snapshot) => {
    const data = snapshot.val();
    const linkEntry = document.getElementById("item")
    const linkList = document.getElementById("complete")

    const addToList = linkEntry.cloneNode(true)
    addToList.textContent = data.title
    linkList.appendChild(addToList)
    addToList.style.display="flex"

    addToList.addEventListener("click", (e) => {
        window.window.location.href = data.link
    })

});
}
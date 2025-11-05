const miniDialog = document.getElementById("miniDialog")
const verText = document.getElementById("verText")
const VerAnswer = document.getElementById("verAnswer")

const titleLink = document.getElementById("titleLink")
const urlLink = document.getElementById("urlLink")


function addLink(){
    miniDialog.style.visibility = "visible"
    // verText.textContent=""
    verAnswer.value=""
    titleLink.value=""
    urlLink.value=""
}

function cancel(){
    miniDialog.style.visibility = "hidden"
}

function accept(){
    miniDialog.style.visibility = "hidden"
}
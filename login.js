document.getElementById("loginForm").addEventListener("submit",function(e){

e.preventDefault()

let username=document.getElementById("username").value
let password=document.getElementById("password").value

if(username && password){

window.location.href="homepage.html"

}

else{

alert("Please enter username and password")

}

})
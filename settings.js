function saveProfile(){

let name=document.getElementById("fullName").value;
let email=document.getElementById("email").value;
let phone=document.getElementById("phone").value;

alert(
"Profile Saved!\n\n"+
"Name: "+name+
"\nEmail: "+email+
"\nPhone: "+phone
);

}


function resetProfile(){

document.getElementById("fullName").value="Meghana Sai";
document.getElementById("email").value="meghana.sai@student.edu";
document.getElementById("phone").value="+91 9876543210";
document.getElementById("school").value="Springfield High School";

}


function setTheme(theme){

const themes={
purple:"Purple",
blue:"Blue",
green:"Green",
orange:"Orange"
};

alert("Theme changed to "+themes[theme]);

}
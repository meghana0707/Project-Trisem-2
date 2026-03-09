function addTask(){

let type=document.getElementById("taskType").value;
let title=document.getElementById("taskTitle").value;
let date=document.getElementById("taskDate").value;

if(title==="" || date===""){
alert("Please fill all fields");
return;
}

alert(type+" '"+title+"' added for "+date);

document.getElementById("taskTitle").value="";
document.getElementById("taskDate").value="";

}
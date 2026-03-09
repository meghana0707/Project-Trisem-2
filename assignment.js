let assignments=[
{
title:"Math Homework",
subject:"Mathematics",
priority:"high",
dueDate:"2026-03-10",
description:"Solve exercise problems",
completed:false
}
];

function renderAssignments(){

let list=document.getElementById("assignmentList");
list.innerHTML="";

let total=0,pending=0,completed=0,overdue=0;

let today=new Date().toISOString().split("T")[0];

assignments.forEach((a,index)=>{

total++;

if(a.completed) completed++;
else pending++;

if(a.dueDate<today && !a.completed) overdue++;

let div=document.createElement("div");
div.className="assignment";

div.innerHTML=`
<div>
<h4>${a.title}</h4>
<p>${a.subject} | ${a.dueDate}</p>
</div>

<div>
<button onclick="toggleComplete(${index})">✓</button>
<button onclick="deleteAssignment(${index})">🗑</button>
</div>
`;

list.appendChild(div);

});

document.getElementById("totalCount").textContent=total;
document.getElementById("pendingCount").textContent=pending;
document.getElementById("completedCount").textContent=completed;
document.getElementById("overdueCount").textContent=overdue;

}

function addAssignment(){

let title=document.getElementById("assignmentTitle").value;
let subject=document.getElementById("subject").value;
let priority=document.getElementById("priority").value;
let dueDate=document.getElementById("dueDate").value;
let description=document.getElementById("assignmentDesc").value;

if(title===""||dueDate===""){
alert("Fill required fields");
return;
}

assignments.push({
title,
subject,
priority,
dueDate,
description,
completed:false
});

renderAssignments();

document.getElementById("assignmentTitle").value="";
document.getElementById("assignmentDesc").value="";
}

function deleteAssignment(index){
assignments.splice(index,1);
renderAssignments();
}

function toggleComplete(index){
assignments[index].completed=!assignments[index].completed;
renderAssignments();
}

renderAssignments();
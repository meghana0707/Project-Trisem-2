let notes = [];

function addNote(){

let title=document.getElementById("noteTitle").value;
let subject=document.getElementById("noteSubject").value;
let content=document.getElementById("noteContent").value;

if(!title || !content){
alert("Please fill all fields");
return;
}

let note={
id:Date.now(),
title,
subject,
content,
date:new Date().toISOString().split("T")[0]
};

notes.unshift(note);

renderNotes();

document.getElementById("noteTitle").value="";
document.getElementById("noteContent").value="";

}

function renderNotes(){

const container=document.getElementById("notesContainer");

container.innerHTML="";

notes.forEach(note=>{

let card=document.createElement("div");

card.className="note-card";

card.innerHTML=`
<h4>${note.title}</h4>
<p>${note.content.substring(0,100)}...</p>
<p>${note.subject}</p>
<button onclick="viewNote(${note.id})">View</button>
<button onclick="deleteNote(${note.id})">Delete</button>
`;

container.appendChild(card);

});

}

function deleteNote(id){

notes=notes.filter(n=>n.id!==id);

renderNotes();

}

function viewNote(id){

let note=notes.find(n=>n.id===id);

document.getElementById("modalTitle").textContent=note.title;
document.getElementById("modalSubject").textContent=note.subject;
document.getElementById("modalContent").textContent=note.content;
document.getElementById("modalDate").textContent=note.date;

document.getElementById("noteModal").style.display="block";

}

function closeModal(){
document.getElementById("noteModal").style.display="none";
}

function filterNotes(){

let search=document.getElementById("searchInput").value.toLowerCase();
let subject=document.getElementById("subjectFilter").value;

let filtered=notes.filter(n=>{
return(
(n.title.toLowerCase().includes(search) ||
n.content.toLowerCase().includes(search)) &&
(!subject || n.subject===subject)
);
});

renderNotes(filtered);

}
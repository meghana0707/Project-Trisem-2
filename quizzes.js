function startQuiz(){
window.location.href="quizstart.html";
}

function retakeQuiz(){
window.location.href="quizstart.html";
}


function filterQuizzes(){

const subject=document.getElementById("subjectFilter").value;
const status=document.getElementById("statusFilter").value;
const search=document.getElementById("searchQuiz").value.toLowerCase();

const rows=document.querySelectorAll("#quizTable tbody tr");

rows.forEach(row=>{

const rowSubject=row.cells[1].textContent;
const rowTitle=row.cells[2].textContent.toLowerCase();
const rowStatus=row.cells[5].textContent;

let show=true;

if(subject && rowSubject!==subject) show=false;
if(status && !rowStatus.toLowerCase().includes(status.toLowerCase())) show=false;
if(search && !rowTitle.includes(search)) show=false;

row.style.display=show?"":"none";

});

}
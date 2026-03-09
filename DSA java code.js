// =============================
// CO2: ARRAY / LINKED LIST STRUCTURE
// =============================

class Assignment {
    constructor(subject, title, desc, priority, date) {
        this.subject = subject;
        this.title = title;
        this.desc = desc;
        this.priority = priority;
        this.date = date;
        this.completed = false;
    }
}

let assignments = [];   // Array structure


// =============================
// CO1: SEARCHING ALGORITHM
// Linear Search
// =============================

function searchAssignment(title) {

    for(let i=0;i<assignments.length;i++){

        if(assignments[i].title === title){
            return assignments[i];
        }

    }

    return null;
}


// =============================
// CO1: SORTING ALGORITHM
// Bubble Sort by Priority
// =============================

function sortAssignments(){

    for(let i=0;i<assignments.length;i++){

        for(let j=0;j<assignments.length-i-1;j++){

            if(assignments[j].priority > assignments[j+1].priority){

                let temp = assignments[j];
                assignments[j] = assignments[j+1];
                assignments[j+1] = temp;

            }

        }

    }

}


// =============================
// CO3: QUEUE (Notification Queue)
// =============================

let notificationQueue = [];

function enqueueNotification(msg){

    notificationQueue.push(msg);

}

function dequeueNotification(){

    if(notificationQueue.length>0){
        return notificationQueue.shift();
    }

    return null;
}


// =============================
// CO3: STACK (Undo operations)
// =============================

let undoStack = [];

function pushUndo(action){

    undoStack.push(action);

}

function undoLast(){

    if(undoStack.length>0){

        let action = undoStack.pop();

        assignments.pop();

        displayAssignments();

    }

}


// =============================
// CO4: HASH TABLE
// =============================

let assignmentMap = {};

function addToHash(a){

    assignmentMap[a.title] = a;

}


// =============================
// CO5 & CO6: MAIN APPLICATION
// =============================

function addAssignment(){

    let subject = document.getElementById("subject").value;
    let title = document.getElementById("assignmentTitle").value;
    let desc = document.getElementById("assignmentDesc").value;
    let priority = document.getElementById("priority").value;
    let date = document.getElementById("dueDate").value;

    let a = new Assignment(subject,title,desc,priority,date);

    assignments.push(a);       // Array insert
    addToHash(a);              // Hash table store

    enqueueNotification("New Assignment Added: "+title);

    pushUndo("ADD");

    sortAssignments();

    displayAssignments();

}


// =============================
// DISPLAY FUNCTION
// =============================

function displayAssignments(){

    let list = document.getElementById("assignmentList");

    list.innerHTML = "";

    assignments.forEach((a,index)=>{

        let div = document.createElement("div");

        div.innerHTML = `
        <b>${a.subject}</b> - ${a.title}
        <br>
        Priority: ${a.priority}
        <br>
        Due: ${a.date}
        <br>
        <button onclick="deleteAssignment(${index})">Delete</button>
        <hr>
        `;

        list.appendChild(div);

    });

}


// =============================
// DELETE OPERATION
// =============================

function deleteAssignment(index){

    assignments.splice(index,1);

    displayAssignments();

}
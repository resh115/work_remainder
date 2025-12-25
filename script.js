
let overlay = document.querySelector(".overlay");
let box = document.querySelector(".box");
let addBtn = document.getElementById("add");
let closeBtn = document.getElementById("closeBox");
let addAssignmentBtn = document.getElementById("addAssignment");

let nameInput = document.getElementById("name");
let subjectInput = document.getElementById("subject");
let dueDateInput = document.getElementById("duedate");
let detailsInput = document.getElementById("details");

let assignmentsContainer = document.querySelector(".assignments");
let username = prompt("Enter your username:");
if(!username) username = "defaultUser"; 
let storageKey = "assignments_" + username;


window.onload = function() {
    let assignments = JSON.parse(localStorage.getItem(storageKey)) || [];
    assignments.forEach(a => createAssignmentDiv(a.id, a.name, a.subject, a.dueDate, a.details));
}

addBtn.onclick = () => {
    overlay.style.display = "block";
    box.style.display = "block";
}

closeBtn.onclick = () => {
    overlay.style.display = "none";
    box.style.display = "none";
}

addAssignmentBtn.onclick = () => {
    if(nameInput.value === "" || subjectInput.value === "" || dueDateInput.value === "" || detailsInput.value === "") {
        alert("Please fill all fields!");
        return;
    }

    let id = Date.now();
    let assignment = {
        id: id,
        name: nameInput.value,
        subject: subjectInput.value,
        dueDate: dueDateInput.value,
        details: detailsInput.value
    };

    let assignments = JSON.parse(localStorage.getItem(storageKey)) || [];
    assignments.push(assignment);
    localStorage.setItem(storageKey, JSON.stringify(assignments));

    createAssignmentDiv(id, nameInput.value, subjectInput.value, dueDateInput.value, detailsInput.value);

    nameInput.value = "";
    subjectInput.value = "";
    dueDateInput.value = "";
    detailsInput.value = "";

    overlay.style.display = "none";
    box.style.display = "none";
}

function createAssignmentDiv(id, name, subject, dueDate, details) {
    let div = document.createElement("div");
    div.classList.add("container");
    div.dataset.id = id;

    div.innerHTML = `
        <h2>${name}</h2>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Due:</strong> ${dueDate}</p>
        <p>${details}</p>
        <button class="close" onclick="deleteAssignment(this)">DELETE</button>
    `;

    assignmentsContainer.appendChild(div);
}

function deleteAssignment(btn) {
    let div = btn.parentElement;
    let id = div.dataset.id;
    let assignments = JSON.parse(localStorage.getItem(storageKey)) || [];
    assignments = assignments.filter(a => a.id != id);
    localStorage.setItem(storageKey, JSON.stringify(assignments));
    div.remove();
}

interface Task {
    id: number,
    title:string,
    desc: string,
    dueDate: string,
    status: boolean,
}
let taskList: Task[] = [];

async function fetchData() {
    try {
        const response = await fetch("http://localhost:8080/api/hello");
        console.log("Raw response object:", response);
        if (response.ok) {
            const data = await response.text(); 
            console.log("Response from API:", data);
        } else {
            console.error("Failed to fetch data");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function getAllTasks(){
    const response = await fetch("http://localhost:8080/tasks/all");
    if (response.ok) {
        const data = await response.text(); 
        const objects = JSON.parse(data);

        objects.forEach((obj: Task) => {
            console.log(obj);
            taskList.push(obj);
        });
        renderList()
        console.log("Response from API:", data);
    } else {
        console.log("Failed to fetch data");
    }
}

async function createTask(title:string, desc:string, dueDate:string, status:boolean){
    console.log(title)
    const newTask = {
        title: title,
        desc: desc,
        dueDate: dueDate,
        status: status,
    };
    console.log(newTask)
    try{
        const response = await fetch("http://localhost:8080/tasks/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(newTask), 
        });
        if (response.ok) {
            const data = await response.json(); 
            console.error(data)
            taskList.push(data);
            renderList();
            console.log("Sucessfully added", data);
        } else {
            console.log("Failed to create new task");
            console.error("Status code:", response.status); 
            const errorText = await response.text();
            console.error("Error response body:", errorText);
        }
    }catch(error){
        console.log("Error adding new task ", error);
    }
}

async function deleteTask(id: number){
    try{
        const response = await fetch(`http://localhost:8080/tasks/delete/${id}`,{
            method: "DELETE",  
            headers: {
                "Content-Type": "application/json", 
            },
        });
        if(response.ok){
            const index = taskList.findIndex((task) => task.id === id);
            if(index > -1){
                taskList.splice(index, 1);
            }
            renderList();
        }
        //put like a thing that goes uop and says deleted succesfully
    }catch(error){
        console.error("Couldnt delete task ", error);
    }
}

async function updateTitle(id: number, newTitle: string){
    try{
        const response = await fetch(`http://localhost:8080/tasks/update/title/${id}/${newTitle}`,{
            method: "PATCH",  
        });
        if(response.ok){
            const index = taskList.findIndex((task) => task.id === id);
            taskList[index].title = newTitle;
            renderList()
        }
    }catch(error){
        console.error("Big error updating Description ", error);
    }
}

async function updateDesc(id: number, newDesc: string){
    try{
        const response = await fetch(`http://localhost:8080/tasks/update/desc/${id}/${newDesc}`,{
            method: "PATCH",  
        });
        if(response.ok){
            const index = taskList.findIndex((task) => task.id === id);
            taskList[index].desc = newDesc;
            renderList()
        }
    }catch(error){
        console.error("Big error updating Description ", error);
    }
}

async function updateDate(id: number, newDate: string){
    try{
        const newDueDate = encodeURIComponent(newDate)
        console.log(newDueDate);
        const response = await fetch(`http://localhost:8080/tasks/update/dueDate/${id}/${newDueDate}`,{
            method: "PATCH",
        });
        if(response.ok){
            const index = taskList.findIndex((task) => task.id === id);
            taskList[index].dueDate = newDueDate;
            renderList()
        }
    }catch(error){
        console.error("Big error updating due date ", error);
    }
}

async function updateStatus(id: number, newStatus: string){
    try{

        const response = await fetch(`http://localhost:8080/tasks/update/dueDate/${id}/${newStatus}`,{
            method: "PATCH",
        });
        if(response.ok){
            const index = taskList.findIndex((task) => task.id === id);
            taskList[index].status = newStatus === "true";
            renderList()
        }
    }catch(error){
        console.error("Big error updating due date ", error);
    }
}

function renderList(){
    const ul = document.getElementById('dynamic-list') as HTMLUListElement;
    ul.innerHTML = ''; 

    taskList.forEach(item => {
        const li = document.createElement('li');
        
        const taskTitle = document.createElement('span');
        taskTitle.classList.add('task-title');
        taskTitle.textContent = item.title;

        const taskDesc = document.createElement('span');
        taskDesc.classList.add('task-desc');
        taskDesc.textContent = item.desc;

        const taskDueDate = document.createElement('span');
        taskDueDate.classList.add('task-duedate');
        taskDueDate.textContent = item.dueDate;

        const taskStatus = document.createElement('span');
        taskStatus.classList.add('task-status');

        if(item.status){
            taskStatus.style.color = "green";
            taskStatus.textContent+= " Completed"
        }else{
            taskStatus.style.color = "red";
            taskStatus.textContent+= " Incomplete"
        }

        //for edit Icon for title
        const editIconTitle = document.createElement('img');
        editIconTitle.src = "/images/edit_image.png";
        editIconTitle.classList.add("edit-icon");
        editIconTitle.alt = "editTitle"

        editIconTitle.addEventListener('click', () => {
            if(updateTitleInput.style.display == "none" || updateTitleInput.style.display == ""){
                updateTitleInput.style.display = "block";
                updateTitleButt.style.display = "block"
            }else{
                updateTitleButt.style.display = "none";
                updateTitleButt.style.display = "none"
            }
        });

        li.appendChild(editIconTitle);
        li.appendChild(taskTitle);

        //for edit Icon for description
        const editIconDesc = document.createElement('img');
        editIconDesc.src = "/images/edit_image.png";
        editIconDesc.classList.add("edit-icon");
        editIconDesc.alt = "editDesc"

        editIconDesc.addEventListener('click', () => {
            if(updateDescInput.style.display == "none" || updateDescInput.style.display == ""){
                updateDescInput.style.display = "block";
                updateDescButt.style.display = "block"
            }else{
                updateDescInput.style.display = "none";
                updateDescButt.style.display = "none"
            }
        });
        li.appendChild(editIconDesc);
        li.appendChild(taskDesc);

        const editIconDate = document.createElement('img');
        editIconDate.src = "/images/edit_image.png";
        editIconDate.classList.add("edit-icon");
        editIconDate.alt = "editDate"

        //for editing the date
        editIconDate.addEventListener('click', () => {
            if(updateDateInput.style.display == "none" || updateDateInput.style.display == ""){
                updateDateInput.style.display = "block";
                updateDateButt.style.display = "block"
            }else{
                updateDateInput.style.display = "none";
                updateDateButt.style.display = "none"
            }
        });
        li.appendChild(editIconDate);

        li.appendChild(taskDueDate);

        const editIconStatus = document.createElement('img');
        editIconStatus.src = "/images/edit_image.png";
        editIconStatus.classList.add("edit-icon");
        editIconStatus.alt = "editDate"

        //for showing input fields.
        editIconStatus.addEventListener('click', () => {
            if(updateStatusInput.style.display == "none" || updateStatusInput.style.display === ""){
                updateStatusInput.style.display = "block";
                updateStatusButt.style.display = "block"
            }else{
                updateStatusInput.style.display = "none";
                updateStatusButt.style.display = "none"
            }
        });
        li.appendChild(editIconStatus);
        li.appendChild(taskStatus);

        //update title 
        const updateTitleButt = document.createElement('button');
        updateTitleButt.id = "newTitle";
        updateTitleButt.textContent = "New Title ";
        updateTitleButt.classList.add('updateBox')
        li.appendChild(updateTitleButt);

        const updateTitleInput = document.createElement('input');
        updateTitleInput.required
        updateTitleInput.id = "newTitleInput"
        updateTitleInput.type = "text";
        updateTitleInput.classList.add('updateBox')
        li.appendChild(updateTitleInput);

        updateTitleButt.addEventListener('click', () => {
            if(updateTitleInput.value == "" || updateTitleInput.value == null){
                message("No Title argument")
            }else{
                updateTitle(item.id,updateTitleInput.value);
            }
        });

    
        //update description 
        const updateDescButt = document.createElement('button');
        updateDescButt.id = "newDesc";
        updateDescButt.textContent = "New Description ";
        updateDescButt.classList.add('updateBox')
        li.appendChild(updateDescButt);

        const updateDescInput = document.createElement('input');
        updateDescInput.required
        updateDescInput.id = "newDescInput"
        updateDescInput.type = "text";
        updateDescInput.classList.add('updateBox')
        li.appendChild(updateDescInput);

        updateDescButt.addEventListener('click', () => {
            if(updateDescInput.value == "" || updateDateInput.value == null){
                message("No description given")
                console.error("No Description enteres")
            }else{
                updateDesc(item.id,updateDescInput.value);
            }
        });

        //update due date
        const updateDateButt = document.createElement('button');
        updateDateButt.id = "newDate";
        updateDateButt.textContent = "New Date ";
        updateDateButt.classList.add('updateBox')
        li.appendChild(updateDateButt);

        const updateDateInput = document.createElement('input');
        updateDateInput.required
        updateDateInput.id = "newDateInput"
        updateDateInput.type = "date";
        updateDateInput.classList.add('updateBox')
        li.appendChild(updateDateInput);

        updateDateButt.addEventListener('click', () => {
            console.error(updateDateInput.value);
            if(updateDateInput.value == "" || updateDateInput.value == null){
                message("No date given")
                console.error("Input date, its currently null")
            }else{
                updateDate(item.id,updateDateInput.value);
            }
        });

        //now for true/false status
        const updateStatusButt = document.createElement('button');
        updateStatusButt.id = "newStatus";
        updateStatusButt.textContent = "New Status ";
        updateStatusButt.classList.add('updateBox')
        li.appendChild(updateStatusButt);

        const updateStatusInput = document.createElement('select');
        const trueOption = document.createElement('option');
        const falseOption = document.createElement('option');
        trueOption.value = "true";
        falseOption.value = "false"
        trueOption.innerHTML = "true";
        falseOption.innerHTML = "false"
        updateStatusInput.appendChild(trueOption)
        updateStatusInput.appendChild(falseOption)
        updateStatusInput.id = "newStatusInput"
        updateStatusInput.classList.add('updateBox');
        li.appendChild(updateStatusInput);

        updateStatusButt.addEventListener('click', () => {
            if(updateStatusInput.value == "" || updateDateInput.value == null){
                console.error("Input date, its currently null")
            }else{
                console.log(updateStatusInput.value)
                updateStatus(item.id, updateStatusInput.value);
            }
        });

        //for delete icon too
        const deleteIcon = document.createElement('img');
        deleteIcon.src = "/images/delete_icon.png";
        deleteIcon.classList.add("delete-icon")
        deleteIcon.alt = "Delete"
        deleteIcon.addEventListener('click', () => {
            deleteTask(item.id);
        });
        taskDueDate.classList.add('task-duedate');
        taskDueDate.textContent = item.dueDate;
        
        li.appendChild(deleteIcon);
        li.classList.add('li'); 
        ul.appendChild(li);
    });
}

//for opening/closing the overlay
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('create-task-select') as HTMLButtonElement;
    const overlay = document.getElementById('addTaskOverlay') as HTMLDivElement;
    if (button) {
        button.addEventListener('click', () => {
            overlay.style.display = (overlay.style.display === "none" || overlay.style.display === "") ? "flex" : "none";
        });
    }
});

//For when creatina new task
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('createTask') as HTMLButtonElement;
    const title = document.getElementById('title') as HTMLInputElement;
    const desc = document.getElementById('desc') as HTMLInputElement;
    const date = document.getElementById('date') as HTMLInputElement;
    const status = document.getElementById('true_false_select') as HTMLSelectElement;
    const overlay = document.getElementById('addTaskOverlay') as HTMLDivElement;
    if (button) {
        button.addEventListener('click', () => {
            let status_val = true;
            if(status.value){
                status_val = true;
            }else{
                status_val = false;
            }

            //make sure theres a description
            if(title.value == "" || title.value == null){
                message("No title argument provided")
            }else if(desc.value == "" || desc.value == null){
                message("No description")
            }else if(date.value == "" || date.value == null){
                message("No Date")
            }else{
                console.error(title.value)
                createTask(title.value, desc.value, date.value, status_val );

                overlay.style.display = (overlay.style.display === "none" || overlay.style.display === "") ? "flex" : "none";
            }
        });
    }
});

function message(mes:string){
    const messageBox = document.getElementById("messageBox");
    if (messageBox) {
        console.error("Here")
        messageBox.textContent = mes;
        messageBox.style.display = "block";
        setTimeout(() => {
            messageBox.style.display = "none";
        },2000);
    } else {
        console.error("messageBox element is not found");
    }
}
fetchData();
getAllTasks();
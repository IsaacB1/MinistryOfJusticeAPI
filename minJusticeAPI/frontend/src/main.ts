interface Task {
    id: number,
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

async function createTask(desc:string, dueDate:string,status:boolean){
    //for testing
    const newTask = {
        desc: desc,
        dueDate: dueDate,
        status: status,
    };
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
            method: "DELETE",  // Ensure DELETE method is used
            headers: {
                "Content-Type": "application/json", // Typically needed for JSON-based requests
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

function renderList(){
    const ul = document.getElementById('dynamic-list') as HTMLUListElement;
    ul.innerHTML = ''; 

    taskList.forEach(item => {
        const li = document.createElement('li');
        
        const taskDesc = document.createElement('span');
        taskDesc.classList.add('task-desc');
        taskDesc.textContent = item.desc;

        const taskDueDate = document.createElement('span');
        taskDueDate.classList.add('task-duedate');
        taskDueDate.textContent = item.dueDate;

        const taskStatus = document.createElement('span');
        taskStatus.classList.add('task-status');

        if(item.status){
            taskStatus.textContent+= " completed"
        }else{
            taskStatus.textContent+= " incomplete"
        }
        li.appendChild(taskDesc);
        li.appendChild(taskDueDate);
        li.appendChild(taskStatus);

        const deleteIcon = document.createElement('img');
        deleteIcon.src = "/images/delete_icon.png";
        deleteIcon.style.width = '20px';
        deleteIcon.style.height =  'auto';
        deleteIcon.style.marginLeft = '0';
        deleteIcon.alt = "Delete"
        deleteIcon.style.cursor = 'pointer';
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

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('create-task') as HTMLButtonElement;
    if (button) {
        button.addEventListener('click', () => {
        createTask('Newtask', '2024/02/25', false);
        });
    }
});

fetchData();
getAllTasks();
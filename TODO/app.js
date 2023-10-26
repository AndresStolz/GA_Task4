const requestURLForTasks = "https://jsonplaceholder.typicode.com/todos"
const requestURLForUsers = "https://jsonplaceholder.typicode.com/todos"
const todoList = document.getElementById('todo-list');
const userList = document.getElementById('user-todo');
let tasks = [];
let users = [];
let userName = '';

function renderTask(data) {

    if (data.completed == true) {
        todoList.insertAdjacentHTML(
            'beforeend',
            `<li class="todo-item">
            <input type="checkbox" checked>${data.title}<i>by</i><b>${findUser(data.userId)}</b>
        <span class="close";">&times;</span>
        </li>`
        );
    } else {
        todoList.insertAdjacentHTML(
            'beforeend',
            `<li class="todo-item">
            <input type="checkbox">${data.title}<i>by</i><b>${findUser(data.userId)}</b>
        <span class="close";">&times;</span>
        </li>`
        );
    }

}

function findUser(userID) {
    let usr = users.find(user => user.id === userID);
    return usr.name
}



function addUserToSelect(user) {
   
        userList.insertAdjacentHTML(
            'beforeend',
            `<option class="option">${user.name}</option>`
        );
    
}

function getData() {
    Promise.all([requestForTasks(), requestForUsers()])
        .then(data => {
            [tasks, users] = data;

            tasks.forEach((task) =>
                renderTask(task));

            users.forEach((user) => addUserToSelect(user))
        })
}

getData();

async function requestForTasks() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const result = await response.json();
    return result;
}

async function requestForUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const result = await response.json();
    return result;
}

async function createTask() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify(),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    return data;
}

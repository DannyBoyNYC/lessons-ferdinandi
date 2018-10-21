
var appElem = document.querySelector('[data-app]');
var page = appElem.getAttribute('data-app');

var getTodoLists = function(){
    // manage todo lists
    if (page === 'todolists') {
        var addList = document.querySelector('.add-list-form');
        var listContainer = document.querySelector('.todo-list');
        var todoLists =  JSON.parse(localStorage.getItem('todoLists')) || [];
        
        var addToDoList = function(e){
            e.preventDefault();
            var text = this.querySelector('[name=list]').value;
            var todoList = {
                text: text,
                done: false
            };
            todoLists.push(todoList);
            
            createTodosList(todoLists, listContainer);
            localStorage.setItem('todoLists', JSON.stringify(todoLists));
            this.reset();
        }
        
        var createTodosList = function(todoLists = [], listContainer){
            var listItems = todoLists.map( function(todoList, i){
                return `
                <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${todoList.done ? 'checked' : ''} />
                <label for="item${i}">${todoList.text}</label>
                <div><a href="list/index.html?id=${i}&test=test">Edit</a></div>
                </li>
                `
            }).join('');
            if (listItems == ''){
                listItems = `<li>You haven't created any Todo lists yet.</li>`
            }
            listContainer.innerHTML = listItems;
        }
        
        var toggleDone = function(e){
            if (!e.target.matches('input')) return;
            var elem = e.target;
            var index = elem.dataset.index;
            todoLists[index].done = !todoLists[index].done;
            localStorage.setItem('todoLists', JSON.stringify(todoLists));
            createTodosList(todoLists, listContainer);
        }
        
        addList.addEventListener('submit', addToDoList);
        listContainer.addEventListener('click', toggleDone);
        
        createTodosList(todoLists, listContainer);
    }
    
    // manage a single selected to do list
    if (page === 'todolist') {
        
        var id = getParams().id
        var todoLists =  JSON.parse(localStorage.getItem('todoLists'));
        var currList = todoLists[id];
        
        var addToDos = document.querySelector('.add-items');
        var toDoList = document.querySelector('.todos');
        var todos = currList.todos || [];
        
        document.querySelector('h3').innerHTML = `
        <span>Todo list:</span> ${currList.text}
        `;
        
        var addToDo = function(e){
            e.preventDefault();
            var text = this.querySelector('[name=todo]').value;
            var todo = {
                text: text,
                done: false
            };
            todos.push(todo);
            createTodosList(todos, toDoList);
            currList.todos = todos;
            localStorage.setItem('todoLists', JSON.stringify(todoLists));
            this.reset();
        }
        
        var createTodosList = function(todos = [], toDoList){
             var todoListItems = todos.map( function(todo, i){
                return `
                <li>
                    <input type="checkbox" data-index=${i} id="todo${i}" ${todo.done ? 'checked' : ''} />
                    <label for="todo${i}">${todo.text}</label>
                </li>
                `
            }).join('');

            if (todoListItems == ''){
                todoListItems = `<li>You haven't created any Todo lists yet.</li>`
            }

            toDoList.innerHTML = todoListItems;
        }
        
        var toggleDone = function(e){
            if (!e.target.matches('input')) return;
            var elem = e.target;
            var index = elem.dataset.index;
            todos[index].done = !todos[index].done;
            localStorage.setItem('todoLists', JSON.stringify(todoLists));
            createTodosList(currList.todos, toDoList);
        }
        
        addToDos.addEventListener('submit', addToDo);
        toDoList.addEventListener('click', toggleDone);
        
        createTodosList(currList.todos, toDoList);
        
    }
    
}

/**
* Get the URL parameters
* source: https://css-tricks.com/snippets/javascript/get-url-variables/
* @param  {String} url The URL
* @return {Object}     The URL parameters
*/
var getParams = function (url) {
    // console.log('ran')
    var params = {};
    var parser = document.createElement('a');
    url = url || window.location.href;
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i=0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};

getTodoLists();

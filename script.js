let section = document.createElement("section");
section.className = "section";

document.body.prepend(section);

let main = document.createElement("main");
main.className = "container";
section.append(main);

let projectName = document.createElement("h1");
projectName.innerHTML = "Let's do it";
main.append(projectName);

let listBlock = document.createElement("div");
listBlock.className = "mainBlock";
main.append(listBlock);

let firstDiv = document.createElement("div");
listBlock.append(firstDiv);

let texIn = document.createElement("input");
texIn.className = "texIn";
texIn.setAttribute("placeholder", "Gonna do...");
firstDiv.append(texIn);

let setDate = document.createElement("input");
setDate.id = "setDate";
setDate.setAttribute("type", "date");
firstDiv.append(setDate);

let addBtn = document.createElement("button");
addBtn.innerHTML = "ADD";
addBtn.id = "AddBtn";
firstDiv.append(addBtn);

let list = document.createElement("ul");
listBlock.append(list);

let todosArray =
  localStorage.getItem("todos") == null
    ? []
    : [...JSON.parse(localStorage.getItem("todos"))];

const addToDo = () => {
  let newTask = texIn.value;
  let date = setDate.value;

  if (newTask != "") {
    todosArray.push({
      text: newTask,
      checked: false,
      date,
    });

    localStorage.setItem("todos", JSON.stringify(todosArray));

    texIn.value = "";
    setDate.value = "";
    renderTodoItem();
  }
};

const completeToDo = (e) => {
  let todoTemporary = [...todosArray];
  let index = e.target.parentNode.id;
  let objectElement = todoTemporary[index].checked;

  todoTemporary[index].checked = !objectElement;
  localStorage.setItem("todos", JSON.stringify(todosArray));

  let isDone = e.target.parentNode.classList.contains("done");

  isDone
    ? e.target.parentNode.classList.remove("done")
    : e.target.parentNode.classList.add("done");
};

const deleteToDo = (e) => {
  let index = e.target.parentNode.id;
  todosArray.splice(index, 1);

  localStorage.setItem("todos", JSON.stringify(todosArray));
  renderTodoItem();
};

addBtn.addEventListener("click", addToDo);

const renderTodoItem = () => {
  list.innerHTML = "";
  todosArray.map((todo, id) => {
    let li = document.createElement("li");
    li.className = todo.checked ? "taskItem done" : "taskItem";
    li.id = id;

    let doneBtn = document.createElement("img");
    doneBtn.src = "check-square.svg";
    doneBtn.className = "btn";
    doneBtn.addEventListener("click", completeToDo);

    let deleteBtn = document.createElement("img");
    deleteBtn.src = "delete-2.svg";
    deleteBtn.className = "btn";
    deleteBtn.addEventListener("click", deleteToDo);

    let lable = document.createElement("label");
    lable.append(todo.text + " - " + todo.date);
    li.append(lable);
    li.append(doneBtn);
    li.append(deleteBtn);
    list.append(li);
  });
};
renderTodoItem();

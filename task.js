
let title = ""

if(title === ""){ 
    console.log("Название задачи не указано")
}else{
    console.log("Задача", title)
}

let tasks = 5

if(tasks === 0){
    console.log("Список пуст")
}else if(tasks <= 3){
    console.log("Немного задач")
}else{
    console.log("Много задач")
}

function sum(a, b){
    return a + b
}

console.log(sum(3, 4));
console.log(sum(10, 5));


function isTaskDone(status){
    return status === "выполнена"
}

console.log(isTaskDone("выполнена"));
console.log(isTaskDone("активна"));

function taskSummary(total, done){
    let active = total - done
    return "Всего" + total + " | Выполнено " + done + " | Активных " + active
}

console.log(taskSummary(5,3));
console.log(taskSummary(10, 4));
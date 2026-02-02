
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
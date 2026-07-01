const fs = require("fs");
const FILE = "tasks.json";
function readTasks(){
    if (!fs.existsSync(FILE)) return [];
    const data = fs.readFileSync(FILE, "utf-8");
    return JSON.parse(data);
}
function writeTasks(tasks){
    fs.writeFileSync(FILE, JSON.stringify(tasks,null, 2));
}
let tasks = readTasks();
tasks.push({id: "1", title: "First task", status: "todo"});
writeTasks(tasks);
console.log("saved!",tasks);

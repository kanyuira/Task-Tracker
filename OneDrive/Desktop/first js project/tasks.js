const task = {
id: "5",
title:"my first project",
status:"todo",
priority:"medium",
dueDate:"2026-07-01",
};
if (!task.title){
console.log("Error:title is required");
}
else
{
console.log("Task is valid:",task.title);
}

// Mock list of todos
import Todo from "../interfaces/Todo.ts";
import generateUUID from "../generateUUID.ts";


let todos: Todo[] = [
    {
        id: generateUUID(),
	todo: 'walk dog',
	isCompleted: false
    },
    {
        id: generateUUID(),
	todo: 'Do a Todo API',
	isCompleted: true
    },
];


export default todos;

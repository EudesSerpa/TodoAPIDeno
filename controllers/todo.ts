import generateUUID from "../generateUUID.ts";

import todos from "../stubs/todos.ts";

import Todo from "../interfaces/Todo.ts";
import Success from "../interfaces/Success.ts";
import Fail from "../interfaces/Fail.ts";


export default {
    /**
     * @description Get all todos
     * @route Get /todos
     */
    getAllTodos: ({ response }: { response: any }) => {
	const bodyResponse: Success = {
	    success: true,
	    data: todos
	};

        response.status = 200;
	response.body = bodyResponse;
    },

    /**
     * @description Add a new todo
     * @route POST /todos
     */
    createTodo: async (
        {request, response}: {request: any; response: any}
    ) => {
	const result = request.body();
	const payload = await result.value;
	
	if(!payload.hasOwnProperty("todo") || !request.hasBody) {
	    const bodyResponse: Fail = {
		success: false,
		message: "No data provided"
	    };

	    response.status = 400;
	    response.body = bodyResponse;
	    return;
	}

	let newTodo: Todo = {
	    id: generateUUID(),
	    todo: payload.todo,
	    isCompleted: false
	};

	let data = [...todos, newTodo];

	const bodyResponse: Success = {
	    success: true,
	    data
	};
	
	response.status = 200;
	response.body = bodyResponse;
    },

    /**
     * @description Get todo by id
     * @route GET todos/:id
     */
    getTodoById: (
	{ params, response }: { params: { id: string}; response: any }
    ) => {
	const todo: Todo | undefined = todos.find(td => td.id === params.id);

	if(!todo) {
	    const bodyResponse: Fail = {
		success: false,
		message: "Todo no found"
	    };

	    response.status = 404;
	    response.body = bodyResponse;
	    return;
	}

	const bodyResponse: Success = {
	    success: true,
	    data: todo
	};

	response.status = 200;
	response.body = bodyResponse;
    },

    /**
     * @description Update todo by id
     * @route PUT todos/:id
     */
    updateTodoById: async (
	{ params, request, response}: {
	    params: { id: string },
	    request: any,
	    response: any
	}
    ) => {
	const todo: Todo | undefined = todos.find(td => td.id === params.id);

	if(!todo) {
	    const bodyResponse: Fail = {
		success: false,
		message: "Todo no found"
	    };

	    response.status = 404;
	    response.body = bodyResponse;
	    return;
	}

	const result = request.body();

	const updatedData: { todo?: string, isCompleted?: boolean } = await result.value;

	let newTodos = todos.map(td => td.id === params.id ? {...td, ...updatedData} : td);
	
	const bodyResponse: Success = {
	    success: true,
	    data: newTodos
	};

	response.status = 200;
	response.body = bodyResponse; 
    },

    /**
     * @description Delete todo by id
     * @route DELETE todos/:id
     */
    deleteTodoById: (
	{ params, response }: { params: { id: string }; response: any}
    ) => {
	const allTodos = todos.filter(td => td.id !== params.id);
	
	const bodyResponse: Success = {
	    success: true,
	    data: allTodos
	};

	response.status = 200;
	response.body = bodyResponse;
    },
};

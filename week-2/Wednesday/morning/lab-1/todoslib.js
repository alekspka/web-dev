
let todosArray = [];
let nextId = 1;

function getAll() {
    return todosArray;
}


function addOne(task, completed, dueDate) {

    if (!task || !completed || !dueDate) {
        return false;
    }

    const newTask = { 
        id: nextId++,
        task,
        completed,
        dueDate
    };

    todosArray.push(newTask);
    return newTask;
}

function findById(id) {
    const numericId = Number(id);
    const todo = todosArray.find(item => item.id === numericId);
    return todo || false;
}

function updateOneById(id, updatedData) {
    const todo = findById(id);
    if (todo) {
        if (updatedData.task) todo.task = updatedData.task;
        if (updatedData.completed) todo.completed = updatedData.completed;
        if (updatedData.dueDate) todo.dueDate = updatedData.dueDate;
        return todo;
    }
    return false;
}

function deleteOneById(id) {
    const todo = findById(id);
    if (todo) {
        const initialLength = todosArray.length;
        todosArray = todosArray.filter(todo => todo.id !== Number(id));
        return todosArray.length < initialLength;
    }
    return false;
}



if (require.main === module) {
    
    let result = addOne("shopping", "false", "2025-08-30");
    result = addOne("cleaning", "true", "2025-08-29");

    console.log(result);

    console.log("getAll called:", getAll());

    console.log("findById called:", findById(1));


    console.log("deleteOneById called:", deleteOneById(1));
    console.log("findById called after item deleted:", findById(1));

}


const ToDos = {
    getAll,
    addOne,
    findById,
    updateOneById,
    deleteOneById
};

module.exports = ToDos;
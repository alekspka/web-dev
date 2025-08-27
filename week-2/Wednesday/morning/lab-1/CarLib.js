//{
//  "model": "Corolla",
//    "color": "Red",
// "age": 3
//}

let carArray = [];
let nextId = 1;

function getAll () {
    return carArray;

}

function addOne(model, color, age) {

    if (!model || !color || !age) {
        return false;
    }

    const newCar = {
        id: nextId++,
        model,
        color,
        age
    };

    carArray.push(newCar);
    return newCar;
}

function findById(id) {
    const numericId = Number(id);
    const car = carArray.find(item => item.id === numericId);
    return car || false;
}

function updateOneById(id, updatedData) {
    const car = findById(id);
    if (car) {
        if (updatedData.model) car.model = updatedData.model;
        if (updatedData.color) car.color = updatedData.color;
        if (updatedData.age) car.age = updatedData.age;
        return car;
    }
    return false;
}

function deleteOneById(id) {
    const car = findById(id);
    if (car) {
        const initialLength = carArray.length;
        carArray = carArray.filter(car => car.id !== Number(id));
        return carArray.length < initialLength;
    }
    return false;
}

let result = addOne("Corolla", "Red", 3);
result = addOne("Corolla", "green", 5);


console.log(getAll());
console.log("----------");

// updateOneById(1, {age: 5})

//console.log(findById(1));
console.log("----------");
// console.log(findById(2));


deleteOneById(1);
console.log(getAll());

const Car = {
    getAll,
    addOne,
    findById,
    updateOneById,
    deleteOneById
};

module.exports = Car;

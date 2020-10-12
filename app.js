const { exit } = require('process');
const readline = require('readline');

async function getUserInput(question) {
    const readLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return await new Promise((resolve, reject) => {
        try {
            readLine.question(question, (answer) => {
                readLine.close();
                resolve(answer);
            });
            
        } catch(error) {
            reject(error);
        }
    });
}

async function getUserInputNumberAndLimitNumber(question, max, min = 1) {
    try {
        let answer = await getUserInput(question);
        if (isNaN(answer)) {
            throw new Error('You need to enter a number!');
        }
        answer = Number(answer);
        if (answer > max || answer < min) {
            throw new Error(`You need to choose a number between ${min} and ${max}`);
        }
        return answer-1;
    } catch (error) {
        console.error(error.message);
        return await getUserInputNumberAndLimitNumber(question, max, min = 1);
    }
}


class foodTypeTemplate {
    dishes = [];

    printDishes() {
        console.log(`Choose a dish:`)
        for(const [index, dish] of this.dishes.entries()) {
            console.log(`${index+1}) ${dish.dishName}. Contents: ${dish.ingredients.join(', ')}. Price: ${dish.price} SEK`);
        }
    }

    getDish(dishIndex) {
        try {
            return this.dishes[dishIndex];
        } catch(error) {
            console.log(`The dish you tried to order, does not exist!`);
            exit(1);
        }
    }

    async askUserForFoodType() {
        const question = "Which dish do you want? (Use the number)";
        return await getUserInputNumberAndLimitNumber(question, this.dishes.length);
    }
}

class PizzaTypes extends foodTypeTemplate{
    dishes = [
        new Margherita(),
        new Capricciosa(),
        new Kycklingpizza(),
        new Calzone()
    ];
    constructor() {
        super();
    }
    
}

class dishTemplate {
    dishName = this.constructor.name;
    price = 0;
    ingredients = [];
    printDish() {
        console.log(`You've choosen a ${this.dishName}`);
        console.log(`The content of the dish is: ${this.ingredients.join(', ')}`);
        console.log(`The prise for the dish is: ${this.price} SEK`);
    }
}

class Margherita extends dishTemplate{
    price = 79;
    ingredients = ['Tomatosauce', 'cheese'];
    constructor() {
        super();
    }
}

class Capricciosa extends dishTemplate{
    price = 79;
    ingredients = ['Tomatosauce', 'cheese', 'Mushroom', 'Ham'];
    constructor() {
        super();
    }
}

class Kycklingpizza extends dishTemplate{
    price = 79;
    ingredients = ['Tomatosauce', 'cheese', 'chicken', 'Curry', 'Pineapple'];
    constructor() {
        super();
    }
}

class Calzone extends dishTemplate{
    price = 79;
    ingredients = ['Tomatosauce', 'cheese', 'Ham'];
    constructor() {
        super();
    }
}

class FoodFactory {
    /**
     * Map is ordered
     */
    foodTypes = new Map([
        ['PizzaTypes', PizzaTypes],

    ]);

    createFoodType(foodTypeIndex) {
        try {
            let choosenFoodType = undefined;
            const keys = [... this.foodTypes.keys()];
            for(const [index, foodType] of keys.entries()) {
                if (index == foodTypeIndex) {
                    choosenFoodType = foodType;
                }
            }
            if(!choosenFoodType) {
                throw new Error('Food type does not exists')
            }

            return new (this.foodTypes.get(choosenFoodType))();
        } catch(error) {
            console.error(error.message);
            exit(1);
        }
    }

    printFoodTypes() {
        console.log(`Following foodtypes exists:`);
        const keys = [... this.foodTypes.keys()];
        for(const [index, value] of keys.entries()) {
            console.log(`${index+1}) ${value}`);
        }
    }

    async askUserForFoodType() {
        const question = "Which foodtype do you want? (Use the number)";
        return await getUserInputNumberAndLimitNumber(question, this.foodTypes.size);
    }

}

async function start() {
    const ResturantFactory = new FoodFactory();
    console.log(`-------------------`);
    console.log(`Welcome to Resturant AB!`);
    ResturantFactory.printFoodTypes();
    let foodIndex = await ResturantFactory.askUserForFoodType();
    console.log(foodIndex);
    const dishFactory = ResturantFactory.createFoodType(foodIndex);
    dishFactory.printDishes();
    let dishIndex = await dishFactory.askUserForFoodType();
    dishFactory.getDish(dishIndex).printDish();
}

start();
class BurgerTemplate {
    burger;
    printBurger() {
        console.log(`You've choosen a ${this.burger}`);
    }
}

class BaconBurger extends BurgerTemplate {
    burger = "Bacon Burger";
    constructor() {
        super();
    }
}

class NaturalBurger extends BurgerTemplate {
    burger = "Natural Burger";
    constructor() {
        super();
    }
}

class CheeseBurger extends BurgerTemplate {
    burger = "Cheese Burger";
    constructor() {
        super();
    }
}

class EggBurger extends BurgerTemplate {
    burger = "Egg Burger";
    constructor() {
        super();
    }
}

class HamburgerFactory {
    allowedBurgers = new Map([
        ['BaconBurger', BaconBurger],
        ['NaturalBurger', NaturalBurger],
        ['CheeseBurger', CheeseBurger],
        ['EggBurger', EggBurger]
    ]);

    defaultBurger = "NaturalBurger"

    createBurger(burgerType = undefined) {
        try {
            return new (this.allowedBurgers.get(burgerType || this.defaultBurger))();
        } catch(error) {
            console.log(`The burger you tried to order, does not exist!`);
        }
    }
}

const burgerFactory = new HamburgerFactory();

const FirstBurger = burgerFactory.createBurger('BaconBurger');
FirstBurger.printBurger(); // Outputs: You've choosen a Bacon Burger

const SecondBurger = burgerFactory.createBurger();
SecondBurger.printBurger(); // Outputs: You've choosen a Natural Burger

// A burger that does not exists.
const ThirdBurger = burgerFactory.createBurger("Unknown!");
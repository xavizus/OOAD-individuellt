# OOAD-individuellt
Individuell inlämingsuppgift.

## Godkänt
- [x] Välj 3 valfria designmönster från boken ”Learning JavaScript Design Patterns” https://addyosmani.com/resources/essentialjsdesignpatterns/book/
- [x] Du ska beskriva med dina egna ord (på svenska) dina 3 olika designmönster.
- [ ] Skapa ett valfritt utvecklingsprojekt (JavaScript-applikation),där du använder minst ett av dina valda designmönster.
- [ ] Du behöver dokumentera ditt projekt med dina egna ord och diagram. Modellera några relevanta UML-diagram. Använd Lucidchart.com eller ett annat valfritt modelleringsverktyg

## VG 
- [x] Skriv mer djupgående OOAD utifrån ditt eget utvecklingsprojekt. Analysen ska visa på en god förståelse för projektets mål och användarbehov.
- [ ] Du ska visa en god förståelse för skillnaderna mellan dina 3 designmönster samt deras olika tillämpningsmöjligheter i praktisk programmering.

# 1. Val av designmönster
1. Factory Pattern https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript
2. Facade Pattern https://addyosmani.com/resources/essentialjsdesignpatterns/book/#facadepatternjavascript
3. Constructor Pattern https://addyosmani.com/resources/essentialjsdesignpatterns/book/#constructorpatternjavascript

# 2. Beskriv designmönster med egna ord

## Factory pattern
**Factory pattern** är ett designmönster som används för att skapa en instans av en klass och gömma själva instansen för skapandet av objektet för användaren. Detta ger utvecklaren då möjlighet att utöka factoryn utan att befintlig kod blir påverkad.

Praktiskt exempel, tänk dig att du har en hamburgarresturang, där kunder kan beställa olika hamburgare. Där hamburgare har olika innehåll.

I exemplet nedan så har vi fyra olika hamburgare:
- Naturel burgare
- Bacon burgare
- Ost burgare
- Ägg burgare

Med HamburgerFactory, så kan vi skapa olika hamburgare instanser beroende på vad vi får in i vår createFactory metod.
```JavaScript
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
```
I och med att vi använder oss av Factory pattern, gör att vi också kan utöka vår factory enkelt, utan att påverka befintlig kodbas. 
Så om vi skulle vilja lägga till exempelvis, Vegan burger, så skapar vi en veganBurger klass och lägger till den i allowedBurgers.
Ex.
```javascript
class VeganBurger extends BurgerTemplate {
    burger = "Vegan Burger";
    constructor() {
        super();
    }
}

class HamburgerFactory {
    allowedBurgers = new Map([
        ['BaconBurger', BaconBurger],
        ['NaturalBurger', NaturalBurger],
        ['CheeseBurger', CheeseBurger],
        ['EggBurger', EggBurger],
        ['VeganBurger', VeganBurger]
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
```

## Facade Pattern
**Facade Pattern** är ett strukturerat designmönster, där hela poängen egentligen är att göra en metod eller klass mindre abstrakt för användaren.

Ett praktiskt exempel är t.ex. när du ska göra ett POST anrop med hjälp av fetch så behöver du ha med en del overhead information för att utföra ett post-anropp.
Om du redan vet att du alltid kommer posta med samma overhead information, så kan du bygga en fasad för den orginella funktionen.

Nedan har du ett exempel på hur det skulle kunna se ut att bygga en fasad för en funktion:
```JavaScript
async function fetchData(url, method = "GET", data = undefined) {
    let header = {
        "method": method.toUpperCase(),
    };
    if(data) {
        header.headers = {
            "Content-Type": "application/json"
        };
        header.body = JSON.stringify(data);
    }
    return await fetch(url, header).then(response => resoponse.json());
}


function post(url, body) {
    return fetchData(url, "POST", body);
}

function get(url) {
    return fetchData(url);
}


post('localhost:8080/somePath', {Hello: "World!"});
get('localhost:8080/someOtherPath');
```

## Constructor Pattern
**Constructor pattern** tillhör kategorien skapande mönster och förbereder objektet för användning, som att sätta default värden, direkt exekvera en metod när objektet skapas och / eller sätta värden på egenskaper i ett objekt baserat på inkomna argument.

I ES6 är det väldigt enkelt att skapa en constructor:
```javascript
class DemoClass {
    constructor(SomeRequiredValue, SomeNonRequriedValue = undefined) {
        this.myReqiredValue = SomeRequiredValue;
        this.myDefaultValue = SomeNonRequriedValue || "DefaultVaule";
    }
}
```
I ES5 så är det lite krångligare att skapa en constructor:
```javascript
var DemoClass = (function() {
    var Constructor = function(SomeRequiredValue, SomeNonRequriedValue = undefined) {
        this.myReqiredValue = SomeRequiredValue;
        this.myDefaultValue = SomeNonRequriedValue || "DefaultVaule";
    };
    return Constructor;
})();
```

## Skillnader mellan designmönster
Jag valde designmönster Constructor pattern, Facade pattern och Factory pattern, där Factory- och Constructor-pattern är skapande mönster, medan Facade är ett struktuellt mönster.

Den största skillnaden mellan mönsterna är att 

# 3. Skapa ett valfritt utvecklingsprojekt

1. Strategy – Den strategiska nivån
Den första nivån handlar om användarbehov och produktmål. (Varför? Vem?)
2. Scope – Omfattningsnivån
Handlar främst om kravspecifika 
(funktionella specifikationer och innehållskrav). (Vad?)

## 1. Strategi 

### Intervju
Jag äger idag en hamburgareresturang där jag vill att klienter ska kunna få fram en lista på olika hamburgare och priser på hamburgarna, dessutom önskar jag att den ska visa vad hamburgaren har för innehåll. Sedan skall klienten kunna beställa en specifik hamburgare. Jag vill i framtiden också kunna enkelt utöka utbudet till andra typer av rätter, exempelvis pizzor och / eller asiatiskt.

Om jag utökar med andra typer av rätter, så vill jag att klienter ska få välja vilken typ av rätt som skall visa. Klienten ska bara kunna välja en rätt.

## 2. Omfattning

### Innehåll
- Önskar att applikationen skall visa en lista på olika rätter med namn, innehåll och pris.
### Funktionalitet
- Skall kunna beställa en typ av rätt.
- Skall enkelt utökas till andra typer av rätter

## 

# 4. Dokumentation
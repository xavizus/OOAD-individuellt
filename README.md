# OOAD-individuellt
Individuell inlämingsuppgift.

## Godkänt
- [x] Välj 3 valfria designmönster från boken ”Learning JavaScript Design Patterns” https://addyosmani.com/resources/essentialjsdesignpatterns/book/
- [ ] Du ska beskriva med dina egna ord (på svenska) dina 3 olika designmönster.
- [ ] Skapa ett valfritt utvecklingsprojekt (JavaScript-applikation),där du använder minst ett av dina valda designmönster.
- [ ] Du behöver dokumentera ditt projekt med dina egna ord och diagram. Modellera några relevanta UML-diagram.Använd Lucidchart.com eller ett annat valfritt modelleringsverktyg

## VG 
- [ ] Skriv mer djupgående OOAD utifrån ditt eget utvecklingsprojekt. Analysen ska visa på en god förståelse för projektets måloch användarbehov.
- [ ] Du ska visa en god förståelse för skillnaderna mellan dina 3 designmönster samt deras olika tillämpningsmöjligheter i praktisk programmering.

# 1. Val av designmönster
1. Factory Pattern https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript
2. Facade Pattern https://addyosmani.com/resources/essentialjsdesignpatterns/book/#facadepatternjavascript
3. Constructor Pattern https://addyosmani.com/resources/essentialjsdesignpatterns/book/#constructorpatternjavascript

# 2. Beskriv designmönster med egna ord

## Factory pattern
**Factory pattern** är ett designmönster som används för att skapa en instans av en klass och gömma själva skapandet av objektet för användaren. Själva syftet med detta mönster är att enkelt utöka en factory med flera olika objekt som kan skapas.

Praktiskt exempel, tänk dig att du har en hamburgarresturang, där kunder kan beställa olika hamburgare. Där hamburgare har olika innehåll.

I exemplet nedan så har vi tre olika hamburgare:
- Naturel burgare
- Bacon burgare
- Ost burgare
- Ägg burgare

Med HamburgerFactory, så kan vi skapa olika hamburgare instanser beroende på vad vi får in i vår createFactory metod.
Detta gör att vi också kan utöka vår factory enkelt, utan att påverka befintlig kodbas.
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

## Facade Pattern
**Facade Pattern** är ett strukturerat designmönster, där hela poängen egentligen är att göra en metod eller klass mindre abstrakt och / eller mindre komplicerad, för användaren som skall använda metoden eller klassen.

Ett praktiskt exempel är t.ex. när du ska göra ett POST anrop med hjälp av fetch så behöver du ha med en del overhead information för att utföra ett post-anropp.


## Constructor Pattern


# 3. Skapa ett valfirtt utvecklingsproject

1. Strategy – Den strategiska nivån
Den första nivån handlar om användarbehov och produktmål.
2. Scope – Omfattningsnivån
Handlar främst om kravspecifika 
(funktionella specifikationer och innehållskrav).
3. Structure – Strukturnivån
Handlar om interaktionsdesign och informationsarkitektur, vilket anger själva strukturen för de olika produktelementen.
4. Skeleton – Skelettnivån
Handlar om gränssniBsdesign, navigationsdesign och informationsdesign.
5. Surface – Yt-nivån
Den sista nivån handlar om sensorisk design och användarupplevelse.

# 4. Dokumentation
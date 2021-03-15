// === DECORATOR PATTERN ===

// === MAIN CLASSES ===
abstract class Beverage {
  description: string = 'Unknown beverage';

  getDescription(): string {
    return this.description;
  }

  abstract cost(): number;
}

abstract class CondimentDecorator extends Beverage {
  abstract getDescription(): string;
}

// === IMPLEMENTATION BEVERAGES ===
class Expresso extends Beverage {
  constructor() {
    super();
    this.description = 'Expresso';
  }

  cost() {
    return 1.99;
  }
}

class HouseBlend extends Beverage {
  constructor() {
    super();
    this.description = 'House Blend';
  }

  cost() {
    return 0.89;
  }
}

class DarkRoast extends Beverage {
  constructor() {
    super();
    this.description = 'Dark Roast';
  }

  cost() {
    return 0.99;
  }
}

class Decaf extends Beverage {
  constructor() {
    super();
    this.description = 'Decaf';
  }

  cost() {
    return 1.05;
  }
}

// === IMPLEMENTATION DECORATORS ===
class Mocha extends CondimentDecorator {
  beverage: Beverage;

  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription() {
    return `${this.beverage.getDescription()}, Mocha`;
  }

  cost() {
    return 0.2 + this.beverage.cost();
  }
}

class Soy extends CondimentDecorator {
  beverage: Beverage;

  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription() {
    return `${this.beverage.getDescription()}, Soy`;
  }

  cost() {
    return 0.15 + this.beverage.cost();
  }
}

class Milk extends CondimentDecorator {
  beverage: Beverage;

  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription() {
    return `${this.beverage.getDescription()}, Milk`;
  }

  cost() {
    return 0.1 + this.beverage.cost();
  }
}

class Whip extends CondimentDecorator {
  beverage: Beverage;

  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription() {
    return `${this.beverage.getDescription()}, Whip`;
  }

  cost() {
    return 0.1 + this.beverage.cost();
  }
}

// === MAKING COFFEE ===
const beverage = new Expresso();
console.log(`${beverage.getDescription()} $${beverage.cost()}`);

let beverage2 = new DarkRoast();
beverage2 = new Mocha(beverage2);
beverage2 = new Mocha(beverage2);
beverage2 = new Whip(beverage2);
console.log(`${beverage2.getDescription()} $${beverage2.cost()}`);

let beverage3 = new HouseBlend();
beverage3 = new Soy(beverage3);
beverage3 = new Mocha(beverage3);
beverage3 = new Whip(beverage3);
console.log(`${beverage3.getDescription()} $${beverage3.cost()}`);

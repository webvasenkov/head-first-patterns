// === STRATEGY PATTERN ===

/* 
Паттерн Стратегия определяет семейство ал-
горитмов, инкапсулирует каждый из них и обе-
спечивает их взаимозаменяемость. Он позво-
ляет модифицировать алгоритмы независимо
от их использования на стороне клиента.
*/

interface FlyBehavior {
  fly(): void;
}

interface QuackBehavior {
  quack(): void;
}

class FlyWithWings implements FlyBehavior {
  fly() {
    console.log("I'm flying!");
  }
}

class FlyNoWay implements FlyBehavior {
  fly() {
    console.log("I'm can't fly");
  }
}

class FlyRocketPowered implements FlyBehavior {
  fly() {
    console.log("I'm flying with a rocket!");
  }
}

class Quack implements QuackBehavior {
  quack() {
    console.log('Quack');
  }
}

class MuteQuack implements QuackBehavior {
  quack() {
    console.log('<< Silence >>');
  }
}

class Squeak implements QuackBehavior {
  quack() {
    console.log('Squeak');
  }
}

class Duck {
  constructor(public flyBehavior: FlyBehavior, public quackBehavior: QuackBehavior) {}

  performFly() {
    this.flyBehavior.fly();
  }

  swim() {
    console.log('Duck swim');
  }

  display() {
    console.log('Display dock');
  }

  performQuack() {
    this.quackBehavior.quack();
  }

  set setFlyBehavior(fb: FlyBehavior) {
    this.flyBehavior = fb;
  }

  set setQuackBehavior(qb: QuackBehavior) {
    this.quackBehavior = qb;
  }
}

class MallardDuck extends Duck {
  constructor() {
    super(new FlyWithWings(), new Quack());
  }

  display() {
    console.log("I'm mallard duck");
  }
}

class ModelDuck extends Duck {
  constructor() {
    super(new FlyNoWay(), new MuteQuack());
  }

  display() {
    console.log("I'm model duck");
  }
}

const mallard = new MallardDuck();
mallard.performQuack();
mallard.performFly();

const model = new ModelDuck();
model.performFly();
model.setFlyBehavior = new FlyRocketPowered();
model.performFly();

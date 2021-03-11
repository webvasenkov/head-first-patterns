"use strict";
// === STRATEGY PATTERN ===
class FlyWithWings {
    fly() {
        console.log("I'm flying!");
    }
}
class FlyNoWay {
    fly() {
        console.log("I'm can't fly");
    }
}
class FlyRocketPowered {
    fly() {
        console.log("I'm flying with a rocket!");
    }
}
class Quack {
    quack() {
        console.log('Quack');
    }
}
class MuteQuack {
    quack() {
        console.log('<< Silence >>');
    }
}
class Squeak {
    quack() {
        console.log('Squeak');
    }
}
class Duck {
    constructor(flyBehavior, quackBehavior) {
        this.flyBehavior = flyBehavior;
        this.quackBehavior = quackBehavior;
    }
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
    set setFlyBehavior(fb) {
        this.flyBehavior = fb;
    }
    set setQuackBehavior(qb) {
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

"use strict";
// === OBSERVER PATTERN ===
// === SUBJECT ===
class WeatherData {
    constructor() {
        this.observers = [];
        this.temperature = 0;
        this.humidity = 0;
        this.pressure = 0;
    }
    registerObserver(o) {
        this.observers.push(o);
    }
    removeObserver(o) {
        this.observers = this.observers.filter((observer) => observer !== o);
    }
    notifyObserver() {
        this.observers.forEach((observer) => observer.update(this.temperature, this.humidity, this.pressure));
    }
    measurementChanged() {
        this.notifyObserver();
    }
    setMeasurement(temperature, humidity, pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        this.measurementChanged();
    }
}
// === OBSERVERS (DISPLAYS) ===
class CurrentConditionalsDisplay {
    constructor(weatherData) {
        this.weatherData = weatherData;
        this.temperature = 0;
        this.humidity = 0;
        this.weatherData = weatherData;
        weatherData.registerObserver(this);
    }
    update(temperature, humidity, pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.display();
    }
    unsubscribe() {
        this.weatherData.removeObserver(this);
    }
    display() {
        console.log(`Current conditional ${this.temperature}F degrees and ${this.humidity}% humidity`);
    }
}
class StaticDisplay {
    constructor(weatherData) {
        this.weatherData = weatherData;
        this.maxTemp = 0;
        this.minTemp = 200;
        this.tempSum = 0;
        this.numReadings = 0;
        this.weatherData = weatherData;
        weatherData.registerObserver(this);
    }
    update(temperature) {
        this.tempSum += temperature;
        this.numReadings++;
        if (temperature > this.maxTemp) {
            this.maxTemp = temperature;
        }
        if (temperature < this.minTemp) {
            this.minTemp = temperature;
        }
        this.display();
    }
    unsubscribe() {
        this.weatherData.removeObserver(this);
    }
    display() {
        console.log(`Avg/Max/Min temperature = ${this.tempSum / this.numReadings}/${this.maxTemp}/${this.minTemp}`);
    }
}
class ForeCastDisplay {
    constructor(weatherData) {
        this.weatherData = weatherData;
        this.currentPressure = 29.92;
        this.lastPressure = 0;
        this.weatherData = weatherData;
        weatherData.registerObserver(this);
    }
    update(_1, _2, pressure) {
        this.lastPressure = this.currentPressure;
        this.currentPressure = pressure;
        this.display();
    }
    unsubscribe() {
        this.weatherData.removeObserver(this);
    }
    display() {
        if (this.currentPressure > this.lastPressure) {
            console.log('Forecast: Improving weather on the way!');
        }
        else if (this.currentPressure === this.lastPressure) {
            console.log('Forecast: More of the same');
        }
        else if (this.currentPressure < this.lastPressure) {
            console.log('Forecast: Watch out for cooler, rainy weather');
        }
    }
}
class HeatIndexDisplay {
    constructor(weatherData) {
        this.weatherData = weatherData;
        this.heatIndex = 0;
        this.weatherData = weatherData;
        weatherData.registerObserver(this);
    }
    computeHeatIndex(t, rh) {
        const index = 16.923 +
            0.185212 * t +
            5.37941 * rh -
            0.100254 * t * rh +
            0.00941695 * (t * t) +
            0.00728898 * (rh * rh) +
            0.000345372 * (t * t * rh) -
            0.000814971 * (t * rh * rh) +
            0.0000102102 * (t * t * rh * rh) -
            0.000038646 * (t * t * t) +
            0.0000291583 * (rh * rh * rh) +
            0.00000142721 * (t * t * t * rh) +
            0.000000197483 * (t * rh * rh * rh) -
            0.0000000218429 * (t * t * t * rh * rh) +
            0.000000000843296 * (t * t * rh * rh * rh) -
            0.0000000000481975 * (t * t * t * rh * rh * rh);
        return index;
    }
    update(temperature, humidity) {
        this.heatIndex = +this.computeHeatIndex(temperature, humidity).toFixed(5);
        this.display();
    }
    unsubscribe() {
        this.weatherData.removeObserver(this);
    }
    display() {
        console.log('Heat index is', this.heatIndex.toFixed(5));
    }
}
// === TEST ===
const weatherData = new WeatherData();
const currentConditionalDisplay = new CurrentConditionalsDisplay(weatherData);
const staticDisplay = new StaticDisplay(weatherData);
const foreCastDisplay = new ForeCastDisplay(weatherData);
const heatIndexDisplay = new HeatIndexDisplay(weatherData);
console.log('--- UPDATE ---');
weatherData.setMeasurement(80, 65, 30.4);
console.log('--- UPDATE ---');
weatherData.setMeasurement(82, 70, 29.2);
console.log('--- UPDATE ---');
foreCastDisplay.unsubscribe();
heatIndexDisplay.unsubscribe();
weatherData.setMeasurement(78, 90, 29.2);

// === OBSERVER PATTERN ===

// === INTERFACES ===
interface Subject {
  registerObserver(o: Observer): void;
  removeObserver(o: Observer): void;
  notifyObserver(): void;
}

interface Observer {
  update(temp: number, humidity: number, pressure: number): void;
}

interface DisplayElement {
  display(): void;
}

// === SUBJECT ===
class WeatherData implements Subject {
  private observers: Observer[] = [];
  private temperature: number = 0;
  private humidity: number = 0;
  private pressure: number = 0;

  registerObserver(o: Observer) {
    this.observers.push(o);
  }

  removeObserver(o: Observer) {
    this.observers = this.observers.filter((observer) => observer !== o);
  }

  notifyObserver() {
    this.observers.forEach((observer: Observer) => observer.update(this.temperature, this.humidity, this.pressure));
  }

  measurementChanged() {
    this.notifyObserver();
  }

  setMeasurement(temperature: number, humidity: number, pressure: number) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.measurementChanged();
  }
}

// === OBSERVERS (DISPLAYS) ===
class CurrentConditionalsDisplay implements DisplayElement, Observer {
  private temperature: number = 0;
  private humidity: number = 0;

  constructor(private weatherData: Subject) {
    this.weatherData = weatherData;
    weatherData.registerObserver(this);
  }

  update(temperature: number, humidity: number, pressure: number) {
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

class StaticDisplay implements DisplayElement, Observer {
  private maxTemp: number = 0;
  private minTemp: number = 200;
  private tempSum: number = 0;
  private numReadings: number = 0;

  constructor(private weatherData: Subject) {
    this.weatherData = weatherData;
    weatherData.registerObserver(this);
  }

  update(temperature: number) {
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

class ForeCastDisplay implements DisplayElement, Observer {
  private currentPressure: number = 29.92;
  private lastPressure: number = 0;

  constructor(private weatherData: Subject) {
    this.weatherData = weatherData;
    weatherData.registerObserver(this);
  }

  update(_1: number, _2: number, pressure: number) {
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
    } else if (this.currentPressure === this.lastPressure) {
      console.log('Forecast: More of the same');
    } else if (this.currentPressure < this.lastPressure) {
      console.log('Forecast: Watch out for cooler, rainy weather');
    }
  }
}

class HeatIndexDisplay implements DisplayElement, Observer {
  private heatIndex: number = 0;

  constructor(private weatherData: Subject) {
    this.weatherData = weatherData;
    weatherData.registerObserver(this);
  }

  private computeHeatIndex(t: number, rh: number): number {
    const index =
      16.923 +
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
  update(temperature: number, humidity: number) {
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
const weatherData: WeatherData = new WeatherData();

const currentConditionalDisplay: CurrentConditionalsDisplay = new CurrentConditionalsDisplay(weatherData);
const staticDisplay: StaticDisplay = new StaticDisplay(weatherData);
const foreCastDisplay: ForeCastDisplay = new ForeCastDisplay(weatherData);
const heatIndexDisplay: HeatIndexDisplay = new HeatIndexDisplay(weatherData);

console.log('--- UPDATE ---');
weatherData.setMeasurement(80, 65, 30.4);
console.log('--- UPDATE ---');
weatherData.setMeasurement(82, 70, 29.2);
console.log('--- UPDATE ---');
foreCastDisplay.unsubscribe();
heatIndexDisplay.unsubscribe();
weatherData.setMeasurement(78, 90, 29.2);

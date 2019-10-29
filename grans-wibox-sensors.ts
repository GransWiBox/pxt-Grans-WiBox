
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

enum Colours {
    Off,
    Red,
    Green,
    Blue,
    Yellow,
    Purple,
    Cyan,
    White
}
/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace thales_iot {
    /**
     * TODO: describe your function here
     * @param n describe parameter here, eg: 5
     * @param s describe parameter here, eg: "fun this stuff"
     * @param e describe parameter here
     */
    //% block
    export function test(n: number, s: string, e: MyEnum): void {
        // Add code here
        let temp = input.temperature();
        //basic.showNumber(temp);
        if (e == MyEnum.One) {
            basic.showNumber(temp);
        }
        else {
            basic.showNumber(rip());

        }
        //input.temperature();
    }

    //%block
    export function pinoutFunction(pin: AnalogPin): void {
        let inputData = pins.analogReadPin(pin);
        inputData = Math.map(inputData, 0, 1023, 0, 5);
        basic.showNumber(inputData);
    }
    //%block
    export function lightLED(pin: DigitalPin, value: number) {
        pins.digitalWritePin(pin, value);
    }

    //%block
    export function lightRGBLED(redPin: DigitalPin, greenPin: DigitalPin, bluePin: DigitalPin, redValue: number, greenValue: number, blueValue: number) {
        lightLED(redPin, redValue);
        lightLED(greenPin, greenValue);
        lightLED(bluePin, blueValue);
    }

    //rgb pins
    let redPin = DigitalPin.P0;
    let greenPin = DigitalPin.P1;
    let bluePin = DigitalPin.P2;

    //%block
    export function startRgbLed(p_redPin: DigitalPin, p_greenPin: DigitalPin, p_bluePin: DigitalPin) {
        redPin = p_redPin;
        greenPin = p_greenPin;
        bluePin = p_bluePin;
        pins.digitalWritePin(redPin, 1);
        pins.digitalWritePin(greenPin, 1);
        pins.digitalWritePin(bluePin, 1);
        basic.pause(300);
    }
    function setLed(redValue: number, greenValue: number, blueValue: number) {
        pins.digitalWritePin(redPin, redValue);
        pins.digitalWritePin(greenValue, greenValue);
        pins.digitalWritePin(blueValue, blueValue);
    }

    //%block
    export function turnOnRgbLed(colour: Colours) {
        switch (colour) {
            case Colours.Off:
                {
                    setLed(0, 0, 0);
                    break;
                }
            case Colours.Red:
                {
                    setLed(1, 0, 0);
                    break;
                }
            case Colours.Green:
                {
                    setLed(0, 1, 0);
                    break;
                }
            case Colours.Blue:
                {
                    setLed(0, 0, 1);
                    break;
                }
            case Colours.Yellow:
                {
                    setLed(1, 1, 0);
                    break;
                }
            case Colours.Purple:
                {
                    setLed(1, 0, 1);
                    break;
                }
            case Colours.Cyan:
                {
                    setLed(0, 1, 1);
                    break;
                }
            case Colours.White:
                {
                    setLed(1, 1, 1);
                    break;
                }
        }
    }

    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 5
     */
    //% block
    export function fib(value: number): number {
        return value <= 1 ? value : fib(value - 1) + fib(value - 2);
    }

    //%block
    export function rip(): number {
        return 69;
    }

    let sevenSeg: TM1637.TM1637LEDs = null;
    let sevenSegNum = 0;
    //%block
    export function startSevenSegment(clock: DigitalPin, DIO: DigitalPin) {
        sevenSeg = TM1637.create(clock, DIO, 7, 4);
    }
    //%block
    export function setSevenSegDisplay(value: boolean) {
        if (sevenSeg != null) {
            if (value) {
                sevenSeg.on();
            }
            else {
                sevenSeg.off();
            }
        }
    }

    //%block
    export function turnOnSevenSegment() {
        setSevenSegDisplay(true);
    }
    //%block
    export function turnOffSevenSegment() {
        setSevenSegDisplay(false);
    }
    //%block
    export function showNumberOnSevenSegment(value: number) {
        if (sevenSeg == null) return;
        sevenSeg.showNumber(value);
    }
    //%block 
    export function readPot(pin: AnalogPin): number {
        return pins.analogReadPin(pin);
    }


    //smoke sensor
    let smokeDigitalPin = DigitalPin.P0;
    let smokeAnalogPin = AnalogPin.P1;
    let smokeThreshold = 500;

    //%block
    export function startSmokeSensor(digitalPin: DigitalPin, analogPin: AnalogPin, threshold: number) {
        smokeDigitalPin = digitalPin;
        smokeAnalogPin = analogPin;
        smokeThreshold = threshold;
    }
    //%block
    export function setSmokeSensorThreshold(threshold: number) {
        smokeThreshold = threshold;
    }
    //%block
    export function readSmokeSensorAnalogValue() {
        return pins.analogReadPin(smokeAnalogPin);
    }
    //%block
    export function readSmokeSensorDigitalValue() {
        return pins.digitalReadPin(smokeDigitalPin);
    }
    //%block
    export function hasDetecedSmoke(): boolean {
        return readSmokeSensorAnalogValue() >= smokeThreshold;
    }

    //sound sensor
    let soundDigitalPin = DigitalPin.P0;
    let soundAnalogPin = AnalogPin.P1;
    let soundThreshold = 500;

    //%block
    export function startSoundSensor(digitalPin: DigitalPin, analogPin: AnalogPin, threshold: number) {
        soundDigitalPin = digitalPin;
        soundAnalogPin = analogPin;
        soundThreshold = threshold;
    }
    //%block
    export function setSoundSensorThreshold(threshold: number) {
        soundThreshold = threshold;
    }
    //%block
    export function readSoundSensorAnalogValue() {
        return pins.analogReadPin(soundAnalogPin);
    }
    //%block
    export function readSoundSensorDigitalValue() {
        return pins.digitalReadPin(soundDigitalPin);
    }

    //%block
    export function hasDetecedSound(): boolean {
        return readSmokeSensorAnalogValue() >= soundThreshold;
    }




}

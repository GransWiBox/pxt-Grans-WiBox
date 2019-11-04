
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
//% weight=150 color=#6633cc icon=""
namespace thales_iot {
    //rgb pins
    let redPin = DigitalPin.P0;
    let greenPin = DigitalPin.P1;
    let bluePin = DigitalPin.P2;

    /**
     * Sets the pins of the RGB LED so you can turn it on - The LED will flash white for half a second if wired correctly
     * @param p_redPin the pin which the red leg of the LED is attached to, eg: DigitalPin.P0
     * @param p_greenPin the pin which the green leg of the LED is attached to, eg: DigitalPin.P1
     * @param p_bluePin the pin which the blue leg of the LED is attached to, eg: DigitalPin.P2
     */
    //%block="startRGBLED  red $p_redPin green $p_greenPin blue $p_bluePin" color=#6633cc
    export function startRgbLed(p_redPin: DigitalPin, p_greenPin: DigitalPin, p_bluePin: DigitalPin) {
        redPin = p_redPin;
        greenPin = p_greenPin;
        bluePin = p_bluePin;
        pins.digitalWritePin(redPin, 1);
        pins.digitalWritePin(greenPin, 1);
        pins.digitalWritePin(bluePin, 1);
        basic.pause(500);
        pins.digitalWritePin(redPin, 0);
        pins.digitalWritePin(greenPin, 0);
        pins.digitalWritePin(bluePin, 0);
    }
    //helper function to light the leds
    function setLed(redValue: number, greenValue: number, blueValue: number) {
        pins.digitalWritePin(redPin, redValue);
        pins.digitalWritePin(greenPin, greenValue);
        pins.digitalWritePin(bluePin, blueValue);
    }

    /**
     * Makes the RGB LED turn to the colour you select
     * @param colour the colour you wish your LED to shine, eg: Colours.Red
     */
    //%block="Make the RGB LED turn $colour" color=#04b7cf
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

    let sevenSeg: TM1637.TM1637LEDs = null;
    let sevenSegNum = 0;
    /**
     * Sets the pins of the seven segment display so you can display numbers to it - The seven segement display will flash the number 8 for half a second then turn off if wired correctly
     * @param clock the pin on the microbit which the clock lead of the seven segment display is attached to, eg: DigitalPin.P0
     * @param DIO the pin on the microbit which the digital input/output (DIO) lead of the seven segment display is attached to, eg: DigitalPin.P1
     */
    //%block="start seven segment display clock $clock DIO $DIO" color=#6633cc
    export function startSevenSegment(clock: DigitalPin, DIO: DigitalPin) {
        sevenSeg = TM1637.create(clock, DIO, 7, 4);
        turnOnSevenSegment();
        showNumberOnSevenSegment(8);
        basic.pause(500);
        turnOffSevenSegment();
    }
    //helper function
    function setSevenSegDisplay(value: boolean) {
        if (sevenSeg != null) {
            if (value) {
                sevenSeg.on();
            }
            else {
                sevenSeg.off();
            }
        }
    }

    /**
     * Turns on the Seven Segment Display
     */
    //%block color=#04b7cf
    export function turnOnSevenSegment() {
        setSevenSegDisplay(true);
    }
    /**
     * Turns off the Seven Segment Display
     */
    //%block color=#04b7cf
    export function turnOffSevenSegment() {
        setSevenSegDisplay(false);
    }
    /**
     * Displays a number on the Seven Segment Display
     * @param value the number you want to display on the seven segment, eg: 5
     */
    //%block="Show $value On Seven Segment " color=#04b7cf
    export function showNumberOnSevenSegment(value: number) {
        if (sevenSeg == null) return;
        sevenSeg.showNumber(value);
    }

    /**
     * Reads the potentiometer and returns a value between the min value and the max value
     * @param analogPin the pin on the microbit which the potentiometer lead of the smoke sensor is attached to, eg: AnalogPin.P1
     * @param minValue the lowest number you want the potentiometer to read, eg: 1
     * @param maxValue the highest number you want the potentiometer to read, eg: 10
     */
    //%block="read the potentiometer at $pin with min value $minValue and max value $maxValue" color=#a2c841
    export function readPotentiometer(pin: AnalogPin, minValue: number, maxValue: number): number {
        return Math.map(pins.analogReadPin(pin), 0, 1023, minValue, maxValue);
    }


    //smoke sensor
    let smokeDigitalPin = DigitalPin.P0;
    let smokeAnalogPin = AnalogPin.P1;
    let smokeThreshold = 500;

    /**
     * Sets the pins of the smoke sensor so you can detect smoke
     * @param digitalPin the pin on the microbit which the digital lead of the smoke sensor is attached to, eg: DigitalPin.P0
     * @param analogPin the pin on the microbit which the analog lead of the smoke sensor is attached to, eg: AnalogPin.P1
     * @param threshold the number where the smoke sensor will detect the environment as being smokey - a value between 1-1023, eg: 600
     */
    //%block="start smoke sensor digital pin $digitalPin analog pin %analogPin threshold $threshold" color=#6633cc
    export function startSmokeSensor(digitalPin: DigitalPin, analogPin: AnalogPin, threshold: number) {
        smokeDigitalPin = digitalPin;
        smokeAnalogPin = analogPin;
        smokeThreshold = threshold;
    }
    /**
     * Sets the threshold of the smoke sensor
     * @param threshold the number where the smoke sensor will detect the environment as being smokey - a value between 1-1023, eg: 600
     */
    //%block="set smoke sensor threshold $threshold" color=#6633cc
    export function setSmokeSensorThreshold(threshold: number) {
        smokeThreshold = threshold;
    }
    /**
     * Returns the smoke sensor analog value - a value between 1-1023, eg: 600
     */
    //%block color=#a2c841
    export function readSmokeSensorAnalogValue(): number {
        return pins.analogReadPin(smokeAnalogPin);
    }
    /**
     * Returns the smoke sensor digital value - a value between 0-1, eg: 1
     */
    //%block color=#a2c841
    export function readSmokeSensorDigitalValue(): number {
        return pins.digitalReadPin(smokeDigitalPin);
    }
    /**
     * Returns true if the smoke sensor has detected smoke higher than the threshold otherwise returns false
     */
    //%block color=#a2c841
    export function hasDetecedSmoke(): boolean {
        return readSmokeSensorAnalogValue() >= smokeThreshold;
    }

    //sound sensor
    let soundDigitalPin = DigitalPin.P0;
    let soundAnalogPin = AnalogPin.P1;
    let soundThreshold = 500;

    /**
     * Sets the pins of the sound sensor so you can detect sound
     * @param digitalPin the pin on the microbit which the digital lead of the sound sensor is attached to, eg: DigitalPin.P0
     * @param analogPin the pin on the microbit which the analog lead of the sound sound is attached to, eg: AnalogPin.P1
     * @param threshold the number where the sound sensor will detect the environment as being noisy - a value between 1-1023, eg: 600
     */
     //%block="start sound sensor digital pin $digitalPin analog Pin %analogPin threshold $threshold" color=#6633cc
    export function startSoundSensor(digitalPin: DigitalPin, analogPin: AnalogPin, threshold: number) {
        soundDigitalPin = digitalPin;
        soundAnalogPin = analogPin;
        soundThreshold = threshold;
    }
    /**
     * Sets the threshold of the sound sensor
     * @param threshold the number where the sound sensor will detect the environment as being smokey - a value between 1-1023, eg: 600
     */
    //%block="set sound sensor threshold $threshold" color=#6633cc
    export function setSoundSensorThreshold(threshold: number) {
        soundThreshold = threshold;
    }
    /**
     * Returns the sound sensor analog value - a value between 1-1023, eg: 600
     */
    //%block color=#a2c841
    export function readSoundSensorAnalogValue() {
        return pins.analogReadPin(soundAnalogPin);
    }
    /**
     * Returns the sound sensor digital value - a value between 0-1, eg: 1
     */
    //%block color=#a2c841
    export function readSoundSensorDigitalValue() {
        return pins.digitalReadPin(soundDigitalPin);
    }

    /**
     * Returns true if the sound sensor has detected smoke higher than the threshold otherwise returns false
     */
    //%block color=#a2c841
    export function hasDetecedSound(): boolean {
        return readSmokeSensorAnalogValue() >= soundThreshold;
    }




}

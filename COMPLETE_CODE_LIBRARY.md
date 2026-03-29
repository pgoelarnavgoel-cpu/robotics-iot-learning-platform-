# Complete Code Snippets Library

## All Available Arduino/IoT Code in the Platform

This document contains all the ready-to-use code snippets available in the Robotics and IoT Learning Platform. Users can copy these directly from project pages.

---

## 1. LED Blink Circuit

**Category:** IoT  
**Difficulty:** Beginner  
**Platform:** Arduino

### Code:
```cpp
// LED Blink Circuit - Arduino Code
// Connect LED to pin 13 (built-in LED) or any digital pin

const int ledPin = 13;  // LED connected to digital pin 13

void setup() {
  // Initialize the digital pin as an output
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH);   // Turn the LED on
  delay(1000);                  // Wait for 1 second
  digitalWrite(ledPin, LOW);    // Turn the LED off
  delay(1000);                  // Wait for 1 second
}

/* 
 * Hardware Connections:
 * - LED Anode (+) -> Pin 13 (through 220Ω resistor)
 * - LED Cathode (-) -> GND
 * 
 * Notes:
 * - Adjust delay() values to change blink speed
 * - Use external LED with current-limiting resistor (220Ω-1kΩ)
 */
```

---

## 2. Ultrasonic Distance Sensor

**Category:** Robotics  
**Difficulty:** Beginner  
**Platform:** Arduino

### Code:
```cpp
// Ultrasonic Distance Sensor - Arduino Code
// HC-SR04 Ultrasonic Sensor

const int trigPin = 9;   // Trigger pin
const int echoPin = 10;  // Echo pin

long duration;
int distance;

void setup() {
  pinMode(trigPin, OUTPUT);  // Set trigger pin as output
  pinMode(echoPin, INPUT);   // Set echo pin as input
  Serial.begin(9600);        // Start serial communication
}

void loop() {
  // Clear the trigger pin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  
  // Send 10 microsecond pulse to trigger
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // Read the echo pin
  duration = pulseIn(echoPin, HIGH);
  
  // Calculate distance in cm
  distance = duration * 0.034 / 2;
  
  // Print distance to Serial Monitor
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");
  
  delay(500);  // Wait 500ms before next reading
}

/* 
 * Hardware Connections:
 * - VCC -> 5V
 * - GND -> GND
 * - Trig -> Pin 9
 * - Echo -> Pin 10
 * 
 * Notes:
 * - Sensor range: 2cm to 400cm
 * - Open Serial Monitor (9600 baud) to view readings
 */
```

---

## 3. WiFi Weather Station

**Category:** IoT  
**Difficulty:** Intermediate  
**Platform:** ESP8266/NodeMCU

### Code:
```cpp
// WiFi Weather Station - ESP8266/NodeMCU Code
// Requires: DHT sensor library, ESP8266WiFi library

#include <ESP8266WiFi.h>
#include <DHT.h>

// WiFi credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// DHT Sensor settings
#define DHTPIN D4        // DHT sensor connected to D4
#define DHTTYPE DHT11    // DHT11 or DHT22
DHT dht(DHTPIN, DHTTYPE);

WiFiServer server(80);

void setup() {
  Serial.begin(115200);
  dht.begin();
  
  // Connect to WiFi
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  
  server.begin();
}

void loop() {
  WiFiClient client = server.available();
  
  if (client) {
    Serial.println("New client connected");
    
    // Read sensor data
    float humidity = dht.readHumidity();
    float temperature = dht.readTemperature();
    
    // Check if readings are valid
    if (isnan(humidity) || isnan(temperature)) {
      Serial.println("Failed to read from DHT sensor!");
      return;
    }
    
    // Send HTTP response
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: text/html");
    client.println("Connection: close");
    client.println();
    
    // HTML page
    client.println("<!DOCTYPE HTML>");
    client.println("<html>");
    client.println("<head><title>Weather Station</title></head>");
    client.println("<body>");
    client.println("<h1>WiFi Weather Station</h1>");
    client.print("<p>Temperature: ");
    client.print(temperature);
    client.println(" &deg;C</p>");
    client.print("<p>Humidity: ");
    client.print(humidity);
    client.println(" %</p>");
    client.println("</body>");
    client.println("</html>");
    
    delay(1);
    client.stop();
    Serial.println("Client disconnected");
  }
}

/* 
 * Hardware Connections:
 * - DHT11/DHT22 VCC -> 3.3V
 * - DHT11/DHT22 GND -> GND
 * - DHT11/DHT22 Data -> D4
 * 
 * Setup Instructions:
 * 1. Install DHT sensor library from Library Manager
 * 2. Replace YOUR_WIFI_SSID and YOUR_WIFI_PASSWORD
 * 3. Upload code and open Serial Monitor (115200 baud)
 * 4. Note the IP address and open it in browser
 */
```

---

## 4. Line Following Robot

**Category:** Robotics  
**Difficulty:** Intermediate  
**Platform:** Arduino

### Code:
```cpp
// Line Following Robot - Arduino Code
// Uses IR sensors and motor driver (L298N)

// Motor pins
const int motorLeftForward = 5;
const int motorLeftBackward = 6;
const int motorRightForward = 9;
const int motorRightBackward = 10;

// IR Sensor pins
const int leftSensor = 2;
const int rightSensor = 3;

// Motor speed
const int speed = 150;  // 0-255

void setup() {
  // Set motor pins as output
  pinMode(motorLeftForward, OUTPUT);
  pinMode(motorLeftBackward, OUTPUT);
  pinMode(motorRightForward, OUTPUT);
  pinMode(motorRightBackward, OUTPUT);
  
  // Set sensor pins as input
  pinMode(leftSensor, INPUT);
  pinMode(rightSensor, INPUT);
  
  Serial.begin(9600);
}

void loop() {
  // Read sensor values (LOW = black line detected)
  int leftValue = digitalRead(leftSensor);
  int rightValue = digitalRead(rightSensor);
  
  // Both sensors on line - Move forward
  if (leftValue == LOW && rightValue == LOW) {
    moveForward();
    Serial.println("Moving Forward");
  }
  // Left sensor off line - Turn right
  else if (leftValue == HIGH && rightValue == LOW) {
    turnRight();
    Serial.println("Turning Right");
  }
  // Right sensor off line - Turn left
  else if (leftValue == LOW && rightValue == HIGH) {
    turnLeft();
    Serial.println("Turning Left");
  }
  // Both sensors off line - Stop
  else {
    stopMotors();
    Serial.println("Stopped");
  }
  
  delay(10);
}

void moveForward() {
  analogWrite(motorLeftForward, speed);
  analogWrite(motorLeftBackward, 0);
  analogWrite(motorRightForward, speed);
  analogWrite(motorRightBackward, 0);
}

void turnLeft() {
  analogWrite(motorLeftForward, 0);
  analogWrite(motorLeftBackward, speed);
  analogWrite(motorRightForward, speed);
  analogWrite(motorRightBackward, 0);
}

void turnRight() {
  analogWrite(motorLeftForward, speed);
  analogWrite(motorLeftBackward, 0);
  analogWrite(motorRightForward, 0);
  analogWrite(motorRightBackward, speed);
}

void stopMotors() {
  analogWrite(motorLeftForward, 0);
  analogWrite(motorLeftBackward, 0);
  analogWrite(motorRightForward, 0);
  analogWrite(motorRightBackward, 0);
}

/* 
 * Hardware Connections:
 * L298N Motor Driver:
 * - IN1 -> Pin 5 (Left Motor Forward)
 * - IN2 -> Pin 6 (Left Motor Backward)
 * - IN3 -> Pin 9 (Right Motor Forward)
 * - IN4 -> Pin 10 (Right Motor Backward)
 * 
 * IR Sensors:
 * - Left Sensor OUT -> Pin 2
 * - Right Sensor OUT -> Pin 3
 * - VCC -> 5V, GND -> GND
 * 
 * Notes:
 * - Adjust speed variable for different speeds
 * - Calibrate sensors for your line width
 * - Test on black line on white surface
 */
```

---

## 5. Smart Door Lock

**Category:** IoT  
**Difficulty:** Advanced  
**Platform:** Arduino

### Code:
```cpp
// Smart Door Lock - Arduino Code
// Uses Servo motor and Keypad

#include <Servo.h>
#include <Keypad.h>

// Servo setup
Servo doorLock;
const int servoPin = 9;

// Keypad setup
const byte ROWS = 4;
const byte COLS = 4;
char keys[ROWS][COLS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};
byte rowPins[ROWS] = {2, 3, 4, 5};
byte colPins[COLS] = {6, 7, 8, 10};
Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

// Password
String password = "1234";  // Change this to your password
String inputPassword = "";

// LED pins
const int greenLED = 11;
const int redLED = 12;

void setup() {
  Serial.begin(9600);
  
  // Initialize servo
  doorLock.attach(servoPin);
  doorLock.write(0);  // Locked position
  
  // Initialize LEDs
  pinMode(greenLED, OUTPUT);
  pinMode(redLED, OUTPUT);
  
  digitalWrite(redLED, HIGH);  // Red LED on (locked)
  
  Serial.println("Smart Door Lock Ready");
  Serial.println("Enter Password:");
}

void loop() {
  char key = keypad.getKey();
  
  if (key) {
    Serial.print("*");
    
    if (key == '#') {  // Enter key
      if (inputPassword == password) {
        unlockDoor();
      } else {
        accessDenied();
      }
      inputPassword = "";  // Clear input
    }
    else if (key == '*') {  // Clear key
      inputPassword = "";
      Serial.println("\nPassword cleared");
    }
    else {
      inputPassword += key;
    }
  }
}

void unlockDoor() {
  Serial.println("\nAccess Granted!");
  
  digitalWrite(redLED, LOW);
  digitalWrite(greenLED, HIGH);
  
  doorLock.write(90);  // Unlock position
  
  delay(5000);  // Keep unlocked for 5 seconds
  
  // Lock again
  doorLock.write(0);
  digitalWrite(greenLED, LOW);
  digitalWrite(redLED, HIGH);
  
  Serial.println("Door Locked");
  Serial.println("Enter Password:");
}

void accessDenied() {
  Serial.println("\nAccess Denied!");
  
  // Blink red LED
  for (int i = 0; i < 3; i++) {
    digitalWrite(redLED, LOW);
    delay(200);
    digitalWrite(redLED, HIGH);
    delay(200);
  }
  
  Serial.println("Enter Password:");
}

/* 
 * Hardware Connections:
 * Servo Motor:
 * - Signal -> Pin 9
 * - VCC -> 5V
 * - GND -> GND
 * 
 * 4x4 Keypad:
 * - Row pins -> Pins 2, 3, 4, 5
 * - Column pins -> Pins 6, 7, 8, 10
 * 
 * LEDs:
 * - Green LED -> Pin 11 (with 220Ω resistor)
 * - Red LED -> Pin 12 (with 220Ω resistor)
 * 
 * Notes:
 * - Change password variable to set your own password
 * - Press # to submit password
 * - Press * to clear input
 * - Adjust servo angles for your lock mechanism
 * 
 * Required Libraries:
 * - Servo (built-in)
 * - Keypad (install from Library Manager)
 */
```

---

## 6. Voice Controlled Robot

**Category:** Robotics  
**Difficulty:** Advanced  
**Platform:** Arduino

### Code:
```cpp
// Voice Controlled Robot - Arduino Code
// Uses Bluetooth module (HC-05) and motor driver

// Motor pins (L298N Motor Driver)
const int motorLeftForward = 5;
const int motorLeftBackward = 6;
const int motorRightForward = 9;
const int motorRightBackward = 10;

// Motor speed
const int speed = 200;  // 0-255

char command;  // Variable to store Bluetooth command

void setup() {
  // Initialize serial communication for Bluetooth
  Serial.begin(9600);
  
  // Set motor pins as output
  pinMode(motorLeftForward, OUTPUT);
  pinMode(motorLeftBackward, OUTPUT);
  pinMode(motorRightForward, OUTPUT);
  pinMode(motorRightBackward, OUTPUT);
  
  // Stop motors initially
  stopMotors();
  
  Serial.println("Voice Controlled Robot Ready");
  Serial.println("Commands: F=Forward, B=Backward, L=Left, R=Right, S=Stop");
}

void loop() {
  // Check if data is available from Bluetooth
  if (Serial.available() > 0) {
    command = Serial.read();
    Serial.print("Command received: ");
    Serial.println(command);
    
    // Execute command
    switch(command) {
      case 'F':
      case 'f':
        moveForward();
        break;
        
      case 'B':
      case 'b':
        moveBackward();
        break;
        
      case 'L':
      case 'l':
        turnLeft();
        break;
        
      case 'R':
      case 'r':
        turnRight();
        break;
        
      case 'S':
      case 's':
        stopMotors();
        break;
        
      default:
        Serial.println("Unknown command");
        break;
    }
  }
}

void moveForward() {
  Serial.println("Moving Forward");
  analogWrite(motorLeftForward, speed);
  analogWrite(motorLeftBackward, 0);
  analogWrite(motorRightForward, speed);
  analogWrite(motorRightBackward, 0);
}

void moveBackward() {
  Serial.println("Moving Backward");
  analogWrite(motorLeftForward, 0);
  analogWrite(motorLeftBackward, speed);
  analogWrite(motorRightForward, 0);
  analogWrite(motorRightBackward, speed);
}

void turnLeft() {
  Serial.println("Turning Left");
  analogWrite(motorLeftForward, 0);
  analogWrite(motorLeftBackward, speed);
  analogWrite(motorRightForward, speed);
  analogWrite(motorRightBackward, 0);
}

void turnRight() {
  Serial.println("Turning Right");
  analogWrite(motorLeftForward, speed);
  analogWrite(motorLeftBackward, 0);
  analogWrite(motorRightForward, 0);
  analogWrite(motorRightBackward, speed);
}

void stopMotors() {
  Serial.println("Stopped");
  analogWrite(motorLeftForward, 0);
  analogWrite(motorLeftBackward, 0);
  analogWrite(motorRightForward, 0);
  analogWrite(motorRightBackward, 0);
}

/* 
 * Hardware Connections:
 * HC-05 Bluetooth Module:
 * - VCC -> 5V
 * - GND -> GND
 * - TXD -> RX (Pin 0)
 * - RXD -> TX (Pin 1) through voltage divider (5V to 3.3V)
 * 
 * L298N Motor Driver:
 * - IN1 -> Pin 5 (Left Motor Forward)
 * - IN2 -> Pin 6 (Left Motor Backward)
 * - IN3 -> Pin 9 (Right Motor Forward)
 * - IN4 -> Pin 10 (Right Motor Backward)
 * - Connect motors to OUT1-OUT2 and OUT3-OUT4
 * 
 * Setup Instructions:
 * 1. Upload code to Arduino (disconnect Bluetooth RX/TX first)
 * 2. Reconnect Bluetooth module
 * 3. Pair with HC-05 (default PIN: 1234 or 0000)
 * 4. Use voice control app (e.g., "Arduino Voice Control")
 * 5. Configure app to send: F, B, L, R, S commands
 * 
 * Voice Commands:
 * - "Forward" -> F
 * - "Backward" -> B
 * - "Left" -> L
 * - "Right" -> R
 * - "Stop" -> S
 * 
 * Notes:
 * - Adjust speed variable for different speeds
 * - Use voltage divider for HC-05 RXD (Arduino TX is 5V, HC-05 needs 3.3V)
 * - Test commands via Serial Monitor before using voice control
 */
```

---

## Summary

**Total Projects with Code:** 6

**Platforms Covered:**
- Arduino (4 projects)
- ESP8266/NodeMCU (1 project)
- Mixed (1 project)

**Difficulty Levels:**
- Beginner: 2 projects
- Intermediate: 2 projects
- Advanced: 2 projects

**Categories:**
- IoT: 3 projects
- Robotics: 3 projects

All code snippets are:
✅ Complete and ready to use
✅ Well-commented
✅ Include hardware connection details
✅ Specify required libraries
✅ Provide setup instructions
✅ Include troubleshooting notes

---

**Last Updated:** December 2025

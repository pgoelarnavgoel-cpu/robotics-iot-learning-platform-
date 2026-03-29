# Arduino/IoT Code Feature Documentation

## Overview
Every project in the Robotics and IoT Learning Platform now includes **ready-to-use Arduino/IoT code** that users can copy and paste directly into their Arduino IDE or compatible platforms.

## Features

### 1. **Code Display on Project Pages**
- Each project detail page shows a dedicated "Arduino/IoT Code" section
- Code is displayed in a formatted code block with syntax highlighting
- Includes helpful comments and hardware connection details

### 2. **One-Click Copy**
- Hover over any code block to reveal the "Copy Code" button
- Click to instantly copy the entire code to clipboard
- Visual feedback confirms successful copy

### 3. **Complete, Working Code**
- All code snippets are complete and ready to use
- Include necessary library imports
- Contain detailed comments explaining each section
- Hardware connection diagrams in comments
- Setup instructions and notes

## Code Examples Included

### Current Projects with Code:

1. **LED Blink Circuit**
   - Basic Arduino LED control
   - Pin configuration and timing

2. **Ultrasonic Distance Sensor**
   - HC-SR04 sensor code
   - Distance measurement and serial output

3. **WiFi Weather Station**
   - ESP8266/NodeMCU code
   - DHT sensor integration
   - Web server implementation

4. **Line Following Robot**
   - IR sensor-based navigation
   - L298N motor driver control
   - Movement algorithms

5. **Smart Door Lock**
   - Servo motor control
   - Keypad integration
   - Password authentication

6. **Voice Controlled Robot**
   - Bluetooth (HC-05) communication
   - Voice command processing
   - Motor control logic

## Code Structure

Each code snippet includes:

```cpp
// Project Title - Platform
// Brief description

// Library imports (if needed)
#include <Library.h>

// Pin definitions
const int pin = 9;

// Setup function
void setup() {
  // Initialization code
}

// Main loop
void loop() {
  // Main program logic
}

/* 
 * Hardware Connections:
 * - Component -> Pin
 * - VCC -> 5V
 * - GND -> GND
 * 
 * Setup Instructions:
 * 1. Step one
 * 2. Step two
 * 
 * Notes:
 * - Important information
 * - Configuration tips
 */
```

## For Users

### How to Use the Code:

1. **Navigate to any project** from the Projects Explorer
2. **Scroll down** to the "Arduino/IoT Code" section
3. **Hover over the code block** to reveal the Copy button
4. **Click "Copy Code"** to copy to clipboard
5. **Open Arduino IDE** or your preferred platform
6. **Paste the code** (Ctrl+V or Cmd+V)
7. **Install required libraries** (if mentioned in comments)
8. **Connect hardware** as specified in the comments
9. **Upload to your board** and test!

### Tips:
- Read all comments carefully before uploading
- Check hardware connections match your setup
- Install required libraries from Arduino Library Manager
- Adjust pin numbers if using different connections
- Modify parameters (speed, delays, etc.) as needed

## For Contributors (Submit Idea Page)

### Adding Code to Your Idea:

When submitting a new project idea, you can now include Arduino/IoT code:

1. Fill in all required project details
2. Scroll to the **"Arduino/IoT Code (Optional)"** field
3. Paste your complete, working code
4. Include comments explaining:
   - Hardware connections
   - Required libraries
   - Setup instructions
   - Important notes

### Code Quality Guidelines:

✅ **DO:**
- Include complete, working code
- Add clear comments
- Specify hardware connections
- List required libraries
- Test code before submitting
- Use descriptive variable names
- Include setup instructions

❌ **DON'T:**
- Submit incomplete code
- Omit important comments
- Forget library requirements
- Use unclear variable names
- Skip hardware connection details

### Example Submission:

```cpp
// Temperature Monitor - Arduino Code
// Displays temperature on Serial Monitor

#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  float temp = dht.readTemperature();
  Serial.print("Temperature: ");
  Serial.print(temp);
  Serial.println(" °C");
  delay(2000);
}

/* 
 * Hardware Connections:
 * - DHT11 VCC -> 5V
 * - DHT11 GND -> GND
 * - DHT11 Data -> Pin 2
 * 
 * Required Libraries:
 * - DHT sensor library (install from Library Manager)
 * 
 * Notes:
 * - Open Serial Monitor at 9600 baud
 * - Readings update every 2 seconds
 */
```

## Technical Implementation

### Database Schema:
- Added `code_snippet` field to `projects` table (TEXT, nullable)
- Added `code_snippet` field to `user_ideas` table (TEXT, nullable)

### Components:
- **CodeBlock Component** (`src/components/ui/code-block.tsx`)
  - Displays formatted code
  - Copy-to-clipboard functionality
  - Visual feedback on copy
  - Responsive design

### Pages Updated:
- **ProjectDetailPage**: Displays code snippet section
- **SubmitIdeaPage**: Includes code input field

## Benefits

### For Learners:
✅ No need to search for code online
✅ Guaranteed working code for each project
✅ Learn from well-commented examples
✅ Quick start for beginners
✅ Copy-paste convenience

### For the Platform:
✅ Complete learning resource
✅ Higher user engagement
✅ Better project completion rates
✅ Professional presentation
✅ Competitive advantage

## Future Enhancements

Potential improvements:
- Syntax highlighting with colors
- Multiple code versions (Arduino, ESP32, etc.)
- Code explanation tooltips
- Interactive code editor
- Download as .ino file
- Code validation before submission

## Support

If you encounter issues with code:
1. Check hardware connections carefully
2. Verify all libraries are installed
3. Ensure correct board is selected in Arduino IDE
4. Check serial monitor baud rate matches code
5. Review comments for troubleshooting tips

---

**Last Updated:** December 2025
**Feature Version:** 1.0

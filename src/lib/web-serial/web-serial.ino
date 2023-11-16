// Define pin numbers for the buttons
const int buttonPin1 = 2; // the number of the first button pin
const int buttonPin2 = 3; // the number of the second button pin
const int buttonPin3 = 4; // the number of the third button pin

void setup() {
  // Initialize the button pins as input
  pinMode(buttonPin1, INPUT);
  pinMode(buttonPin2, INPUT);
  pinMode(buttonPin3, INPUT);

  // Start serial communication at 9600 baud rate
  Serial.begin(9600);
}

void loop() {
  // Read the state of each button
  int buttonState1 = digitalRead(buttonPin1);
  int buttonState2 = digitalRead(buttonPin2);
  int buttonState3 = digitalRead(buttonPin3);

  // Check if any button is pressed
  // If yes, send a corresponding message to the serial monitor
  if (buttonState1 == HIGH) {
    Serial.println("Button 1 Pressed");
    // Delay to avoid bouncing issues
    delay(200);
  }

  if (buttonState2 == HIGH) {
    Serial.println("Button 2 Pressed");
    delay(200);
  }

  if (buttonState3 == HIGH) {
    Serial.println("Button 3 Pressed");
    delay(200);
  }
}

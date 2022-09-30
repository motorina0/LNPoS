unsigned long deviceStartTime =  millis();


void waitForConfig(int seconds) {
  // wait for commands on serial
  unsigned long  configWaitTime = millis();
  int counter = seconds;

  while (Serial.available() == 0) {
    if ((millis() - deviceStartTime) > seconds * 1000) {
      // config time over
      Serial.println("Config time expired");
      return;
    }
    if (millis() - configWaitTime > 1000) {
      logo(--counter);
      configWaitTime = millis();
      Serial.println("configWaitTime: " + String(configWaitTime));
    }
  }
  processing("Open for config");
  executeConfig();
}

void executeConfig() {
  while (true) {
    if (Serial.available() == 0) continue;

    String data = Serial.readStringUntil('\n');
    Serial.println("received: " + data);
    KeyValue kv = extractKeyValue(data);
    String commandName = kv.key;
    if (commandName == "/config-done") {
      Serial.println("/config-done");
      return;
    }
    executeCommand(commandName, kv.value);
  }
}

void executeCommand(String commandName, String commandData) {
  Serial.println("executeCommand: "+ commandName + " " + commandData);
  KeyValue kv = extractKeyValue(commandData);
  String path = kv.key;
  String data = kv.value;
  if (commandName == "/file-new") {
    return createFile(path, data);
  }
  if (commandName == "/file-append") {
    return appendToFile(path, data);
  }

if (commandName == "/file-read") {
    String content = readFile(path);
    Serial.println("readFile out: "+ content);
  }
  if (commandName == "/file-close") {
    return closeFile(path);
  }
  Serial.println("command unknown");
}

void createFile(String path, String data) {
  Serial.println("createFile: " + path);
}

void appendToFile(String path, String data) {
  Serial.println("appendToFile: " + path);
}

String readFile(String path) {
    Serial.println("readFile: " + path);
    File file = SPIFFS.open("/"+path);
    if (file) {
        String data = file.readString();
        file.close();
        return "[" + data + "]";
    }
    return "empty";
}

void closeFile(String path) {
  Serial.println("closeFile: " + path);
}


KeyValue extractKeyValue(String s) {
  int spacePos = s.indexOf(" ");
  String key = s.substring(0, spacePos);
  if (spacePos == -1) {
    return {key, ""};
  }
  String value = s.substring(spacePos + 1, s.length());
  return {key, value};
}

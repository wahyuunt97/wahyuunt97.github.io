---
title: "Cars - Offline IoT Integration"
thumbnail: assets/images/projects/cars_detail.png
role: iOS Programmer
timeline: Jun 2023 - Nov 2023
outcome: Released on TestFlight, First Offline IoT App
responsibility: Developed the core logic to calculate RAW sensor values from BLE devices and convert them into readable data without internet access.
priority: 80
category: App
tech_stack:
  - Swift
  - UIKit
  - BluetoothCore (BLE)
  - IoT
---

## Project Overview

Cars is an iOS application that operates entirely offline, connecting to IoT sensors via Bluetooth Low Energy (BLE). It processes raw sensor data locally on the device, ensuring reliability in areas with poor internet connectivity.

### Technical Challanges
- **Offline Processing**: All data parsing and calculation happens on-device.
- **BLE Stability**: Maintaining stable connections with low-energy sensors.

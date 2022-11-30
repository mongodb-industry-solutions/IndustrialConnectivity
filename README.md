# Industrial Connectivity for Shop Floor Devices using MQTT
This repository contains options for connecting IoT devices to the cloud and streaming data from such devices into MongoDB. It conencts the dots between your chosen public cloud provider and other fully-managed/self-managed services that you may need to get data from the shop floor. You wil find code and configuration samples leveraging MongoDB and other ecosystem technologies such as Kafka, MQTT etc.

![Reference Architecture](media/about.png?raw=true)

## Self-Managed
This option involves deploying a kafka environment in a Docker container which uses an MQTT source connector and a MongoDB sink connector interfaced with the device MQTT broker to stream data into a MongoDB Time Series collection. This setup can be deployed on-prem, on a VM or in a serverless environment.<br>
[Use the Self-managed Setup](https://github.com/mongodb-industry-solutions/IndustrialConnectivity/tree/main/Self-managed)

## Microsoft Azure IoT Hub
Source code for connecting IoT device directly to the Azure IoT Event Hub, and streaming data through the Hub into MongoDB Time Series Collections.
Coming Soon...

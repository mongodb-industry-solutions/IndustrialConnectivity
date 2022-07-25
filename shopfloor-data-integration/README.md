# Collecting Data From the Factory #


In this section you can find all the source code for our data streaming project which aims to collect real-time production data from MQTT devices and insert them into a MongoDB Atlas Time Series Collections. 

<br/>

![](Img/arq.png?raw=true )

# Bridges and Connectors #

***MQTT Bridge*** - A MQTT bridge lets you connect two MQTT brokers together.

<br/>

***Source connector*** - Defines the origin of data to be collected through Kafka.

<br/>

***Sink connector*** - Defines the destination of data collected through Kafka.

<br/>




# Starting the Kafka connector 

<br/>

1. SSH into the connector
2. Navigate to the github repository
3. Start the docker container
4. Check the topics running

## Troubleshooting 

- Create Confluent License topic
    - Connect to Zookeeper container


- Run this command

   - ```kafka-topics --create --topic "_confluent-command" --bootstrap-server broker:9092```

   <br/>


- In the Mqtt-source connector, bootstrap server = broker:9092

- In the docker compose file, cp-kafka, we change Kafka Advertised listener to both broker:29092 and broker:9092

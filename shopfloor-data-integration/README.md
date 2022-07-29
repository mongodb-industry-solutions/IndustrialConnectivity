# Collecting Data From the Factory #


In this section you can find all the source code for our data streaming project which aims to collect real-time production data from MQTT devices and insert them into a MongoDB Atlas Time Series Collections. 

<br/>

![](Img/arq.png?raw=true )


# Prerequisites

  

The MongoDB Kafka tutorial environment requires the following installed on your client:

- [Docker](https://docs.docker.com/get-docker/)

Or simply run the following command in your terminal depending on your operating system.

```sudo apt-get install docker``` or ```sudo yarn install docker```

### MQTT Bridge (optional)

An MQTT bridge lets you connect two MQTT brokers together. We used this to connect our Fischertechnik factory to the cloud. If you have direct access to your MQTT broker you can skip this step.

[MQTT Bridge How To](http://www.steves-internet-guide.com/mosquitto-bridge-configuration/)

[Fischertechnik MQTT Bridge Configuration](https://github.com/mongodb-industry-solutions/smart-factory/blob/main/web-portal/MQTT_Bridge_Configuration.md)
  
# Starting the Docker environment

  

To start the baseline tutorial environment execute the shell script `run.sh`.

```sh run.sh```

  

> Note: If you are using a Windows OS, execute the `run.ps1` script a Powershell environment.
  

Once the environment is running, you can use locally installed tools like MongoSH if you have them installed or use the  MongoDB Kafka Tutorial image.  This image contains tools like MongoSH, KafkaCat and other utilities.
 

```docker run --rm --name shell1 --network kafka-edu_localnet -it mongokafkatutorial:latest bash```


## Shutting down the Docker environment

  

The Docker environment can be stopped using

`docker-compose down`

  

If you would like to drop the MongoDB databases as well as shutdown use

`docker-compose down -v`

  

To start the environment again just execute the `run.sh` shell script

`sh run.sh`

> Note: If you are using a Windows OS, execute the `run.ps1` script a Powershell environment.

# Quick start data streaming guide:

<br/>

1. Navigate to the [mongodb-kafka-base](https://github.com/mongodb-industry-solutions/smart-factory/tree/main/shopfloor-data-integration/mongodb-kafka-base) folder

```cd mongodb-kafka-base```

2. Execute the shell script which builds your docker container image with all the foundational blocks for this project.

```sh run.sh```

3. Open the source connector JSON file

```nano mqtt-source.json```

> Note: Change the ***mqtt.server.uri***, the ***mqtt.username*** and ***mqtt.password*** values to match with your desire configuration.

4. Open the sink connector JSON file

```nano mongodb-sink.json```

> Note: Change the ***connection.uri***, ***database*** and ***collection*** values to match with your desire configuration.

## MQTT Source Connector Configuration

The following contains the basic configuration properties you are going to need for your MQTT source connector. This connector is developed by Confluent and you can see the full documentation [here](https://docs.confluent.io/kafka-connect-mqtt/current/mqtt-source-connector/mqtt_source_connector_config.html).

```
{ "name": "mqtt-source",
"config": {
"connector.class": "io.confluent.connect.mqtt.MqttSourceConnector",
"tasks.max": "1",
"mqtt.server.uri": "ssl://<REMOTE BROKER ADDRESS>:8883",
"mqtt.username": "<REMOTE BROKER CLIENT>",
"mqtt.password": "<REMOTE BROKER CLIENT PASSWORD>",
"mqtt.topics": "i/ldr,i/bme680,i/cam",
"kafka.topic": "test_topic",
"value.converter":"org.apache.kafka.connect.converters.ByteArrayConverter",
"confluent.topic.bootstrap.servers": "broker:9092",
"confluent.license": "",
"topic.creation.enable": true,
"topic.creation.default.replication.factor": -1,
"topic.creation.default.partitions": -1 
}} 
```

>Note: You can modify or add any values to match with your desire configuration for example:  ***mqtt.topics***,***kafka.topic***,etc.

## MongoDB Sink Connector Configuration

The following contains the basic configuration properties you are going to need for your MongoDB Sink connector. This connector is developed by MongoDB and you can see the full documentation [here](https://www.mongodb.com/docs/kafka-connector/current/).

```
{ "name": "mongodb-sink",
"config": {
"connector.class":"com.mongodb.kafka.connect.MongoSinkConnector",
"tasks.max":1,
"topics":"test_topic",
"connection.uri":"mongodb+srv://user:password@address.mongodb.net/database?retryWrites=true&w=majority",
"database":"<database name>",
"collection":"<collection name>",
"key.converter":"org.apache.kafka.connect.storage.StringConverter",
"value.converter":"org.apache.kafka.connect.json.JsonConverter",
"value.converter.schemas.enable":"false",
"timeseries.timefield":"ts",
"timeseries.timefield.auto.convert":"true",
"timeseries.timefield.auto.convert.date.format":"yyyy-MM-dd'T'HH:mm:ss'Z'",
"transforms": "RenameField,InsertTopic",
"transforms.RenameField.type": "org.apache.kafka.connect.transforms.ReplaceField$Value",
"transforms.RenameField.renames": "h:humidity, p:pressure, t:temperature",
"transforms.InsertTopic.type":"org.apache.kafka.connect.transforms.InsertField$Value",
"transforms.InsertTopic.topic.field":"Source_topic"
}}
```

>Note: You can modify or add any values to match with your desire configuration for example: ***transforms*** and more.

> ***IMPORTANT: If you want to add more than one transform you should add the name of the transform to the same key for it to work.(Check the Sink Configuration code above)***

## Useful Commands for Kafka Connect
- Load a connector:<br/>
```curl --silent -X POST -H "Content-Type: application/json" -d @mqtt-source.json http://localhost:8083/connectors```
- Delete a connector:<br/>
```curl -X DELETE http://localhost:8083/connectors/mqtt-source```
- Check connector status:<br/>
```curl -s "http://localhost:8083/connectors?expand=info&expand=status"```

Note: replace connector names with the applicable name for the connector you wish to load or delete.

## References

  

- [MongoDB Kafka Connector](https://docs.mongodb.com/kafka-connector/current/) online documentation.

- [Connectors to Kafka](https://docs.confluent.io/home/connect/overview.html)

- [Transforms Confluent](https://docs.confluent.io/platform/current/connect/transforms/overview.html)

### Troubleshooting 

- Create Confluent License topic to successfully execute the MQTT source connector by Confluent when using the trial license with the configuration {"confluent.license": ""}
    - Connect to Zookeeper container
    - Run this command<br/>
 ```kafka-topics --create --topic "_confluent-command" --bootstrap-server broker:9092```
 


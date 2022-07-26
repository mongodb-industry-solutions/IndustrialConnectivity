# Collecting Data From the Factory #


In this section you can find all the source code for our data streaming project which aims to collect real-time production data from MQTT devices and insert them into a MongoDB Atlas Time Series Collections. 

<br/>

![](Img/arq.png?raw=true )

# Bridges and Connectors #

***MQTT Bridge*** - A MQTT bridge lets you connect two MQTT brokers together.

***Source connector*** - Defines the origin of data to be collected through Kafka.

***Sink connector*** - Defines the destination of data collected through Kafka.


# Prerequisits

In the sub-folder [Readme](https://github.com/mongodb-industry-solutions/smart-factory/tree/main/shopfloor-data-integration/mongodb-kafka-base), you will find the necessary commands to deploy the docker container which has the Kafka environment.

# Quick start data streaming guide:

<br/>

1. Navigate to the [mongodb-kafka-base](https://github.com/mongodb-industry-solutions/smart-factory/tree/main/shopfloor-data-integration/mongodb-kafka-base) folder

```cd mongodb-kafka-base```

2. Execute the shell script which builds your docker container image with all the foundational blocks for this project.

```sh run.sh```

3. Create a source connector JSON file

```touch mqtt-source.json```

4. Create a sink connector JSON file

```touch mongodb-sink.json```

5. Add the relevant configurations from the next section into your source and sink connector files.

## Sample MQTT Source Connector

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

## Sample MongoDB Sink Connector

The following contains the basic configuration properties you are going to need for your MongoDB Sink connector. This connector is developed by MongoDB and you can see the full documentation here.

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
"transforms.RenameField.renames": "h:humidity, p:pressure, t:temperature”,
"transforms.InsertTopic.type":"org.apache.kafka.connect.transforms.InsertField$Value",
"transforms.InsertTopic.topic.field":"Source_topic"
}}
```

## Useful Commands for Kafka Connect
- Load a connector:
```curl --silent -X POST -H "Content-Type: application/json" -d @mqtt-source.json http://localhost:8083/connectors```
- Delete a connector:
```curl -X DELETE http://localhost:8083/connectors/mqtt-source```
- Check connector status:
```curl -s "http://localhost:8083/connectors?expand=info&expand=status"```

Note: replace connector names with the applicable name for the connector you wish to load or delete.

### Troubleshooting 

- Create Confluent License topic
    - Connect to Zookeeper container
    - Run this command
 ```kafka-topics --create --topic "_confluent-command" --bootstrap-server broker:9092```

   <br/>


- In the Mqtt-source connector, bootstrap server = broker:9092

- In the docker compose file, cp-kafka, we change Kafka Advertised listener to both broker:29092 and broker:9092

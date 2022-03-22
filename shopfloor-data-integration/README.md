# MQTT -> Kafka -> MongoDB Streaming

Run the integration:

```docker-compose up -d --build```

RPK Cluster Info:

```rpk cluster info --brokers 127.0.0.1:9093```

RPK Topic List:

```rpk topic list --brokers 127.0.0.1:9093```

Create License Topic:

```rpk topic create -p 1 -r 1 _confluent-command --brokers 127.0.0.1:9093```

Configure MQTT Source:

```curl --silent -X POST -H "Content-Type: application/json" -d @mqtt-source.json  http://localhost:8083/connectors```

Configure MongoDB Sink:

```curl --silent -X POST -H "Content-Type: application/json" -d @mongodb-sink.json  http://localhost:8083/connectors```


Connector Status:

```curl -s "http://localhost:8083/connectors?expand=info&expand=status"```


Delete Connector:

```curl -X DELETE http://localhost:8083/connectors/mqtt-source```


Topic Consume:

```rpk topic consume factory --brokers 127.0.0.1:9093```

Topic Produce:

```$ echo '{"name": "Red", "website": "vectorized.io"}' | rpk topic produce mqtt-source --key record-key -H header-key:header-value```

Delete Topic:

```rpk topic delete factory --brokers 127.0.0.1:9093```


## Interesting Links

https://github.com/mongodb-labs/mongodb-redpanda-example/blob/main/run.sh

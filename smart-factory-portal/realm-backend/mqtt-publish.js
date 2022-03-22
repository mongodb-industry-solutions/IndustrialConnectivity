exports = function (order) {
  console.log(
    "OrderID: " + order.orderID.toString() + " / Color: " + order.color
  );
  var mqtt = require("mqtt");

  var options = {
    host: context.values.get("mqtt_hostname"),
    port: context.values.get("mqtt_port"),
    protocol: "mqtts",
    username: context.values.get("mqtt_username"),
    password: context.values.get("mqtt_password"),
  };

  //initialize the MQTT client
  var client = mqtt.connect(options);
  const date = new Date();

  //setup the callbacks
  client.on("connect", function () {
    client.publish(
      "f/o/order",
      '{"type":"' + order.color + '","ts":"' + date.toISOString() + '"}'
    );
    client.end();
  });

  client.on("error", function (error) {
    console.log(error);
    return error;
  });

  return;
};

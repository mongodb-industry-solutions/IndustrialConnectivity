# MQTT Bridge Configuration
This is a step-by-step guide on how to configure HiveMQ Cloud to serve as a remote broker and form an MQTT bridge with the TXT 0 Controller on the Smart Factory (which acts as an MQTT broker for all the other controllers onboard).

1. Reset TP-Link router by pushing the reset button for ~5sec
2. Connect to the TP-Link WIFI and open <http://tplinkwifi.net/>. Password on the TP-Link router.
3. Login with admin:admin
4. Switch "Operation Mode" to WISP
5. Configure "Wireless" settings to connect to your regular (internet connectivity) WLAN
6. Add port forwarding for SSH and the MQTT broker for direct access without switching WLAN


## Remote MQTT Broker Configuration

The Fischertechnik factory has MQTT brokers deployed on their TXT controllers as shown on the diagram. By default the factory connects to the Fischercloud. We will run our own MQTT broker and afterwards use the bridge configuration on the main controller to receive/send messages from/to the main TXT MQTT controller.

The broker is started with a custom config file in the mqtt folder. 
You have to run the command from within the mqtt folder!

```
docker run -it -p 1883:1883 -p 9001:9001 -v $(pwd)/mosquitto.conf:/mosquitto/config/mosquitto.conf eclipse-mosquitto
```

## TXT MQTT Bridge Configuration

The factory contains 6 TXT controllers which communicate within eachother via MQTT. The SSC TXT controller is the main/central controller. The MQTT broker on this controller will be configured to forward/receive messages to the previously configured remote MQTT broker via the following MQTT bridge configuration.
The steps to achieving this are outlined in detail below:
1. SSH into the Main Controller (TXT0) using the command below in any command line terminal of your choice.
```
ssh root@192.168.0.10
```
Password authentication is required to login as root.
The guide for resetting this should be included in your Smart Factory package.

2. Navigate to the directory /etc/mosquitto on the controller and create a new config file which will contain your bride configuration settings.
```
touch <filename>.conf
```
3. Insert the required bridge configuration in the file you have just created.
```
nano <filename>.conf
```
The configuration of a remote broker using HiveMQ Cloud should like similar to this:
```
connection ft-txt-bridge-cloud
address www.fischertechnik-cloud.com:8883
bridge_capath /etc/ssl/certs
notifications false
cleansession false #on connection dropping
remote_username <FISCHERCLOUD MQTT USERNAME>
remote_password <FISCHERCLOUD MQTT PASSWORD>
local_username txt
local_password xtx
topic i/# both 1 "" /j1/txt/6875/
topic o/# in 1 "" /j1/txt/6875/
topic c/# both 1 "" /j1/txt/6875/
topic f/i/# out 1 "" /j1/txt/6875/
topic f/o/# in 1 "" /j1/txt/6875/
try_private false
bridge_attempt_unsubscribe false

connection remote-broker
address <YOUR REMOTE MQTT BROKER IP ADDRESS:PORT>
bridge_capath /etc/ssl/certs
notifications false
cleansession true
remote_username <HIVEMQ CLIENT USERNAME>
remote_password <HIVEMQ CLIENT PASSWORD>
local_username txt
local_password xtx
topic i/# out 1 "" ""
topic o/# in 1 "" ""
topic c/# out 1 "" ""
topic f/i/# out 1 "" ""
topic f/o/# in 1 "" ""
try_private false
bridge_attempt_unsubscribe false
```
In this case, we have kept the default bridge configuration of the Fischertechnik Cloud and added another bridge which is connected to HiveMQ Cloud.
Follow the on-screen instructions to save the changes made to your brdige configuration file.

4. Now you can inspect which Mosquitto processes are running on the controller.
```
Ps -ef | grep mosquitto
```
The results of this command allow you to see what configuration file the broker is currently using.

5. Now run the command to load the bridge configuration file that you have created.
```
/usr/sbin/mosquitto -c /etc/mosquitto/<filename>.conf
```
You may run the inspection command again to confirm that Mosquitto is now using the correct configuration file.

##Testing the Bridge Configuration
To test that your MQTT bridge has been configured correctly, try sending a message from your remote broker to the local TXT broker. There are several method sof doing this but we have outlined a method that only requires the command line terminal.

1. Install mosquitto client to your notebook: https://mosquitto.org/download/
2. Connect to the TP_Link wifi
3. Open a Terminal window and start a listener on the local TXT broker.
```
/usr/local/opt/mosquitto/bin/mosquitto_sub -h 192.168.0.10 -p 1883 -u txt -P xtx -t f/o/#
```
4. Open a new Terminal window and publish a message from the remote broker to the same topic as the listener. 
```
/usr/local/opt/mosquitto/bin/mosquitto_pub -h <hivemq-cloud-host-address> -p 8883 -u <hivemq-client-username> -P <hivemq-client-password> -t f/o/# -m "Hello"
```
If the bridge has been configured correctly, you will see the message "Hello" displayed on the first Terminal window which has your local broker listener.

## Additional References

- Official Fischertechnik Setup Manual in English:
<https://www.fischertechnik.de/-/media/fischertechnik/fite/service/elearning/lehren/lernfabrik/fabrik_2019_englisch_neu.ashx>
- Fischertechnik GitHub repo: <https://github.com/fischertechnik/txt_training_factory>
- MQTT Architecture and Setup:
<https://github.com/fischertechnik/txt_training_factory/blob/master/doc/Overview_Network.PNG>
- The MQTT interface of the main controller is documented here:  
<https://github.com/fischertechnik/txt_training_factory/blob/master/TxtSmartFactoryLib/doc/MqttInterface.md>
- The Mosquitto config file documentation is available here:  
<https://mosquitto.org/man/mosquitto-conf-5.html>

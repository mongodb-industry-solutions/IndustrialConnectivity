# Getting Started with the Order Portal
This is a simple React.Js app which allows you to place an order for a coloured workpiece on the Fischertechnik Training Factory by simply filling a short form. Submitting the form triggers a JS function which converts the parameters specified in the form into a predefined format for sending messages to the local factory broker using MQTT. The parameters of the order are subsequently inserted as a document into the specified collection in our MongoDB Atlas Cluster.

This guide provides all the necessary steps to run the order portal app as an independent MongoDB Realm app connected to an Atlas cluster.
Before setting up the app according to the steps here, we recommend that you successfully create an MQTT bridge using [this] () guide.

Follow the instructions to create your own Atlas cluster and Realm app and connect them to the React frontend provided in this repo.

## To install the app on localhost

#### 1. Download repo code and any React development dependencies required for your OS.
Dependencies include: node, yarn.
We recommend Visual Studio Code to work on the project.

#### 2. Create MongoDB Atlas Database
If you don't already have a MongoDB Cloud user account, you create one for free [here](https://cloud.mongodb.com). Once logged in, create a new Organization and new Project in that Organization.


You can create a free M0 database within MongoDB Atlas, select the cloud provider and geographical region that makes the most sense to you. 
<img width="1792" alt="Screen Shot 2022-01-13 at 6 25 48 PM" src="https://user-images.githubusercontent.com/24992718/149425807-9167dae5-beaf-483f-bd14-7a20ba252f75.png">

It will take 3-5 minutes for your cluster to be created with the desired settings.
Once your database is created, create a collection called "orders" which we will use later to store the details of orders placed through our app.

#### 3. Create Realm app 
Under the Realm tab, click "create app" and you can get started with creating a Realm app. 
- Choose "React Native + Realm Sync Starter" as your app template to reduce setup time.
- Choose the Atlas cluster you just created in the previous step as your Linked Data Source
- Rename the app to something related to your project.
- Choose an appropriate deployment region.
- You're all set!

<img width="995" alt="Screen Shot 2022-01-13 at 6 32 40 PM" src="https://user-images.githubusercontent.com/24992718/149449839-fd1a2a98-7b67-4acc-b1c8-bd3fa648ce98.png">

#### 4. Create a function in Realm to place orders
We will create a function in Realm which will be triggered by pressing the Submit button in our app form. 
This function creates a document in Atlas based on the details of each order submitted. It also creates an MQTT message containing the workpiece color that has been ordered and sends it to the factory MQTT broker for processing.

Select "Functions" in the Realm menu. Create a new function similar to that shown below:
```javascript
exports = function (order) {
  console.log(
    "OrderID: " + order.orderID.toString() + " / Color: " + order.color
  );
  var mqtt = require("mqtt");

  var options = {
    host: ("mqtt_hostname"),
    port: "8883", //context.values.get("mqtt_port"),
    protocol: "mqtts",
    username: ("mqtt_client_username"),
    password: ("mqtt_client_password")
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
```

#### 5. Upload sample data to Atlas
Navigating back to the Atlas tab, you can insert a document containing the following json into your "orders" collection. The idea is to create a schema for subsequent documents which will be created by the app.

```json
{"_id":
{"$oid":"1234"},
"address":"Place",
"color":"white",
"userId":"userid",
"firstName":"Name",
"lastName":"Lastname",
"orderStatus":"Order Submitted"
}
```


#### 6. Create a GraphQL Schema
In the Realm app, you can auto-generate a GraphQL schema when you have data in Atlas. Save the graphql endpoint.
<img width="1792" alt="Screen Shot 2022-01-13 at 11 09 21 PM" src="https://user-images.githubusercontent.com/24992718/149450104-1fc67131-8910-4436-82c1-4a2a3823ebda.png">
If not already done, give the Realm app full access to your Atlas cluster.
<img width="1792" alt="Screen Shot 2022-01-13 at 11 09 29 PM" src="https://user-images.githubusercontent.com/24992718/149450120-c49543a2-4c93-45e7-a357-cbbb5af8b86b.png">


#### 7. Create users for your app.
- In the sidebar menu of the Realm tab, select "Authentication" and select the desired method for logging into the app. You can choose "email and password".
- Next, switch to "App Users" on the same menu. Create as many users as you would like to grant access to the application.


#### 8. Get Atlas ID and add to RealmAppConfig.js code
Update the config file with your app details.
Your App ID can be found on the page shown below:
<img width="1792" alt="Screen Shot 2022-01-13 at 11 11 59 PM" src="https://user-images.githubusercontent.com/24992718/149450307-c6066281-8f65-411c-8e21-567497331e2f.png">

<img width="302" alt="Screen Shot 2022-01-13 at 11 12 04 PM" src="https://user-images.githubusercontent.com/24992718/149450321-ff0750dc-c664-4dd3-bc1b-00a426631b07.png">

You can find your graphql endpoint here:
<img width="1792" alt="Screen Shot 2022-01-13 at 11 21 36 PM" src="https://user-images.githubusercontent.com/24992718/149451118-ca93c866-fbae-4a3a-85ad-1b59cb2d27d7.png">

#### 9. Running the app
After completing the steps above, you are ready to run the application. Open a terminal window at the folder containing the app code and run the following commands:
```bash
npm install
```
When the app is done installing without errors, run the react engine in localhost.
```bash
yarn start
```
##### Error Troubleshooting
- You may receive a package path error. This may be related to the version of node installed on your computer. The app works best with node version 16.14.0. Change the version of node using [this] (https://bytearcher.com/articles/ways-to-get-the-latest-node.js-version-on-a-mac/) guide.
- Now run the npm install command again.
- Run yarn start again.

The app should open up in a browser window with the login page displayed.

#### 10. Test the connection
You're ready to send commands to the factory. 
- Log in to the app using the credentials you previously configured. 
- Once in, fill the Order Form and select the color of workpiece you would like to order from the factory. 
- Click "Submit". The factory should start processing your order.
- You will find a list of all orders placed by your user in the "Orders Placed" tab.


### Additional References

MongoDB Realm GraphQL Documentations: https://docs.mongodb.com/realm/graphql/

**MongoDB Realm React Documentation:**

Functions:https://docs.mongodb.com/realm/functions/

Triggers: https://docs.mongodb.com/realm/triggers/database-triggers/ 


# Smart Factory

IIoT React native realm application to handle alerts.

## Prerequisites

Node version [~16.x](https://nodejs.org/en/download/) 

React Native CLI [~0.67.x](https://www.npmjs.com/package/react-native)
## Cloud Setup

#### Prerequisites
* [Mongo Atlas Cloud](https://cloud.mongodb.com/)

* [Firebase](https://console.firebase.google.com/)
    
Steps in Mongo Atlas.

      1. Create a Mongo DB cluster with version 4.4+ to support sync between realm and mongo cluster.
      2. Create a Realm App in Atlas.
      3. Go to Linked Data Sources and Link the data source created from step 1.
      4. Go to Schema and create schemas as required. Users schemas is mandatory
```json
{
    "title" : "users",
    "properties": {
        "_partition": {
        "bsonType": "string"
        }
    },
    "required": [
        "_partition"
    ]
}
```
    5. Go to Sync and enable sync by selecting _partition key and permissions set as true.
    6. Go to Authentication and enable Custom Function Authentication option from Authentication Providers Section. 
    7. Go to Functions and create a function with below code
```javascript
exports = async function (loginPayload) {
    const users = context.services
        .get("<service-name>")
        .db("<db-name>")
        .collection("users");
    const { email, _partition, token } = loginPayload;
    const user = await users.findOne({ email });
    if (user) {
        return user._id.toString();
    } else {
        const result = await users.insertOne({ email, _partition, token, createdAt: new Date() });
        return result.insertedId.toString();
    }
};
```
     8. Save and then deploy the draft.



## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd smartfactory
```

Install dependencies

```bash
  npm install
```

---
## Configuration

To run this project, you will need to update the **config.js** file

`REALM_APP_ID`


---


### Start the server

To run in android emulator/device
```bash
  npm run android
```
To run in IOS emulator/device
```bash
  npm run ios
```


## Features

- Login via custom function in Mongo Atlas by providing email and password.
- View Alerts synced via Mongo Database via _partition (master).
- Acknowledge alerts by making notes.
- Push Notifications alerts via FCM in both Android and IOS.

## Tech Stack

**Client:** React Native, Redux

**Database:** Realm Mongo with Sync


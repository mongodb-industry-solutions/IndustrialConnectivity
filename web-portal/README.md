### Important links

MongoDB Realm GraphQL Documentations: https://docs.mongodb.com/realm/graphql/

MongoDB Realm React Documentation: 

Functions:https://docs.mongodb.com/realm/functions/

Triggers: https://docs.mongodb.com/realm/triggers/database-triggers/ 


## Deployment guide - IN PROGRESS
### 1. Download code and set up on computer
We reccomend visual studio code to work on the project

### 2. Create MongoDB Atlas Database
You can create a free M0 database within MongoDB Atlas, and can select the cloud provider and geographical region that makes the most sense to you. 
<img width="1792" alt="Screen Shot 2022-01-13 at 6 25 48 PM" src="https://user-images.githubusercontent.com/24992718/149425807-9167dae5-beaf-483f-bd14-7a20ba252f75.png">

### 3. Create Realm app 
Under the Realm tab, click "create app" and you can get started with creating a Realm app. For this project,just create an empty App.
<img width="995" alt="Screen Shot 2022-01-13 at 6 32 40 PM" src="https://user-images.githubusercontent.com/24992718/149449839-fd1a2a98-7b67-4acc-b1c8-bd3fa648ce98.png">

### 4. Link Realm app to Atlas
<img width="992" alt="Screen Shot 2022-01-13 at 6 34 00 PM" src="https://user-images.githubusercontent.com/24992718/149449873-384f26ce-1f1f-4ede-bb58-cf334a6e4d9b.png">

### 5. Upload sample data to Atlas - sample data file to be added 
The sample data json will be uploaded and available soon

### 6. GraphQL Schema
In the Realm app, you can auto-generate a GraphQL schema when you have data in Atlas. Save the graphql endpoint.
<img width="1792" alt="Screen Shot 2022-01-13 at 11 09 21 PM" src="https://user-images.githubusercontent.com/24992718/149450104-1fc67131-8910-4436-82c1-4a2a3823ebda.png">

<img width="1792" alt="Screen Shot 2022-01-13 at 11 09 29 PM" src="https://user-images.githubusercontent.com/24992718/149450120-c49543a2-4c93-45e7-a357-cbbb5af8b86b.png">

<img width="1792" alt="Screen Shot 2022-01-13 at 11 09 46 PM" src="https://user-images.githubusercontent.com/24992718/149450137-c13177c7-1a48-4dea-82c3-135e324841ce.png">


### 7. Get Atlas ID and add to RealmAppConfig.js code
Update the config file with your app details.
App ID:
<img width="1792" alt="Screen Shot 2022-01-13 at 11 11 59 PM" src="https://user-images.githubusercontent.com/24992718/149450307-c6066281-8f65-411c-8e21-567497331e2f.png">

<img width="302" alt="Screen Shot 2022-01-13 at 11 12 04 PM" src="https://user-images.githubusercontent.com/24992718/149450321-ff0750dc-c664-4dd3-bc1b-00a426631b07.png">

graphql endpoint:
<img width="1792" alt="Screen Shot 2022-01-13 at 11 21 36 PM" src="https://user-images.githubusercontent.com/24992718/149451118-ca93c866-fbae-4a3a-85ad-1b59cb2d27d7.png">


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


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


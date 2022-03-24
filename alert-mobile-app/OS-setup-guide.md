# Operating system setup guide
This is a detailed setup guide for installing OS-specific app dependencies for the alerts management app of the Smart Factory. This guide allows you to set up your computer environment to deploy the application. For a more basic overview of the app functionality and dependencies ( or if you have already done the initial setup using this guide ), please refer to the README.md file.


## **Android Environment Setup**

1. Open Android Studio
2. Create new device (Pixel 5 API 32, you need enough memory in the device)
3. Run Device Manager, you should get an emulated home screen
4. Go to Terminal
5. Navigate to smart-factory-mobile-app folder
6. Enter this:
   ```bash
   export JAVA_HOME=`/usr/libexec/java_home -v 1.8.0_292`
   ```
7. If error with adb devices:
```bash
echo 'export ANDROID_HOME=/Users/$USER/Library/Android/sdk' >> ~/.bash_profile

echo 'export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools' >> ~/.bash_profile

source ~/.bash_profile

```
8. Update REALM ID in the config.js file if you want to work in a different environment than WeKan’s.<br>
   If you’re using Luca’s, use this: shopfloorapp-twnwr
9.  After that, you can start the application using:
    ```bash
    npm run android
    ```


## **iOS Environment Setup**

### Installing App Dependencies

1. Download Xcode from App Store on Mac - it may take up to 40 mins to complete installation.
2. When Xcode is downloaded, open it, go to *Preferences* > *Location* and *set Command Line Tools as Xcode*.<br>
   **OR** <br>
   Type the following commands in the Terminal app:
    ```bash
    sudo xcode-select -s /Applications/Xcode.app
    sudo xcodebuild -license
    ```
3. Install Homebrew
   ```bash
   /usr/bin/ruby -e “$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
   ```
4. Install Ruby:<br>
   Ruby already comes installed with MacOS but you will need the latest version of ruby saved in your local directory to run the app and install all its dependencies.
   ```bash
   brew install ruby
   open -e ~/.zshrc
   ```

   Replace the existing text in the file with the following;<br>
   For Mac Intel:

   ```txt
   if [ -d "/usr/local/opt/ruby/bin" ]; then
   export PATH=/usr/local/opt/ruby/bin:$PATH
   export PATH=`gem environment gemdir`/bin:$PATH
   fi
   ```

   For Mac Apple Chip:
   ```txt
   if [ -d "/opt/homebrew/opt/ruby/bin" ]; then
   export PATH=/opt/homebrew/opt/ruby/bin:$PATH
   export PATH=`gem environment gemdir`/bin:$PATH
   fi
   ```

   This sets the Homebrew-installed Ruby to a higher priority than the system Ruby and adds the directory used for Ruby gems.<br>
   - Save the file.
   - Close and reopen the Terminal window for the changes to the ~/.zshrc file to be recognized.
  
5. Install Node.js:
   ```bash
   brew install node
   ```
6. Install Watchman:
   ```bash
   brew install watchman
   ```
7. Install React Native CLI:
   ```bash
   npm install -g react-native-cli
   ```

### Running the app
1. Go to the Github page for the app here. In the *“Code”* menu, copy the HTTPS link.
2. On Finder, navigate to *“Documents”* or any suitable directory and create a new folder.
3. Right click on the newly created folder and select *“New Terminal at folder”*. This should open a terminal window ready to accept commands at this folder.
4. From Terminal, clone the repository to your local file system:
   ```bash
    sudo git clone <paste Github repo https link>
    sudo git checkout develop
    ```
5. A folder containing the repo has now been created in your file directory.<br>
Check that you have the required permissions to access everything in this folder.<br>
To do this in Finder, right-click the folder, select “Get Info” and adjust the settings accordingly.

6. Back in Terminal, run the command to package the application and install its internal dependencies
    ```bash
    sudo npm install
    ```
7. Install Cocoapods:
    ```bash
        sudo gem install cocoapods
    ```

8. Navigate to the “ios” folder using:
    ```bash
    cd ios
    ```
9. Install Pod dependencies
    ```bash
    pod install
    ```
10. Build and run the application using:
    ```bash
    react-native run-ios
    ```
**OR** <br>
- In Finder, navigate to the “ios” subfolder & open *SmartFactory.xcworkspace* in Xcode.
- Select device and click on the play button to build and run the app


### Steps to insert a document
1. Get IP whitelisted in “THE” environment
2. Open Compass
3. Connect to the cluster
    - For Luca’s cluster use: mongodb+srv://luca:smartfactory@factoryapp.epyei.mongodb.net/test
4. Navigate to ShopFloor → sensorData
5. Click “add data” → insert document

# ionicapp
Ionic App with Parse Push, Firebase for RealTime backend as service and Google Analytics (using ngCordova Plugin). Just want to show best practices for directory structure, environment properties file management with Gulp and handling promises with Deferred pattern and getters n setters. 

This is a hybrid mobile app developed built using ionic framework - http://ionicframework.com/getting-started/

###To install ionic/cordova run the below npm command
    $ sudo npm install -g cordova ionic

### Install all modules from package.json using npm
    $ npm install

### Install the plugins for cordova using gulp:
    $ gulp ionic-clean-build 

###We use gulp for build system, to build for different environments (e.g. dev, prod)
    1. gulp config-dev
    2. gulp config-prod
    
    This will replace config.js contents with environment based properties.
    
###To template your files, you can use the Ionic Creator
    You will need to sign up at: http://creator.ionic.io/
    
###The best way to develop and test (within a browser and easily emulate a device) on both ios/android, run the below command:
    $ ionic serve --lab

    or you can emulate it on ios via --> $ ionic emulate ios
    
###To debug Android remotely, you can use adb
    1. First build and install the app on your device
      $ ionic build android

    2. Once installed on your device, enable developer mode (more info: http://developer.android.com/tools/device.html)
      * Go to Settings > About phone and tap Build number seven times. Return to the previous screen to find Developer options at the bottom.
      * In the developer options, enable debugging over USB.

    3. Connect the device through USB and run adb (more info: http://developer.android.com/tools/help/adb.html)
      * The adb tool is located in <sdk>/platform-tools/
      * Connect to your remote device
        $ adb -d logcat
        
You can checkout this app by downloading <a href="https://itunes.apple.com/us/app/ionic-view/id849930087?ls=1&mt=8">Ionic  View</a>.

Scan the QR Code once you register and open the Ionic View App.

###NOTE: We haven't provisioned the app for Push so just select "No Thanks" for Push Notification.
  
  ![alt tag](https://github.com/arun0009/ionicapp/blob/master/b697ce47.png)  
    
    

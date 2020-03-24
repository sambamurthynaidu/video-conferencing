
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
declare var cordova;
declare var apiRTC;
declare var apiCC;
import { HomePage } from './home/home.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})


export class AppComponent {
  rootPage:any = HomePage;
  permissions;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      let permissions = cordova.plugins.permissions;
      permissions.hasPermission(permissions.CAMERA, this.checkVideoPermissionCallback, null);
      permissions.hasPermission(permissions.RECORD_AUDIO, this.checkAudioPermissionCallback, null);
      apiRTC.init({
          //apiCCId : "12", // Your can overide your number
          onReady: this.sessionReadyHandler,
          apiKey : "a862667ea6a8144fbb65a11a310ff936"
      });
    });
  }
  sessionReadyHandler(){
    apiRTC.addEventListener("incomingCall", this.incomingCallHandler);
        apiRTC.addEventListener("userMediaError", this.userMediaErrorHandler);
        apiRTC.addEventListener("remoteStreamAdded", this.remoteStreamAddedHandler);
        apiRTC.addEventListener("hangup", this.hangupHandler);
      
  }
  incomingCallHandler(){
    alert('incomingCallHandler')
  }
  userMediaErrorHandler(){
    alert('userMediaErrorHandler')
  }
  remoteStreamAddedHandler(){
    alert('remoteStreamAddedHandler')
  }
  hangupHandler(){
    alert('hangupHandler')
  }
  checkVideoPermissionCallback(status){
    if(!status.hasPermission) {
        let permissions = cordova.plugins.permissions;
        var errorCallback = function() {
            alert('Camera permission is not turned on');
        }
        permissions.requestPermission(
            permissions.CAMERA,
            function(status) {
                if(!status.hasPermission) {
                    errorCallback();
                }
            },
            errorCallback);
    }
  }
  checkAudioPermissionCallback(status){
    let permissions = cordova.plugins.permissions;
    if(!status.hasPermission) {
        var errorCallback = function() {
            alert('Camera permission is not turned on');
        }
        permissions.requestPermission(
            permissions.CAMERA,
            function(status) {
                if(!status.hasPermission) {
                    errorCallback();
                }
            },
            errorCallback);
    }
  }
}

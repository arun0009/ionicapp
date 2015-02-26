var LoginCtrl = function ($scope, $rootScope, $state, $ionicPlatform, LoginService) {

    console.log("inside login control......");

    $ionicPlatform.ready(function () {
        if (typeof analytics !== "undefined") {
            analytics.trackView("Ionic Login");
        }
    });

    this.authenticateUser = function () {
        LoginService.authenticateUserDeferredRequest(this.username, this.password).then(function (authData) {
            console.log(authData);
            var applaunchCount = window.localStorage.getItem('launchCount');
            //Show user preference if app launched first time only...
            if (applaunchCount) {
                $state.go("chat");
            }
            else {
                $state.go("userpreferences")
            }
        }, function (error) {
            console.log("Exception occurred while authenticating user :: " + error);
        })
    }
}

angular.module('ionicapp.login').controller('LoginCtrl', LoginCtrl);

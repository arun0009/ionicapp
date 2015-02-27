var SignupCtrl = function ($scope, $rootScope, $state, SignupService) {

    if (typeof analytics !== "undefined") {
        analytics.trackView("Ionic User Registration");
    }

    this.registerUser = function () {
        SignupService.createUserDeferredRequest(this.username, this.password).then(function (authData) {
            console.log(authData);
            if (typeof analytics !== "undefined") {
                analytics.setUserId(this.username);
            }
            $state.go("userpreferences")
        }, function(error){
            console.log("Exception occurred while signing up user :: " + error);
        })
    }
}

angular.module('ionicapp.signup').controller('SignupCtrl', SignupCtrl);

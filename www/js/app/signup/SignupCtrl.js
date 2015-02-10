var SignupCtrl = function ($scope, $rootScope, $state, SignupService) {

    this.registerUser = function () {
        SignupService.createUserDeferredRequest(this.username, this.password).then(function (authData) {
            console.log(authData);
            $state.go("userpreferences")
        }, function(error){
            console.log("Exception occurred while signing up user :: " + error);
        })
    }
}

angular.module('ionicapp.signup').controller('SignupCtrl', SignupCtrl);

var LoginCtrl = function ($scope, $rootScope, $state, LoginService) {

    this.authenticateUser = function () {
        LoginService.authenticateUserDeferredRequest(this.username, this.password).then(function (authData) {
            console.log(authData);
            $state.go("userpreferences")
        }, function(error){
            console.log("Exception occurred while authenticating user :: " + error);
        })
    }
}

angular.module('ionicapp.login').controller('LoginCtrl', LoginCtrl);

var LoginCtrl = function ($scope, $rootScope, $state, LoginService) {

    this.authenticateUser = function () {
        LoginService.authenticateUserDeferredRequest(this.username, this.password).then(function (response) {
            console.log(response);
            $state.go("userpreferences")
        }), function (err) {
            console.error("Exception occurred in authenticating user : " + err.message);
        };
    }
}

angular.module('ionicapp.login').controller('LoginCtrl', LoginCtrl);

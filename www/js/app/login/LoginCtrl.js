var LoginCtrl = function ($scope, $rootScope, $state, LoginService) {

    /**
     * authenticate user entered and forward to :
     *  1. Ask questions if status returned is 'ASK_QUESTIONS'.
     */
    this.authenticateUser = function () {
        IssoLoginService.authenticateUserDeferredRequest(this.username, this.password).then(function (response) {
            $rootScope.userId = response.user_id;
            if (response.status === "AUTHENTICATE") {
                $state.go("issoquestions");
            } else if (response.status === "SUCCESS") {
                if (response.user_token != null) {
                    $http.defaults.headers.common["Authorization"] = "UserToken " + response.user_token;
                }
                $state.go("accountsummary")
            }
        }), function (err) {
            console.error("Exception occurred in authenticating user : " + err.message);
        };
    }
}

angular.module('ionicapp.login').controller('LoginCtrl', LoginCtrl);

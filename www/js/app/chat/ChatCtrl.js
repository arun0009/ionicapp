var ChatCtrl = function ($scope, $rootScope, $state, $firebase, ENV) {
    console.log('In chat controller')

    var ref = new Firebase(ENV.firebaseURL + "/comments");
    var sync = $firebase(ref.limitToLast(10));
    var email = $rootScope.username;
    $scope.data = sync.$asArray();

    $scope.addComment = function (comment) {
        sync.$push({email: email, value: comment}).then(function (newChildRef) {
            console.log("added record with id " + newChildRef.key());
            $scope.newComment = '';
        });
    }

};

angular.module('ionicapp.chat').controller('ChatCtrl', ChatCtrl);

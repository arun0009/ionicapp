var ChatCtrl = function ($scope, $rootScope, $state, $firebase) {
    console.log('In chat controller')

    var ref = new Firebase("https://crackling-fire-4660.firebaseio.com/comments");
    // create an AngularFire reference to the data
    var sync = $firebase(ref.limitToLast(10));
    var authData = ref.getAuth();
    var email = $rootScope.username;
    // download the data into a local object
    $scope.data = sync.$asArray();

    $scope.addComment = function (comment) {
        sync.$push({email: email, value: comment}).then(function (newChildRef) {
            console.log("added record with id " + newChildRef.key());
            $scope.newComment = '';
        });
    }

};

angular.module('ionicapp.chat').controller('ChatCtrl', ChatCtrl);

angular.module('ionicapp.chat', ['ionic', 'ngResource'])
    .config(function ($stateProvider) {
        $stateProvider.state('chat', {
            url: '/chat',
            controller: 'ChatCtrl as chat',
            templateUrl: 'js/app/chat/chat.html'
        })
    });

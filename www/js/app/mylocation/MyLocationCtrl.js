var MyLocationCtrl = function ($scope, $state, $ionicLoading, $ionicPopup, $cordovaGeolocation) {

    if (typeof analytics !== "undefined") {
        analytics.trackView("Deposit Locations View");
    }

    this.geocode = function (address) {
        if (typeof analytics !== "undefined") {
            analytics.trackEvent('User Entered Address', 'Address Location for user', address);
        }
        geocoder.geocode({'address': address}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                showMap(results[0].geometry.location);
            } else {
                $scope.$apply(function () {
                    $scope.msg = "Unable to get location based on your address";
                });
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });
    };

    var showMap = function(userLocation) {
        console.log("my location is  : " + userLocation);
        map.setZoom(20);
        map.setCenter(userLocation);
        new google.maps.Marker({
            position: userLocation,
            map: map,
            icon: 'img/user_marker.png'
        });
        document.getElementById("map").style.visibility = "visible";
    };

    function initialize() {
        console.log("inside initialize...");
        document.getElementById("map").style.visibility = "hidden";
        var mapOptions = {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false
        };
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        geocoder = new google.maps.Geocoder();

        var posOptions = {timeout: 10000, enableHighAccuracy: true};
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            if (typeof analytics !== "undefined") {
                analytics.trackEvent('GPS-Coordinates', 'Phone Location', 'GPS Coordinates', "lat : " + lat + ", lng : " + lng);
            }
            var myLatlng = new google.maps.LatLng(lat, lng);
            showMap(myLatlng);
        }, function (error) {
            $scope.msg = ERROR.NOLOCATION;
            console.error("Unable to get location : " + error.message);
        });
    }

    google.maps.event.addDomListener(window, 'load', initialize());

};

angular.module('ionicapp.mylocation').controller('MyLocationCtrl', MyLocationCtrl);

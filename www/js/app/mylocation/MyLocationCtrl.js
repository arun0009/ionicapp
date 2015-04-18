var DepositLocationsCtrl = function ($scope, $state, $ionicLoading, $ionicPopup, $cordovaGeolocation, $ionicScrollDelegate, CashLoadHelperService, DepositLocationsService, ERROR) {

    this.flip = false;

    var _this = this;

    if (typeof analytics !== "undefined") {
        analytics.trackView("Deposit Locations View");
    }

    var adjustZoom = function (depositLocations) {
        depositLocations.forEach(function (depositLocation) {
            var position = new google.maps.LatLng(depositLocation.location.geolocation[1], depositLocation.location.geolocation[0]);
            while (!map.getBounds().contains(position)) {
                map.setZoom(map.getZoom() - 1);
            }
        });
    };

    var addLocationMarkers = function (depositLocations) {
        var infowindow = new google.maps.InfoWindow();
        var marker;
        var i = 1;
        depositLocations.forEach(function (depositLocation) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(depositLocation.location.geolocation[1], depositLocation.location.geolocation[0]),
                map: map,
                icon: 'img/cvs-pin-drop.png'
            });
            i++;
            if (typeof analytics !== "undefined") {
                analytics.trackEvent('GPS-Coordinates', 'Deposit Location ' + i + ' for user', 'GPS Coordinates',
                                     'lat : ' + depositLocation.location.geolocation[1] + ', lng : ' + depositLocation.location.geolocation[0]);
            }

            google.maps.event.addListener(marker, 'click', (function (marker) {
                return function () {
                    _this.location = depositLocation;
                    CashLoadHelperService.setStagingLocation(depositLocation);
                    $scope.$apply();
                }
            })(marker));
        });

        adjustZoom(depositLocations)
    };

    this.geocode = function (address) {
        if (typeof analytics !== "undefined") {
            analytics.trackEvent('User Entered Address', 'Address Location for user', address);
        }
        geocoder.geocode({'address': address}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                document.getElementById("message").style.display = "none";
                showMap(results[0].geometry.location, 50, 10);
            } else {
                $scope.$apply(function () {
                    $scope.msg = ERROR.GEOCODE;
                });
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });
    };

    var showMap = function(userLocation, dist, limit) {
        map.setZoom(20);
        map.setCenter(userLocation);
        new google.maps.Marker({
            position: userLocation,
            map: map,
            icon: 'img/user_marker.png'
        });
        document.getElementById("map").style.visibility = "visible";
        DepositLocationsService.depositLocationsDeferredRequest(userLocation.lat(),userLocation.lng(), dist, limit).$promise.then(function (depositLocations) {
            $scope.locations = depositLocations;
            addLocationMarkers(depositLocations);
        }).catch(function (res) {
            console.log("Catching error: " + JSON.stringify(res));
            $scope.message = ERROR.ERROR;
        }), function (err) {
            console.error("Exception occurred in retrieving deposit locations : " + err.message);
        };
    };

    function initialize() {
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
            showMap(myLatlng, 50, 10);
        }, function (error) {
            $scope.msg = ERROR.NOLOCATION;
            console.error("Unable to get location : " + error.message);
        });
    }

    google.maps.event.addDomListener(window, 'load', initialize());

    this.stage = function(location) {
        console.log("Selecting location: " + location);
        CashLoadHelperService.setStagingLocation(location);
        $state.go("stagingdetail");
    }

};

angular.module('cashload.depositlocations').controller('DepositLocationsCtrl', DepositLocationsCtrl);

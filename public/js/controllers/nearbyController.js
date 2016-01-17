angular.module('angora')
.controller('nearbyController', [
    '$scope',
    '$rootScope',
    'nearby',
    'uiGmapGoogleMapApi',
    function($scope, $rootScope, nearby, uiGmapGoogleMapApi) {
        $scope.mapMarkers = [];
        $scope.options = {
            clickable: false
        };
        $scope.mapEvents = {
            tilesloaded: function (map) {
                $scope.mapInstance = map;
            }
        };
        $rootScope.userLocation = {};
        $scope.mapInstance = {};

        $scope.$watch(
            function() { return nearby.businesses; },
            function(data) {
                var markers = [];

                for (var idx = 0; idx < nearby.businesses.length; idx++) {
                    var business = nearby.businesses[idx];
                    markers.push({
                        id: idx,
                        coordinate: business.location.coordinate,
                        templateUrl: 'views/markers/stylist.html',
                        templateParameter: business,
                        icon: "../../img/marker-home.png"
                    });
                }

                $scope.mapMarkers = markers;

                if ($scope.mapMarkers.length > 0) {
                    $scope.homeMarker = {
                        idKey: "homeMarker",
                        coords: $scope.map.center
                    };
                }
            },
            true
        );

        $scope.$watch(
            function() { return nearby.region; },
            function(data) {
                if (Object.keys(nearby.region).length > 0) {
                    $scope.map.center = nearby.region.center;
                }
            },
            true
        );

        $scope.initializeDirectionRenderer = function(map) {
            $scope.directionsDisplay = new google.maps.DirectionsRenderer({ map: map });
            $scope.directionsDisplay.setOptions( { suppressMarkers: true } );
            $scope.directionsDisplay.setMap(map);
        };

        $scope.onMarkerClick = function(marker, eventName, model) {
            for(var i = 0; i < $scope.mapMarkers.length; i++) {
                if (model.id !== i) {
                    $scope.mapMarkers[i].show = false;
                }
            }

            model.show = !model.show;

            if($scope.directionsDisplay != null) {
                $scope.directionsDisplay.setMap(null);
                $scope.directionsDisplay = null;
            }

            $scope.initializeDirectionRenderer($scope.mapInstance);

            if (model.show) {
                var start = {
                    lat: $rootScope.userLocation.latitude,
                    lng: $rootScope.userLocation.longitude
                };

                var end = {
                    lat: model.coordinate.latitude,
                    lng: model.coordinate.longitude
                };

                var request = {
                    origin: start,
                    destination: end,
                    travelMode: google.maps.TravelMode.DRIVING
                };

                $scope.directionsService.route(request, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        $scope.directionsDisplay.setDirections(response);
                    }
                });
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position){
                if ($scope.map === undefined) {
                    $scope.map = {
                        zoom: 8,
                        bounds: {},
                        options: {
                            scrollwheel: false
                        }
                    };
                }

                $rootScope.userLocation = position.coords;

                $scope.map.center = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };

                nearby.getStylists(position.coords);
            }, function(err) {
                console.log(err);
                // fallback
            });
        } else {
            // fallback
        }

        uiGmapGoogleMapApi.then(function(maps) {
            $scope.directionsService = new google.maps.DirectionsService();

            $scope.map = {
                center: {
                    latitude: 45,
                    longitude: -80
                },
                zoom: 8,
                bounds: {},
                options: {
                    scrollwheel: false
                }
            };

            $scope.homeMarker = {
                idKey: "homeMarker",
                coords: {
                    latitude: 45,
                    longitude: -80
                }
            };
        });
}]);
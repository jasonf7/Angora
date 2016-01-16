angular.module('angora')
.controller('nearbyController', [
    '$scope',
    'nearby',
    'uiGmapGoogleMapApi',
    function($scope, nearby, uiGmapGoogleMapApi) {
    $scope.$watch(
        function() { return nearby.businesses; },
        function(data) {
            $scope.businesses = nearby.businesses;
        },
        true
    );

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            nearby.getStylists(position.coords);
        }, function(err) {
            console.log(err);
            // fallback
        });
    } else {
        // fallback
    }

    uiGmapGoogleMapApi.then(function(maps) {
        console.log(maps);
        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
        console.log($scope.map);
    });
}]);
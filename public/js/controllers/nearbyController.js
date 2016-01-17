angular.module('angora')
.controller('nearbyController', [
    '$scope',
    '$uibModal',
    'nearby',
    'uiGmapGoogleMapApi',
    function($scope, $uibModal, nearby, uiGmapGoogleMapApi) {
    $scope.$watch(
        function() { return nearby.businesses; },
        function(data) {
            $scope.businesses = nearby.businesses;
        },
        true
    );

    if (navigator.geolocation) {
        console.log('requesting position!');
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log('got position!');
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

    $scope.animationsEnabled = true;
    $scope.open = function () {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '../../views/modals/stylistsModal.html',
            controller: 'stylistsModalController',
            size: 'lg',
            resolve: {
                business: function () {
                    return nearby.businesses[1];
                }
            }
        });
    };
}]);
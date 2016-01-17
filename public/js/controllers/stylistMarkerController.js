angular.module('angora')
    .controller('stylistMarkerController', [
        '$scope',
        '$rootScope',
        '$uibModal',
        function($scope, $rootScope, $uibModal) {
            $scope.open = function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '../../views/modals/stylistsModal.html',
                    controller: 'stylistsModalController',
                    size: 'lg',
                    resolve: {
                        business: function () {
                            return $scope.parameter;
                        },
                        userLocation: function () {
                            return $rootScope.userLocation;
                        }
                    }
                });
            };

            var distance = $scope.parameter.distance;
            var unit = "";
            if (distance >= 1000) {
                distance = Math.round(distance / 1000 * 10) / 10;
                unit = "km";
            } else {
                distance = Math.round(distance * 10) / 10;
                unit = "m";
            }

            $scope.business = {
                name: $scope.parameter.name,
                distance: distance,
                unit: unit,
                hasImage: false
            };

            if ("image_url" in $scope.parameter) {
                $scope.business.imageUrl = $scope.parameter.image_url;
                $scope.business.hasImage = true;
                $scope.columnClass = "col-sm-7";
            } else {
                $scope.columnClass = "";
            }
        }]
    );
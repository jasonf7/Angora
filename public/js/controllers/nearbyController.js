angular.module('angora')
.controller('nearbyController', ['$scope', 'nearby', function($scope, nearby) {
    nearby.getStylists('Waterloo');
}]);
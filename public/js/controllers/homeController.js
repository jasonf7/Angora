angular.module('angora')
.controller('homeController', ['$scope', '$window', function($scope, $window) {
    $scope.animateGroup = 'animated bounceIn';

    console.log(angular.fromJson($window.sessionStorage.currentUser).name);
}]);
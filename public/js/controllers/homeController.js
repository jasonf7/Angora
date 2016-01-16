angular.module('angora')
.controller('homeController', ['$scope', '$window', function($scope, $window) {
    $scope.animateGroup = 'animated fadeIn';
    //console.log(angular.fromJson($window.sessionStorage.currentUser).name);
}]);
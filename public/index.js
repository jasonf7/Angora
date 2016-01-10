var app = angular.module('angora', [
    'ngRoute',
    'ngAnimate'
]);

app.config(function($routeProvider) {
   $routeProvider
       .when('/', {
           controller: 'homeController',
           templateUrl: 'views/partials/home.html'
       })
       .when('/signup', {
           controller: 'signupController',
           templateUrl: 'views/partials/signup.html'
       })
       .when('/404', {
           templateUrl: 'views/partials/404.html'
       })
       .otherwise({
           redirectTo: '/404'
       });
});
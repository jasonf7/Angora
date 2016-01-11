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
       .when('/nearby', {
           controller: 'nearbyController',
           templateUrl: 'views/partials/nearby.html'
       })
       .otherwise({
           redirectTo: '/404'
       });
});

app.run(['$rootScope', '$window', function($rootScope, $window){
    $rootScope.user = {};

    $window.fbAsyncInit = function() {
        FB.init({
            appId      : '1678303762409740',
            status     : true,
            cookie     : true,
            xfbml      : true,
            version    : 'v2.5'
        });

        FB.getLoginStatus(function(response) {
            console.log(response.status);
            if (response.status !== 'connected') {
                $window.location.href = "#/signup";
            }
        });
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}]);

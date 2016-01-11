angular.module('angora')
.controller('signupController', ['$rootScope', '$scope', function($rootScope, $scope) {
    $scope.fbLogin = function() {
        if (FB === undefined) {
            return;
        }

        FB.login(function(response) {
            if (response.authResponse) {
                FB.api('/me', function(response) {
                    console.log(response);
                    console.log('Good to see you, ' + response.name + '.');
                });
            }
        }, { scope: 'public_profile' });
    };

    $scope.googleLogin = function() {
        var cachedAuth = gapi.auth2 !== undefined ? gapi.auth2.getAuthInstance() : undefined;

        if (cachedAuth === undefined) {
            gapi.load('auth2', function() {
                var googleAuth = gapi.auth2.init({
                    client_id : '478037030670-lgvtll3r57al8kv7fla07fhrnf6q8c74.apps.googleusercontent.com'
                });

                googleAuth.signIn().then(function(response) {
                    var profile = response.getBasicProfile();
                    console.log('Name:' + profile.getName());
                }, function(err) {
                    console.log(err);
                });
            });
        } else {
            cachedAuth.signIn().then(function(response) {
                var profile = response.getBasicProfile();
                console.log('Name:' + profile.getName());
            }, function(err) {
                console.log(err);
            });
        }
    };
    $scope.animateGroup = 'animated bounceIn';
}]);
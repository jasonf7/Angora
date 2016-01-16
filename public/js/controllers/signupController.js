angular.module('angora')
.controller('signupController', [
    '$scope',
    '$window',
    'user',
    function($scope, $window, user) {
        $scope.$watch(
            function() { return user.currentUser; },
            function(data) {
                var prevUser = angular.fromJson($window.sessionStorage.currentUser)
                $window.sessionStorage.currentUser = angular.toJson(user.currentUser);
                if (Object.keys(user.currentUser).length > 0 || prevUser.haircuts !== undefined) {
                    $window.location.href = "/";
                }
            },
            true
        );

        $scope.fbLogin = function() {
            if (FB === undefined) {
                return;
            }

            FB.login(function(response) {
                if (response.authResponse) {
                    FB.api('/me', 'get', {
                        access_token : response.authResponse.access_token,
                        fields : 'id,name'
                    }, function(response) {
                        user.fbLogin(response.id, response.name);
                    });
                }
            }, { scope: 'public_profile' });
        };

        $scope.googleLogin = function() {
            var cachedAuth = gapi.auth2 !== undefined ? gapi.auth2.getAuthInstance() : undefined;

            var signIn = function(googleAuth) {
                googleAuth.signIn().then(function(response) {
                    var profile = response.getBasicProfile();
                    user.googleLogin(profile.getId(), profile.getName(), profile.getImageUrl());
                }, function(err) {
                    console.log(err);
                });
            };

            if (cachedAuth === undefined) {
                gapi.load('auth2', function() {
                    var googleAuth = gapi.auth2.init({
                        client_id : '478037030670-lgvtll3r57al8kv7fla07fhrnf6q8c74.apps.googleusercontent.com'
                    });

                    signIn(googleAuth);
                });
            } else {
                signIn(cachedAuth);
            }
        };
        $scope.animateGroup = 'animated fadeIn';
    }]
);
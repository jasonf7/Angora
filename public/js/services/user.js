angular.module('angora')
    .factory('user', [
        '$http',
        function($http) {
            var o = {
                currentUser: {}
            };

            o.googleLogin = function(id, name, profileImage) {

                var params = {
                    id : id,
                    name : name,
                    profileImage : profileImage
                };

                $http.post("/api/user/login/google", params, {headers: {'Content-Type': 'application/json'} })
                    .then(function (response) {
                        angular.copy(response.data, o.currentUser);
                    });
            };

            o.fbLogin = function(id, name) {

                var params = {
                    id : id,
                    name : name,
                    profileImage : "http://graph.facebook.com/" + id + "/picture"
                };

                $http.post("/api/user/login/fb", params, {headers: {'Content-Type': 'application/json'} })
                    .then(function (response) {
                        angular.copy(response.data, o.currentUser);
                    });
            };

            return o;
        }
    ]);
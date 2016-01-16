angular.module('angora')
    .factory('nearby', [
        '$http',
        function($http){
            var o = {
                region: {},
                businesses: [],
                total: 0
            };
            o.getStylists = function(coordinate) {
                var query = {
                    params: {
                        latitude : coordinate.latitude,
                        longitude: coordinate.longitude,
                        accuracy : coordinate.accuracy,
                        altitude : coordinate.altitude,
                        altitudeAccuracy : coordinate.altitudeAccuracy
                    }
                };

                $http.get('/api/stylists/get', query)
                    .then(function (response) {
                        angular.copy(response.data.region, o.region);
                        angular.copy(response.data.businesses, o.businesses);
                        angular.copy(response.data.total, o.total);
                        console.log(response);
                    }, function(reason) {
                        console.log(reason);
                    });
            };
            return o;
        }
    ]);
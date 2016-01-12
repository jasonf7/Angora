angular.module('angora')
    .factory('nearby', [
        '$http',
        function($http){
            var o = {
                region: {},
                businesses: [],
                total: 0
            };
            o.getStylists = function(location) {
                var req = {
                    method: 'GET',
                    url: '/#/api/stylists/get',
                    headers: {
                        'Content-Type': undefined
                    },
                    data: { location: location }
                };

                return $http(req).then(function(value) {
                    angular.copy(value.region, o.region);
                    angular.copy(value.businesses, o.businesses);
                    angular.copy(value.total, o.total);
                    console.log(value);
                }, function(reason) {
                    console.log(reason);
                });
            };
            return o;
        }
    ]);
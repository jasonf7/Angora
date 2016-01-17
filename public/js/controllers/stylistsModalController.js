angular.module('angora').controller('stylistsModalController',
    ['$scope', '$uibModalInstance', 'business', 'userLocation', function ($scope, $uibModalInstance, business, userLocation) {
        if(business != null) {
            //get higher quality image
            if (business.image_url != null) {
                $scope.mdResImageUrl = business.image_url.substr(0, business.image_url.lastIndexOf('/') + 1) + "ls.jpg";
            }
            $scope.business = business;
        }

        $scope.formatNumberToDistance = function(i) {
            if (i > 1000)
                return String(Math.round(i / 100) / 10) + " km away";
            return String(Math.round(i * 10) / 10) + " m away";
        };

        $scope.convertToStar = function(rating) {
            var numStars = Math.floor(rating);
            var starRating = "";
            var i = 0;
            while (i < 5)
                i++ < numStars ? starRating += "★" : starRating += "☆";
            return starRating;
        };

        $scope.getDirection = function() {
            var baseURL = 'http://maps.google.com/maps?';
            var saddr =  'saddr=' + userLocation.latitude + ',' + userLocation.longitude;
            var daddr = 'daddr=' + business.location.coordinate.latitude + ',' + business.location.coordinate.longitude;

            return baseURL + saddr + '&' + daddr;
        }

        $scope.checkIn = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
]);
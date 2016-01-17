angular.module('angora').controller('stylistsModalController',
    ['$scope', '$uibModalInstance', 'business', function ($scope, $uibModalInstance, business) {
        if(business != null) {
            //get higher quality image
            if (business.image_url != null) {
                business.image_url = business.image_url.substr(0, business.image_url.lastIndexOf('/') + 1) + "ls.jpg";
            }
            $scope.business = business;
        }

        $scope.checkIn = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
]);
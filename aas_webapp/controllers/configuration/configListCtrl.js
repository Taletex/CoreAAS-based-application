app.controller('configListCtrl', function($scope, $window, mainService, configurationService, modalService, restService) {
    $scope.bLoading = false;

    $scope.init = function() {
        $scope.bLoading = true;
        restService.getConfigurations().then(function successCallback(response) {
            $scope.$parent.configurationList = response.data;
            $scope.bLoading = false;
        }, function errorCallback(response) {$scope.bLoading = false;});
    }

    $scope.edit = function(elem) {
        configurationService.setEdit(true);
        $window.location.href = elem.id;
    }

    $scope.delete = function(elem) {
        var deleteModal = modalService.getDeleteModal();
        deleteModal.result.then(function() {
            $scope.bLoading = true;
            restService.deleteConfiguration(elem.id.split("/")[5]).then(function successCallback(response) {
                restService.getConfigurations().then(function successCallback(response) {
                    $scope.$parent.configurationList = response.data;
                    $scope.bLoading = false;
                }, function errorCallback(response) {$scope.bLoading = false;});
            }, function errorCallback(response) {$scope.bLoading = false;});
        },function(){ /*cancel*/ });
    }

    $scope.editPlcProgram = function() {
        alert("Feature da implementare");
    }

    $scope.init();
});
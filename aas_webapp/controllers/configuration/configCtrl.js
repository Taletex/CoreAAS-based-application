app.controller('configCtrl', function($scope, $location, $window, mainService, configurationService, modalService, restService) {
    $scope.currentConfig;
    $scope.currentSection;
    $scope.bEdit;
    $scope.ISLAND_ENUM;
    $scope.bLoading = false;
    
    $scope.init = function() {
        $scope.ISLAND_ENUM = configurationService.ISLAND_ENUM;

        $scope.bLoading = true;
        restService.getConfigurations().then(function successCallback(response) {
            $scope.$parent.configurationList = response.data;
            $scope.bLoading = false;
        }, function errorCallback(response) { $scope.bLoading = false; });

        $scope.bLoading = true;
        restService.getConfiguration($location.absUrl().split("/")[5]).then(function successCallback(response) {
            $scope.currentConfig = response.data[0];
            $scope.bLoading = false;
        }, function errorCallback(response) { $scope.bLoading = false; });

        $scope.currentSection = mainService.getCurrentSection();
        $scope.bEdit = configurationService.getEdit();
        if($scope.bEdit) configurationService.setEdit(false);
    }

    $scope.edit = function() {
        $scope.bEdit = true;
    }

    $scope.cancel = function() {
        $scope.bLoading = true;
        restService.getConfiguration($location.absUrl().split("/")[5]).then(function successCallback(response) {
            $scope.currentConfig = response.data[0];
            $scope.bLoading = false;
        }, function errorCallback(response) { $scope.bLoading = false; });

        $scope.bEdit = false;
    }

    $scope.save = function() {
        $scope.bLoading = true;
        restService.updateConfiguration(($scope.currentConfig.id).split("/")[5], $scope.currentConfig).then(function successCallback(response) {
            restService.getConfigurations().then(function successCallback(response) {
                $scope.$parent.configurationList = response.data;
                $scope.bEdit = false;
                $scope.bLoading = false;
            }, function errorCallback(response) {
                $scope.bEdit = false;
                $scope.bLoading = false;
            });
        }, function errorCallback(response) { $scope.bLoading = false; });
    }

    $scope.delete = function() {
        var deleteModal = modalService.getDeleteModal();
        deleteModal.result.then(function() {
            $scope.bLoading = true;
            restService.deleteConfiguration(($scope.currentConfig.id).split("/")[5]).then(function successCallback(response) {
                    $scope.bEdit = false;
                    $scope.bLoading = false;
                    $window.location.href = mainService.baseUrl + "configurations";
            }, function errorCallback(response) { $scope.bLoading = false; });
        },function(){ /*cancel*/ });
    }

    $scope.switchAllTerminals = function(island, btnType) {
        if($scope.bEdit) {
            if(btnType == undefined || btnType == null)
            $scope.currentConfig.islands[island] = !$scope.currentConfig.islands[island];

            for(var i=0; i<$scope.currentConfig.mapping[island].length; i++) {
                $scope.currentConfig.mapping[island][i].value = $scope.currentConfig.islands[island];
            }
        }
    }

    $scope.checkActiveTerminals = function(island) {
        // Adjust islands final informations according to disabled terminals
        for(let i=0; i<$scope.currentConfig.mapping[island].length; i++) {
            if($scope.currentConfig.mapping[island][i].value) {
                $scope.currentConfig.islands[island] = true;
                return;
            }
        }
        $scope.currentConfig.islands[island] = false;
    }

    $scope.uploadPlcProgram = function(id) {
        $scope.bLoading = true;
        restService.uploadPlcProgram(id.split("/")[5]).then(function successCallback(response) {
            $scope.bLoading = false;
            alert("Configurazione caricata con successo!");
        }, function errorCallback(response) { 
            $scope.bLoading = false; 
            alert("Errore durante il caricamento della configurazione!");
        });
    }

    $scope.init();
});
app.service("mainService", function($location) {
    this.baseUrl = "http://localhost:8081/#coreaas/";
    this.nodeServerUrl = "http://localhost:3000";
    this.sections = {index: "Home", configurations: "Configuration", resources: "Resource", descriptions: "Concept Description", submodels: "Submodel", assets: "Asset", aas: "Asset Administration Shell", dataspecs: "Data Specification"};

    
    this.getCurrentSection = function() {
        return $location.absUrl().split("/")[4]
    }
});
var app = angular.module('myApp', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        /*.when("/", {
            templateUrl : ""
        })*/
        .when("/descriptions/", {
            templateUrl: "/templates/conceptDescriptionList.html",
            controller: "mainCtrl"
        })
        .when("/descriptions/:number", {
            templateUrl: "/templates/conceptDescription.html",
            controller: "mainCtrl"
        })
        //.otherwise({redirectTo: "/index.html"});
});

app.controller('mainCtrl', function($scope, $routeParams, $window) {
    $scope.baseUrl = "http://localhost:8080/";
    $scope.section = "";
    $scope.elements = {conceptDescriptions: [], submodels: [], assets: [], aas: []};

    /* === FUNCTIONS === */
    $scope.addConceptDescription = function(browseName, preferredName, description, unit, id) {
        $scope.elements.conceptDescriptions.push({browseName: browseName, preferredName: preferredName, description: description, unit: unit, id: id});
    };

    $scope.addSubmodel = function(browseName, revision, version, description, id) {
        $scope.elements.submodels.push({browseName: browseName, revision: revision, version: version, description: description, id: id});
    };

    $scope.addAsset = function(browseName, revision, version, description, serialNumber, manufacturer, datasheet, id) {
        $scope.elements.assets.push({browseName: browseName, revision: revision, version: version, description: description, id: id});
    };

    $scope.addAAS = function(browseName, revision, version, description, id, assetRef, submodelsRef) {
        $scope.elements.aas.push({browseName: browseName, revision: revision, version: version, description: description, id: id, assetRef: assetRef, submodelsRef: submodelsRef});
    };

    $scope.redirectTo = function(section, elem) {
        elemId = elem.id.split("/");
        $window.location.href = '/#!descriptions/' + elemId[1];
        $scope.section = section;
        $scope.currentElement = elem;
    }
    
    /* === POPULATION === */
    $scope.addConceptDescription("Submodel - Identification", "Identification", "Submodel contenente informazioni sull'identificazione dell'asset", "", "www.test.com/001");
    $scope.addConceptDescription("Property - Asset serial number", "Asset serial number", "Numero seriale dell'asset", "", "www.test.com/002");
    $scope.addConceptDescription("Submodel - Configuration", "Configuration", "Submodel contenente informazioni sulla configurazione dell'asset", "", "www.test.com/003");
    $scope.addConceptDescription("File - Datasheet", "Datasheet", "File contenente il datasheet dell'asset", "", "www.test.com/004");
    $scope.addConceptDescription("Property - Asset Manufacturer", "Asset Manufacturer", "Produttore dell'asset", "", "www.test.com/005");
    $scope.addConceptDescription("Submodel - Vacuum Gripper", "Vacuum Gripper", "Elemento responsabile dello spostamento dei blocchi di produzione", "", "www.test.com/006");
    $scope.addConceptDescription("Operation - Pick Up", "Pick Up", "Operazione di sollevamento del blocco di produzione per effettuarne lo spostamento", "", "www.test.com/007");
    $scope.addConceptDescription("Submodel - Oven", "Oven", "Forno per il processamento dei blocchi di produzione", "", "www.test.com/008");
    $scope.addConceptDescription("Property - Terminal", "Terminal", "Terminale di input o output", "V", "www.test.com/009");
    $scope.addConceptDescription("Operation - Burn", "Burn", "Operazione di accensione del forno", "", "www.test.com/010");
    $scope.addConceptDescription("Submodel - Turntable", "Turntable", "Elemento preposto alla rotazione dei blocchi di produzione", "", "www.test.com/011");
    $scope.addConceptDescription("Submodel - Turntable", "Turntable", "Elemento preposto alla rotazione dei blocchi di produzione", "", "www.test.com/011");
    $scope.addConceptDescription("Operation - Activate Saw", "Activate Saw", "Operazione di attivazione della sega circolare per la lavorazione del blocco di produzione", "", "www.test.com/013");
    $scope.addConceptDescription("Operation - Ejection", "Ejection", "Operazione di emissione del blocco di produzione dalla turntable al nastro trasportatore", "", "www.test.com/014");
    $scope.addConceptDescription("Operation - Activate Belt", "Activate Belt", "Operazione di abilitazione del nastro trasportatore per lo spostamento dei blocchi di produzione", "", "www.test.com/015");
    $scope.addConceptDescription("Property - Motor Terminal", "Motor Terminal", "Terminale relativo ad un motorino elettrico", "V", "www.test.com/017");
    $scope.addConceptDescription("Operation - Set Down", "Set Down", "Operazione di rilascio del blocco di produzione per effettuarne lo spostamento", "", "www.test.com/018");
    $scope.addConceptDescription("Submodel - Sorting Line", "Sorting Line", "Elemento responsabile del riconoscimento del colore dei blocchi di produzione e del loro smistamento nei rispettivi magazzini", "", "www.test.com/022");
    $scope.addConceptDescription("Operation - Color Detection", "Color Detection", "Operazione di riconoscimento del colore del blocco di produzione", "", "www.test.com/023");
    $scope.addConceptDescription("Operation - Ejection", "Ejection", "Operazione di espulsione di un blocco di produzione verso un magazzino", "", "www.test.com/024");
    $scope.addConceptDescription("Submodel - AHBWarehouse", "AHBWarehouse", "Submodel per la gestione dei pezzi nel magazzino", "", "www.test.com/026");
    $scope.addConceptDescription("Operation - Retrieving", "Retrieving", "Operazione di recupero di un blocco di produzione dal magazzino", "", "www.test.com/028");
    $scope.addConceptDescription("Operation - Move", "Move", "Operazione di spostamento del braccio del vacuum gripper. Prende in input le coordinate di destinazione (x,y,z)", "", "www.test.com/029");
    $scope.addConceptDescription("Operation - Move", "Move", "Operazione di spostamento del braccio del vacuum gripper dalla posizione iniziale a quella finale", "", "www.test.com/030");
    $scope.addConceptDescription("Operation - Turn", "Turn", "Operazione di rotazione della turntable per portare il blocco in prossimità della sega", "", "www.test.com/031");
    $scope.addConceptDescription("Property - Switch Terminal", "Switch Terminal", "Terminale relativo ad uno switch", "V", "www.test.com/040");
    $scope.addConceptDescription("Property - Light barrier Terminal", "Light barrier Terminal", "Terminale relativo ad un sensore luminoso", "V", "www.test.com/041");
    $scope.addConceptDescription("File - Program File", "ProgramFile", "Link ad un file contenente un programma IEC", "", "www.test.com/052");
    $scope.addConceptDescription("Submodel - IO Module", "IOModule", "Submodel contenente informazioni sui moduli di IO aggiuntivi", "", "www.test.com/053");
    $scope.addConceptDescription("Submodel - IO", "IO", "Submodel contenente informazioni sugli I/O dell'Asset", "", "www.test.com/054");
    $scope.addConceptDescription("Elem. Collection - IEC Program", "Program", "Collection element contenente informazioni su un programma IEC", "", "www.test.com/055");
    $scope.addConceptDescription("Submodel - IEC Configuration", "IECConfiguration", "Submodel contenente informazioni relative alla configurazione conforme allo standard IEC61131-3", "", "www.test.com/056");
    $scope.addConceptDescription("Submodel - IEC Resource", "IEC Resource", "Submodel contenente informazioni relative alla risorsa conforme allo standard IEC61131-3", "", "www.test.com/057");
    $scope.addConceptDescription("Property - IEC Resource Description", "Description", "Proprietà che descrive la risorsa IEC", "", "www.test.com/058");
    $scope.addConceptDescription("Property - IEC Resource Address List", "Address List", "Proprietà che descrive gli indirizzi della risorsa", "", "www.test.com/059");
    $scope.addConceptDescription("Submodel - IEC Program", "IEC Program", "Submodel contenente informazioni relative ai programmi conformi allo standard IEC61131-3", "", "www.test.com/060");
    $scope.addConceptDescription("Rel. Element - AssociatedC onfiguration", "AssociatedConfiguration", "Relazione di appartenenza di una risorsa ad una configurazione", "", "www.test.com/061");
    $scope.addConceptDescription("Rel. Element - Associated Resource", "AssociatedResource", "Relazione di appartenenza di un programma ad una risorsa", "", "www.test.com/062");
    $scope.addConceptDescription("Rel. Element - Associated Task", "AssociatedTask", "Relazione di appartenenza di un task ad un programma. Il valore indica il codice dell'OB", "", "www.test.com/063");
    $scope.addConceptDescription("Submodel - IEC Communication", "IECCommunication", "Submodel contenente informazioni relative alla modalità di comunicazione del PLC", "", "www.test.com/065");
    $scope.addConceptDescription("Elem. Collection - Profinet IO", "ProfinetIO", "Collection element contenente informazioni relative alla modalità di comunicazione Profinet IO del PLC", "", "www.test.com/066");
    $scope.addConceptDescription("Property - Device Type", "DeviceType", "Proprietà indicante il tipo di dispositivo: IO Controller o IO Device nel caso di ProfinetIO, Master o Slave nel caso di ProfibusDP", "", "www.test.com/067");
    $scope.addConceptDescription("Property - Send Clock Time", "SendClockTime", "valore reale indicante il l'intervallo di scambio dati tra controller e device. Da usare solo nel caso in cui il tipo sia IO Controller", "ms", "www.test.com/068");
    $scope.addConceptDescription("Property - Response Control Time", "ResponseControlTime", " valore intero che indica quanti cicli di aggiornamento senza IO sono accettati. Da indicare solo nel caso in cui il tipo sia IO Device.", "", "www.test.com/070");
    $scope.addConceptDescription("Property - Bandwidth", "Bandwidth", "reale indicante la massima larghezza di banda utilizzabile per lo scambio dati real time. Da indicare solo nel caso in cui il tipo sia IO Controller.", "ms", "www.test.com/071");
    $scope.addConceptDescription("Property - IP Address", "IPAddress", "indirizzo IP del dispositivo Profinet IO", "", "www.test.com/072");
    $scope.addConceptDescription("Elem. Collection - Profibus DP", "ProfibusDP", "Submodel contenente informazioni relative alla modalità di comunicazione Profibus DP del PLC ", "", "www.test.com/073");
    $scope.addConceptDescription("Property - Bit Rate", "BitRate", "bit rate della comunicazione Profibus DP", "Kbps", "www.test.com/074");
    $scope.addConceptDescription("Property - Profibus Address", "ProfibusAddress", "indirizzo profibus DP del device", "", "www.test.com/075");
    $scope.addConceptDescription("Property - Highest Station Address", "HSA", "intero che indica il valore dell'indirizzo più alto ammissibile per una stazione attiva", "", "www.test.com/076");
    $scope.addConceptDescription("IEC Task", "IECTask", "Submodel contenente informazioni relative ai task conforme allo standard IEC61131-3", "", "www.test.com/077");
    $scope.addConceptDescription("Cyclic Interrupt", "CyclicInterrupt", "Collection element contenente informazioni relative ai task ciclici", "", "www.test.com/078");
    $scope.addConceptDescription("Property - OB Number", "OBnumber", "Intero indicante il numero dell'Organization Block (OB)", "", "www.test.com/079");
    $scope.addConceptDescription("Property - Priority", "Priority", "Intero indicante la priorità dell'Organization Block (OB)", "", "www.test.com/080");
    $scope.addConceptDescription("Property - Period", "Period", "Periodo dell'OB schedulazione d'orologio", "", "www.test.com/081");
    $scope.addConceptDescription("Elem. Collection - Hardware Interrupt", "HardwareInterrupt", "Collection element contenente informazioni relative ai task di interrupt hardware", "", "www.test.com/082");
    $scope.addConceptDescription("Property - Trigger Input Channel", "TriggerInputChannel", "Canale di input d'innesco", "", "www.test.com/083");

    $scope.addAAS("Multi Processing Station AAS", "1", "1", "Multi Processing Station AAS", "www.test.com/aas-mps/1.0", "http://www.test.com/536632", ["http://www.test.com/identification1", "http://www.test.com/configuration1", "http://www.test.com/gripper1", "http://www.test.com/oven1", "http://www.test.com/turntable1"]);
    $scope.addAAS("Vacuum Gripper AAS", "1", "1", "Vacuum Gripper AAS", "www.test.com/aas-vg/1.0", "http://www.test.com/536630", ["http://www.test.com/identification2", "http://www.test.com/configuration2", "http://www.test.com/gripper2"]);
    $scope.addAAS("Sorting Line AAS", "1", "1",  "Sorting Line AAS", "www.test.com/aas-sl/1.0", "http://www.test.com/536633", ["http://www.test.com/identification3", "http://www.test.com/configuration3", "http://www.test.com/sortingLine3"]);
    $scope.addAAS("Automated High Bay Warehouse AAS", "1", "1",  "Automated High Bay Warehouse AAS", "www.test.com/aas-ahbw/1.0", "http://www.test.com/536631", ["http://www.test.com/identification4", "http://www.test.com/configuration4", "http://www.test.com/ahbWarehouse4"]);
    $scope.addAAS("PLC AAS", "1", "1", "PLC AAS", "www.test.com/aas-plc/1.0", "http://www.test.com/PLC_1214C", ["http://www.test.com/identification5", "http://www.test.com/configuration5", "http://www.test.com/IO5", "http://www.test.com/IECConfiguration5", "http://www.test.com/IECResource5", "http://www.test.com/IECProgram5", "http://www.test.com/IECTask5", "http://www.test.com/IECCommunication5"]);

    $scope.addAsset("Multi Processing Station 536632", "1", "1", "Asset Multi Processing Station 536632", "TODO", "Fischertechnik", "http://www.test.com/datasheet/536632-Multi_Processing_Station_24V.pdf", "http://www.test.com/536632");
    $scope.addAsset("Vacuum Gripper 536630", "1", "1", "Asset Vacuum Gripper 536630", "TODO", "Fischertechnik", "http://www.test.com/datasheet/536630-Vacuum_Gripper_Robot_24V.pdf", "http://www.test.com/536630");
    $scope.addAsset("Sorting Line 536633", "1", "1", "Asset Sorting Line 536633", "TODO", "Fischertechnik", "http://www.test.com/datasheet/536633-Sortier_Line_24V.pdf", "http://www.test.com/536633");
    $scope.addAsset("Automated High Bay Warehouse Line 536631", "1", "1", "Asset Automated High Bay Warehouse 536631", "TODO", "Fischertechnik", "http://www.test.com/datasheet/536631-Automated_High-Bay_Warehouse_24V.pdf", "http://www.test.com/536631");
    $scope.addAsset("PLC 1214C DC/DC/DC", "1", "1", "PLC 1214C DC/DC/DC 6ES7214-1AG40-0XB0", "TODO", "Siemens", "http://www.test.com/datasheet/6ES72141AG400XB0_datasheet_en.pdf", "http://www.test.com/PLC_1214C");

    $scope.addSubmodel("Identification Type", "1", "1", "Identification", "http://www.test.com/identificationType");
    $scope.addSubmodel("Configuration Type", "1", "1", "Configuration", "http://www.test.com/configurationType");
    $scope.addSubmodel("Vacuum Gripper Oven Type", "1", "1", "VacuumGripperOven", "http://www.test.com/gripperType");
    $scope.addSubmodel("Vacuum Gripper Robot Type", "1", "1", "VacuumGripperRobot", "http://www.test.com/gripperRobotType");
    $scope.addSubmodel("Oven Type", "1", "1", "Oven", "http://www.test.com/ovenType");
    $scope.addSubmodel("Turntable Type", "1", "1", "Turntable", "http://www.test.com/turntableType");
    $scope.addSubmodel("Sorting Line Type", "1", "1", "SortingLine", "http://www.test.com/sortingLineType");
    $scope.addSubmodel("AHB Warehouse Type", "1", "1", "AHBWarehouse", "http://www.test.com/ahbWarehouseType");
    $scope.addSubmodel("IO Type", "1", "1", "IO", "http://www.test.com/IOType");
    $scope.addSubmodel("IO Module Type", "1", "1", "IOModule", "http://www.test.com/IOModuleType");
    $scope.addSubmodel("IEC Configuration Type", "1", "1", "IECConfiguration", "http://www.test.com/IECConfigurationType");
    $scope.addSubmodel("IEC Resource Type", "1", "1", "IECResource", "http://www.test.com/IECResourceType");
    $scope.addSubmodel("IEC Program Type", "1", "1", "IECProgram", "http://www.test.com/IECProgramType");
    $scope.addSubmodel("IEC Task Type", "1", "1", "IECTask", "http://www.test.com/IECTaskType");
    $scope.addSubmodel("IEC Communication Type", "1", "1", "IECCommunication", "http://www.test.com/IECCommunicationType");

});
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const _1 = require(".");
let xmlFiles = [_1.nodesets.standard_nodeset_file, _1.coreaasXmlFile];
let server = new _1.CoreServer({
    nodeset_filename: xmlFiles,
    port: 4848,
    serverCertificateManager: new _1.OPCUACertificateManager({
        automaticallyAcceptUnknownCertificate: true,
        rootFolder: path_1.default.join(__dirname, "../certs")
    })
});
function postInitialize() {
    const Identifier = server.coreaas.Identifier;
    const Key = server.coreaas.Key;
    let admin = server.coreaas.addAdministrativeInformation({
        version: "1",
        revision: "1"
    });
    /************************ AAS MultiProcessingStation  ************************/
    /** AAS */
    const aas_mps = server.coreaas.createAssetAdministrationShell(server, "AAS_MPS", admin, "Multi Processing Station AAS", "Multi Processing Station AAS", "www.test.com/aas-mps/1.0", "http://www.test.com/536632", ["http://www.test.com/identification1"]);
    /** Assets */
    server.coreaas.createAsset(server, "MultiProcessingStation536632", _1.Kind.Instance, "536632", "http://www.test.com/536632", "Asset Multi Processing Station 536632", "Asset Multi Processing Station 536632", aas_mps, "http://www.test.com/identification1");
    /** Submodels and Submodels elements TYPES */
    // Identification type
    const submodel_identification_type = server.coreaas.createSubmodel(server, "Identification Type", _1.Kind.Type, "Identification", "http://www.test.com/identificationType", _1.KeyElements.ConceptDescription, "http://www.test.com/001", aas_mps);
    const property_asn_type = server.coreaas.createSubmodelProperty(server, "Asset Serial Number Type", _1.Kind.Type, "AssetSerialNumber", [submodel_identification_type], _1.KeyElements.ConceptDescription, "www.test.com/002", _1.PropertyCategory.CONSTANT, _1.PropertyValueType.String, "String", _1.DataType.String, "");
    const property_manufacturer_type = server.coreaas.createSubmodelProperty(server, "Asset Manufacturer Type", _1.Kind.Type, "AssetManufacturer", [submodel_identification_type], _1.KeyElements.ConceptDescription, "www.test.com/005", _1.PropertyCategory.CONSTANT, _1.PropertyValueType.String, "String", _1.DataType.String, "");
    // Configuration type
    const submodel_configuration_type = server.coreaas.createSubmodel(server, "Configuration Type", _1.Kind.Type, "Configuration", "http://www.test.com/configurationType", _1.KeyElements.ConceptDescription, "http://www.test.com/003", aas_mps);
    const property_datasheet_type = server.coreaas.createSubmodelFile(server, "Data Sheet Type", _1.Kind.Type, "DataSheet", submodel_configuration_type, _1.KeyElements.ConceptDescription, "www.test.com/004", "", "");
    // VacuumGripperOven type
    const submodel_vacuum_gripper_oven_type = server.coreaas.createSubmodel(server, "Vacuum Gripper Oven Type", _1.Kind.Type, "VacuumGripperOven", "http://www.test.com/gripperType", _1.KeyElements.ConceptDescription, "http://www.test.com/006", aas_mps);
    const operation_pickup_type = server.coreaas.createSubmodelOperation(server, "Pick Up Type", _1.Kind.Type, "PickUp", submodel_vacuum_gripper_oven_type, _1.KeyElements.ConceptDescription, "www.test.com/007");
    const operation_setdown_type = server.coreaas.createSubmodelOperation(server, "Set Down Type", _1.Kind.Type, "SetDown", submodel_vacuum_gripper_oven_type, _1.KeyElements.ConceptDescription, "www.test.com/018");
    const opearation_move_type = server.coreaas.createSubmodelOperation(server, "Move Type", _1.Kind.Type, "Move", submodel_vacuum_gripper_oven_type, _1.KeyElements.ConceptDescription, "www.test.com/030");
    // Oven type
    const submodel_oven_type = server.coreaas.createSubmodel(server, "Oven Type", _1.Kind.Type, "Oven", "http://www.test.com/ovenType", _1.KeyElements.ConceptDescription, "http://www.test.com/008", aas_mps);
    const operation_burn_type = server.coreaas.createSubmodelOperation(server, "Burn Type", _1.Kind.Type, "Burn", submodel_oven_type, _1.KeyElements.ConceptDescription, "www.test.com/010");
    // Turntable type
    const submodel_turntable_type = server.coreaas.createSubmodel(server, "Turntable Type", _1.Kind.Type, "Turntable", "http://www.test.com/turntableType", _1.KeyElements.ConceptDescription, "http://www.test.com/011", aas_mps);
    const property_terminal_type = server.coreaas.createSubmodelProperty(server, "Terminal Type", _1.Kind.Type, "Terminal", [submodel_oven_type, submodel_vacuum_gripper_oven_type, submodel_turntable_type], _1.KeyElements.ConceptDescription, "www.test.com/009", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.Float, "Float", _1.DataType.Float, 0.0);
    const operation_turn_type = server.coreaas.createSubmodelOperation(server, "Turn Type", _1.Kind.Type, "Turn", submodel_turntable_type, _1.KeyElements.ConceptDescription, "www.test.com/031");
    const operation_activatesaw_type = server.coreaas.createSubmodelOperation(server, "Activate Saw Type", _1.Kind.Type, "ActivateSaw", submodel_turntable_type, _1.KeyElements.ConceptDescription, "www.test.com/013");
    const operation_ejection_type = server.coreaas.createSubmodelOperation(server, "Ejection Type", _1.Kind.Type, "Ejection", submodel_turntable_type, _1.KeyElements.ConceptDescription, "www.test.com/014");
    const operation_activatebelt_type = server.coreaas.createSubmodelOperation(server, "Activate Belt Type", _1.Kind.Type, "ActivateBelt", submodel_turntable_type, _1.KeyElements.ConceptDescription, "www.test.com/015");
    /** Submodels and Submodels elements INSTANCES */
    // Identification instance
    const submodel_identification_instance = server.coreaas.createSubmodel(server, "Identification Instance 1", _1.Kind.Instance, "Identification", "http://www.test.com/identification1", _1.KeyElements.Submodel, "http://www.test.com/identificationType", aas_mps);
    server.coreaas.createSubmodelProperty(server, "Asset Serial Number Instance 1", _1.Kind.Instance, "AssetSerialNumber", [submodel_identification_instance], _1.KeyElements.ConceptDescription, "", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.String, "String", _1.DataType.String, "TODO");
    server.coreaas.createSubmodelProperty(server, "Asset Manufacturer Instance 1", _1.Kind.Instance, "AssetManufacturer", [submodel_identification_instance], _1.KeyElements.ConceptDescription, "", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.String, "String", _1.DataType.String, "Fischertechnik");
    // Configuration instance
    const submodel_configuration_instance = server.coreaas.createSubmodel(server, "Configuration Instance 1", _1.Kind.Instance, "Configuration", "http://www.test.com/configuration1", _1.KeyElements.Submodel, "http://www.test.com/configurationType", aas_mps);
    server.coreaas.createSubmodelFile(server, "Data Sheet Instance 1", _1.Kind.Type, "DataSheet", submodel_configuration_instance, _1.KeyElements.ConceptDescription, "", "application/json", "https://drive.google.com/file/d/1AqBTlzL6ZXX9i17vkJZnzRUSE5FdJhD_/view?usp=sharing");
    // VacuumGripperOven instance
    const submodel_vacuum_gripper_oven_instance = server.coreaas.createSubmodel(server, "Vacuum Gripper Oven Instance", _1.Kind.Instance, "VacuumGripperOven", "http://www.test.com/gripper1", _1.KeyElements.Submodel, "http://www.test.com/gripperType", aas_mps);
    const property_terminal1a_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 1a", _1.Kind.Instance, "Terminal", [submodel_vacuum_gripper_oven_instance], _1.KeyElements.ConceptDescription, "www.test.com/040", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.Float, "Float", _1.DataType.Float, 0.0);
    server.coreaas.createSubmodelOperation(server, "Pick Up Instance 1", _1.Kind.Instance, "PickUp", submodel_vacuum_gripper_oven_instance, 0, "");
    server.coreaas.createSubmodelOperation(server, "Set Down Instance 1", _1.Kind.Instance, "SetDown", submodel_vacuum_gripper_oven_instance, 0, "");
    server.coreaas.createSubmodelOperation(server, "Move Instance 1", _1.Kind.Instance, "Move", submodel_vacuum_gripper_oven_instance, 0, "");
    // Oven instance
    const submodel_oven_instance = server.coreaas.createSubmodel(server, "Oven Instance", _1.Kind.Instance, "Oven", "http://www.test.com/oven1", _1.KeyElements.Submodel, "http://www.test.com/ovenType", aas_mps);
    const property_terminal1b_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 1b", _1.Kind.Instance, "Terminal", [submodel_oven_instance], _1.KeyElements.ConceptDescription, "www.test.com/041", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.Float, "Float", _1.DataType.Float, 0.0);
    server.coreaas.createSubmodelOperation(server, "Burn Instance 1", _1.Kind.Instance, "Burn", submodel_oven_instance, 0, "");
    // Turntable instance
    const submodel_turntable_instance = server.coreaas.createSubmodel(server, "Turntable Instance", _1.Kind.Instance, "Turntable", "http://www.test.com/turntable1", _1.KeyElements.Submodel, "http://www.test.com/turntableType", aas_mps);
    const property_terminal1c_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 1c", _1.Kind.Instance, "Terminal", [submodel_turntable_instance], _1.KeyElements.ConceptDescription, "www.test.com/017", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.Float, "Float", _1.DataType.Float, 0.0);
    server.coreaas.createSubmodelOperation(server, "Turn Instance 1", _1.Kind.Instance, "Turn", submodel_turntable_instance, 0, "");
    server.coreaas.createSubmodelOperation(server, "Activate Saw Instance 1", _1.Kind.Instance, "ActivateSaw", submodel_turntable_instance, 0, "");
    server.coreaas.createSubmodelOperation(server, "Ejection Instance 1", _1.Kind.Instance, "Ejection", submodel_turntable_instance, 0, "");
    server.coreaas.createSubmodelOperation(server, "Activate Belt Instance 1", _1.Kind.Instance, "ActivateBelt", submodel_turntable_instance, 0, "");
    /************************ Concept Dictionary  ************************/
    /** Add Dictionary */
    const conceptDictionary = server.coreaas.createConceptDictionary(server, [aas_mps], 98, "ConceptDictionary", "ConceptDictionary", "AAS Concept Dictionary", "AAS Concept Dictionary");
    /** Add ConceptDescriptions to the Dictionary */
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_identification_type], "identification", "identification", "submodel contenente informazioni sull'identificazione dell'asset", "", "www.test.com/001");
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_configuration_type], "configuration", "configuration", "submodel contenente informazioni sulla configurazione dell'asset", "", "www.test.com/001");
    /**
     * Start The OPC UA Server
     */
    server.start(function () {
        console.log("Server is now listening ... ( press CTRL+C to stop)");
        console.log("port ", server.endpoints[0].port);
        var endpointUrl = server.endpoints[0].endpointDescriptions()[0].endpointUrl;
        console.log(" the primary server endpoint url is ", endpointUrl);
    });
}
server.initialize(postInitialize);
//# sourceMappingURL=uaIndustryServer.js.map
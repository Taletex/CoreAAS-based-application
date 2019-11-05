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
    /** AAS Multi processing Station */
    const aas_mps = server.coreaas.createAssetAdministrationShell(server, "AAS_MPS", admin, "Multi Processing Station AAS", "Multi Processing Station AAS", "www.test.com/aas-mps/1.0", "http://www.test.com/536632", ["http://www.test.com/identification1"]);
    /** AAS Vacuum Gripper */
    const aas_vg = server.coreaas.createAssetAdministrationShell(server, "AAS_VG", admin, "Vacuum Gripper AAS", "Vacuum Gripper AAS", "www.test.com/aas-vg/1.0", "http://www.test.com/536630", ["http://www.test.com/identification2"]);
    /** AAS Sorting Line */
    const aas_sl = server.coreaas.createAssetAdministrationShell(server, "AAS_SL", admin, "Sorting Line AAS", "Sorting Line AAS", "www.test.com/aas-sl/1.0", "http://www.test.com/536633", ["http://www.test.com/identification3"]);
    /** AAS Automated High Bay Warehouse */
    const aas_ahbw = server.coreaas.createAssetAdministrationShell(server, "AAS_AHBW", admin, "Automated High Bay Warehouse AAS", "Automated High Bay Warehouse AAS", "www.test.com/aas-ahbw/1.0", "http://www.test.com/536631", ["http://www.test.com/identification4"]);
    /** MPS Assets */
    server.coreaas.createAsset(server, "Multi Processing Station 536632", _1.Kind.Instance, "536632", "http://www.test.com/536632", "Asset Multi Processing Station 536632", "Asset Multi Processing Station 536632", aas_mps, "http://www.test.com/identification1");
    /** VG Assets */
    server.coreaas.createAsset(server, "Vacuum Gripper 536630", _1.Kind.Instance, "536630", "http://www.test.com/536630", "Asset Vacuum Gripper 536630", "Asset Vacuum Gripper 536630", aas_vg, "http://www.test.com/identification2");
    /** SL Assets */
    server.coreaas.createAsset(server, "Sorting Line 536633", _1.Kind.Instance, "536633", "http://www.test.com/536633", "Asset Sorting Line 536633", "Asset Sorting Line 536633", aas_sl, "http://www.test.com/identification3");
    /** AHBW Assets */
    server.coreaas.createAsset(server, "Automated High Bay Warehouse Line 536631", _1.Kind.Instance, "536631", "http://www.test.com/536631", "Asset Automated High Bay Warehouse 536631", "Asset Automated High Bay Warehouse 536631", aas_ahbw, "http://www.test.com/identification4");
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
    const operation_move_type = server.coreaas.createSubmodelOperation(server, "Move Type", _1.Kind.Type, "Move", [submodel_vacuum_gripper_oven_type], _1.KeyElements.ConceptDescription, "www.test.com/030");
    // VacuumGripperRobot type
    const submodel_vacuum_gripper_robot_type = server.coreaas.createSubmodel(server, "Vacuum Gripper Robot Type", _1.Kind.Type, "VacuumGripperRobot", "http://www.test.com/gripperRobotType", _1.KeyElements.ConceptDescription, "http://www.test.com/006", aas_vg);
    const operation_move_robot_type = server.coreaas.createSubmodelOperation(server, "Move Robot Type", _1.Kind.Type, "Move", [submodel_vacuum_gripper_robot_type], _1.KeyElements.ConceptDescription, "www.test.com/029");
    // SharedGripperOperations type
    const operation_pickup_type = server.coreaas.createSubmodelOperation(server, "Pick Up Type", _1.Kind.Type, "PickUp", [submodel_vacuum_gripper_oven_type, submodel_vacuum_gripper_robot_type], _1.KeyElements.ConceptDescription, "www.test.com/007");
    const operation_setdown_type = server.coreaas.createSubmodelOperation(server, "Set Down Type", _1.Kind.Type, "SetDown", [submodel_vacuum_gripper_oven_type, submodel_vacuum_gripper_robot_type], _1.KeyElements.ConceptDescription, "www.test.com/018");
    // Oven type
    const submodel_oven_type = server.coreaas.createSubmodel(server, "Oven Type", _1.Kind.Type, "Oven", "http://www.test.com/ovenType", _1.KeyElements.ConceptDescription, "http://www.test.com/008", aas_mps);
    const operation_burn_type = server.coreaas.createSubmodelOperation(server, "Burn Type", _1.Kind.Type, "Burn", [submodel_oven_type], _1.KeyElements.ConceptDescription, "www.test.com/010");
    // Turntable type
    const submodel_turntable_type = server.coreaas.createSubmodel(server, "Turntable Type", _1.Kind.Type, "Turntable", "http://www.test.com/turntableType", _1.KeyElements.ConceptDescription, "http://www.test.com/011", aas_mps);
    const operation_turn_type = server.coreaas.createSubmodelOperation(server, "Turn Type", _1.Kind.Type, "Turn", [submodel_turntable_type], _1.KeyElements.ConceptDescription, "www.test.com/031");
    const operation_activatesaw_type = server.coreaas.createSubmodelOperation(server, "Activate Saw Type", _1.Kind.Type, "ActivateSaw", [submodel_turntable_type], _1.KeyElements.ConceptDescription, "www.test.com/013");
    const operation_ejection_type = server.coreaas.createSubmodelOperation(server, "Ejection Type", _1.Kind.Type, "Ejection", [submodel_turntable_type], _1.KeyElements.ConceptDescription, "www.test.com/014");
    // SortingLine Type
    const submodel_sortingline_type = server.coreaas.createSubmodel(server, "Sorting Line Type", _1.Kind.Type, "SortingLine", "http://www.test.com/sortingLineType", _1.KeyElements.ConceptDescription, "http://www.test.com/022", aas_sl);
    const operation_colordetection_type = server.coreaas.createSubmodelOperation(server, "Color Detection Type", _1.Kind.Type, "ColorDetection", [submodel_sortingline_type], _1.KeyElements.ConceptDescription, "www.test.com/023");
    const operation_slEjection_type = server.coreaas.createSubmodelOperation(server, "SL Ejection Type", _1.Kind.Type, "Ejection", [submodel_sortingline_type], _1.KeyElements.ConceptDescription, "www.test.com/024");
    // AHBWarehouse type
    const submodel_ahbwarehouse_type = server.coreaas.createSubmodel(server, "AHB Warehouse Type", _1.Kind.Type, "AHBWarehouse", "http://www.test.com/ahbWarehouseType", _1.KeyElements.ConceptDescription, "http://www.test.com/026", aas_ahbw);
    const operation_retrieving_type = server.coreaas.createSubmodelOperation(server, "Retrieving Type", _1.Kind.Type, "Retrieving", [submodel_ahbwarehouse_type], _1.KeyElements.ConceptDescription, "www.test.com/028");
    // SharedSubmodelElements type
    const property_terminal_type = server.coreaas.createSubmodelProperty(server, "Terminal Type", _1.Kind.Type, "Terminal", [submodel_oven_type, submodel_vacuum_gripper_oven_type, submodel_turntable_type, submodel_vacuum_gripper_robot_type, submodel_sortingline_type, submodel_ahbwarehouse_type], _1.KeyElements.ConceptDescription, "www.test.com/009", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.Float, "Float", _1.DataType.Float, 0.0);
    const operation_activatebelt_type = server.coreaas.createSubmodelOperation(server, "Activate Belt Type", _1.Kind.Type, "ActivateBelt", [submodel_turntable_type, submodel_sortingline_type], _1.KeyElements.ConceptDescription, "www.test.com/015");
    /** AAS_MPS Submodels and Submodels elements INSTANCES */
    // Identification instance
    const submodel_identification_instance1 = server.coreaas.createSubmodel(server, "Identification Instance 1", _1.Kind.Instance, "Identification", "http://www.test.com/identification1", _1.KeyElements.Submodel, "http://www.test.com/identificationType", aas_mps);
    server.coreaas.createSubmodelProperty(server, "Asset Serial Number Instance 1", _1.Kind.Instance, "AssetSerialNumber", [submodel_identification_instance1], _1.KeyElements.ConceptDescription, "", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.String, "String", _1.DataType.String, "TODO");
    server.coreaas.createSubmodelProperty(server, "Asset Manufacturer Instance 1", _1.Kind.Instance, "AssetManufacturer", [submodel_identification_instance1], _1.KeyElements.ConceptDescription, "", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.String, "String", _1.DataType.String, "Fischertechnik");
    // Configuration instance
    const submodel_configuration_instance1 = server.coreaas.createSubmodel(server, "Configuration Instance 1", _1.Kind.Instance, "Configuration", "http://www.test.com/configuration1", _1.KeyElements.Submodel, "http://www.test.com/configurationType", aas_mps);
    server.coreaas.createSubmodelFile(server, "Data Sheet Instance 1", _1.Kind.Type, "DataSheet", submodel_configuration_instance1, _1.KeyElements.ConceptDescription, "", "application/json", "https://drive.google.com/file/d/1AqBTlzL6ZXX9i17vkJZnzRUSE5FdJhD_/view?usp=sharing");
    // VacuumGripperOven instance
    const submodel_vacuum_gripper_oven_instance = server.coreaas.createSubmodel(server, "Vacuum Gripper Oven Instance 1", _1.Kind.Instance, "VacuumGripperOven", "http://www.test.com/gripper1", _1.KeyElements.Submodel, "http://www.test.com/gripperType", aas_mps);
    const property_terminal1a_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 1a (Switch)", _1.Kind.Instance, "Terminal-SwitchTurntable", [submodel_vacuum_gripper_oven_instance], _1.KeyElements.ConceptDescription, "www.test.com/040", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.Float, "Float", _1.DataType.Float, 0.0);
    server.coreaas.createSubmodelOperation(server, "Pick Up Instance 1", _1.Kind.Instance, "PickUp", [submodel_vacuum_gripper_oven_instance], 0, "");
    server.coreaas.createSubmodelOperation(server, "Set Down Instance 1", _1.Kind.Instance, "SetDown", [submodel_vacuum_gripper_oven_instance], 0, "");
    server.coreaas.createSubmodelOperation(server, "Move Instance 1", _1.Kind.Instance, "Move", [submodel_vacuum_gripper_oven_instance], 0, "");
    // Oven instance
    const submodel_oven_instance = server.coreaas.createSubmodel(server, "Oven Instance 1", _1.Kind.Instance, "Oven", "http://www.test.com/oven1", _1.KeyElements.Submodel, "http://www.test.com/ovenType", aas_mps);
    const property_terminal1b_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 1b (Light barrier)", _1.Kind.Instance, "Terminal-LightBarrierOven", [submodel_oven_instance], _1.KeyElements.ConceptDescription, "www.test.com/041", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.Float, "Float", _1.DataType.Float, 0.0);
    server.coreaas.createSubmodelOperation(server, "Burn Instance 1", _1.Kind.Instance, "Burn", [submodel_oven_instance], 0, "");
    // Turntable instance
    const submodel_turntable_instance = server.coreaas.createSubmodel(server, "Turntable Instance 1", _1.Kind.Instance, "Turntable", "http://www.test.com/turntable1", _1.KeyElements.Submodel, "http://www.test.com/turntableType", aas_mps);
    const property_terminal1c_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 1c (Motor)", _1.Kind.Instance, "Terminal-MotorTurntable", [submodel_turntable_instance], _1.KeyElements.ConceptDescription, "www.test.com/017", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.Float, "Float", _1.DataType.Float, 0.0);
    server.coreaas.createSubmodelOperation(server, "Turn Instance 1", _1.Kind.Instance, "Turn", [submodel_turntable_instance], 0, "");
    server.coreaas.createSubmodelOperation(server, "Activate Saw Instance 1", _1.Kind.Instance, "ActivateSaw", [submodel_turntable_instance], 0, "");
    server.coreaas.createSubmodelOperation(server, "Ejection Instance 1", _1.Kind.Instance, "Ejection", [submodel_turntable_instance], 0, "");
    server.coreaas.createSubmodelOperation(server, "Activate Belt Instance 1", _1.Kind.Instance, "ActivateBelt", [submodel_turntable_instance], 0, "");
    /** AAS_VG Submodels and Submodels elements INSTANCES */
    // Identification instance
    const submodel_identification_instance2 = server.coreaas.createSubmodel(server, "Identification Instance 2", _1.Kind.Instance, "Identification", "http://www.test.com/identification2", _1.KeyElements.Submodel, "http://www.test.com/identificationType", aas_vg);
    server.coreaas.createSubmodelProperty(server, "Asset Serial Number Instance 2", _1.Kind.Instance, "AssetSerialNumber", [submodel_identification_instance2], _1.KeyElements.ConceptDescription, "", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.String, "String", _1.DataType.String, "TODO");
    server.coreaas.createSubmodelProperty(server, "Asset Manufacturer Instance 2", _1.Kind.Instance, "AssetManufacturer", [submodel_identification_instance2], _1.KeyElements.ConceptDescription, "", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.String, "String", _1.DataType.String, "Fischertechnik");
    // Configuration instance
    const submodel_configuration_instance2 = server.coreaas.createSubmodel(server, "Configuration Instance 2", _1.Kind.Instance, "Configuration", "http://www.test.com/configuration2", _1.KeyElements.Submodel, "http://www.test.com/configurationType", aas_vg);
    server.coreaas.createSubmodelFile(server, "Data Sheet Instance 2", _1.Kind.Type, "DataSheet", submodel_configuration_instance2, _1.KeyElements.ConceptDescription, "", "application/json", "https://drive.google.com/file/d/15k3wBcavtV-Tv5XV1fIkxuhFM9Y4GE0G/view?usp=sharing");
    // VacuumGripperRobot instance
    const submodel_vacuum_gripper_robot_instance = server.coreaas.createSubmodel(server, "Vacuum Gripper Robot Instance 1", _1.Kind.Instance, "VacuumGripper", "http://www.test.com/vacuumGripper2", _1.KeyElements.Submodel, "http://www.test.com/gripperRobotType", aas_vg);
    const property_terminal2a_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 2a (Switch)", _1.Kind.Instance, "Terminal-SwitchVerticalAxis", [submodel_vacuum_gripper_robot_instance], _1.KeyElements.ConceptDescription, "www.test.com/040", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.Float, "Float", _1.DataType.Float, 0.0);
    const property_terminal2b_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 2b (Switch)", _1.Kind.Instance, "Terminal-SwitchHorizontalAxis", [submodel_vacuum_gripper_robot_instance], _1.KeyElements.ConceptDescription, "www.test.com/040", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.Float, "Float", _1.DataType.Float, 0.0);
    const property_terminal2c_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 2c (Switch)", _1.Kind.Instance, "Terminal-SwitchRotate", [submodel_vacuum_gripper_robot_instance], _1.KeyElements.ConceptDescription, "www.test.com/040", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.Float, "Float", _1.DataType.Float, 0.0);
    server.coreaas.createSubmodelOperation(server, "Pick Up Instance 2", _1.Kind.Instance, "PickUp", [submodel_vacuum_gripper_robot_instance], 0, "");
    server.coreaas.createSubmodelOperation(server, "Set Down Instance 2", _1.Kind.Instance, "SetDown", [submodel_vacuum_gripper_robot_instance], 0, "");
    server.coreaas.createSubmodelOperation(server, "Move Instance 2", _1.Kind.Instance, "Move", [submodel_vacuum_gripper_robot_instance], 0, "");
    /** AAS_SL Submodels and Submodels elements INSTANCES */
    // Identification instance
    const submodel_identification_instance3 = server.coreaas.createSubmodel(server, "Identification Instance 3", _1.Kind.Instance, "Identification", "http://www.test.com/identification3", _1.KeyElements.Submodel, "http://www.test.com/identificationType", aas_vg);
    server.coreaas.createSubmodelProperty(server, "Asset Serial Number Instance 3", _1.Kind.Instance, "AssetSerialNumber", [submodel_identification_instance3], _1.KeyElements.ConceptDescription, "", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.String, "String", _1.DataType.String, "TODO");
    server.coreaas.createSubmodelProperty(server, "Asset Manufacturer Instance 3", _1.Kind.Instance, "AssetManufacturer", [submodel_identification_instance3], _1.KeyElements.ConceptDescription, "", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.String, "String", _1.DataType.String, "Fischertechnik");
    // Configuration instance
    const submodel_configuration_instance3 = server.coreaas.createSubmodel(server, "Configuration Instance 3", _1.Kind.Instance, "Configuration", "http://www.test.com/configuration3", _1.KeyElements.Submodel, "http://www.test.com/configurationType", aas_sl);
    server.coreaas.createSubmodelFile(server, "Data Sheet Instance 3", _1.Kind.Type, "DataSheet", submodel_configuration_instance3, _1.KeyElements.ConceptDescription, "", "application/json", "https://drive.google.com/file/d/1R1_fr89RpPtwMJJWcaD7VPIlgBBb-I82/view?usp=sharing");
    // Sorting Line instance
    const submodel_sortingline_instance = server.coreaas.createSubmodel(server, "Sorting Line Instance 1", _1.Kind.Instance, "SortingLine", "http://www.test.com/sortingLine1", _1.KeyElements.Submodel, "http://www.test.com/sortingLineType", aas_sl);
    const property_terminal3a_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 3a (Motor)", _1.Kind.Instance, "Terminal-MotorConveyorBelt", [submodel_sortingline_instance], _1.KeyElements.ConceptDescription, "www.test.com/017", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.Float, "Float", _1.DataType.Float, 0.0);
    const property_terminal3b_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 3b (Light barrier)", _1.Kind.Instance, "Terminal-LightBarrierBlue", [submodel_sortingline_instance], _1.KeyElements.ConceptDescription, "www.test.com/041", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.Float, "Float", _1.DataType.Float, 0.0);
    server.coreaas.createSubmodelOperation(server, "Activate Belt Instance 3", _1.Kind.Instance, "ActivateBelt", [submodel_sortingline_instance], 0, "");
    server.coreaas.createSubmodelOperation(server, "Colour Detection Instance 3", _1.Kind.Instance, "ColourDetection", [submodel_sortingline_instance], 0, "");
    server.coreaas.createSubmodelOperation(server, "Ejection Instance 3", _1.Kind.Instance, "Ejection", [submodel_sortingline_instance], 0, "");
    /** AAS_AHBW Submodels and Submodels elements INSTANCES */
    // Identification instance
    const submodel_identification_instance4 = server.coreaas.createSubmodel(server, "Identification Instance 4", _1.Kind.Instance, "Identification", "http://www.test.com/identification4", _1.KeyElements.Submodel, "http://www.test.com/identificationType", aas_ahbw);
    server.coreaas.createSubmodelProperty(server, "Asset Serial Number Instance 4", _1.Kind.Instance, "AssetSerialNumber", [submodel_identification_instance4], _1.KeyElements.ConceptDescription, "", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.String, "String", _1.DataType.String, "TODO");
    server.coreaas.createSubmodelProperty(server, "Asset Manufacturer Instance 4", _1.Kind.Instance, "AssetManufacturer", [submodel_identification_instance4], _1.KeyElements.ConceptDescription, "", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.String, "String", _1.DataType.String, "Fischertechnik");
    // Configuration instance
    const submodel_configuration_instance4 = server.coreaas.createSubmodel(server, "Configuration Instance 4", _1.Kind.Instance, "Configuration", "http://www.test.com/configuration4", _1.KeyElements.Submodel, "http://www.test.com/configurationType", aas_ahbw);
    server.coreaas.createSubmodelFile(server, "Data Sheet Instance 4", _1.Kind.Type, "DataSheet", submodel_configuration_instance4, _1.KeyElements.ConceptDescription, "", "application/json", "https://drive.google.com/file/d/15k3wBcavtV-Tv5XV1fIkxuhFM9Y4GE0G/view?usp=sharing");
    // Sorting Line instance
    const submodel_ahbwarehouse_instance = server.coreaas.createSubmodel(server, "AHB Warehouse Instance 1", _1.Kind.Instance, "AHBWarehouse", "http://www.test.com/ahbWarehouse4", _1.KeyElements.Submodel, "http://www.test.com/ahbWarehouseType", aas_ahbw);
    const property_terminal4a_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 4a (Switch)", _1.Kind.Instance, "Terminal-SwitchHorizontalAxis", [submodel_ahbwarehouse_instance], _1.KeyElements.ConceptDescription, "www.test.com/040", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.Float, "Float", _1.DataType.Float, 0.0);
    const property_terminal4b_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 4b (Switch)", _1.Kind.Instance, "Terminal-SwitchVerticalAxis", [submodel_ahbwarehouse_instance], _1.KeyElements.ConceptDescription, "www.test.com/040", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.Float, "Float", _1.DataType.Float, 0.0);
    const property_terminal4c_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 4c (Motor)", _1.Kind.Instance, "Terminal-MotorConveyorBelt", [submodel_ahbwarehouse_instance], _1.KeyElements.ConceptDescription, "www.test.com/017", _1.PropertyCategory.VARIABLE, _1.PropertyValueType.Float, "Float", _1.DataType.Float, 0.0);
    server.coreaas.createSubmodelOperation(server, "Retrieving Instance 4", _1.Kind.Instance, "Retrieving", [submodel_ahbwarehouse_instance], 0, "");
    /************************ Concept Dictionary  ************************/
    /** Add Dictionary */
    const conceptDictionary = server.coreaas.createConceptDictionary(server, [aas_mps], 98, "ConceptDictionary", "ConceptDictionary", "AAS Concept Dictionary", "AAS Concept Dictionary");
    /** Add ConceptDescriptions to the Dictionary */
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_identification_type], "Identification", "Identification", "Submodel contenente informazioni sull'identificazione dell'asset", "", "www.test.com/001");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_asn_type], "Asset serial number", "Asset serial number", "Numero seriale dell'asset", "", "www.test.com/002");
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_configuration_type], "Configuration", "Configuration", "Submodel contenente informazioni sulla configurazione dell'asset", "", "www.test.com/003");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_datasheet_type], "Datasheet", "Datasheet", "File contenente il datasheet dell'asset", "", "www.test.com/004");
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_vacuum_gripper_oven_type, submodel_vacuum_gripper_robot_type], "Vacuum Gripper", "Vacuum Gripper", "Elemento responsabile dello spostamento dei blocchi di produzione", "", "www.test.com/006");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_pickup_type], "Pick Up", "Pick Up", "Operazione di sollevamento del blocco di produzione per effettuarne lo spostamento", "", "www.test.com/007");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_setdown_type], "Set Down", "Set Down", "Operazione di rilascio del blocco di produzione per effettuarne lo spostamento", "", "www.test.com/018");
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_oven_type], "Oven", "Oven", "Forno per il processamento dei blocchi di produzione", "", "www.test.com/008");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_burn_type], "Burn", "Burn", "Operazione di accensione del forno", "", "www.test.com/010");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_move_type], "Move", "Move", "Operazione di spostamento del braccio del vacuum gripper dalla posizione iniziale a quella finale", "", "www.test.com/030");
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_turntable_type], "Turntable", "Turntable", "Elemento preposto alla rotazione dei blocchi di produzione", "", "www.test.com/011");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_activatebelt_type], "Activate Belt", "Activate Belt", "Operazione di abilitazione del nastro trasportatore per lo spostamento dei blocchi di produzione", "", "www.test.com/015");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_activatesaw_type], "Activate Saw", "Activate Saw", "Operazione di attivazione della sega circolare per la lavorazione del blocco di produzione", "", "www.test.com/013");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_ejection_type], "Ejection", "Ejection", "Operazione di emissione del blocco di produzione dalla turntable al nastro trasportatore", "", "www.test.com/014");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_turn_type], "Turn", "Turn", "Operazione di rotazione della turntable per portare il blocco in prossimità della sega", "", "www.test.com/031");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_manufacturer_type], "Asset Manufacturer", "Asset Manufacturer", "Produttore dell'asset", "", "www.test.com/005");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_terminal_type], "Terminal", "Terminal", "Terminale di input o output", "V", "www.test.com/009");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_terminal1c_instance, property_terminal3a_instance, property_terminal4c_instance], "Motor Terminal", "Motor Terminal", "Terminale relativo ad un motorino elettrico", "V", "www.test.com/017");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_terminal1a_instance, property_terminal2a_instance, property_terminal2b_instance, property_terminal2c_instance, property_terminal4a_instance, property_terminal4b_instance], "Switch Terminal", "Switch Terminal", "Terminale relativo ad uno switch", "V", "www.test.com/040");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_terminal1b_instance, property_terminal3b_instance], "Light barrier Terminal", "Light barrier Terminal", "Terminale relativo ad un sensore luminoso", "V", "www.test.com/041");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_move_robot_type], "Move", "Move", "Operazione di spostamento del braccio del vacuum gripper. Prende in input le coordinate di destinazione (x,y,z)", "", "www.test.com/029");
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_sortingline_type], "Sorting Line", "Sorting Line", "Elemento responsabile del riconoscimento del colore dei blocchi di produzione e del loro smistamento nei rispettivi magazzini", "", "www.test.com/022");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_colordetection_type], "Color Detection", "Color Detection", "Operazione di riconoscimento del colore del blocco di produzione", "", "www.test.com/023");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_slEjection_type], "Ejection", "Ejection", "Operazione di espulsione di un blocco di produzione verso un magazzino", "", "www.test.com/024");
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_ahbwarehouse_type], "AHBWarehouse", "AHBWarehouse", "Submodel per la gestione dei pezzi nel magazzino", "", "www.test.com/026");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_retrieving_type], "Retrieving", "Retrieving", "Operazione di recupero di un blocco di produzione dal magazzino", "", "www.test.com/028");
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
import path from "path";
import { coreaasXmlFile, OPCUACertificateManager, nodesets, LocalizedText, CoreServer, IdentifierType, Kind, KeyType, KeyElements, PropertyCategory, PropertyValueType, Variant, DataType } from ".";

let xmlFiles = [nodesets.standard_nodeset_file, coreaasXmlFile]

let server = new CoreServer({
    nodeset_filename: xmlFiles,
    port: 4848,
    serverCertificateManager: new OPCUACertificateManager({ 
        automaticallyAcceptUnknownCertificate: true,
        rootFolder: path.join(__dirname, "../certs")
    })
})

function postInitialize() {

    const Identifier = server.coreaas.Identifier;
    const Key = server.coreaas.Key;

    let admin = server.coreaas.addAdministrativeInformation({
        version: "1",
        revision: "1"
    });
    

    /** AAS Multi processing Station */
    const aas_mps = server.coreaas.createAssetAdministrationShell(server, "AAS_MPS", admin, "Multi Processing Station AAS", "Multi Processing Station AAS", "www.test.com/aas-mps/1.0", "http://www.test.com/536632", ["http://www.test.com/identification1", "http://www.test.com/configuration1", "http://www.test.com/gripper1", "http://www.test.com/oven1", "http://www.test.com/turntable1"]);
    /** AAS Vacuum Gripper */
    const aas_vg = server.coreaas.createAssetAdministrationShell(server, "AAS_VG", admin, "Vacuum Gripper AAS", "Vacuum Gripper AAS", "www.test.com/aas-vg/1.0", "http://www.test.com/536630", ["http://www.test.com/identification2", "http://www.test.com/configuration2", "http://www.test.com/gripper2"]);
    /** AAS Sorting Line */
    const aas_sl = server.coreaas.createAssetAdministrationShell(server, "AAS_SL", admin, "Sorting Line AAS", "Sorting Line AAS", "www.test.com/aas-sl/1.0", "http://www.test.com/536633", ["http://www.test.com/identification3", "http://www.test.com/configuration3", "http://www.test.com/sortingLine3"]);
    /** AAS Automated High Bay Warehouse */
    const aas_ahbw = server.coreaas.createAssetAdministrationShell(server, "AAS_AHBW", admin, "Automated High Bay Warehouse AAS", "Automated High Bay Warehouse AAS", "www.test.com/aas-ahbw/1.0", "http://www.test.com/536631", ["http://www.test.com/identification4", "http://www.test.com/configuration4", "http://www.test.com/ahbWarehouse4"]);
    /** AAS PLC */
    const aas_plc = server.coreaas.createAssetAdministrationShell(server, "AAS_PLC", admin, "PLC AAS", "PLC AAS", "www.test.com/aas-plc/1.0", "http://www.test.com/PLC_1214C", ["http://www.test.com/identification5", "http://www.test.com/configuration5", "http://www.test.com/IO5", "http://www.test.com/IECConfiguration5", "http://www.test.com/IECResource5", "http://www.test.com/IECProgram5", "http://www.test.com/IECTask5", "http://www.test.com/IECCommunication5"]);
    

    /** MPS Asset */
    server.coreaas.createAsset(server, "Multi Processing Station 536632", Kind.Instance, "536632", "http://www.test.com/536632", "Asset Multi Processing Station 536632", "Asset Multi Processing Station 536632", aas_mps, "http://www.test.com/identification1");
    /** VG Asset */
    server.coreaas.createAsset(server, "Vacuum Gripper 536630", Kind.Instance, "536630", "http://www.test.com/536630", "Asset Vacuum Gripper 536630", "Asset Vacuum Gripper 536630", aas_vg, "http://www.test.com/identification2");
    /** SL Asset */
    server.coreaas.createAsset(server, "Sorting Line 536633", Kind.Instance, "536633", "http://www.test.com/536633", "Asset Sorting Line 536633", "Asset Sorting Line 536633", aas_sl, "http://www.test.com/identification3");
    /** AHBW Asset */
    server.coreaas.createAsset(server, "Automated High Bay Warehouse Line 536631", Kind.Instance, "536631", "http://www.test.com/536631", "Asset Automated High Bay Warehouse 536631", "Asset Automated High Bay Warehouse 536631", aas_ahbw, "http://www.test.com/identification4");
    /** PLC Asset */
    server.coreaas.createAsset(server, "PLC 1214C DC/DC/DC", Kind.Instance, "PLC_1214C", "http://www.test.com/PLC_1214C", "PLC 1214C DC/DC/DC", "PLC 1214C DC/DC/DC", aas_plc, "http://www.test.com/identification5");

    
    /** Submodels and Submodels elements TYPES */
    // Identification type
    const submodel_identification_type = server.coreaas.createSubmodel(server, "Identification Type", Kind.Type, "Identification", "http://www.test.com/identificationType", KeyElements.ConceptDescription, "http://www.test.com/001", aas_mps);
    const property_asn_type = server.coreaas.createSubmodelProperty(server, "Asset Serial Number Type", Kind.Type, "AssetSerialNumber", [submodel_identification_type], KeyElements.ConceptDescription, "www.test.com/002", PropertyCategory.CONSTANT, PropertyValueType.String, "String", DataType.String, ""); 
    const property_manufacturer_type = server.coreaas.createSubmodelProperty(server, "Asset Manufacturer Type", Kind.Type, "AssetManufacturer", [submodel_identification_type], KeyElements.ConceptDescription, "www.test.com/005", PropertyCategory.CONSTANT, PropertyValueType.String, "String", DataType.String, ""); 
    
    // Configuration type
    const submodel_configuration_type = server.coreaas.createSubmodel(server, "Configuration Type", Kind.Type, "Configuration", "http://www.test.com/configurationType", KeyElements.ConceptDescription, "http://www.test.com/003", aas_mps);
    const property_datasheet_type = server.coreaas.createSubmodelFile(server, "Data Sheet Type", Kind.Type, "DataSheet", submodel_configuration_type, KeyElements.ConceptDescription, "www.test.com/004", "", ""); 
        
    // VacuumGripperOven type
    const submodel_vacuum_gripper_oven_type = server.coreaas.createSubmodel(server, "Vacuum Gripper Oven Type", Kind.Type, "VacuumGripperOven", "http://www.test.com/gripperType", KeyElements.ConceptDescription, "http://www.test.com/006", aas_mps);
    const operation_move_type = server.coreaas.createSubmodelOperation(server, "Move Type", Kind.Type, "Move", [submodel_vacuum_gripper_oven_type], KeyElements.ConceptDescription, "www.test.com/030"); 
    
    // VacuumGripperRobot type
    const submodel_vacuum_gripper_robot_type = server.coreaas.createSubmodel(server, "Vacuum Gripper Robot Type", Kind.Type, "VacuumGripperRobot", "http://www.test.com/gripperRobotType", KeyElements.ConceptDescription, "http://www.test.com/006", aas_vg);
    const operation_move_robot_type = server.coreaas.createSubmodelOperation(server, "Move Robot Type", Kind.Type, "Move", [submodel_vacuum_gripper_robot_type], KeyElements.ConceptDescription, "www.test.com/029"); 
    
    // SharedGripperOperations type
    const operation_pickup_type = server.coreaas.createSubmodelOperation(server, "Pick Up Type", Kind.Type, "PickUp", [submodel_vacuum_gripper_oven_type, submodel_vacuum_gripper_robot_type], KeyElements.ConceptDescription, "www.test.com/007"); 
    const operation_setdown_type = server.coreaas.createSubmodelOperation(server, "Set Down Type", Kind.Type, "SetDown", [submodel_vacuum_gripper_oven_type, submodel_vacuum_gripper_robot_type], KeyElements.ConceptDescription, "www.test.com/018"); 

    // Oven type
    const submodel_oven_type = server.coreaas.createSubmodel(server, "Oven Type", Kind.Type, "Oven", "http://www.test.com/ovenType", KeyElements.ConceptDescription, "http://www.test.com/008", aas_mps);
    const operation_burn_type = server.coreaas.createSubmodelOperation(server, "Burn Type", Kind.Type, "Burn", [submodel_oven_type], KeyElements.ConceptDescription, "www.test.com/010"); 

    // Turntable type
    const submodel_turntable_type = server.coreaas.createSubmodel(server, "Turntable Type", Kind.Type, "Turntable", "http://www.test.com/turntableType", KeyElements.ConceptDescription, "http://www.test.com/011", aas_mps);
    const operation_turn_type = server.coreaas.createSubmodelOperation(server, "Turn Type", Kind.Type, "Turn", [submodel_turntable_type], KeyElements.ConceptDescription, "www.test.com/031"); 
    const operation_activatesaw_type = server.coreaas.createSubmodelOperation(server, "Activate Saw Type", Kind.Type, "ActivateSaw", [submodel_turntable_type], KeyElements.ConceptDescription, "www.test.com/013"); 
    const operation_ejection_type = server.coreaas.createSubmodelOperation(server, "Ejection Type", Kind.Type, "Ejection", [submodel_turntable_type], KeyElements.ConceptDescription, "www.test.com/014"); 

    // SortingLine Type
    const submodel_sortingline_type = server.coreaas.createSubmodel(server, "Sorting Line Type", Kind.Type, "SortingLine", "http://www.test.com/sortingLineType", KeyElements.ConceptDescription, "http://www.test.com/022", aas_sl);
    const operation_colordetection_type = server.coreaas.createSubmodelOperation(server, "Color Detection Type", Kind.Type, "ColorDetection", [submodel_sortingline_type], KeyElements.ConceptDescription, "www.test.com/023"); 
    const operation_slEjection_type = server.coreaas.createSubmodelOperation(server, "SL Ejection Type", Kind.Type, "Ejection", [submodel_sortingline_type], KeyElements.ConceptDescription, "www.test.com/024"); 
    
    // AHBWarehouse type
    const submodel_ahbwarehouse_type = server.coreaas.createSubmodel(server, "AHB Warehouse Type", Kind.Type, "AHBWarehouse", "http://www.test.com/ahbWarehouseType", KeyElements.ConceptDescription, "http://www.test.com/026", aas_ahbw);
    const operation_retrieving_type = server.coreaas.createSubmodelOperation(server, "Retrieving Type", Kind.Type, "Retrieving", [submodel_ahbwarehouse_type], KeyElements.ConceptDescription, "www.test.com/028"); 

    // PLC IO type
    const submodel_IO_type = server.coreaas.createSubmodel(server, "IO Type", Kind.Type, "IO", "http://www.test.com/IOType", KeyElements.ConceptDescription, "http://www.test.com/012", aas_plc);
    
    // PLC IOModule type
    const submodel_IOModule_type = server.coreaas.createSubmodel(server, "IO Module Type", Kind.Type, "IOModule", "http://www.test.com/IOModuleType", KeyElements.ConceptDescription, "http://www.test.com/053", aas_plc);
    
    // PLC IEC Configuration type
    const submodel_IECConfiguration_type = server.coreaas.createSubmodel(server, "IEC Configuration Type", Kind.Type, "IECConfiguration", "http://www.test.com/IECConfigurationType", KeyElements.ConceptDescription, "http://www.test.com/056", aas_plc);
    const property_name_type = server.coreaas.createSubmodelProperty(server, "Configuration Name Type", Kind.Type, "Name", [submodel_IECConfiguration_type], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, ""); 
    const property_resourcenumber_type = server.coreaas.createSubmodelProperty(server, "Configuration Resource Number Type", Kind.Type, "ResourceNumber", [submodel_IECConfiguration_type], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.Int, "Int16", DataType.Int16, 0); 

    // SharedSubmodelElements type
    const property_terminal_type = server.coreaas.createSubmodelProperty(server, "Terminal Type", Kind.Type, "Terminal", [submodel_oven_type, submodel_vacuum_gripper_oven_type, submodel_turntable_type, submodel_vacuum_gripper_robot_type, submodel_sortingline_type, submodel_ahbwarehouse_type, submodel_IO_type, submodel_IOModule_type], KeyElements.ConceptDescription, "www.test.com/009", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0); 
    const operation_activatebelt_type = server.coreaas.createSubmodelOperation(server, "Activate Belt Type", Kind.Type, "ActivateBelt", [submodel_turntable_type, submodel_sortingline_type], KeyElements.ConceptDescription, "www.test.com/015"); 


    /** AAS_MPS Submodels and Submodels elements INSTANCES */
    // Identification instance
    const submodel_identification_instance1 = server.coreaas.createSubmodel(server, "Identification Instance 1", Kind.Instance, "Identification", "http://www.test.com/identification1", KeyElements.Submodel, "http://www.test.com/identificationType", aas_mps);
    server.coreaas.createSubmodelProperty(server, "Asset Serial Number Instance 1", Kind.Instance, "AssetSerialNumber", [submodel_identification_instance1], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "TODO"); 
    server.coreaas.createSubmodelProperty(server, "Asset Manufacturer Instance 1", Kind.Instance, "AssetManufacturer", [submodel_identification_instance1], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "Fischertechnik"); 
    
    // Configuration instance
    const submodel_configuration_instance1 = server.coreaas.createSubmodel(server, "Configuration Instance 1", Kind.Instance, "Configuration", "http://www.test.com/configuration1", KeyElements.Submodel, "http://www.test.com/configurationType", aas_mps);
    server.coreaas.createSubmodelFile(server, "Data Sheet Instance 1", Kind.Type, "DataSheet", submodel_configuration_instance1, KeyElements.ConceptDescription, "", "application/json", "https://drive.google.com/file/d/1AqBTlzL6ZXX9i17vkJZnzRUSE5FdJhD_/view?usp=sharing"); 
    
    // VacuumGripperOven instance
    const submodel_vacuum_gripper_oven_instance = server.coreaas.createSubmodel(server, "Vacuum Gripper Oven Instance 1", Kind.Instance, "VacuumGripperOven", "http://www.test.com/gripper1", KeyElements.Submodel, "http://www.test.com/gripperType", aas_mps);
    const property_terminal1a_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 1a (Switch)", Kind.Instance, "Terminal-SwitchTurntable", [submodel_vacuum_gripper_oven_instance], KeyElements.ConceptDescription, "www.test.com/040", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0); 
    server.coreaas.createSubmodelOperation(server, "Pick Up Instance 1", Kind.Instance, "PickUp", [submodel_vacuum_gripper_oven_instance], 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Set Down Instance 1", Kind.Instance, "SetDown", [submodel_vacuum_gripper_oven_instance], 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Move Instance 1", Kind.Instance, "Move", [submodel_vacuum_gripper_oven_instance], 0, ""); 
    
    // Oven instance
    const submodel_oven_instance = server.coreaas.createSubmodel(server, "Oven Instance 1", Kind.Instance, "Oven", "http://www.test.com/oven1", KeyElements.Submodel, "http://www.test.com/ovenType", aas_mps);
    const property_terminal1b_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 1b (Light barrier)", Kind.Instance, "Terminal-LightBarrierOven", [submodel_oven_instance], KeyElements.ConceptDescription, "www.test.com/041", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0); 
    server.coreaas.createSubmodelOperation(server, "Burn Instance 1", Kind.Instance, "Burn", [submodel_oven_instance], 0, ""); 

    // Turntable instance
    const submodel_turntable_instance = server.coreaas.createSubmodel(server, "Turntable Instance 1", Kind.Instance, "Turntable", "http://www.test.com/turntable1", KeyElements.Submodel, "http://www.test.com/turntableType", aas_mps);
    const property_terminal1c_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 1c (Motor)", Kind.Instance, "Terminal-MotorTurntable", [submodel_turntable_instance], KeyElements.ConceptDescription, "www.test.com/017", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0); 
    server.coreaas.createSubmodelOperation(server, "Turn Instance 1", Kind.Instance, "Turn", [submodel_turntable_instance], 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Activate Saw Instance 1", Kind.Instance, "ActivateSaw", [submodel_turntable_instance], 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Ejection Instance 1", Kind.Instance, "Ejection", [submodel_turntable_instance], 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Activate Belt Instance 1", Kind.Instance, "ActivateBelt", [submodel_turntable_instance], 0, ""); 
    
    /** AAS_VG Submodels and Submodels elements INSTANCES */
    // Identification instance
    const submodel_identification_instance2 = server.coreaas.createSubmodel(server, "Identification Instance 2", Kind.Instance, "Identification", "http://www.test.com/identification2", KeyElements.Submodel, "http://www.test.com/identificationType", aas_vg);
    server.coreaas.createSubmodelProperty(server, "Asset Serial Number Instance 2", Kind.Instance, "AssetSerialNumber", [submodel_identification_instance2], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "TODO"); 
    server.coreaas.createSubmodelProperty(server, "Asset Manufacturer Instance 2", Kind.Instance, "AssetManufacturer", [submodel_identification_instance2], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "Fischertechnik"); 
    
    // Configuration instance
    const submodel_configuration_instance2 = server.coreaas.createSubmodel(server, "Configuration Instance 2", Kind.Instance, "Configuration", "http://www.test.com/configuration2", KeyElements.Submodel, "http://www.test.com/configurationType", aas_vg);
    server.coreaas.createSubmodelFile(server, "Data Sheet Instance 2", Kind.Type, "DataSheet", submodel_configuration_instance2, KeyElements.ConceptDescription, "", "application/json", "https://drive.google.com/file/d/15k3wBcavtV-Tv5XV1fIkxuhFM9Y4GE0G/view?usp=sharing"); 
    
    // VacuumGripperRobot instance
    const submodel_vacuum_gripper_robot_instance = server.coreaas.createSubmodel(server, "Vacuum Gripper Robot Instance 1", Kind.Instance, "VacuumGripper", "http://www.test.com/gripper2", KeyElements.Submodel, "http://www.test.com/gripperRobotType", aas_vg);
    const property_terminal2a_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 2a (Switch)", Kind.Instance, "Terminal-SwitchVerticalAxis", [submodel_vacuum_gripper_robot_instance], KeyElements.ConceptDescription, "www.test.com/040", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0); 
    const property_terminal2b_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 2b (Switch)", Kind.Instance, "Terminal-SwitchHorizontalAxis", [submodel_vacuum_gripper_robot_instance], KeyElements.ConceptDescription, "www.test.com/040", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0); 
    const property_terminal2c_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 2c (Switch)", Kind.Instance, "Terminal-SwitchRotate", [submodel_vacuum_gripper_robot_instance], KeyElements.ConceptDescription, "www.test.com/040", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0); 
    server.coreaas.createSubmodelOperation(server, "Pick Up Instance 2", Kind.Instance, "PickUp", [submodel_vacuum_gripper_robot_instance], 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Set Down Instance 2", Kind.Instance, "SetDown", [submodel_vacuum_gripper_robot_instance], 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Move Instance 2", Kind.Instance, "Move", [submodel_vacuum_gripper_robot_instance], 0, ""); 
    
    /** AAS_SL Submodels and Submodels elements INSTANCES */
    // Identification instance
    const submodel_identification_instance3 = server.coreaas.createSubmodel(server, "Identification Instance 3", Kind.Instance, "Identification", "http://www.test.com/identification3", KeyElements.Submodel, "http://www.test.com/identificationType", aas_vg);
    server.coreaas.createSubmodelProperty(server, "Asset Serial Number Instance 3", Kind.Instance, "AssetSerialNumber", [submodel_identification_instance3], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "TODO"); 
    server.coreaas.createSubmodelProperty(server, "Asset Manufacturer Instance 3", Kind.Instance, "AssetManufacturer", [submodel_identification_instance3], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "Fischertechnik"); 
    
    // Configuration instance
    const submodel_configuration_instance3 = server.coreaas.createSubmodel(server, "Configuration Instance 3", Kind.Instance, "Configuration", "http://www.test.com/configuration3", KeyElements.Submodel, "http://www.test.com/configurationType", aas_sl);
    server.coreaas.createSubmodelFile(server, "Data Sheet Instance 3", Kind.Type, "DataSheet", submodel_configuration_instance3, KeyElements.ConceptDescription, "", "application/json", "https://drive.google.com/file/d/1R1_fr89RpPtwMJJWcaD7VPIlgBBb-I82/view?usp=sharing"); 
    
    // Sorting Line instance
    const submodel_sortingline_instance = server.coreaas.createSubmodel(server, "Sorting Line Instance 1", Kind.Instance, "SortingLine", "http://www.test.com/sortingLine3", KeyElements.Submodel, "http://www.test.com/sortingLineType", aas_sl);
    const property_terminal3a_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 3a (Motor)", Kind.Instance, "Terminal-MotorConveyorBelt", [submodel_sortingline_instance], KeyElements.ConceptDescription, "www.test.com/017", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0); 
    const property_terminal3b_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 3b (Light barrier)", Kind.Instance, "Terminal-LightBarrierBlue", [submodel_sortingline_instance], KeyElements.ConceptDescription, "www.test.com/041", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0); 
    server.coreaas.createSubmodelOperation(server, "Activate Belt Instance 3", Kind.Instance, "ActivateBelt", [submodel_sortingline_instance], 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Colour Detection Instance 3", Kind.Instance, "ColourDetection", [submodel_sortingline_instance], 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Ejection Instance 3", Kind.Instance, "Ejection", [submodel_sortingline_instance], 0, ""); 
    
    /** AAS_AHBW Submodels and Submodels elements INSTANCES */
    // Identification instance
    const submodel_identification_instance4 = server.coreaas.createSubmodel(server, "Identification Instance 4", Kind.Instance, "Identification", "http://www.test.com/identification4", KeyElements.Submodel, "http://www.test.com/identificationType", aas_ahbw);
    server.coreaas.createSubmodelProperty(server, "Asset Serial Number Instance 4", Kind.Instance, "AssetSerialNumber", [submodel_identification_instance4], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "TODO"); 
    server.coreaas.createSubmodelProperty(server, "Asset Manufacturer Instance 4", Kind.Instance, "AssetManufacturer", [submodel_identification_instance4], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "Fischertechnik"); 
    
    // Configuration instance
    const submodel_configuration_instance4 = server.coreaas.createSubmodel(server, "Configuration Instance 4", Kind.Instance, "Configuration", "http://www.test.com/configuration4", KeyElements.Submodel, "http://www.test.com/configurationType", aas_ahbw);
    server.coreaas.createSubmodelFile(server, "Data Sheet Instance 4", Kind.Type, "DataSheet", submodel_configuration_instance4, KeyElements.ConceptDescription, "", "application/json", "https://drive.google.com/file/d/15k3wBcavtV-Tv5XV1fIkxuhFM9Y4GE0G/view?usp=sharing"); 
    
    // Sorting Line instance
    const submodel_ahbwarehouse_instance = server.coreaas.createSubmodel(server, "AHB Warehouse Instance 1", Kind.Instance, "AHBWarehouse", "http://www.test.com/ahbWarehouse4", KeyElements.Submodel, "http://www.test.com/ahbWarehouseType", aas_ahbw);
    const property_terminal4a_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 4a (Switch)", Kind.Instance, "Terminal-SwitchHorizontalAxis", [submodel_ahbwarehouse_instance], KeyElements.ConceptDescription, "www.test.com/040", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0); 
    const property_terminal4b_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 4b (Switch)", Kind.Instance, "Terminal-SwitchVerticalAxis", [submodel_ahbwarehouse_instance], KeyElements.ConceptDescription, "www.test.com/040", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0); 
    const property_terminal4c_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 4c (Motor)", Kind.Instance, "Terminal-MotorConveyorBelt", [submodel_ahbwarehouse_instance], KeyElements.ConceptDescription, "www.test.com/017", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0); 
    server.coreaas.createSubmodelOperation(server, "Retrieving Instance 4", Kind.Instance, "Retrieving", [submodel_ahbwarehouse_instance], 0, ""); 


    /************************ Concept Dictionary  ************************/

    /** Add Dictionary */
    const conceptDictionary = server.coreaas.createConceptDictionary(server, [aas_mps, aas_ahbw, aas_sl, aas_vg], 98, "ConceptDictionary", "ConceptDictionary", "AAS Concept Dictionary", "AAS Concept Dictionary");
    
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
        console.log(" the primary server endpoint url is ", endpointUrl );
    });
}

server.initialize(postInitialize);
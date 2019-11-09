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
    const aas_mps = server.coreaas.createAssetAdministrationShell(server, "AAS_MPS", admin, "Multi Processing Station AAS", "Multi Processing Station AAS", "http://www.test.com/aas-mps/1.0", "http://http://www.test.com/536632", ["http://http://www.test.com/identification1", "http://http://www.test.com/configuration1", "http://http://www.test.com/gripper1", "http://http://www.test.com/oven1", "http://http://www.test.com/turntable1"]);
    /** AAS Vacuum Gripper */
    const aas_vg = server.coreaas.createAssetAdministrationShell(server, "AAS_VG", admin, "Vacuum Gripper AAS", "Vacuum Gripper AAS", "http://www.test.com/aas-vg/1.0", "http://http://www.test.com/536630", ["http://http://www.test.com/identification2", "http://http://www.test.com/configuration2", "http://http://www.test.com/gripper2"]);
    /** AAS Sorting Line */
    const aas_sl = server.coreaas.createAssetAdministrationShell(server, "AAS_SL", admin, "Sorting Line AAS", "Sorting Line AAS", "http://www.test.com/aas-sl/1.0", "http://http://www.test.com/536633", ["http://http://www.test.com/identification3", "http://http://www.test.com/configuration3", "http://http://www.test.com/sortingLine3"]);
    /** AAS Automated High Bay Warehouse */
    const aas_ahbw = server.coreaas.createAssetAdministrationShell(server, "AAS_AHBW", admin, "Automated High Bay Warehouse AAS", "Automated High Bay Warehouse AAS", "http://www.test.com/aas-ahbw/1.0", "http://http://www.test.com/536631", ["http://http://www.test.com/identification4", "http://http://www.test.com/configuration4", "http://http://www.test.com/ahbWarehouse4"]);
    /** AAS PLC */
    const aas_plc = server.coreaas.createAssetAdministrationShell(server, "AAS_PLC", admin, "PLC AAS", "PLC AAS", "http://www.test.com/aas-plc/1.0", "http://http://www.test.com/PLC_1214C", ["http://http://www.test.com/identification5", "http://http://www.test.com/configuration5", "http://http://www.test.com/IO5", "http://http://www.test.com/IECConfiguration5", "http://http://www.test.com/IECResource5", "http://http://www.test.com/IECProgram5", "http://http://www.test.com/IECTask5", "http://http://www.test.com/IECCommunication5"]);
    

    /** MPS Asset */
    server.coreaas.createAsset(server, "Multi Processing Station 536632", Kind.Instance, "536632", "http://http://www.test.com/536632", "Asset Multi Processing Station 536632", "Asset Multi Processing Station 536632", aas_mps, "http://http://www.test.com/identification1");
    /** VG Asset */
    server.coreaas.createAsset(server, "Vacuum Gripper 536630", Kind.Instance, "536630", "http://http://www.test.com/536630", "Asset Vacuum Gripper 536630", "Asset Vacuum Gripper 536630", aas_vg, "http://http://www.test.com/identification2");
    /** SL Asset */
    server.coreaas.createAsset(server, "Sorting Line 536633", Kind.Instance, "536633", "http://http://www.test.com/536633", "Asset Sorting Line 536633", "Asset Sorting Line 536633", aas_sl, "http://http://www.test.com/identification3");
    /** AHBW Asset */
    server.coreaas.createAsset(server, "Automated High Bay Warehouse Line 536631", Kind.Instance, "536631", "http://http://www.test.com/536631", "Asset Automated High Bay Warehouse 536631", "Asset Automated High Bay Warehouse 536631", aas_ahbw, "http://http://www.test.com/identification4");
    /** PLC Asset */
    server.coreaas.createAsset(server, "PLC 1214C DC/DC/DC", Kind.Instance, "PLC_1214C", "http://http://www.test.com/PLC_1214C", "PLC 1214C DC/DC/DC", "PLC 1214C DC/DC/DC", aas_plc, "http://http://www.test.com/identification5");

    
    /** Submodels and Submodels elements TYPES */
    // Identification type
    const submodel_identification_type = server.coreaas.createSubmodel(server, "Identification Type", Kind.Type, "Identification", "http://http://www.test.com/identificationType", KeyElements.ConceptDescription, "http://http://www.test.com/001", aas_mps);
    const property_asn_type = server.coreaas.createSubmodelProperty(server, "Asset Serial Number Type", Kind.Type, "AssetSerialNumber", [submodel_identification_type], KeyElements.ConceptDescription, "http://www.test.com/002", PropertyCategory.CONSTANT, PropertyValueType.String, "String", DataType.String, ""); 
    const property_manufacturer_type = server.coreaas.createSubmodelProperty(server, "Asset Manufacturer Type", Kind.Type, "AssetManufacturer", [submodel_identification_type], KeyElements.ConceptDescription, "http://www.test.com/005", PropertyCategory.CONSTANT, PropertyValueType.String, "String", DataType.String, ""); 
    
    // Configuration type
    const submodel_configuration_type = server.coreaas.createSubmodel(server, "Configuration Type", Kind.Type, "Configuration", "http://http://www.test.com/configurationType", KeyElements.ConceptDescription, "http://http://www.test.com/003", aas_mps);
    const file_datasheet_type = server.coreaas.createSubmodelFile(server, "Data Sheet Type", Kind.Type, "DataSheet", submodel_configuration_type, KeyElements.ConceptDescription, "http://www.test.com/004", "", ""); 
        
    // VacuumGripperOven type
    const submodel_vacuum_gripper_oven_type = server.coreaas.createSubmodel(server, "Vacuum Gripper Oven Type", Kind.Type, "VacuumGripperOven", "http://http://www.test.com/gripperType", KeyElements.ConceptDescription, "http://http://www.test.com/006", aas_mps);
    const operation_move_type = server.coreaas.createSubmodelOperation(server, "Move Type", Kind.Type, "Move", [submodel_vacuum_gripper_oven_type], KeyElements.ConceptDescription, "http://www.test.com/030"); 
    
    // VacuumGripperRobot type
    const submodel_vacuum_gripper_robot_type = server.coreaas.createSubmodel(server, "Vacuum Gripper Robot Type", Kind.Type, "VacuumGripperRobot", "http://http://www.test.com/gripperRobotType", KeyElements.ConceptDescription, "http://http://www.test.com/006", aas_vg);
    const operation_move_robot_type = server.coreaas.createSubmodelOperation(server, "Move Robot Type", Kind.Type, "Move", [submodel_vacuum_gripper_robot_type], KeyElements.ConceptDescription, "http://www.test.com/029"); 
    
    // SharedGripperOperations type
    const operation_pickup_type = server.coreaas.createSubmodelOperation(server, "Pick Up Type", Kind.Type, "PickUp", [submodel_vacuum_gripper_oven_type, submodel_vacuum_gripper_robot_type], KeyElements.ConceptDescription, "http://www.test.com/007"); 
    const operation_setdown_type = server.coreaas.createSubmodelOperation(server, "Set Down Type", Kind.Type, "SetDown", [submodel_vacuum_gripper_oven_type, submodel_vacuum_gripper_robot_type], KeyElements.ConceptDescription, "http://www.test.com/018"); 

    // Oven type
    const submodel_oven_type = server.coreaas.createSubmodel(server, "Oven Type", Kind.Type, "Oven", "http://http://www.test.com/ovenType", KeyElements.ConceptDescription, "http://http://www.test.com/008", aas_mps);
    const operation_burn_type = server.coreaas.createSubmodelOperation(server, "Burn Type", Kind.Type, "Burn", [submodel_oven_type], KeyElements.ConceptDescription, "http://www.test.com/010"); 

    // Turntable type
    const submodel_turntable_type = server.coreaas.createSubmodel(server, "Turntable Type", Kind.Type, "Turntable", "http://http://www.test.com/turntableType", KeyElements.ConceptDescription, "http://http://www.test.com/011", aas_mps);
    const operation_turn_type = server.coreaas.createSubmodelOperation(server, "Turn Type", Kind.Type, "Turn", [submodel_turntable_type], KeyElements.ConceptDescription, "http://www.test.com/031"); 
    const operation_activatesaw_type = server.coreaas.createSubmodelOperation(server, "Activate Saw Type", Kind.Type, "ActivateSaw", [submodel_turntable_type], KeyElements.ConceptDescription, "http://www.test.com/013"); 
    const operation_ejection_type = server.coreaas.createSubmodelOperation(server, "Ejection Type", Kind.Type, "Ejection", [submodel_turntable_type], KeyElements.ConceptDescription, "http://www.test.com/014"); 

    // SortingLine Type
    const submodel_sortingline_type = server.coreaas.createSubmodel(server, "Sorting Line Type", Kind.Type, "SortingLine", "http://http://www.test.com/sortingLineType", KeyElements.ConceptDescription, "http://http://www.test.com/022", aas_sl);
    const operation_colordetection_type = server.coreaas.createSubmodelOperation(server, "Color Detection Type", Kind.Type, "ColorDetection", [submodel_sortingline_type], KeyElements.ConceptDescription, "http://www.test.com/023"); 
    const operation_slEjection_type = server.coreaas.createSubmodelOperation(server, "SL Ejection Type", Kind.Type, "Ejection", [submodel_sortingline_type], KeyElements.ConceptDescription, "http://www.test.com/024"); 
    
    // AHBWarehouse type
    const submodel_ahbwarehouse_type = server.coreaas.createSubmodel(server, "AHB Warehouse Type", Kind.Type, "AHBWarehouse", "http://http://www.test.com/ahbWarehouseType", KeyElements.ConceptDescription, "http://http://www.test.com/026", aas_ahbw);
    const operation_retrieving_type = server.coreaas.createSubmodelOperation(server, "Retrieving Type", Kind.Type, "Retrieving", [submodel_ahbwarehouse_type], KeyElements.ConceptDescription, "http://www.test.com/028"); 

    // PLC IO type
    const submodel_IO_type = server.coreaas.createSubmodel(server, "IO Type", Kind.Type, "IO", "http://http://www.test.com/IOType", KeyElements.ConceptDescription, "http://http://www.test.com/054", aas_plc);
    
    // PLC IOModule type
    const submodel_IOModule_type = server.coreaas.createSubmodel(server, "IO Module Type", Kind.Type, "IOModule", "http://http://www.test.com/IOModuleType", KeyElements.ConceptDescription, "http://http://www.test.com/053", aas_plc);
    
    // PLC IEC Configuration type
    const submodel_IECConfiguration_type = server.coreaas.createSubmodel(server, "IEC Configuration Type", Kind.Type, "IECConfiguration", "http://http://www.test.com/IECConfigurationType", KeyElements.ConceptDescription, "http://http://www.test.com/056", aas_plc);
    const property_name_type = server.coreaas.createSubmodelProperty(server, "Configuration Name Type", Kind.Type, "Name", [submodel_IECConfiguration_type], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, ""); 
    const property_resourcenumber_type = server.coreaas.createSubmodelProperty(server, "Configuration Resource Number Type", Kind.Type, "ResourceNumber", [submodel_IECConfiguration_type], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.Int, "Int16", DataType.Int16, 0); 

    // PLC IEC Resource type
    const submodel_IECResource_type = server.coreaas.createSubmodel(server, "IEC Resource Type", Kind.Type, "IECResource", "http://http://www.test.com/IECResourceType", KeyElements.ConceptDescription, "http://http://www.test.com/057", aas_plc);
    const relelement_resourceassociatedconfiguration_type = server.coreaas.createSubmodelRelationshipElement(server, "Associated Configuration Type", Kind.Type, "AssociatedConfiguration", submodel_IECResource_type, KeyElements.ConceptDescription, "http://http://www.test.com/061", "", KeyElements.Submodel, KeyType.URI, "", KeyElements.Submodel, KeyType.URI); 
    const property_resourcedescription_type = server.coreaas.createSubmodelProperty(server, "IEC Resource Description Type", Kind.Type, "Description", [submodel_IECResource_type], KeyElements.ConceptDescription, "http://http://www.test.com/058", PropertyCategory.CONSTANT, PropertyValueType.String, "String", DataType.String, ""); 
    const property_resourceaddresslist_type = server.coreaas.createSubmodelProperty(server, "IEC Resource Address List Type", Kind.Type, "AddressList", [submodel_IECResource_type], KeyElements.ConceptDescription, "http://http://www.test.com/059", PropertyCategory.CONSTANT, PropertyValueType.String, "String", DataType.String, ""); 

    // PLC IEC Program type
    const submodel_IECProgram_type = server.coreaas.createSubmodel(server, "IEC Program Type", Kind.Type, "IECProgram", "http://http://www.test.com/IECProgramType", KeyElements.ConceptDescription, "http://http://www.test.com/060", aas_plc);
    const file_programfile_type = server.coreaas.createSubmodelFile(server, "Program File Type", Kind.Type, "ProgramFile", undefined, KeyElements.ConceptDescription, "http://www.test.com/052", "", ""); 
    const property_programname_type = server.coreaas.createSubmodelProperty(server, "IEC Program Name Type", Kind.Type, "Name", undefined, KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, ""); 
    const property_programdescription_type = server.coreaas.createSubmodelProperty(server, "IEC Program Description Type", Kind.Type, "Description", undefined, KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, ""); 
    const property_language_type = server.coreaas.createSubmodelProperty(server, "IEC Program Language Type", Kind.Type, "Language", undefined, KeyElements.ConceptDescription, "", PropertyCategory.CONSTANT, PropertyValueType.String, "String", DataType.String, ""); 
    const relelement_associatedresource_type = server.coreaas.createSubmodelRelationshipElement(server, "Associated Resource Type", Kind.Type, "AssociatedResource", undefined, KeyElements.ConceptDescription, "http://http://www.test.com/062", "", KeyElements.SubmodelElementCollection, KeyType.idShort, "", KeyElements.Submodel, KeyType.URI); 
    const relelement_associatedtask_type = server.coreaas.createSubmodelRelationshipElement(server, "Associated Task Type", Kind.Type, "AssociatedTask", undefined, KeyElements.ConceptDescription, "http://http://www.test.com/063", "", KeyElements.SubmodelElementCollection, KeyType.idShort, "", KeyElements.SubmodelElementCollection, KeyType.idShort); 
    const elemcollection_program_type = server.coreaas.createSubmodelElementCollection(server, "Program", Kind.Type, "Program", submodel_IECProgram_type, KeyElements.ConceptDescription, "http://http://www.test.com/055", [file_programfile_type, property_programname_type, property_programdescription_type, property_language_type, relelement_associatedresource_type, relelement_associatedtask_type]);

    // PLC IEC Task type
    const submodel_IECTask_type = server.coreaas.createSubmodel(server, "IEC Task Type", Kind.Type, "IECTask", "http://http://www.test.com/IECTaskType", KeyElements.ConceptDescription, "http://http://www.test.com/077", aas_plc);
    const property_priority_type = server.coreaas.createSubmodelProperty(server, "IEC Task Priority Type", Kind.Type, "Priority", undefined, KeyElements.ConceptDescription, "http://http://www.test.com/080", PropertyCategory.VARIABLE, PropertyValueType.Int, "Int16", DataType.Int16, 0); 
    const property_OBnumber_type = server.coreaas.createSubmodelProperty(server, "IEC Task OB Number Type", Kind.Type, "OBnumber", undefined, KeyElements.ConceptDescription, "http://http://www.test.com/079", PropertyCategory.CONSTANT, PropertyValueType.Int, "Int16", DataType.Int16, 0); 
    const property_period_type = server.coreaas.createSubmodelProperty(server, "IEC Task Period Type", Kind.Type, "Period", undefined, KeyElements.ConceptDescription, "http://http://www.test.com/081", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0); 
    const property_triggerInputChannel_type = server.coreaas.createSubmodelProperty(server, "IEC Task Trigger Input Channel Type", Kind.Type, "Priority", undefined, KeyElements.ConceptDescription, "http://http://www.test.com/083", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0); 
    const elemcollection_OBcyclicinterrupt_type = server.coreaas.createSubmodelElementCollection(server, "OB Cyclic Interrupt", Kind.Type, "OBCyclicInterrupt", submodel_IECTask_type, KeyElements.ConceptDescription, "http://http://www.test.com/078", [property_priority_type, property_OBnumber_type, property_period_type]);
    const elemcollection_OBhwInterrupt_type = server.coreaas.createSubmodelElementCollection(server, "OB Hardware Interrupt", Kind.Type, "OBHardwareInterrupt", submodel_IECTask_type, KeyElements.ConceptDescription, "http://http://www.test.com/082", [property_priority_type, property_OBnumber_type, property_triggerInputChannel_type]);

    // PLC IEC Communication type
    const submodel_IECCommunication_type = server.coreaas.createSubmodel(server, "IEC Communication Type", Kind.Type, "IECCommunication", "http://http://www.test.com/IECCommunicationType", KeyElements.ConceptDescription, "http://http://www.test.com/065", aas_plc);
    const property_sendclocktime_type = server.coreaas.createSubmodelProperty(server, "IEC Communication Send Clock Time Type", Kind.Type, "SendClockTime", undefined, KeyElements.ConceptDescription, "http://http://www.test.com/068", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0); 
    const property_updatetime_type = server.coreaas.createSubmodelProperty(server, "IEC Communication Update Time Type", Kind.Type, "UpdateTime", undefined, KeyElements.ConceptDescription, "http://http://www.test.com/069", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0); 
    const property_respctrtime_type = server.coreaas.createSubmodelProperty(server, "IEC Communication Response Control Time Type", Kind.Type, "ResponseControlTime", undefined, KeyElements.ConceptDescription, "http://http://www.test.com/070", PropertyCategory.VARIABLE, PropertyValueType.Int, "Int16", DataType.Int16, 0); 
    const property_ipaddress_type = server.coreaas.createSubmodelProperty(server, "IEC Communication IP Address Type", Kind.Type, "IPAddress", undefined, KeyElements.ConceptDescription, "http://http://www.test.com/072", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, ""); 
    const property_bandwidth_type = server.coreaas.createSubmodelProperty(server, "IEC Communication Bandwidth Type", Kind.Type, "Bandwidth", undefined, KeyElements.ConceptDescription, "http://http://www.test.com/071", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0); 
    const property_hsa_type = server.coreaas.createSubmodelProperty(server, "IEC Communication Highest Station Address Type", Kind.Type, "HSA", undefined, KeyElements.ConceptDescription, "http://http://www.test.com/076", PropertyCategory.VARIABLE, PropertyValueType.Int, "Int16", DataType.Int16, 0); 
    const property_profibusaddress_type = server.coreaas.createSubmodelProperty(server, "IEC Communication Profibus Address Type", Kind.Type, "ProfibusAddress", undefined, KeyElements.ConceptDescription, "http://http://www.test.com/075", PropertyCategory.VARIABLE, PropertyValueType.Int, "Int16", DataType.Int16, 0); 
    const property_bitrate_type = server.coreaas.createSubmodelProperty(server, "IEC Communication Bitrate Type", Kind.Type, "BitRate", undefined, KeyElements.ConceptDescription, "http://http://www.test.com/074", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0); 
    const property_devicetype_type = server.coreaas.createSubmodelProperty(server, "IEC Communication Device Type Type", Kind.Type, "DeviceType", undefined, KeyElements.ConceptDescription, "http://http://www.test.com/067", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, ""); 
    const elemcollection_profinetIO_type = server.coreaas.createSubmodelElementCollection(server, "Profinet IO", Kind.Type, "ProfinetIO", submodel_IECCommunication_type, KeyElements.ConceptDescription, "http://http://www.test.com/066", [property_sendclocktime_type, property_updatetime_type, property_respctrtime_type, property_ipaddress_type, property_bandwidth_type, property_devicetype_type]);
    const elemcollection_profibusDP_type = server.coreaas.createSubmodelElementCollection(server, "Profibus DP", Kind.Type, "ProfibusDP", submodel_IECCommunication_type, KeyElements.ConceptDescription, "http://http://www.test.com/073", [property_hsa_type, property_profibusaddress_type, property_bitrate_type, property_devicetype_type]);

    // SharedSubmodelElements type
    const property_terminal_type = server.coreaas.createSubmodelProperty(server, "Terminal Type", Kind.Type, "Terminal", [submodel_oven_type, submodel_vacuum_gripper_oven_type, submodel_turntable_type, submodel_vacuum_gripper_robot_type, submodel_sortingline_type, submodel_ahbwarehouse_type, submodel_IO_type, submodel_IOModule_type], KeyElements.ConceptDescription, "http://www.test.com/009", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0, {terminalType: '', terminalNumber: '0', description: ''}, "http://http://www.test.com/terminalDataTemplate"); 
    const operation_activatebelt_type = server.coreaas.createSubmodelOperation(server, "Activate Belt Type", Kind.Type, "ActivateBelt", [submodel_turntable_type, submodel_sortingline_type], KeyElements.ConceptDescription, "http://www.test.com/015"); 


    /** AAS_MPS Submodels and Submodels elements INSTANCES */
    // Identification instance
    const submodel_identification_instance1 = server.coreaas.createSubmodel(server, "Identification Instance 1", Kind.Instance, "Identification", "http://http://www.test.com/identification1", KeyElements.Submodel, "http://http://www.test.com/identificationType", aas_mps);
    server.coreaas.createSubmodelProperty(server, "Asset Serial Number Instance 1", Kind.Instance, "AssetSerialNumber", [submodel_identification_instance1], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "TODO"); 
    server.coreaas.createSubmodelProperty(server, "Asset Manufacturer Instance 1", Kind.Instance, "AssetManufacturer", [submodel_identification_instance1], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "Fischertechnik"); 
    
    // Configuration instance
    const submodel_configuration_instance1 = server.coreaas.createSubmodel(server, "Configuration Instance 1", Kind.Instance, "Configuration", "http://http://www.test.com/configuration1", KeyElements.Submodel, "http://http://www.test.com/configurationType", aas_mps);
    server.coreaas.createSubmodelFile(server, "Data Sheet Instance 1", Kind.Type, "DataSheet", submodel_configuration_instance1, KeyElements.ConceptDescription, "", "application/json", "https://drive.google.com/file/d/1AqBTlzL6ZXX9i17vkJZnzRUSE5FdJhD_/view?usp=sharing"); 
    
    // VacuumGripperOven instance
    const submodel_vacuum_gripper_oven_instance = server.coreaas.createSubmodel(server, "Vacuum Gripper Oven Instance 1", Kind.Instance, "VacuumGripperOven", "http://http://www.test.com/gripper1", KeyElements.Submodel, "http://http://www.test.com/gripperType", aas_mps);
    const property_terminal1a_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 1a (Switch)", Kind.Instance, "Terminal-SwitchTurntable", [submodel_vacuum_gripper_oven_instance], KeyElements.ConceptDescription, "http://www.test.com/040", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0, {terminalType: 'Input (I1)', terminalNumber: '5', description: 'reference switch turn-table (position vacuum)'}, "http://http://www.test.com/terminalDataTemplate");   
    server.coreaas.createSubmodelOperation(server, "Pick Up Instance 1", Kind.Instance, "PickUp", [submodel_vacuum_gripper_oven_instance], 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Set Down Instance 1", Kind.Instance, "SetDown", [submodel_vacuum_gripper_oven_instance], 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Move Instance 1", Kind.Instance, "Move", [submodel_vacuum_gripper_oven_instance], 0, ""); 
    
    // Oven instance
    const submodel_oven_instance = server.coreaas.createSubmodel(server, "Oven Instance 1", Kind.Instance, "Oven", "http://http://www.test.com/oven1", KeyElements.Submodel, "http://http://www.test.com/ovenType", aas_mps);
    const property_terminal1b_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 1b (Light barrier)", Kind.Instance, "Terminal-LightBarrierOven", [submodel_oven_instance], KeyElements.ConceptDescription, "http://www.test.com/041", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0, {terminalType: 'Input (I9)', terminalNumber: '13', description: 'light-barrier oven'}, "http://http://www.test.com/terminalDataTemplate");  
    server.coreaas.createSubmodelOperation(server, "Burn Instance 1", Kind.Instance, "Burn", [submodel_oven_instance], 0, ""); 

    // Turntable instance
    const submodel_turntable_instance = server.coreaas.createSubmodel(server, "Turntable Instance 1", Kind.Instance, "Turntable", "http://http://www.test.com/turntable1", KeyElements.Submodel, "http://http://www.test.com/turntableType", aas_mps);
    const property_terminal1c_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 1c (Motor)", Kind.Instance, "Terminal-MotorTurntable", [submodel_turntable_instance], KeyElements.ConceptDescription, "http://www.test.com/017", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0, {terminalType: 'Output (Q1)', terminalNumber: '17', description:'motor turn-table counterclockwise'}, "http://http://www.test.com/terminalDataTemplate");  
    server.coreaas.createSubmodelOperation(server, "Turn Instance 1", Kind.Instance, "Turn", [submodel_turntable_instance], 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Activate Saw Instance 1", Kind.Instance, "ActivateSaw", [submodel_turntable_instance], 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Ejection Instance 1", Kind.Instance, "Ejection", [submodel_turntable_instance], 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Activate Belt Instance 1", Kind.Instance, "ActivateBelt", [submodel_turntable_instance], 0, ""); 
    
    /** AAS_VG Submodels and Submodels elements INSTANCES */
    // Identification instance
    const submodel_identification_instance2 = server.coreaas.createSubmodel(server, "Identification Instance 2", Kind.Instance, "Identification", "http://http://www.test.com/identification2", KeyElements.Submodel, "http://http://www.test.com/identificationType", aas_vg);
    server.coreaas.createSubmodelProperty(server, "Asset Serial Number Instance 2", Kind.Instance, "AssetSerialNumber", [submodel_identification_instance2], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "TODO"); 
    server.coreaas.createSubmodelProperty(server, "Asset Manufacturer Instance 2", Kind.Instance, "AssetManufacturer", [submodel_identification_instance2], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "Fischertechnik"); 
    
    // Configuration instance
    const submodel_configuration_instance2 = server.coreaas.createSubmodel(server, "Configuration Instance 2", Kind.Instance, "Configuration", "http://http://www.test.com/configuration2", KeyElements.Submodel, "http://http://www.test.com/configurationType", aas_vg);
    server.coreaas.createSubmodelFile(server, "Data Sheet Instance 2", Kind.Type, "DataSheet", submodel_configuration_instance2, KeyElements.ConceptDescription, "", "application/json", "https://drive.google.com/file/d/15k3wBcavtV-Tv5XV1fIkxuhFM9Y4GE0G/view?usp=sharing"); 
    
    // VacuumGripperRobot instance
    const submodel_vacuum_gripper_robot_instance = server.coreaas.createSubmodel(server, "Vacuum Gripper Robot Instance 1", Kind.Instance, "VacuumGripper", "http://http://www.test.com/gripper2", KeyElements.Submodel, "http://http://www.test.com/gripperRobotType", aas_vg);
    const property_terminal2a_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 2a (Switch)", Kind.Instance, "Terminal-SwitchVerticalAxis", [submodel_vacuum_gripper_robot_instance], KeyElements.ConceptDescription, "http://www.test.com/040", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0, {terminalType: 'Input (I1)', terminalNumber: '5', description: 'reference switch vertical axis'}, "http://http://www.test.com/terminalDataTemplate");  
    const property_terminal2b_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 2b (Switch)", Kind.Instance, "Terminal-SwitchHorizontalAxis", [submodel_vacuum_gripper_robot_instance], KeyElements.ConceptDescription, "http://www.test.com/040", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0, {terminalType: 'Input (I2)', terminalNumber: '6', description:'reference switch horizontal axis'}, "http://http://www.test.com/terminalDataTemplate"); 
    const property_terminal2c_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 2c (Switch)", Kind.Instance, "Terminal-SwitchRotate", [submodel_vacuum_gripper_robot_instance], KeyElements.ConceptDescription, "http://www.test.com/040", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0, {terminalType: 'Input (I3)', terminalNumber: '7', description:'reference switch rotate'}, "http://http://www.test.com/terminalDataTemplate");
    server.coreaas.createSubmodelOperation(server, "Pick Up Instance 2", Kind.Instance, "PickUp", [submodel_vacuum_gripper_robot_instance], 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Set Down Instance 2", Kind.Instance, "SetDown", [submodel_vacuum_gripper_robot_instance], 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Move Instance 2", Kind.Instance, "Move", [submodel_vacuum_gripper_robot_instance], 0, ""); 
    
    /** AAS_SL Submodels and Submodels elements INSTANCES */
    // Identification instance
    const submodel_identification_instance3 = server.coreaas.createSubmodel(server, "Identification Instance 3", Kind.Instance, "Identification", "http://http://www.test.com/identification3", KeyElements.Submodel, "http://http://www.test.com/identificationType", aas_vg);
    server.coreaas.createSubmodelProperty(server, "Asset Serial Number Instance 3", Kind.Instance, "AssetSerialNumber", [submodel_identification_instance3], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "TODO"); 
    server.coreaas.createSubmodelProperty(server, "Asset Manufacturer Instance 3", Kind.Instance, "AssetManufacturer", [submodel_identification_instance3], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "Fischertechnik"); 
    
    // Configuration instance
    const submodel_configuration_instance3 = server.coreaas.createSubmodel(server, "Configuration Instance 3", Kind.Instance, "Configuration", "http://http://www.test.com/configuration3", KeyElements.Submodel, "http://http://www.test.com/configurationType", aas_sl);
    server.coreaas.createSubmodelFile(server, "Data Sheet Instance 3", Kind.Type, "DataSheet", submodel_configuration_instance3, KeyElements.ConceptDescription, "", "application/json", "https://drive.google.com/file/d/1R1_fr89RpPtwMJJWcaD7VPIlgBBb-I82/view?usp=sharing"); 
    
    // Sorting Line instance
    const submodel_sortingline_instance = server.coreaas.createSubmodel(server, "Sorting Line Instance 1", Kind.Instance, "SortingLine", "http://http://www.test.com/sortingLine3", KeyElements.Submodel, "http://http://www.test.com/sortingLineType", aas_sl);
    const property_terminal3a_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 3a (Motor)", Kind.Instance, "Terminal-MotorConveyorBelt", [submodel_sortingline_instance], KeyElements.ConceptDescription, "http://www.test.com/017", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0, {terminalType: 'Output (Q1)', terminalNumber: '17', description:'motor conveyor belt'}, "http://http://www.test.com/terminalDataTemplate");
    const property_terminal3b_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 3b (Light barrier)", Kind.Instance, "Terminal-LightBarrierBlue", [submodel_sortingline_instance], KeyElements.ConceptDescription, "http://www.test.com/041", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0, {terminalType: 'Input (I7)', terminalNumber: '12', description:'light-barrier blue'}, "http://http://www.test.com/terminalDataTemplate");
    server.coreaas.createSubmodelOperation(server, "Activate Belt Instance 3", Kind.Instance, "ActivateBelt", [submodel_sortingline_instance], 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Colour Detection Instance 3", Kind.Instance, "ColourDetection", [submodel_sortingline_instance], 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Ejection Instance 3", Kind.Instance, "Ejection", [submodel_sortingline_instance], 0, ""); 
    
    /** AAS_AHBW Submodels and Submodels elements INSTANCES */
    // Identification instance
    const submodel_identification_instance4 = server.coreaas.createSubmodel(server, "Identification Instance 4", Kind.Instance, "Identification", "http://http://www.test.com/identification4", KeyElements.Submodel, "http://http://www.test.com/identificationType", aas_ahbw);
    server.coreaas.createSubmodelProperty(server, "Asset Serial Number Instance 4", Kind.Instance, "AssetSerialNumber", [submodel_identification_instance4], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "TODO"); 
    server.coreaas.createSubmodelProperty(server, "Asset Manufacturer Instance 4", Kind.Instance, "AssetManufacturer", [submodel_identification_instance4], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "Fischertechnik"); 
    
    // Configuration instance
    const submodel_configuration_instance4 = server.coreaas.createSubmodel(server, "Configuration Instance 4", Kind.Instance, "Configuration", "http://http://www.test.com/configuration4", KeyElements.Submodel, "http://http://www.test.com/configurationType", aas_ahbw);
    server.coreaas.createSubmodelFile(server, "Data Sheet Instance 4", Kind.Type, "DataSheet", submodel_configuration_instance4, KeyElements.ConceptDescription, "", "application/json", "https://drive.google.com/file/d/15k3wBcavtV-Tv5XV1fIkxuhFM9Y4GE0G/view?usp=sharing"); 
    
    // Sorting Line instance
    const submodel_ahbwarehouse_instance = server.coreaas.createSubmodel(server, "AHB Warehouse Instance 1", Kind.Instance, "AHBWarehouse", "http://http://www.test.com/ahbWarehouse4", KeyElements.Submodel, "http://http://www.test.com/ahbWarehouseType", aas_ahbw);
    const property_terminal4a_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 4a (Switch)", Kind.Instance, "Terminal-SwitchHorizontalAxis", [submodel_ahbwarehouse_instance], KeyElements.ConceptDescription, "http://www.test.com/040", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0, {terminalType: 'Input (I1)', terminalNumber: '5', description:'reference switch horizontal axis'}, "http://http://www.test.com/terminalDataTemplate");
    const property_terminal4b_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 4b (Switch)", Kind.Instance, "Terminal-SwitchVerticalAxis", [submodel_ahbwarehouse_instance], KeyElements.ConceptDescription, "http://www.test.com/040", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0, {terminalType: 'Input (I4)', terminalNumber: '8', description:'reference switch vertical axis'}, "http://http://www.test.com/terminalDataTemplate");
    const property_terminal4c_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 4c (Motor)", Kind.Instance, "Terminal-MotorConveyorBelt", [submodel_ahbwarehouse_instance], KeyElements.ConceptDescription, "http://www.test.com/017", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0, {terminalType: 'Output (Q1)', terminalNumber: '17', description:'motor conveyor belt'}, "http://http://www.test.com/terminalDataTemplate");
    server.coreaas.createSubmodelOperation(server, "Retrieving Instance 4", Kind.Instance, "Retrieving", [submodel_ahbwarehouse_instance], 0, ""); 


    /** AAS_PLC Submodels and Submodels elements INSTANCES */
    // Identification instance
    const submodel_identification_instance5 = server.coreaas.createSubmodel(server, "Identification Instance 5", Kind.Instance, "Identification", "http://http://www.test.com/identification5", KeyElements.Submodel, "http://http://www.test.com/identificationType", aas_plc);
    server.coreaas.createSubmodelProperty(server, "Asset Serial Number Instance 5", Kind.Instance, "AssetSerialNumber", [submodel_identification_instance5], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "TODO"); 
    server.coreaas.createSubmodelProperty(server, "Asset Manufacturer Instance 5", Kind.Instance, "AssetManufacturer", [submodel_identification_instance5], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "Siemens"); 
    
    // Configuration instance
    const submodel_configuration_instance5 = server.coreaas.createSubmodel(server, "Configuration Instance 5", Kind.Instance, "Configuration", "http://http://www.test.com/configuration5", KeyElements.Submodel, "http://http://www.test.com/configurationType", aas_plc);
    server.coreaas.createSubmodelFile(server, "Data Sheet Instance 5", Kind.Type, "DataSheet", submodel_configuration_instance5, KeyElements.ConceptDescription, "", "application/json", "https://drive.google.com/open?id=1QXvFPvpSrs736R0tFm6Ui1pfKHbBcT5p"); 
    
    // PLC IO instance
    const submodel_IO_instance = server.coreaas.createSubmodel(server, "IO Instance", Kind.Instance, "IO", "http://http://www.test.com/IO5", KeyElements.Submodel, "http://http://www.test.com/IOType", aas_plc);
    server.coreaas.createSubmodelProperty(server, "Terminal Q0.0 Instance", Kind.Instance, "Terminal-Q0.0", [submodel_IO_instance], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0, {terminalType: 'Digital Output (Q0.0)', terminalNumber: '1', description:'output digitale codificato in tensione 0-24V'}, "http://http://www.test.com/terminalDataTemplate"); 
    server.coreaas.createSubmodelProperty(server, "Terminal I0.0 Instance", Kind.Instance, "Terminal-I0.0", [submodel_IO_instance], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0, {terminalType: 'Digital Input (I0.0)', terminalNumber: '1', description:'input digitale codificato in tensione 0-24V'}, "http://http://www.test.com/terminalDataTemplate");
    server.coreaas.createSubmodelProperty(server, "Terminal IW64 Instance", Kind.Instance, "Terminal-IW64", [submodel_IO_instance], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0, {terminalType: 'Analog Input (IW64)', terminalNumber: '1', description:'input analogico non configurabile codificato in tensione 0-10V'}, "http://http://www.test.com/terminalDataTemplate");
    server.coreaas.createSubmodelProperty(server, "Terminal QW80 Instance", Kind.Instance, "Terminal-QW80", [submodel_IO_instance], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0, {terminalType: 'Analog Output (QW80)', terminalNumber: '1', description:'output analogico configurabile in tensione +/- 10V, corrente 0..20mA'}, "http://http://www.test.com/terminalDataTemplate");
   
    // PLC IEC Configuration instance
    const submodel_IECConfiguration_instance = server.coreaas.createSubmodel(server, "IEC Configuration Instance", Kind.Instance, "IECConfiguration", "http://http://www.test.com/IECConfiguration5", KeyElements.Submodel, "http://http://www.test.com/IECConfigurationType", aas_plc);
    server.coreaas.createSubmodelProperty(server, "Configuration Name Instance", Kind.Instance, "Name", [submodel_IECConfiguration_instance], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "Example"); 
    server.coreaas.createSubmodelProperty(server, "Configuration Resource Number Instance", Kind.Instance, "ResourceNumber", [submodel_IECConfiguration_instance], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.Int, "Int16", DataType.Int16, 1); 

    // PLC IEC Resource instance
    const submodel_IECResource_instance = server.coreaas.createSubmodel(server, "IEC Resource Instance", Kind.Instance, "IECResource", "http://http://www.test.com/IECResource5", KeyElements.Submodel, "http://http://www.test.com/IECResourceType", aas_plc);
    server.coreaas.createSubmodelRelationshipElement(server, "Associated Configuration Instance", Kind.Instance, "AssociatedConfiguration", submodel_IECResource_instance, KeyElements.ConceptDescription, "", "http://http://www.test.com/IECResource5", KeyElements.Submodel, KeyType.URI, "http://http://www.test.com/IECConfiguration5", KeyElements.Submodel, KeyType.URI); 
    server.coreaas.createSubmodelProperty(server, "IEC Resource Description Instance", Kind.Instance, "Description", [submodel_IECResource_instance], KeyElements.ConceptDescription, "", PropertyCategory.CONSTANT, PropertyValueType.String, "String", DataType.String, "Sigla CPU 1214C DC/DC/DC; Firmware 6ES7 214-1AG40-0XB0; Memoria di lavoro 100KB; alimentazione DC24V con DI14 x DC24V SINK/SOURCE, DQ10 x DC24V e AI2 on board; 6 contatori veloci e 4 uscite a impulsi on board; signal board di ampliamento degli I/O on board; fino a 3 moduli per la comunicazione seriale; fino a 8 unità di ingressi/uscite per ampliamento degli I/O; 0,04ms/istruz. progr.; interfaccia di programmazione PROFINET, comunicazione HMI e da PLC a PLC"); 
    server.coreaas.createSubmodelProperty(server, "IEC Resource Address List Instance", Kind.Instance, "AddressList", [submodel_IECResource_instance], KeyElements.ConceptDescription, "", PropertyCategory.CONSTANT, PropertyValueType.String, "String", DataType.String, "DI14 addr 0...1, DO10_1 addr 0...1, AI2_1 addr 64...67,  AQ 1x12BIT_1 addr 80...81, HSC_1 addr 1000...10001, HSC_2 addr 1004...1007, HSC_3 addr 1008...1011, HSC_4 addr 1012...1015, HSC_5 addr 1016..1019, HSC_6 addr 1020...1023, Pulse_1 addr 1000...1001, Pulse_2 addr 1002...1003, Pulse_3 addr 1004...1005, Pulse_4 addr 1006...1007"); 

    // PLC IEC Program instance
    const submodel_IECProgram_instance = server.coreaas.createSubmodel(server, "IEC Program Instance", Kind.Instance, "IECProgram", "http://http://www.test.com/IECProgram5", KeyElements.Submodel, "http://http://www.test.com/IECProgramType", aas_plc);
    const file_programfile_instance1 = server.coreaas.createSubmodelFile(server, "Program File Instance 1", Kind.Instance, "ProgramFile", undefined, KeyElements.ConceptDescription, "", "TODO_MIME_TYPE", "TODO_FILE_URI"); 
    const property_programname_instance1 = server.coreaas.createSubmodelProperty(server, "IEC Program Name Instance 1", Kind.Instance, "Name", undefined, KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "Main Program"); 
    const property_programdescription_instance1 = server.coreaas.createSubmodelProperty(server, "IEC Program Description Instance 1", Kind.Instance, "Description", undefined, KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "The main program of the resource"); 
    const property_language_instance1 = server.coreaas.createSubmodelProperty(server, "IEC Program Language Instance 1", Kind.Instance, "Language", undefined, KeyElements.ConceptDescription, "", PropertyCategory.CONSTANT, PropertyValueType.String, "String", DataType.String, "Ladder"); 
    const relelement_associatedresource_instance1 = server.coreaas.createSubmodelRelationshipElement(server, "Associated Resource Instance 1", Kind.Instance, "AssociatedResource", undefined, KeyElements.ConceptDescription, "", "MainProgram", KeyElements.SubmodelElementCollection, KeyType.idShort, "http://http://www.test.com/IECResource5", KeyElements.Submodel, KeyType.URI); 
    // No associated task needed - const relelement_associatedtask_instance1 = server.coreaas.createSubmodelRelationshipElement(server, "Associated Task Instance 1", Kind.Instance, "AssociatedTask", undefined, KeyElements.ConceptDescription, "", "MainProgram", KeyElements.SubmodelElementCollection, KeyType.idShort, "", KeyElements.SubmodelElementCollection, KeyType.idShort); 
    const elemcollection_program_instance1 = server.coreaas.createSubmodelElementCollection(server, "Main Program", Kind.Instance, "MainProgram", submodel_IECProgram_instance, KeyElements.ConceptDescription, "", [file_programfile_instance1, property_programname_instance1, property_programdescription_instance1, property_language_instance1, relelement_associatedresource_instance1]);

    // PLC IEC Task instance
    const submodel_IECTask_instance = server.coreaas.createSubmodel(server, "IEC Task Instance", Kind.Instance, "IECTask", "http://http://www.test.com/IECTask5", KeyElements.Submodel, "http://http://www.test.com/IECTaskType", aas_plc);

    // PLC IEC Communication instance
    const submodel_IECCommunication_instance = server.coreaas.createSubmodel(server, "IEC Communication Instance", Kind.Instance, "IECCommunication", "http://http://www.test.com/IECCommunication5", KeyElements.Submodel, "http://http://www.test.com/IECCommunicationType", aas_plc);
    const property_sendclocktime_instance = server.coreaas.createSubmodelProperty(server, "IEC Communication Send Clock Time Instance", Kind.Instance, "SendClockTime", undefined, KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 1.0); 
    const property_ipaddress_instance = server.coreaas.createSubmodelProperty(server, "IEC Communication IP Address Instance", Kind.Instance, "IPAddress", undefined, KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "192.168.1.1"); 
    const property_bandwidth_instance = server.coreaas.createSubmodelProperty(server, "IEC Communication Bandwidth Instance", Kind.Instance, "Bandwidth", undefined, KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.14); 
    const property_devicetype_instance = server.coreaas.createSubmodelProperty(server, "IEC Communication Device Instance Instance", Kind.Instance, "DeviceType", undefined, KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "IO Controller"); 
    const elemcollection_profinetIO_instance = server.coreaas.createSubmodelElementCollection(server, "Profinet IO", Kind.Instance, "ProfinetIO", submodel_IECCommunication_instance, KeyElements.ConceptDescription, "", [property_sendclocktime_instance, property_ipaddress_instance, property_bandwidth_instance, property_devicetype_instance]);


    /************************ Concept Dictionary  ************************/

    /** Add Dictionary */
    const conceptDictionary = server.coreaas.createConceptDictionary(server, [aas_mps, aas_ahbw, aas_sl, aas_vg], 98, "ConceptDictionary", "ConceptDictionary", "AAS Concept Dictionary", "AAS Concept Dictionary");
    
    /** Add ConceptDescriptions to the Dictionary */
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_identification_type], "Submodel - Identification", "Identification", "Submodel contenente informazioni sull'identificazione dell'asset", "", "http://www.test.com/001");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_asn_type], "Property - Asset serial number", "Asset serial number", "Numero seriale dell'asset", "", "http://www.test.com/002");
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_configuration_type], "Submodel - Configuration", "Configuration", "Submodel contenente informazioni sulla configurazione dell'asset", "", "http://www.test.com/003");
    server.coreaas.createConceptDescription(server, conceptDictionary, [file_datasheet_type], "File - Datasheet", "Datasheet", "File contenente il datasheet dell'asset", "", "http://www.test.com/004");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_manufacturer_type], "Property - Asset Manufacturer", "Asset Manufacturer", "Produttore dell'asset", "", "http://www.test.com/005");
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_vacuum_gripper_oven_type, submodel_vacuum_gripper_robot_type], "Submodel - Vacuum Gripper", "Vacuum Gripper", "Elemento responsabile dello spostamento dei blocchi di produzione", "", "http://www.test.com/006");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_pickup_type], "Operation - Pick Up", "Pick Up", "Operazione di sollevamento del blocco di produzione per effettuarne lo spostamento", "", "http://www.test.com/007");
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_oven_type], "Submodel - Oven", "Oven", "Forno per il processamento dei blocchi di produzione", "", "http://www.test.com/008");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_terminal_type], "Property - Terminal", "Terminal", "Terminale di input o output", "V", "http://www.test.com/009");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_burn_type], "Operation - Burn", "Burn", "Operazione di accensione del forno", "", "http://www.test.com/010");
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_turntable_type], "Submodel - Turntable", "Turntable", "Elemento preposto alla rotazione dei blocchi di produzione", "", "http://www.test.com/011");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_activatesaw_type], "Operation - Activate Saw", "Activate Saw", "Operazione di attivazione della sega circolare per la lavorazione del blocco di produzione", "", "http://www.test.com/013");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_ejection_type], "Operation - Ejection", "Ejection", "Operazione di emissione del blocco di produzione dalla turntable al nastro trasportatore", "", "http://www.test.com/014");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_activatebelt_type], "Operation - Activate Belt", "Activate Belt", "Operazione di abilitazione del nastro trasportatore per lo spostamento dei blocchi di produzione", "", "http://www.test.com/015");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_terminal1c_instance, property_terminal3a_instance, property_terminal4c_instance], "Property - Motor Terminal", "Motor Terminal", "Terminale relativo ad un motorino elettrico", "V", "http://www.test.com/017");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_setdown_type], "Operation - Set Down", "Set Down", "Operazione di rilascio del blocco di produzione per effettuarne lo spostamento", "", "http://www.test.com/018");
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_sortingline_type], "Submodel - Sorting Line", "Sorting Line", "Elemento responsabile del riconoscimento del colore dei blocchi di produzione e del loro smistamento nei rispettivi magazzini", "", "http://www.test.com/022");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_colordetection_type], "Operation - Color Detection", "Color Detection", "Operazione di riconoscimento del colore del blocco di produzione", "", "http://www.test.com/023");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_slEjection_type], "Operation - Ejection", "Ejection", "Operazione di espulsione di un blocco di produzione verso un magazzino", "", "http://www.test.com/024");
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_ahbwarehouse_type], "Submodel - AHBWarehouse", "AHBWarehouse", "Submodel per la gestione dei pezzi nel magazzino", "", "http://www.test.com/026");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_retrieving_type], "Operation - Retrieving", "Retrieving", "Operazione di recupero di un blocco di produzione dal magazzino", "", "http://www.test.com/028");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_move_robot_type], "Operation - Move", "Move", "Operazione di spostamento del braccio del vacuum gripper. Prende in input le coordinate di destinazione (x,y,z)", "", "http://www.test.com/029");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_move_type], "Operation - Move", "Move", "Operazione di spostamento del braccio del vacuum gripper dalla posizione iniziale a quella finale", "", "http://www.test.com/030");
    server.coreaas.createConceptDescription(server, conceptDictionary, [operation_turn_type], "Operation - Turn", "Turn", "Operazione di rotazione della turntable per portare il blocco in prossimità della sega", "", "http://www.test.com/031");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_terminal1a_instance, property_terminal2a_instance, property_terminal2b_instance, property_terminal2c_instance, property_terminal4a_instance, property_terminal4b_instance], "Property - Switch Terminal", "Switch Terminal", "Terminale relativo ad uno switch", "V", "http://www.test.com/040");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_terminal1b_instance, property_terminal3b_instance], "Property - Light barrier Terminal", "Light barrier Terminal", "Terminale relativo ad un sensore luminoso", "V", "http://www.test.com/041");
    server.coreaas.createConceptDescription(server, conceptDictionary, [file_programfile_type], "File - Program File", "ProgramFile", "Link ad un file contenente un programma IEC", "", "http://www.test.com/052");
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_IOModule_type], "Submodel - IO Module", "IOModule", "Submodel contenente informazioni sui moduli di IO aggiuntivi", "", "http://www.test.com/053");
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_IO_type], "Submodel - IO", "IO", "Submodel contenente informazioni sugli I/O dell'Asset", "", "http://www.test.com/054");
    server.coreaas.createConceptDescription(server, conceptDictionary, [elemcollection_program_type], "Elem. Collection - IEC Program", "Program", "Collection element contenente informazioni su un programma IEC", "", "http://www.test.com/055");
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_IECConfiguration_type], "Submodel - IEC Configuration", "IECConfiguration", "Submodel contenente informazioni relative alla configurazione conforme allo standard IEC61131-3", "", "http://www.test.com/056");
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_IECResource_type], "Submodel - IEC Resource", "IEC Resource", "Submodel contenente informazioni relative alla risorsa conforme allo standard IEC61131-3", "", "http://www.test.com/057");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_resourcedescription_type], "Property - IEC Resource Description", "Description", "Proprietà che descrive la risorsa IEC", "", "http://www.test.com/058");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_resourceaddresslist_type], "Property - IEC Resource Address List", "Address List", "Proprietà che descrive gli indirizzi della risorsa", "", "http://www.test.com/059");
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_IECProgram_type], "Submodel - IEC Program", "IEC Program", "Submodel contenente informazioni relative ai programmi conformi allo standard IEC61131-3", "", "http://www.test.com/060");
    server.coreaas.createConceptDescription(server, conceptDictionary, [relelement_resourceassociatedconfiguration_type], "Rel. Element - AssociatedC onfiguration", "AssociatedConfiguration", "Relazione di appartenenza di una risorsa ad una configurazione", "", "http://www.test.com/061");
    server.coreaas.createConceptDescription(server, conceptDictionary, [relelement_associatedresource_type], "Rel. Element - Associated Resource", "AssociatedResource", "Relazione di appartenenza di un programma ad una risorsa", "", "http://www.test.com/062");
    server.coreaas.createConceptDescription(server, conceptDictionary, [relelement_associatedtask_type], "Rel. Element - Associated Task", "AssociatedTask", "Relazione di appartenenza di un task ad un programma. Il valore indica il codice dell'OB", "", "http://www.test.com/063");
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_IECCommunication_type], "Submodel - IEC Communication", "IECCommunication", "Submodel contenente informazioni relative alla modalità di comunicazione del PLC", "", "http://www.test.com/065");
    server.coreaas.createConceptDescription(server, conceptDictionary, [elemcollection_profinetIO_type], "Elem. Collection - Profinet IO", "ProfinetIO", "Collection element contenente informazioni relative alla modalità di comunicazione Profinet IO del PLC", "", "http://www.test.com/066");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_devicetype_type], "Property - Device Type", "DeviceType", "Proprietà indicante il tipo di dispositivo: IO Controller o IO Device nel caso di ProfinetIO, Master o Slave nel caso di ProfibusDP", "", "http://www.test.com/067");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_sendclocktime_type], "Property - Send Clock Time", "SendClockTime", "valore reale indicante il l'intervallo di scambio dati tra controller e device. Da usare solo nel caso in cui il tipo sia IO Controller", "ms", "http://www.test.com/068");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_respctrtime_type], "Property - Response Control Time", "ResponseControlTime", " valore intero che indica quanti cicli di aggiornamento senza IO sono accettati. Da indicare solo nel caso in cui il tipo sia IO Device.", "", "http://www.test.com/070");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_bandwidth_type], "Property - Bandwidth", "Bandwidth", "reale indicante la massima larghezza di banda utilizzabile per lo scambio dati real time. Da indicare solo nel caso in cui il tipo sia IO Controller.", "ms", "http://www.test.com/071");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_ipaddress_type], "Property - IP Address", "IPAddress", "indirizzo IP del dispositivo Profinet IO", "", "http://www.test.com/072");
    server.coreaas.createConceptDescription(server, conceptDictionary, [elemcollection_profibusDP_type], "Elem. Collection - Profibus DP", "ProfibusDP", "Submodel contenente informazioni relative alla modalità di comunicazione Profibus DP del PLC ", "", "http://www.test.com/073");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_bitrate_type], "Property - Bit Rate", "BitRate", "bit rate della comunicazione Profibus DP", "Kbps", "http://www.test.com/074");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_profibusaddress_type], "Property - Profibus Address", "ProfibusAddress", "indirizzo profibus DP del device", "", "http://www.test.com/075");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_hsa_type], "Property - Highest Station Address", "HSA", "intero che indica il valore dell'indirizzo più alto ammissibile per una stazione attiva", "", "http://www.test.com/076");
    server.coreaas.createConceptDescription(server, conceptDictionary, [submodel_IECTask_type], "IEC Task", "IECTask", "Submodel contenente informazioni relative ai task conforme allo standard IEC61131-3", "", "http://www.test.com/077");
    server.coreaas.createConceptDescription(server, conceptDictionary, [elemcollection_OBcyclicinterrupt_type], "Cyclic Interrupt", "CyclicInterrupt", "Collection element contenente informazioni relative ai task ciclici", "", "http://www.test.com/078");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_OBnumber_type], "Property - OB Number", "OBnumber", "Intero indicante il numero dell'Organization Block (OB)", "", "http://www.test.com/079");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_priority_type], "Property - Priority", "Priority", "Intero indicante la priorità dell'Organization Block (OB)", "", "http://www.test.com/080");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_period_type], "Property - Period", "Period", "Periodo dell'OB schedulazione d'orologio", "", "http://www.test.com/081");
    server.coreaas.createConceptDescription(server, conceptDictionary, [elemcollection_OBhwInterrupt_type], "Elem. Collection - Hardware Interrupt", "HardwareInterrupt", "Collection element contenente informazioni relative ai task di interrupt hardware", "", "http://www.test.com/082");
    server.coreaas.createConceptDescription(server, conceptDictionary, [property_triggerInputChannel_type], "Property - Trigger Input Channel", "TriggerInputChannel", "Canale di input d'innesco", "", "http://www.test.com/083");

    
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
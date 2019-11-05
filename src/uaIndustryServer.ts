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


    /************************ AAS MultiProcessingStation  ************************/
    
    /** AAS */
    const aas_mps = server.coreaas.createAssetAdministrationShell(server, "AAS_MPS", admin, "Multi Processing Station AAS", "Multi Processing Station AAS", "www.test.com/aas-mps/1.0", "http://www.test.com/536632", ["http://www.test.com/identification1"]);
        
    /** Assets */
    server.coreaas.createAsset(server, "MultiProcessingStation536632", Kind.Instance, "536632", "http://www.test.com/536632", "Asset Multi Processing Station 536632", "Asset Multi Processing Station 536632", aas_mps, "http://www.test.com/identification1");

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
    const operation_pickup_type = server.coreaas.createSubmodelOperation(server, "Pick Up Type", Kind.Type, "PickUp", submodel_vacuum_gripper_oven_type, KeyElements.ConceptDescription, "www.test.com/007"); 
    const operation_setdown_type = server.coreaas.createSubmodelOperation(server, "Set Down Type", Kind.Type, "SetDown", submodel_vacuum_gripper_oven_type, KeyElements.ConceptDescription, "www.test.com/018"); 
    const opearation_move_type = server.coreaas.createSubmodelOperation(server, "Move Type", Kind.Type, "Move", submodel_vacuum_gripper_oven_type, KeyElements.ConceptDescription, "www.test.com/030"); 
    
    // Oven type
    const submodel_oven_type = server.coreaas.createSubmodel(server, "Oven Type", Kind.Type, "Oven", "http://www.test.com/ovenType", KeyElements.ConceptDescription, "http://www.test.com/008", aas_mps);
    const operation_burn_type = server.coreaas.createSubmodelOperation(server, "Burn Type", Kind.Type, "Burn", submodel_oven_type, KeyElements.ConceptDescription, "www.test.com/010"); 

    // Turntable type
    const submodel_turntable_type = server.coreaas.createSubmodel(server, "Turntable Type", Kind.Type, "Turntable", "http://www.test.com/turntableType", KeyElements.ConceptDescription, "http://www.test.com/011", aas_mps);
    const property_terminal_type = server.coreaas.createSubmodelProperty(server, "Terminal Type", Kind.Type, "Terminal", [submodel_oven_type, submodel_vacuum_gripper_oven_type, submodel_turntable_type], KeyElements.ConceptDescription, "www.test.com/009", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0); 
    const operation_turn_type = server.coreaas.createSubmodelOperation(server, "Turn Type", Kind.Type, "Turn", submodel_turntable_type, KeyElements.ConceptDescription, "www.test.com/031"); 
    const operation_activatesaw_type = server.coreaas.createSubmodelOperation(server, "Activate Saw Type", Kind.Type, "ActivateSaw", submodel_turntable_type, KeyElements.ConceptDescription, "www.test.com/013"); 
    const operation_ejection_type = server.coreaas.createSubmodelOperation(server, "Ejection Type", Kind.Type, "Ejection", submodel_turntable_type, KeyElements.ConceptDescription, "www.test.com/014"); 
    const operation_activatebelt_type = server.coreaas.createSubmodelOperation(server, "Activate Belt Type", Kind.Type, "ActivateBelt", submodel_turntable_type, KeyElements.ConceptDescription, "www.test.com/015"); 

    /** Submodels and Submodels elements INSTANCES */
    // Identification instance
    const submodel_identification_instance = server.coreaas.createSubmodel(server, "Identification Instance 1", Kind.Instance, "Identification", "http://www.test.com/identification1", KeyElements.Submodel, "http://www.test.com/identificationType", aas_mps);
    server.coreaas.createSubmodelProperty(server, "Asset Serial Number Instance 1", Kind.Instance, "AssetSerialNumber", [submodel_identification_instance], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "TODO"); 
    server.coreaas.createSubmodelProperty(server, "Asset Manufacturer Instance 1", Kind.Instance, "AssetManufacturer", [submodel_identification_instance], KeyElements.ConceptDescription, "", PropertyCategory.VARIABLE, PropertyValueType.String, "String", DataType.String, "Fischertechnik"); 
    
    // Configuration instance
    const submodel_configuration_instance = server.coreaas.createSubmodel(server, "Configuration Instance 1", Kind.Instance, "Configuration", "http://www.test.com/configuration1", KeyElements.Submodel, "http://www.test.com/configurationType", aas_mps);
    server.coreaas.createSubmodelFile(server, "Data Sheet Instance 1", Kind.Type, "DataSheet", submodel_configuration_instance, KeyElements.ConceptDescription, "", "application/json", "https://drive.google.com/file/d/1AqBTlzL6ZXX9i17vkJZnzRUSE5FdJhD_/view?usp=sharing"); 
    
    // VacuumGripperOven instance
    const submodel_vacuum_gripper_oven_instance = server.coreaas.createSubmodel(server, "Vacuum Gripper Oven Instance 1", Kind.Instance, "VacuumGripperOven", "http://www.test.com/gripper1", KeyElements.Submodel, "http://www.test.com/gripperType", aas_mps);
    const property_terminal1a_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 1a", Kind.Instance, "Terminal", [submodel_vacuum_gripper_oven_instance], KeyElements.ConceptDescription, "www.test.com/040", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0); 
    server.coreaas.createSubmodelOperation(server, "Pick Up Instance 1", Kind.Instance, "PickUp", submodel_vacuum_gripper_oven_instance, 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Set Down Instance 1", Kind.Instance, "SetDown", submodel_vacuum_gripper_oven_instance, 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Move Instance 1", Kind.Instance, "Move", submodel_vacuum_gripper_oven_instance, 0, ""); 
    
    // Oven instance
    const submodel_oven_instance = server.coreaas.createSubmodel(server, "Oven Instance 1", Kind.Instance, "Oven", "http://www.test.com/oven1", KeyElements.Submodel, "http://www.test.com/ovenType", aas_mps);
    const property_terminal1b_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 1b", Kind.Instance, "Terminal", [submodel_oven_instance], KeyElements.ConceptDescription, "www.test.com/041", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0); 
    server.coreaas.createSubmodelOperation(server, "Burn Instance 1", Kind.Instance, "Burn", submodel_oven_instance, 0, ""); 

    // Turntable instance
    const submodel_turntable_instance = server.coreaas.createSubmodel(server, "Turntable Instance 1", Kind.Instance, "Turntable", "http://www.test.com/turntable1", KeyElements.Submodel, "http://www.test.com/turntableType", aas_mps);
    const property_terminal1c_instance = server.coreaas.createSubmodelProperty(server, "Terminal Instance 1c", Kind.Instance, "Terminal", [submodel_turntable_instance], KeyElements.ConceptDescription, "www.test.com/017", PropertyCategory.VARIABLE, PropertyValueType.Float, "Float", DataType.Float, 0.0); 
    server.coreaas.createSubmodelOperation(server, "Turn Instance 1", Kind.Instance, "Turn", submodel_turntable_instance, 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Activate Saw Instance 1", Kind.Instance, "ActivateSaw", submodel_turntable_instance, 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Ejection Instance 1", Kind.Instance, "Ejection", submodel_turntable_instance, 0, ""); 
    server.coreaas.createSubmodelOperation(server, "Activate Belt Instance 1", Kind.Instance, "ActivateBelt", submodel_turntable_instance, 0, ""); 


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
        console.log(" the primary server endpoint url is ", endpointUrl );
    });
}

server.initialize(postInitialize);
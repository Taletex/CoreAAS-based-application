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


    /************************ START ADDRESS SPACE DEFINITION  ************************/
    
    /** AAS */
    const aas_mps = server.coreaas.createAssetAdministrationShell(server, "AAS_MPS", admin, "Multi Processing Station AAS", "Multi Processing Station AAS", "www.test.com/aas-mps/1.0", "http://www.test.com/536632", ["http://www.test.com/identification1"]);
        
    /** Assets */
    server.coreaas.createAsset(server, "MultiProcessingStation536632", "536632", "http://www.test.com/536632", Kind.Instance, "Asset Multi Processing Station 536632", "Asset Multi Processing Station 536632", aas_mps, "http://www.test.com/identification1");

    /** Submodels and Submodels elements TYPES */
    // Identification
    const submodel_identification_type = server.coreaas.createSubmodel(server, "Identification_type", Kind.Type, "Identification", "http://www.test.com/identificationType", KeyElements.ConceptDescription, "http://www.test.com/001", aas_mps);
    server.coreaas.createSubmodelProperty(server, "assetSerialNumber", Kind.Type, "assetSerialNumber", submodel_identification_type, KeyElements.ConceptDescription, "www.test.com/002", PropertyCategory.CONSTANT, PropertyValueType.String, "String", DataType.String, ""); 

    /** Add Dictionary */
    const conceptDictionary = server.coreaas.createConceptDictionary(server, aas_mps, 90, "ConceptDictionary", "ConceptDictionary", "AAS Concept Dictionary", "AAS Concept Dictionary");
    
    /** Add ConceptDescriptions to the Dictionary */
    server.coreaas.createConceptDescription(server, conceptDictionary, submodel_identification_type, "identification", "identification", "submodel contenente informazioni sull'identificazione dell'asset", "", "www.test.com/001");

    /************************ END ADDRESS SPACE DEFINITION  ************************/

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
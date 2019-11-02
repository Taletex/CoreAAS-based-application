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
    const aas_mps = server.coreaas.addAssetAdministrationShell({
        browseName: "AAS_MPS",
        administration: admin,
        description: [  new LocalizedText({locale: "en", text: "Multi Processing Station AAS"}),
                        new LocalizedText({locale: "it", text: "Multi Processing Station AAS"}) ],
        identification: new Identifier({
            id: "www.test.com/aas-mps/1.0",
            idType: IdentifierType.URI
        }),
        assetRef: [new Key({
            idType: KeyType.URI,
            local: true,
            type: KeyElements.Asset,
            value: "http://www.test.com/536632"
        })]
    })
    .addSubmodelRef([new Key({
        idType: KeyType.URI,
        local: true,
        type: KeyElements.Submodel,
        value: "http://www.test.com/identification1"
    })]);

    /** Assets */
    server.coreaas.addAsset({
        browseName: "MultiProcessingStation536632",
        idShort: "536632",
        identification: new Identifier({
            id: "http://www.test.com/536632",
            idType: IdentifierType.URI
        }),
        kind: Kind.Instance,
        description:  new LocalizedText({locale: "en", text: "Asset Multi Processing Station 536632"}),
        assetOf: aas_mps,
        assetIdentificationModelRef: [ new Key({
            idType: KeyType.URI,
            local: true,
            type: KeyElements.Submodel,
            value: "http://www.test.com/identificationType"
        }) ]
    });

    /** Submodels and Submodels elements TYPES */
    // Identification
    const submodel_identification_type = server.coreaas.addSubmodel({
        browseName: "Identification_type",
        kind: Kind.Type,
        idShort: "Identification",
        identification: new Identifier({
            id: "http://www.test.com/identificationType",
            idType: IdentifierType.URI
        }),
        semanticId: [ new Key({
            idType: KeyType.URI,
            local: false,
            type: KeyElements.GlobalReference,
            value: "http://www.test.com/001"
        })]
    }).submodelOf(aas_mps);

    const asset_serial_number = server.coreaas.addSubmodelProperty({
        browseName: "assetSerialNumber",
        idShort: "assetSerialNumber",
        submodelElementOf: submodel_identification_type,
        semanticId: [ new Key({
            idType: KeyType.URI,
            local: true,
            type: KeyElements.ConceptDescription,
            value: "www.test.com/002"
        }) ],
        category: PropertyCategory.VARIABLE,
        valueType: PropertyValueType.String,
        value: {
            dataType: "String",
            value: {
                get: () => {
                    return new Variant({ dataType: DataType.String, value: ""});
                }
            }
        }
    });

    /** Add Dictionary to the AAS */
    const conceptDictionary = server.coreaas.addConceptDictionaryToAAS(aas_mps, server, 100, "ConceptDictionary", "AAS Concept Dictionary");
    
    /** Add ConceptDescriptions to the Dictionary */
    server.coreaas.addConceptDescriptionToDictionary(server, conceptDictionary, submodel_identification_type, "identification", "identification", "submodel contenente informazioni sull'identificazione dell'asset", "", "", "identification", "www.test.com/001");

    /************************ END ADDRESS SPACE DEFINITION  ************************/


    const aas_1 = server.coreaas.addAssetAdministrationShell({
        browseName: "SampleAAS",
        administration: admin,
        description: [  new LocalizedText({locale: "en", text: "Festo Controller"}),
                        new LocalizedText({locale: "de", text: "Festo Controller"}) ],
        identification: new Identifier({
            id: "www.admin-shell.io/aas-sample/1.0",
            idType: IdentifierType.URI
        }),
        derivedFromRef: [ new Key({
            idType: KeyType.IRDI,
            local: false,
            type: KeyElements.AssetAdministrationShell,
            value: "AAA#1234-454#123456789"
        }) ],
        assetRef: [new Key({
            idType: KeyType.URI,
            local: true,
            type: KeyElements.Asset,
            value: "http://pk.festo.com/3S7PLFDRS35"
        })]
    })
    .addSubmodelRef([new Key({
        idType: KeyType.URI,
        local: true,
        type: KeyElements.Submodel,
        value: "http://www.zvei.de/demo/submodel/12345679"
    })]);

    /**
     * Add a Asset
     */
    server.coreaas.addAsset({
        browseName: "3S7PLFDRS35",
        idShort: "3S7PLFDRS35",
        identification: new Identifier({
            id: "http://pk.festo.com/3S7PLFDRS35",
            idType: IdentifierType.URI
        }),
        kind: Kind.Instance,
        description:  new LocalizedText({locale: "en", text: "Festo Controller"}),
        assetOf: aas_1,
        assetIdentificationModelRef: [ new Key({
            idType: KeyType.URI,
            local: false,
            type: KeyElements.SubmodelElement,
            value: "//submodels/identification_3S7PLFDRS35"
        }) ]
    });

    /**
     * Add Submodel
     */
    const submodel_1 = server.coreaas.addSubmodel({
        browseName: "12345679",
        kind: Kind.Instance,
        idShort: "12345679",
        identification: new Identifier({
            id: "http://www.zvei.de/demo/submodel/12345679",
            idType: IdentifierType.URI
        }),
        semanticId: [ new Key({
            idType: KeyType.URI,
            local: false,
            type: KeyElements.GlobalReference,
            value: "http://www.zvei.de/demo/submodelDefinitions/87654346"
        }) ]
    })
    .submodelOf(aas_1);

    /**
     * Add Properties to the submodel
     */
    const rotationSpeed = server.coreaas.addSubmodelProperty({
        browseName: "rotationSpeed",
        idShort: "rotationSpeed",
        submodelElementOf: submodel_1,
        semanticId: [ new Key({
            idType: KeyType.URI,
            local: true,
            type: KeyElements.ConceptDescription,
            value: "www.festo.com/dic/08111234"
        }) ],
        category: PropertyCategory.VARIABLE,
        valueType: PropertyValueType.Double,
        value: {
            dataType: "Double",
            value: {
                get: () => {
                    return new Variant({ dataType: DataType.Double, value: 1120});
                }
            }
        }
    });

    const nmax = server.coreaas.addSubmodelProperty({
        browseName: "NMAX",
        idShort: "NMAX",
        submodelElementOf: submodel_1,
        semanticId: [ new Key({
            idType: KeyType.IRDI,
            local: true,
            type: KeyElements.ConceptDescription,
            value: "0173-1#02-BAA120#007"
        }) ],
        category: PropertyCategory.PARAMETER,
        valueType: PropertyValueType.Double,
        value: {
            dataType: "Double",
            value: {
                get: () => {
                    return new Variant({ dataType: DataType.Double, value: 2000});
                }
            }
        }
    });

    /*
     * Add Dictionary to the AAS
     
    const conceptDictionary = server.coreaas.addConceptDictionary({
        browseName: "ConceptDict_1",
        idShort: "ConceptDictionary_1",
        conceptDictionaryOf: aas_1,
        description: [  new LocalizedText({locale: "en", text: "Dicitonary for the Festo Controller."}),
                        new LocalizedText({locale: "it", text: "Dizionario per il Controller Festo"}) ]
    })
    .addConceptDescriptionRef([
        new Key({
            idType: KeyType.URI,
            local: true,
            type: KeyElements.ConceptDescription,
            value: "www.festo.com/dic/08111234"
        })
    ])
    .addConceptDescriptionRef([
        new Key({
            idType: KeyType.IRDI,
            local: true,
            type: KeyElements.ConceptDescription,
            value: "0173-1#02-BAA120#007"
        })
    ]);

    /*
     * Add ConceptDescriptions to the Dictionary

    //Add an EmbeddedDataSpecification to the AAS for Rotation Speed
    const embedded_1 = server.coreaas.addEmbeddedDataSpecification({
        browseName: "EmbeddedDS_1",
        hasDataSpecification: [ new Key({
            idType: KeyType.URI,
            local: false,
            type: KeyElements.GlobalReference,
            value: "www.admin-shell.io/DataSpecificationTemplates/DataSpecificationIEC61360"
        }) ],
    })
    .addDataSpecificationIEC61360({
        identifier: "rtzspd#123",
        preferredName: "Rotation Speed",
        definition: "The Rotation Speed of something",
        dataType: "double",
        unit: "1/m",
        unitId: [ new Key({
            idType: KeyType.IRDI,
            local: false,
            type: KeyElements.GlobalReference,
            value: "0173-1#05-AAA650#002"
        }) ],
        shortName: "N",
        valueFormat: "NR1..5"
    });

    server.coreaas.addConceptDescription({
        browseName: "N",
        identification: new Identifier({
            id: "www.festo.com/dic/08111234",
            idType: IdentifierType.URI
        }),
        hasEmbeddedDataSpecifications: embedded_1,
        conceptDescriptionOf: conceptDictionary,
    })
    .semanticOf(rotationSpeed);

    //Add an EmbeddedDataSpecification to the AAS for Max Rotation Speed
    const embedded_2 = server.coreaas.addEmbeddedDataSpecification({
        browseName: "EmbeddedDS_1",
        hasDataSpecification: [ new Key({
            idType: KeyType.URI,
            local: false,
            type: KeyElements.GlobalReference,
            value: "www.admin-shell.io/DataSpecificationTemplates/DataSpecificationIEC61360"
        }) ],
    })
    .addDataSpecificationIEC61360({
        preferredName: "Max Rotation Speed",
        shortName: "NMAX",
        valueFormat: "NR1..5",
        unitId: [ new Key({
            idType: KeyType.IRDI,
            local: false,
            type: KeyElements.GlobalReference,
            value: "0173-1#05-AAA650#002"
        }) ]
    });

    server.coreaas.addConceptDescription({
        browseName: "NMax",
        identification: new Identifier({
            id: "0173-1#02-BAA120#007",
            idType: IdentifierType.IRDI
        }),
        hasEmbeddedDataSpecifications: embedded_2,
        conceptDescriptionOf: conceptDictionary
    })
    .semanticOf(nmax);
    */

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
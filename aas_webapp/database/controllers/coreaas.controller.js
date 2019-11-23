const Configuration = require('../models/coreaas.model.js');
const webAppBaseUrl = "http://localhost:8080/#coreaas/";
const webAppConfigUrl = webAppBaseUrl + "configurations/"


// Create and Save a new Configuration
exports.createConfiguration = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Configuration content can not be empty"
        });
    }

    // Create a Configuration
    const configuration = new Configuration({
        name: req.body.name || "Untitled Configuration", 
        islands: req.body.islands,
        description: req.body.description, 
        mapping: req.body.mapping,
        id: req.body.id
    });

    // Save Configuration in the database
    configuration.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Configuration."
        });
    });
};

// Retrieve and return all configurations from the database.
exports.findAllConfiguration = (req, res) => {
    Configuration.find()
    .then(configurations => {
        res.send(configurations);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving configurations."
        });
    });
};

// Find a single configuration with a id
exports.findOneConfiguration = (req, res) => {
    Configuration.find({id: webAppConfigUrl + req.params.id})
    .then(configuration => {
        if(!configuration) {
            return res.status(404).send({
                message: "Configuration not found with id " + req.params.id
            });            
        }
        res.send(configuration);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Configuration not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving configuration with id " + req.params.id
        });
    });
};

// Update a configuration identified by the id in the request
exports.updateConfiguration = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Configuration content can not be empty"
        });
    }

    // Find configuration and update it with the request body
    Configuration.findOneAndUpdate({id: webAppConfigUrl + req.params.id}, {
        name: req.body.name || "Untitled Configuration", 
        islands: req.body.islands,
        description: req.body.description, 
        mapping: req.body.mapping,
        id: req.body.id
    }, {new: true})
    .then(configuration => {
        if(!configuration) {
            return res.status(404).send({
                message: "Configuration not found with id " + req.params.id
            });
        }
        res.send(configuration);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Configuration not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating configuration with id " + req.params.id
        });
    });
};

// Delete a configuration with the specified id in the request
exports.deleteConfiguration = (req, res) => {
    Configuration.findOneAndRemove({id: webAppConfigUrl + req.params.id})
    .then(configuration => {
        if(!configuration) {
            return res.status(404).send({
                message: "Configuration not found with id " + req.params.id
            });
        }
        res.send({message: "Configuration deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Configuration not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete configuration with id " + req.params.id
        });
    });
};

// Upload a configuration with id
exports.uploadConfiguration = (req, res) => {
    Configuration.find({id: webAppConfigUrl + req.params.id})
    .then(configuration => {
        if(!configuration) {
            return res.status(404).send({
                message: "Configuration not found with id " + req.params.id
            });            
        }

        // Modifica i file .st e .xml


        // Carica i file .st sul runtime
        

        res.send(configuration);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Configuration not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving configuration with id " + req.params.id
        });
    });
};
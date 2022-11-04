const AccountController = require("../model/accountModel.js");

// Retrieve all Advertisement from the database (without condition).
exports.findAll = (req, res) => {
    AccountController.getAccounts((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};

// Find a single Advertisements with a id
exports.findWithID = (req, res) => {
    AccountController.getAccountbyID(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Tutorial with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Find a single Advertisements with a id
exports.findWithEmail = (req, res) => {
    AccountController.getAccountbyemail(req.params.email, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.send("error");
            } else {
                res.status(500).send({
                    message: "Error retrieving Account with email " + req.params.id
                });
            }
        } else res.send(data);
    });
};


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const account = new AccountController({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: 0,
        phone: req.body.phone,
        city: req.body.city,
        wishpost: req.body.wishpost
    });
    // Save Tutorial in the database
    AccountController.create(account, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        else res.send(data);
    });
};
exports.setCompany = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);

    console.log(req.body);
    const account = new AccountController({
        companies: req.body.companies,
        role: req.body.role,

    });
    AccountController.setCompanie(
        req.params.id,
        account,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Tutorial with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Tutorial with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);

    const account = new AccountController({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        city: req.body.city,
        wishpost: req.body.wishpost,

    });
    AccountController.updateValue(
        req.params.id,
        account,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Tutorial with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Tutorial with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.check = (req, res) => {
    AccountController.checkPassword(req.body.email,req.body.password, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.send({
                    message: `Not  Account with email ${req.body.email} and password.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Account with email " + req.body.email
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    AccountController.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Tutorial with id " + req.params.id
                });
            }
        } else res.send({ message: `Advertisement was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    AccountController.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        else res.send({ message: `All Tutorials were deleted successfully!` });
    });
};
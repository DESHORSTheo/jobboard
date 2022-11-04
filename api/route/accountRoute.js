module.exports = app => {
    const account = require("../controller/accountController.js");

    var router = require("express").Router();

    // Retrieve all Advertisements
    router.get("/", account.findAll);

    // Retrive 1 Advertisements
    router.get("/id/:id", account.findWithID);

    // Retrive 1 Advertisements
    router.get("/email/:email", account.findWithEmail);

    router.post("/companie/:id", account.setCompany);
    router.post("/verif/", account.check);

    // Create a new Advertisement
    router.post("/", account.create);

    //Update a Tutorial with id
    router.put("/:id", account.update);

    // Delete a Tutorial with id
    router.delete("/:id", account.delete);

    // Delete all Tutorials
    router.delete("/", account.deleteAll);

    app.use('/api/account', router);
};
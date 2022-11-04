module.exports = app => {
    const companies = require("../controller/companiesController.js");

    var router = require("express").Router();

    // Retrieve all Advertisements
    router.get("/", companies.findAll);

    router.get("/members/:id", companies.AllMember);
    router.get("/adv/:id", companies.AllAdv);

    // Retrive 1 Advertisements
    router.get("/:id", companies.findOne);

    // Create a new Advertisement
    router.post("/", companies.create);

    //Update a Tutorial with id
    router.put("/:id", companies.update);

    // Delete a Tutorial with id
    router.delete("/:id", companies.delete);

    // Delete all Tutorials
    router.delete("/", companies.deleteAll);

    app.use('/api/companies', router);
};
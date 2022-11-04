module.exports = app => {
    const advertisement = require("../controller/advertisementsController.js");

    var router = require("express").Router();

    // Retrieve all Advertisements
    router.get("/", advertisement.findAll);

    // Retrive 1 Advertisements
    router.get("/:id", advertisement.findOne);

    router.get("/all/:id", advertisement.getOfCompany);

    // Create a new Advertisement
    router.post("/", advertisement.create);

    //Update a Tutorial with id
    router.put("/:id", advertisement.update);

    router.put("/adm/:id", advertisement.updateadm);

    // Delete a Tutorial with id
    router.delete("/:id", advertisement.delete);

    // Delete all Tutorials
    router.delete("/", advertisement.deleteAll);

    app.use('/api/advertisements', router);
};
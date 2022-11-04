module.exports = app => {
    const adcontrol = require("../controller/adcontrolController.js");

    var router = require("express").Router();

    // Retrieve all Advertisements
    router.get("/", adcontrol.findAll);

    router.get("/ad/:id", adcontrol.findApplyOfAd);
    // Retrive 1 Advertisements
    router.get("/:id", adcontrol.findOne);

    // Create a new Advertisement
    router.post("/", adcontrol.create);

    //Update a Tutorial with id
    router.put("/:id", adcontrol.update);

    // Delete a Tutorial with id
    router.delete("/:id", adcontrol.delete);

    // Delete all Tutorials
    router.delete("/", adcontrol.deleteAll);

    app.use('/api/adcontrol', router);
};
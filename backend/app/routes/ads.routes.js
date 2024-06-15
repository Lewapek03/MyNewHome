module.exports = (app) => {
  const ads = require("../controllers/ads.controller.js");
  const router = require("express").Router();

  router.post("/", ads.create);

  router.get("/", ads.findAll);

  router.get("/published", ads.findAllPublished);

  router.get("/:id", ads.findOne);

  router.put("/:id", ads.update);

  router.delete("/:id", ads.delete);

  router.delete("/", ads.deleteAll);

  app.use("/api/ads", router);
};

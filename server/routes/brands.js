const router = require("express").Router();

const { brandController } = require("../controllers");
const { isAuth, isAdmin } = require("../middleware");

const { processFile } = require("../utils");

router
  .route("/")
  .get(brandController.getMany)
  .post(
    isAuth,
    isAdmin,
    processFile.uploadFile("image", false),
    brandController.addOne
  );

router
  .route("/:id")
  .delete(isAuth, isAdmin, brandController.deleteOne)
  .put(
    isAuth,
    isAdmin,
    processFile.uploadFile("image", false),
    brandController.updateOne
  );

router.route("/:slug").get(brandController.getManyBySlug);

module.exports = router;

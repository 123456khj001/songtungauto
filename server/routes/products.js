const router = require("express").Router();

const { productController } = require("../controllers");
const { isAuth, isAdmin } = require("../middleware");
const { processFile } = require("../utils");

router
  .route("/")
  .get(productController.getMany)
  .post(
    isAuth,
    isAdmin,
    processFile.uploadFile("image", true),
    productController.addOne
  );

router
  .route("/:id")
  .put(
    isAuth,
    isAdmin,
    processFile.uploadFile("image", true),
    productController.updateOne
  )
  .delete(isAuth, isAdmin, productController.deleteOne);

module.exports = router;

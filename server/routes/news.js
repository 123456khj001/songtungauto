const router = require("express").Router();

const { newController } = require("../controllers");
const { isAuth, isAdmin } = require("../middleware");

const { processFile } = require("../utils");

router
  .route("/")
  .get(newController.getMany)
  .post(
    isAuth,
    isAdmin,
    processFile.uploadFile("image", false),
    newController.addOne
  );

router
  .route("/:id")
  .put(
    isAuth,
    isAdmin,
    processFile.uploadFile("image", false),
    newController.updateOne
  )
  .delete(isAuth, isAdmin, newController.deleteOne);

module.exports = router;

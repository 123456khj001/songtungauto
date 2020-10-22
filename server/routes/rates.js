const router = require("express").Router();

const { rateController } = require("../controllers");
const { isAuth, isAdmin } = require("../middleware");

router
  .route("/")
  .get(isAuth, isAdmin, rateController.getMany)
  .post(isAuth, rateController.addOne);

router.route("/:id").delete(isAuth, isAdmin, rateController.deleteOne);

module.exports = router;

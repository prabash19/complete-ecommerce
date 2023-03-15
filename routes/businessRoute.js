const express = require("express");
const {
  createShop,
  getAllShops,
  getShopById,
  updateShop,
  deleteShop,
} = require("../controllers/shopController");
const {
  isAuthenticatedUser,
  authorizedRoles,
} = require("../middleware/authUserRole");
const router = express.Router();

router
  .route("/")
  .get(isAuthenticatedUser, authorizedRoles("User"), getAllShops)
  .post(isAuthenticatedUser, createShop);

router.route("/:id").patch(updateShop).delete(deleteShop).get(getShopById);

module.exports = router;

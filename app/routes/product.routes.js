const router = require("express").Router();

const products = require("../controllers/product.controller.js");
const { authClient, ACL } = require("../middleware");
module.exports = app => {
    
    router.post("/", authClient, ACL, products.addProduct);
  
    router.put("/", authClient, ACL, products.updateProduct);

    
    router.patch("/", authClient, ACL, products.updateProduct);

    router.delete("/", authClient, ACL, products.deleteProduct);

    router.get("/", authClient, ACL, products.getProduct);
  
    app.use('/api/product', router);
  };
  
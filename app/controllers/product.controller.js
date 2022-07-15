module.exports = {
    /**
   * Use to add a product
   * @param {*} req 
   * @param {*} res 
   */
    addProduct: async (req, res) => {
        res.status(201).send({
            message: "Products added successfully"
        })
    },

    /**
   * Use to update a product
   * @param {*} req 
   * @param {*} res 
   */
    updateProduct: async (req, res) => {
        res.status(200).send({
            message: "Products updated successfully"
        })
    },

    /**
   * Use to delete a product
   * @param {*} req 
   * @param {*} res 
   */
    deleteProduct: async (req, res) => {
        res.status(200).send({
            message: "Products delete successfully"
        })
    },

    /**
   * Use to get products
   * @param {*} req 
   * @param {*} res 
   */
    getProduct: async (req, res) => {
        res.status(200).send({
            message: "Products sent successfully"
        })
    }
}
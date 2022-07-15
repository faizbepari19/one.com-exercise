module.exports = {
    addProduct: async (req, res) => {
        res.status(201).send({
            message: "Products added successfully"
        })
    },

    updateProduct: async (req, res) => {
        res.status(200).send({
            message: "Products updated successfully"
        })
    },

    deleteProduct: async (req, res) => {
        res.status(200).send({
            message: "Products delete successfully"
        })
    },

    getProduct: async (req, res) => {
        res.status(200).send({
            message: "Products sent successfully"
        })
    }
}
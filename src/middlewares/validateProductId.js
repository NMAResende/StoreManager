const validateProductId = async (req, res, next) => {
const productId = req.body;

  const idAll = productId.map((product) => product.productId);
  // algum produto não existe
  const someId = idAll.some((id) => !id);
  if (someId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
};

module.exports = {
  validateProductId,
};
const validateProductId = (req, res, next) => {
  const { productId } = req.body;

  const idAll = productId.map((product) => product.id.productId);
  const someId = idAll.some((id) => !id);
  if (!someId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  
  const find = productId.find((prodId) => prodId === productId);
  if (!find) {
    return res.status(422).json({ message: 'Product not found' });
  }

  next();
};

module.exports = {
  validateProductId,
};
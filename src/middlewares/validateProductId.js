const validateProductId = (req, res, next) => {
  const { productId } = req.body;
  
  const find = productId.find((prodId) => !prodId);
  if (find) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (!productId) {
    return res.status(422).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  validateProductId,
};
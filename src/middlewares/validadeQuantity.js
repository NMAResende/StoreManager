const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;

  const quanAll = quantity.map((q) => q.quantity);
  const someQuan = quanAll.some((q) => !q);
  
  if (!someQuan) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  const quan = quanAll.some((q) => q >= 1);
  if (quan) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  validateQuantity,
};
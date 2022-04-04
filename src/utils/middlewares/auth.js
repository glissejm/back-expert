const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    
    if (!authorization) {
      throw new Error("Su sesión expiró");
    }
    
    const [_, token] = authorization.split(" ");
    
    if (!token) {
      throw new Error("Su sesión expiró");
    }
    const { id, email } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = id;
    req.body.email = email;

    next();
  } catch (err) {
    
    res.status(401).json({ message: err.message });
  }
};
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization; // Support case variations
    console.log(authHeader)
    
    if (!authHeader?.startsWith('Bearer ')) {
        console.log('I am the mistake')
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid Authorization header' }); 
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(403).json({ error: 'Forbidden: Invalid token' });
        }
        req.user = decoded.UserInfo.username;
        req.roles = decoded.UserInfo.roles;
        next();
    });
};

module.exports = verifyJWT


// const jwt = require('jsonwebtoken');


// const verifyJWT = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized: Missing or invalid JWT cookie' });
//   }

//   jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//     console.log(jwt)
//     if (err) {
//       console.error('JWT verification error:', err);
//       return res.status(403).json({ error: 'Forbidden: Invalid token' });
//     }
//     req.user = decoded.email;
//     next();
//   });
// };

// module.exports = verifyJWT;
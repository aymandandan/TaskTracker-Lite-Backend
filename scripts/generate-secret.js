const crypto = require('crypto');

// Generate a secure random string for JWT secret
const generateJWTSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

console.log('Generated JWT Secret:');
console.log(generateJWTSecret());
console.log('\nCopy this to your .env file as JWT_SECRET=');

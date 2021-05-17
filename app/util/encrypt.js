const bcrypt = require('bcrypt');

function hash(value) {
    let saltRounds = 10;
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) reject(err);
            bcrypt.hash(value, salt, function(err, hash) {
                if (err) reject(err);
                resolve(hash);     
             });
          });
    });
}

module.exports = {
    hash,
}
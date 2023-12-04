import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = Number(process.env.SALT_WORK_FACTOR!);

export function getHash(value: string) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) reject(err);

      bcrypt.hash(value, salt, function (err, hash) {
        if (err) reject(err);

        resolve(hash);
      });
    });
  });
}

export function compareHash(value: string, hash: string) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(value, hash, function (err, isMatch) {
      if (err) reject(err);

      resolve(isMatch);
    });
  });
}

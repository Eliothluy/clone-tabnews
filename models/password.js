async function hash(password) {
  // TODO: Implementar hashing de senha (ex: bcrypt/argon2)
  return password;
}

async function compare(password, hashedPassword) {
  // TODO: Implementar comparação de senha
  return password === hashedPassword;
}

const password = {
  hash,
  compare,
};

export default password;

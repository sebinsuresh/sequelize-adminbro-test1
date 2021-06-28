const bcrypt = require("bcrypt");

const saltRounds = 10;

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(
  "Enter the password you want to hash: ",
  async (plaintext) => {
    const hashed = await bcrypt.hash(plaintext, saltRounds);
    console.log(hashed);
    process.exit(0);
  }
);

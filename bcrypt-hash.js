const bcrypt = require("bcrypt");

const saltRounds = 10;

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

if (process.argv.length > 2) {
  console.log("Hashed string:");
  const plain = process.argv[2];
  const hashFunc = async (plaintext) => {
    const hashed = await bcrypt.hash(plaintext, saltRounds);
    console.log(hashed);
    process.exit(0);
  };
  hashFunc(plain);
} else {
  readline.question(
    "Enter the password you want to hash: ",
    async (plaintext) => {
      const hashed = await bcrypt.hash(plaintext, saltRounds);
      console.log(hashed);
      process.exit(0);
    }
  );

  /* // Hide the password being entered
  const showEntered = false;

  readline._writeToOutput = function _writeToOutput(stringToWrite) {
    if (showEntered) {
      readline.output.write(stringToWrite);
    } else {
      readline.output.write("*");
    }
  }; */
}

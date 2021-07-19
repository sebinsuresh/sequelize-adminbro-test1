const bcrypt = require("bcrypt");

const saltRounds = 10;

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Async function to hash given plaintext
const getHash = async (plain) => {
  const hashed = await bcrypt.hash(plain, saltRounds);
  const hashedEscaped = hashed.split("$").join("\\$");
  return hashed + "\nEscaped:\n" + hashedEscaped;
};

if (process.argv.length > 2) {
  console.log("Hashed string:");
  const plain = process.argv[2];

  getHash(plain).then((hashed) => {
    console.log(hashed);
    process.exit(0);
  });
} else {
  readline.question(
    "Enter the password you want to hash: ",
    async (plaintext) => {
      const hashed = await getHash(plaintext);
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

//@flow
import readline from "readline";

var io = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function run() {
  io.question("loop", function(resp) {
    if (resp == "q") {
      io.close();
    } else {
      run();
    }
  });
}

run();

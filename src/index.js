//@flow
import app from "./app.js";

let actions = new Map();

actions.set("v", function(io) {
  io.write("0.1.0\n");
});

let cli = new app(">>", actions);

cli.start();

//@flow
import readline from "readline";

/**
 * A class that implements a basic command line interface app, basic loop that
 * questions the user for input and quits on 'q' input
 */
class CLI {
  /**
   * Basic Constructor, requires loopPrompt
   * @param  {string} loopPrompt [description]
   * @param  {Map<string,Function} responses    [description]
   * @param  {string} intro        [description]
   */
  constructor(
    loopPrompt: string,
    responses: ?Map<string, Function>,
    intro: ?string
  ) {
    this.setLoopPrompt(loopPrompt);
    if (responses != null) this.setResponses(responses);
    if (intro != null) this.setIntro(intro);

    this.io = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  io: readline.Interface;

  loopPrompt: string;
  responses: Map<string, Function>;
  intro: string;

  /**
   * setter for the prompt at beginning of each loop
   * @param {string} prompt question to be prompt
   */
  setLoopPrompt(prompt: string): void {
    this.loopPrompt = prompt;
  }

  /**
   * Sets the responseMap that maps string response from user to the Function
   * callback the app should perform
   * @param {Map<string,Function>} responses [description]
   */
  setResponses(responses: Map<string, Function>): void {
    this.responses = responses;
  }

  /**
   * Sets the intro string to display on start() of CLI app
   * @param {string} intro string to display
   */
  setIntro(intro: string): void {
    this.intro = intro;
  }

  /**
   * Looping function that prompts the user, returns
   */
  loop(): void {
    var me = this;
    this.io.question(this.loopPrompt, function(resp) {
      if (resp == "q" || resp == "quit") {
        me.io.close();
        return;
      } else if (me.responses != null && me.responses.get(resp) != null) {
        let method = me.responses.get(resp);
        if (method != undefined) method(me.io);
      } else {
        me.io.write("[unrecognized input]\n");
      }

      me.loop();
    });
  }

  /**
   * Starts the CLI loop with an intro message
   */
  start(): void {
    let out: string = "Type 'q' 'quit' to Quit\n";
    if (this.intro != null) out = this.intro + +"\n" + out;

    this.io.write(out);
    this.loop();
  }
}

export default CLI;

import {expect} from "chai";
import jsdom from "jsdom";
import fs from "fs"; //Filesystem. Comes with Node.

describe("Our first test", () => {
  it("should pass", () => {
    expect(true).to.equal(true);
  });
});

describe("index.html", () => {
  it("should say hello", (done) => {
    const index = fs.readFileSync("./src/index.html", "utf-8");
    jsdom.env(index, [], function(err, window) { // the 2nd parameter can be used to include .js files into the DOM, the 3rd argument is a callback which is run after the DOM is loaded into memory.
      const h1 = window.document.getElementsByTagName("h1")[0];
      expect(h1.innerHTML).to.equal("Hello World!");
      done(); // this is always required for asynchronous tests, so that mocha knows that it's okay to evaluate whether our expect is true or false.
      window.close();
    });
  })
})

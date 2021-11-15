/*
 * 1) If the resolution is below 800px width, only an error message is shown.
 * 2) If the resolution is below 800px height, only an error message is shown.
 * 3) If the resolution is above 800px width and height, the splash screen is shown with the play button.
 * 4) At the first loading of the splash screen (without an error), 1 game is initialized.
 * 5) Clicking on the play button brings the user to the game screen.
 * 6) The first player to access the game screen chooses a word.
 * 7) The second player to access the game screen guesses the word.
 * 8) The word guesser clicks a letter and this letter becomes disabled in the word provider screen.
 * ....
 */

const url = "http://localhost:3000/";

module.exports = {
  tags: ["splash"],
  "Browser window too small (height)": function (client) {
    //set size
    client.resizeWindow(500, 1200);
    client
      .url(url)
      .waitForElementVisible("body", 1000)
      .execute(
        function () {
          const res = window
            .getComputedStyle(document.querySelector("body"), ":before")
            .getPropertyValue("content");
          return res;
        },
        function (res) {
          client.assert.equal(
            res.value,
            '"Your screen is too small to play this game."'
          );
        }
      );
  },
  "Browser window too narrow (width)": function (client) {
    //set size
    client.resizeWindow(1200, 500);
    client
      .url(url)
      .waitForElementVisible("body", 1000)
      .execute(
        function () {
          const res = window
            .getComputedStyle(document.querySelector("body"), ":before")
            .getPropertyValue("content");
          return res;
        },
        function (res) {
          client.assert.equal(
            res.value,
            '"Your screen is too small to play this game."'
          );
        }
      );
  },
  "Browser window has the minimum required size": function (client) {
    //set size
    client.resizeWindow(1000, 1000); //a bit bigger than the min. 800x800 ... as window sizes include the browser bar, etc.
    client
      .url(url)
      .waitForElementVisible("body", 1000)
      .execute(
        function () {
          const res = window
            .getComputedStyle(document.querySelector("body"), ":before")
            .getPropertyValue("content");
          return res;
        },
        function (res) {
          client.assert.equal(res.value, "none");
        }
      );
  },
  after: function (browser) {
    browser.end();
  },
};

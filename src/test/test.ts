// By importing the chromedriver we don't need to run the driver
// it will automatically executable chromedriver into system PATH
import 'chromedriver';
// ThenableWebDriver: A thenable wrapper around an IWebDriver instance
// that allows commands to be issued directly.
// Builder: The Builder class is your one-stop-shop for configuring new WebDriver instances.
import { Builder, ThenableWebDriver } from 'selenium-webdriver';
import * as assert from 'assert';

describe('Suite', () => {
  // driver is type of ThenableWebDriver
  let driver: ThenableWebDriver;

  //This is the way to launch a browser in typescript.
  //Before doing the test part let’s code for after hook.
  before('Before', async () => {
    driver = new Builder().forBrowser('chrome').build();
  });

  it('Open google and verify it is opened', async () => {
    await driver.get('https://www.google.com');
    const currentUrl = await driver.getCurrentUrl();
    assert.equal(
      'https://www.google.com/',
      currentUrl,
      'The google is not opened',
    );
  });
  
  it('Open  youtube and verify it is opened', async () => {
    await driver.get('https://www.youtube.com');
    const currentUrl = await driver.getCurrentUrl();
    assert.equal(
      'https://www.youtube.com/',
      currentUrl,
      'The youtube is not opened',
    );
  });

  //Just add below code to quit the browser.(This will close the all tabs in browser)
  after('After', async () => {
    await driver.quit();
  });
});

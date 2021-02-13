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

  it('Open website and verify it is opened and redirect to login', async () => {
    await driver.get('https://angular-e2e.herokuapp.com/');
    const currentUrl = await driver.getCurrentUrl();
    assert.equal(
      'https://angular-e2e.herokuapp.com/login',
      currentUrl,
      'The website is not opened and redirect',
    );
  });

  //Just add below code to quit the browser.(This will close the all tabs in browser)
  after('After', async () => {
    await driver.quit();
  });
});

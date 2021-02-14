// By importing the chromedriver we don't need to run the driver
// it will automatically executable chromedriver into system PATH
import 'chromedriver';
// ThenableWebDriver: A thenable wrapper around an IWebDriver instance
// that allows commands to be issued directly.
// Builder: The Builder class is your one-stop-shop for configuring new WebDriver instances.
import { Builder, By, ThenableWebDriver } from 'selenium-webdriver';
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
    await driver.get('http://localhost:4200/login');
    const currentUrl = await driver.getCurrentUrl();
    assert.equal(
      // 'https://angular-e2e.herokuapp.com/login',
      'http://localhost:4200/login',
      currentUrl,
      'The website is not opened and redirect',
    );
  });

  it('key in invalid email and password', async () => {
    const valid_email = 'wrong';
    const valid_password = 'wrong';

    const getEmailTextField = await driver.findElement(
      By.css('input[formControlName=email]'),
    );

    const getPasswordTextField = await driver.findElement(
      By.css('input[formControlName=password]'),
    );

    getEmailTextField.sendKeys(valid_email);
    getPasswordTextField.sendKeys(valid_password);

    const getLoginButton = await driver.findElement(By.id('login'));

    await getLoginButton.click();
    const getAlertMsg = await driver
      .findElement(By.className('alert'))
      .getText();

    assert.equal(
      getAlertMsg,
      'Invalid email or password.',
      'Wrong credentials keyed in',
    );
  });

  it('key in valid email and password', async () => {
    const valid_email = 'admin@mail.com';
    const valid_password = 'test123';

    const getEmailTextField = await driver.findElement(
      By.css('input[formControlName=email]'),
    );

    const getPasswordTextField = await driver.findElement(
      By.css('input[formControlName=password]'),
    );

    await getEmailTextField.clear();
    await getPasswordTextField.clear();

    getEmailTextField.sendKeys(valid_email);
    getPasswordTextField.sendKeys(valid_password);

    const getLoginButton = await driver.findElement(By.id('login'));

    await getLoginButton.click();

    const currentUrl = await driver.getCurrentUrl();

    assert.equal(
      // 'https://angular-e2e.herokuapp.com/login',
      'http://localhost:4200/',
      currentUrl,
      'Valid credentials keyed in and redirect',
    );
  });

  //Just add below code to quit the browser.(This will close the all tabs in browser)
  after('After', async () => {
    await driver.quit();
  });
});

// By importing the chromedriver we don't need to run the driver
// it will automatically executable chromedriver into system PATH
import 'chromedriver';
// ThenableWebDriver: A thenable wrapper around an IWebDriver instance
// that allows commands to be issued directly.
// Builder: The Builder class is your one-stop-shop for configuring new WebDriver instances.
import { Builder, By, ThenableWebDriver, until, Key } from 'selenium-webdriver';
import * as assert from 'assert';

describe('Suite', () => {
  const agentID = '60372756c9c8ec0015af5f4e';
  // driver is type of ThenableWebDriver
  let driver: ThenableWebDriver;

  //This is the way to launch a browser in typescript.
  //Before doing the test part let’s code for after hook.
  before('Before', async () => {
    driver = new Builder().forBrowser('chrome').build();
  });

  it('Open website and verify it is opened and redirect to login', async () => {
    // await driver.get('https://angular-e2e.herokuapp.com/login');
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
    await driver.wait(until.elementLocated(By.className('alert')), 10000);

    const getAlertMsg = await driver
      .findElement(By.xpath("//div[contains(text(),'Invalid Email Format')]"))
      .getText();

    assert.equal(
      getAlertMsg,
      'Invalid Email Format',
      'Wrong credentials keyed in',
    );
  });

  it('key in valid email and password', async () => {
    const valid_email = 'admin@mail.com';
    const valid_password = '123';

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
    await driver.wait(
      until.urlIs(
        // `https://angular-e2e.herokuapp.com/agent/${agentID}`,
        `http://localhost:4200/agent/${agentID}`,
      ),
      15000,
    );

    const currentUrl = await driver.getCurrentUrl();

    assert.equal(
      // `https://angular-e2e.herokuapp.com/agent/${agentID}`,
      `http://localhost:4200/agent/${agentID}`,
      currentUrl,
      'Valid credentials keyed in and redirect',
    );
  });

  it('go to register new customer tab', async () => {
    const getRegisterButton = await driver.findElement(
      By.xpath("//button[normalize-space()='Register New Customer']"),
    );

    await getRegisterButton.click();

    await driver.wait(
      until.urlIs(
        // `https://angular-e2e.herokuapp.com/register/${agentID}`,
        `http://localhost:4200/register/${agentID}`,
      ),
      10000,
    );

    const currentUrl = await driver.getCurrentUrl();

    assert.equal(
      currentUrl,
      // `https://angular-e2e.herokuapp.com/register/${agentID}`,
      `http://localhost:4200/register/${agentID}`,
      'Successfuly navigate to register new customer page',
    );
  });

  it('register new customer without insurance', async () => {
    const newCustomer = {
      name: 'New Customer',
      dateActivated: '18/02/2021',
    };

    await driver.wait(until.elementLocated(By.id('customer-name')), 10000);

    const getNameTextField = await driver.findElement(By.css('#customer-name'));

    const getDateTextField = await driver.findElement(
      By.css('#date-activated'),
    );

    getNameTextField.sendKeys(newCustomer.name);
    getDateTextField.sendKeys(newCustomer.dateActivated);

    const getRegisterButton = await driver.findElement(
      By.css("button[type='submit']"),
    );

    await getRegisterButton.click();

    const getAlertMsg = await driver
      .findElement(By.className('alert'))
      .getText();

    assert.equal(
      getAlertMsg,
      'Please fill all fields.',
      'Got blank field(s) in the form',
    );
  });

  it('register new customer with all valid information', async () => {
    const getInsuranceNameTextField = await driver.findElement(
      By.css('#insurance-name'),
    );
    getInsuranceNameTextField.sendKeys('new insurance');

    const getRegisterButton = await driver.findElement(
      By.css("button[type='submit']"),
    );

    await getRegisterButton.click();

    await driver.wait(
      until.urlIs(
        // `https://angular-e2e.herokuapp.com/agent/${agentID}`,
        `http://localhost:4200/agent/${agentID}`,
      ),
      15000,
    );

    const currentUrl = await driver.getCurrentUrl();
    assert.equal(
      // `https://angular-e2e.herokuapp.com/agent/${agentID}`,
      `http://localhost:4200/agent/${agentID}`,
      currentUrl,
      'Valid credentials keyed in and redirect',
    );
  });

  it('Logout', async () => {
    const getLogoutButton = await driver.findElement(
      By.xpath('/html[1]/body[1]/app-root[1]/nav[1]/ul[2]/li[1]/a[1]'),
    );

    await getLogoutButton.click();

    const getLoginButton = await driver.findElement(By.id('login'));
    await driver.wait(until.elementLocated(By.id('login')), 10000);

    assert.equal(
      true,
      await getLoginButton.isDisplayed(),
      'Logout Successfully',
    );
  });

  // Just add below code to quit the browser.(This will close the all tabs in browser)
  after('After', async () => {
    await driver.quit();
  });
});

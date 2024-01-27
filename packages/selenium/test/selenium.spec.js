import chrome from "selenium-webdriver/chrome";
import { Builder, By } from "selenium-webdriver";
import assert from "assert";
import { path } from "chromedriver";
let driver = null;
const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless=new');
const URL = "https://www.example.com";

describe("Selenium", () => {
  beforeEach(async () => {
    driver = await new Builder(path)
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
    await driver.get(URL);
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('should have the correct title', async function () {
    const title = await driver.getTitle();
    assert.strictEqual(title, 'Example Domain');
  });

  it('should find and click an element', async function () {
    const link = await driver.findElement(By.linkText('More information...'));
    await link.click();

    // You can perform additional actions on the new page if needed
    // For example, get the new page title
    const newPageTitle = await driver.getTitle();
    assert.strictEqual(newPageTitle, 'Example Domains');
  });
});

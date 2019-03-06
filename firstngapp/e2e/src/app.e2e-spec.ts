import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('Nubewell Networks Login Page', () => {
  let page: AppPage;


  const wrongCredentias = {
    username: 'wrongname',
    password: 'wrongpasswd'
  };


  beforeEach(() => {
    page = new AppPage();
    browser.waitForAngularEnabled(false);
  });

  it('should display Login Page', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Nubewell Networks');
    // Display login page.
  });

  it('when user is trying to login with wrong credentials he should stay on “login” page', () => {
    page.navigateTo();
    page.fillCredentials(wrongCredentias);
    expect(page.getTitleText()).toEqual('Nubewell Networks');
    // It should stay in same login page.
    // if invalid username or password is entered, it should show as "invalid username" or "invalid password" text below each input field.

  });

  it('when login is successful — he should redirect to default Admin Panel page or interface page', () => {
    page.navigateTo();
    page.fillCredentials();
    expect(page.getTitle()).toEqual('Admin Panel');
    // It should directly login to Admin Panel page./dashboard/interface.


  });

  it('Display Add More Rule Button', () => {
    page.navigateTo();
    expect(page.getAddMoreRuleButton().getText()).toEqual('Add More Rule');
    // Add More Rule Button should be visible.

  });

  it('When clicked on Add More Rule button- displays table', () => {
    page.navigateTo();
    page.getAddMoreRuleButton().click();
    expect(page.getProtocolField()).toBeDefined();
    expect(page.getIpSourceField()).toBeDefined();
    expect(page.getDestinationIpField()).toBeDefined();
    expect(page.getAccessTypeField()).toBeDefined();
    expect(page.getDeleteButton()).toBeDefined();
  // Displays the form options to select and input data.

  });


  it('Select ip from dropdown under protocol column', () => {
    page.ipSelectFields();
    expect(page.ipSelectFields()).toEqual('ip');
  // Protocol column should select'ip'.

  });


  it('Display ip address under source ip column', () => {
    page.getFillField1();
    expect(page.getFillField1()).toEqual('192.168.1.1');
  // Source ip field should be able to accept ip address.
  // Even if ip is entered, still shows red outline.
  // if wrong ip format is entered, it should show as "invalid ip" text below source ip field.
  //  IP format.(xxx.xxx.xxx.xxx) is missing.



  });

  it('Display ip address under destination ip column', () => {
    page.getFillField2();
    expect(page.getFillField2()).toEqual('192.168.2.2');
  // Destination ip should be able to accept  ip address.
  // Even if ip is entered, still shows red outline.
  // if wrong ip format is entered, it should show as "invalid ip" text below destination ip field.
  //  IP format.(xxx.xxx.xxx.xxx) is missing.

  });

  it('Select permit option', () => {
    page.accessTypeSelect();
    expect(page.accessTypeSelect()).toEqual('permit');
    expect(page.accessTypeSelect()).toEqual('deny');
  // Access type should be selected either 'deny' or 'permit'.

  });

  it('Click on red cross to delete the form', () => {
    page.getDeleteButton().click();
    expect(page.getAddMoreRuleButton().getText()).toEqual('Add More Rule');
    // When red cross button is clicked, it should remove the input form option.
  });

  it('When we search in search grid field, it should accept the characters or numbers', () => {
    page.navigateTo();
    expect(page.getSearch()).toEqual('192.168.1.1');
  });
  // Search field should accept the input and search it.

  it('When clicked on logout image, logout button should be displayed', () => {
    page.navigateTo();
    page.getLogoutimage().click();
    expect(page.getLogoutButton()).toBeDefined();
  });
  // When clicked log out gear image, should display Logout button.

  it('When clicked on logout button, page should be terminated', () => {
    page.navigateTo();
    page.getLogoutButton().click();
    expect(page.getTitleText()).toEqual('Nubewell Networks');
    // Shoudl be able to click logout button and when logged out, page should be redirected to back to login page.
  });

});






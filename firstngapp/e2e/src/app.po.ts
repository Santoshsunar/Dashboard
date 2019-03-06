import { browser, by, element } from 'protractor';

export class AppPage {
  private credentias = {
    username: 'admin',
    password: 'admin'
  };

  navigateTo() {
    return browser.get('/login');

    }

  fillCredentials(credentias: any = this.credentias) {
    element(by.css('input[FormControlName=username]')).sendKeys(credentias.username);
    element(by.css('input[FormControlName=password]')).sendKeys(credentias.password);
    element(by.css('.login-btn')).click();

  }

  getTitleText() {
    return element(by.css('app-root h1')).getText();

  }

  getTitle() {
    return element(by.css('app-root h1')).getText();
  }


 getAddMoreRuleButton() {
   return element(by.css('.btn-rule'));
  }

getProtocolField() {
  return element(by.id('0_protocol'));
  }

getIpSourceField() {
  return element(by.id('0_sourceIp'));
  }

getDestinationIpField() {
  return element(by.id('0_destinationIp'));
  }

getAccessTypeField() {
  return element(by.id('0_accessType'));
  }

getDeleteButton() {
  return element(by.id('0_delete'));
  }

ipSelectFields() {
  this.getProtocolField().sendKeys('ip');

  }

getFillField1() {
  this.getIpSourceField().sendKeys('192.168.1.1');

  }

getFillField2() {

  this.getDestinationIpField().sendKeys('192.168.2.2');
    }

accessTypeSelect() {
  this.getAccessTypeField().sendKeys('permit');
  }

getSearch() {
  return element(by.css('.search')).sendKeys('192.168.1.1');
}

getLogoutimage() {

  return element(by.className('flex-direction flex-row'));

  }

getLogoutButton() {
  return element(by.css('.btn-logout'));

  }
}

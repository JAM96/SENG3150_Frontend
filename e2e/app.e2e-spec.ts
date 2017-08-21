import { SENG3150FrontendCLIPage } from './app.po';

describe('seng3150-frontend-cli App', () => {
  let page: SENG3150FrontendCLIPage;

  beforeEach(() => {
    page = new SENG3150FrontendCLIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

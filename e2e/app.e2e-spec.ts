import { PopuptestPage } from './app.po';

describe('popuptest App', function() {
  let page: PopuptestPage;

  beforeEach(() => {
    page = new PopuptestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

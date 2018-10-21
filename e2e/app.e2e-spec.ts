import { BitVaultAppStorePage } from './app.po';

describe('bit-vault-app-store App', () => {
  let page: BitVaultAppStorePage;

  beforeEach(() => {
    page = new BitVaultAppStorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

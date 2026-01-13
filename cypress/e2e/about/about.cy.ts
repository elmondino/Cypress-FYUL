import { AboutPage } from '../../pages';

describe('About Page', () => {
  const aboutPage = new AboutPage();

  beforeEach(() => {
    aboutPage.visit();
  });

  it('should load successfully', () => {
    aboutPage.verifyPageLoaded();
  });

  it('should display heading', () => {
    aboutPage.verifyHeading();
  });

  it('should display content', () => {
    aboutPage.verifyContent();
  });
});

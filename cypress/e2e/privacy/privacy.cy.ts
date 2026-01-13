import { PrivacyPolicyPage } from '../../pages';

describe('Privacy Policy Page', () => {
  const privacyPage = new PrivacyPolicyPage();

  beforeEach(() => {
    privacyPage.visit();
  });

  it('should load successfully', () => {
    privacyPage.verifyPageLoaded();
  });

  it('should display heading', () => {
    privacyPage.verifyHeading();
  });

  it('should display content sections', () => {
    privacyPage.verifySections();
  });
});

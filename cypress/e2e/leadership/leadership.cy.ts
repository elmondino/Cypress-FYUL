import { LeadershipPage } from '../../pages';

describe('Leadership Page', () => {
  const leadershipPage = new LeadershipPage();

  beforeEach(() => {
    leadershipPage.visit();
  });

  it('should load successfully', () => {
    leadershipPage.verifyPageLoaded();
  });

  it('should display heading', () => {
    leadershipPage.verifyHeading();
  });

  it('should display leadership team', () => {
    leadershipPage.verifyLeaderSection();
  });
});

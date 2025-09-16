// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pageObjects/homepageObjects';


test.describe('Sanity Tests', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test.only('Check for correct page title.', {
    annotation: [
      {type: 'Description', description: 'Checks that the user is redirected to the correct landing page.'}
    ]} , async () => {

      // This is an over complication to demonstrate how we can use the test.step function to organize and document the sections of the test code.

      const pageTitle = await homePage.getPageTitle();
      const expectedPageTitle = await homePage.getExpectedPageTitle();

      test.step('Get the current page title.', async () => {
        console.log(`Getting the current Page Title... Got..${pageTitle}.`);
      });

      test.step('Get the expected page title.', async () => {
        console.log(`Expected Page Title...${expectedPageTitle}`);
      })

      test.step('Assert the current page title by comparing it to the expected page title.', async () => {
        expect(pageTitle).toBe(expectedPageTitle);
      })
  });

  test('Check the Main sections are visible', {
    annotation: [
      {type: 'Description', description: 'Checks that the Main sections are rendering.'}
    ]} , async () => {
      test.step('Check that the Main sections are visible.', async () => {
        await homePage.isMainSectionsVisible();
      });
  });

  test('Check that the About section contains key information', async () => {
    await homePage.sectionContainsText('about', 'JV William Andal');
    await homePage.sectionContainsText('about', 'Web App Testing Specialist');
    await homePage.sectionContainsText('about', 'contact@jvwilliam.com');
  });

  test('Check that the Services section contains key information', async () => {
    await homePage.sectionContainsText('services', 'Services Offered');
    await homePage.sectionContainsText('services', 'independent QA support');
    await homePage.sectionContainsText('services', 'Fiverr');
    await homePage.sectionContainsText('services', 'LinkedIn');
  });

  test('Check that the Experience section contains key information', async () => {
    const expectedLatestExperience = 'Test Engineer · Web Application Testing';
    const locatorName = 'section-experience-workTitle';

    // check how many experiences are listed
    const experienceCount = await homePage.getItemListCount(locatorName);
    expect(experienceCount).toBe(6);
    const latestExperience = await homePage.getLatestExperience();
    expect(latestExperience).toBe(expectedLatestExperience);
  });

  test('Check that the Competency & Tools section contains key information', async () => {
    const locatorName = 'section-competency-item';
    const competencyElements = await homePage.page.getByTestId(locatorName).all();
    
    expect(competencyElements).toHaveLength(4);
    expect(competencyElements[0]).toHaveText('Functional Testing & Test Automation');
    expect(competencyElements[1]).toHaveText('Quality Engineering and Test Management');
    expect(competencyElements[2]).toHaveText('Team Management & Leadership');
    expect(competencyElements[3]).toHaveText('Web Application Security');
  });

  test('Check that the Trainings & Certifications section contains key information', async () => {
    const latestCertification = await homePage.getLatestCertification();
    expect(latestCertification).toContain('Certified Tester Foundation Level');
    const latestTraining = await homePage.getLatestTraining();
    expect(latestTraining).toContain('Web Application Pentesting');
  });
  
});

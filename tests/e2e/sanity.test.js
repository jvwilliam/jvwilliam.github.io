// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pageObjects/homepageObjects';


test.describe('Sanity Tests', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('Check for correct page title.', {
    annotation: [
      {type: 'Description', description: 'Checks that the user is redirected to the correct landing page.'}
    ]} , async () => {

      /** 
       * This is an over complication to demonstrate how we can use the test.step function 
       * to organize and document the sections of the test code. This also helps with the readability of the test report.
       */ 

      let pageTitle;
      let expectedPageTitle;

      test.step('Get the current page title.', async () => {
        pageTitle = await homePage.getPageTitle();
        console.log(`Getting the current Page Title... Got..${pageTitle}.`);
      });

      test.step('Get the expected page title.', async () => {
        expectedPageTitle = await homePage.getExpectedPageTitle()
        console.log(`Expected Page Title...${expectedPageTitle}`);
      })

      test.step('Assert the current page title by comparing it to the expected page title.', async () => {
        expect(pageTitle).toBe(expectedPageTitle);
      })
  });

  test('Check the Main sections are visible', {
    annotation: [
      {type: 'Description', description: 'Checks that the Main sections are rendering as expected.'}
    ]}, async () => {

      const {
        aboutSection,
        servicesSection,
        experienceSection,
        skillsSection,
        trainingsSection
      } = await homePage.getMainSection();

      const {
        aboutSectionHeading,
        serviceSectionHeading,
        experienceSectionHeading,
        skillsSectionHeading,
        trainingsSectionHeading
      } = await homePage.getSectionHeadings();

      const {
        aboutSectionNavigation,
        servicesSectionNavigation,
        experienceSectionNavigation,
        skillsSectionNavigation,
        trainingsSectionNavigation
      } = await homePage.getNavigationElements();

      await test.step('Verify About section is visible and has correct heading', async () => {
        await expect(aboutSection).toBeInViewport();
        await expect(aboutSectionHeading).toHaveText('JV William Andal');
      });

      await test.step('Navigate to Services section and verify visibility and heading', async () => {
        await servicesSectionNavigation.click();
        await expect(servicesSection).toBeInViewport();
        await expect(serviceSectionHeading).toBeInViewport();
        await expect(serviceSectionHeading).toHaveText('Services Offered');
      });

      await test.step('Navigate to Experience section and verify visibility and heading', async () => {
        await experienceSectionNavigation.click();
        await expect(experienceSection).toBeInViewport();
        await expect(experienceSectionHeading).toBeInViewport();
        await expect(experienceSectionHeading).toHaveText('Experience');
      });

      await test.step('Navigate to Skills section and verify visiblity and heading', async () => {
        await skillsSectionNavigation.click();
        await expect(skillsSection).toBeInViewport();
        await expect(skillsSectionHeading).toBeInViewport();
        await expect(skillsSectionHeading).toHaveText('Competencies & Tools');
      });

      await test.step('Navigate to Trainings and verify visiblity and heading', async () => {
        await trainingsSectionNavigation.click();
        await expect(trainingsSection).toBeInViewport();
        await expect(trainingsSectionHeading).toBeInViewport();
        await expect(trainingsSectionHeading).toHaveText('Trainings & Certifications');
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

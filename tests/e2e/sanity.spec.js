// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pageObjects/homepageObjects';


test.describe('Sanity Tests', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('Check that the Homepage loads with correct title', async () => {
    const currentUrl = await homePage.getCurrentUrl();
    console.log(`Current URL: ${currentUrl}`);
    
    const title = await homePage.getTitle();
    console.log(`Page title:${title}`);
    expect (title).toBe(homePage.expectedTitle);
  });

  test('Check that the Main sections are visible', async () => {
    await homePage.isMainSectionsVisible();
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
    console.log(`Number of experiences listed: ${experienceCount}`);

    
    const latestExperience = await homePage.getLatestExperience();
    expect(latestExperience).toBe(expectedLatestExperience);
    console.log(`Latest experience listed: ${latestExperience}`);
  });

  test.only('Check that the Competency & Tools section contains key information', async () => {
    
    const locatorName = 'section-competency-item';
    const competencyElements = await homePage.page.getByTestId(locatorName).all();
    
    expect(competencyElements).toHaveLength(4);
    console.log(`Number of competencies listed: ${competencyElements.length}`);

    expect(competencyElements[0]).toHaveText('Functional Testing & Test Automation');
    expect(competencyElements[1]).toHaveText('Quality Engineering and Test Management');
    expect(competencyElements[2]).toHaveText('Team Management & Leadership');
    expect(competencyElements[3]).toHaveText('Web Application Security');
  });
  
});


// test('Trainings & Certifications section and contents are displayed', async({page}) => {
  
//   const latestCertification = /Certified Tester Foundation Level/, latestTraining = /Web Application Pentesting/;

//   await page.goto('/');
//   await expect(page.getByRole('heading', {name: 'Trainings & Certifications'})).toBeVisible();
//   await expect(page.getByTestId('certification-sub-heading')).toBeVisible();
//   await expect(page.getByTestId('training-sub-heading')).toBeVisible();

//   await expect(page.getByTestId('certificate-list').first()).toHaveText(latestCertification);
//   await expect(page.getByTestId('training-list').first()).toHaveText(latestTraining);

// })

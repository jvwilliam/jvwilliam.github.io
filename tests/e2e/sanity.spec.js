// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pageObjects/homepageObjects';


test.describe('Sanity Tests', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  })

  test.only('Homepage loads with correct title', async () => {
    const title = await homePage.getTitle();
    console.log(` Actual Title: ${title}`);
    expect (title).toBe(homePage.expectedTitle);
    console.log(` Expected Title: ${homePage.expectedTitle}`);
  })

  test('Main sections are visible', async () => {
    
  })
  
})

// test('Main sections are visible', async ({page}) => {
  
//   await page.goto('/');
//   await expect(page.locator('h1')).toBeVisible();
//   await expect(page.locator('nav')).toBeVisible();

// })

// test('Latest work experience is shown in the Experience section', async ({ page }) => {
  
//   const latestPosition = 'Test Engineer · Web Application Testing';
  
//   await page.goto('/');
//   await expect(page.getByTestId('experience-section-heading'))
//     .toHaveText('Experience');
//   // Expects section to have the role Test Enginner as the latest position.
//   await expect(page.getByTestId('exp-subheading')
//     .first())
//     .toHaveText(latestPosition);
// });

// test('Competency & Tools section and contents are displayed', async({page}) => {
//   await page.goto('/');
//   await expect(page.getByTestId('skills-section-heading'))
//     .toHaveText('Competencies & Tools');
//   await expect(page.getByTestId('competence-list'))
//     .toHaveCount(4);
// });

// test('Trainings & Certifications section and contents are displayed', async({page}) => {
  
//   const latestCertification = /Certified Tester Foundation Level/, latestTraining = /Web Application Pentesting/;

//   await page.goto('/');
//   await expect(page.getByRole('heading', {name: 'Trainings & Certifications'})).toBeVisible();
//   await expect(page.getByTestId('certification-sub-heading')).toBeVisible();
//   await expect(page.getByTestId('training-sub-heading')).toBeVisible();

//   await expect(page.getByTestId('certificate-list').first()).toHaveText(latestCertification);
//   await expect(page.getByTestId('training-list').first()).toHaveText(latestTraining);

// })

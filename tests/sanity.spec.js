// @ts-check
import { test, expect } from '@playwright/test';

test('Homepage loads with correct title', async ({ page }) => {

  const expectedTitle = 'JV William | QA Engineer | Web App Testing Specialist';

  await page.goto('/');
  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle(expectedTitle);
});

test('Main sections are visible', async ({page}) => {
  
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('nav')).toBeVisible();

})

test('Latest work experience is shown in the Experience section', async ({ page }) => {
  
  const latestPosition = 'Test Engineer · Web Application Testing';
  
  await page.goto('/');
  await expect(page.getByTestId('experience-section-heading'))
    .toHaveText('Experience');
  // Expects section to have the role Test Enginner as the latest position.
  await expect(page.getByTestId('exp-subheading')
    .first())
    .toHaveText(latestPosition);
});

test('Competency & Tools section and contents are displayed', async({page}) => {
  await page.goto('/');
  await expect(page.getByTestId('skills-section-heading'))
    .toHaveText('Competencies & Tools');
  await expect(page.getByTestId('competence-list'))
    .toHaveCount(4);
});

test('Trainings & Certifications section and contents are displayed', async({page}) => {
  
  const latestCertification = /Certified Tester Foundation Level/, latestTraining = /Web Application Pentesting/;

  await page.goto('/');
  await expect(page.getByRole('heading', {name: 'Trainings & Certifications'})).toBeVisible();
  await expect(page.getByTestId('certification-sub-heading')).toBeVisible();
  await expect(page.getByTestId('training-sub-heading')).toBeVisible();

  await expect(page.getByTestId('certificate-list').first()).toHaveText(latestCertification);
  await expect(page.getByTestId('training-list').first()).toHaveText(latestTraining);

})

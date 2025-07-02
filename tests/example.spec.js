// @ts-check
import { test, expect } from '@playwright/test';

test('Navigate to Homepage.', async ({ page }) => {
  await page.goto('/');

  // Check first that the correct webpage is loaded.
  await expect(page).toHaveURL('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('JV William | QA Engineer | Web App Testing Specialist');
});

test('Navigate and check Experience section contents.', async ({ page }) => {
  await page.goto('/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Experience' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible();

  // Expects page to have the role Test Enginner.
  const currentPosition = 'Test Engineer · Web Application Testing';
  await expect(page.getByTestId('exp-subheading')
    .first())
    .toHaveText(currentPosition);
});

test('Navigate and check Skills section content', async({page}) => {

  await page.goto('/');

  await page.getByRole('link', {name: 'Skills'}).click();

  await expect(page.getByRole('heading', {name: 'Competencies & Tools'})).toBeVisible();
  
  await expect(page.getByTestId('competence-list'))
    .toHaveCount(4);
  
});

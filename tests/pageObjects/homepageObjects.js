import { expect } from '@playwright/test';

class HomePage { 

    /**
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        this.page = page;
        this.expectedTitle = 'JV William | QA Engineer | Web App Testing Specialist';
        this.primaryHeading = this.page.locator('h1');
        // Add more locators as needed
    }

    async goto() {
        await this.page.goto('/');
        await expect(this.page).toHaveURL('/');
    }

    async getTitle() {
        return this.expectedTitle;
    }

    // Add more methods for actions/assertions as needed

}

export { HomePage };
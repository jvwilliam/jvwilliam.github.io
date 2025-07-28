import { expect } from '@playwright/test';

class HomePage { 

    /**
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        this.page = page;

        // Locators
        /** Section Locators */
        this.aboutSection = this.page.locator('section[data-testid="about-section"]');
        this.servicesSection = this.page.locator('section[data-testid="services-section"]')
        this.experienceSection = this.page.locator('section[data-testid="experience-section"]');
        this.competencySection = this.page.locator('section[data-testid="competency-section"]');
        this.trainingsSection = this.page.locator('section[data-testid="trainings-section"]');

        /** Item List Locators */
        this.competencyList = this.page.locator('section[data-testid="competency-section"] ul li');
        this.trainingsList = this.page.locator('section[data-testid="trainings-section"] ul li');

        // Expected Values
        this.expectedTitle = 'JV William | QA Engineer | Web App Testing Specialist';
        this.aboutSectionHeading = "contact@jvwilliam.com";
        this.servicesSectionHeading = "Services Offered";
        this.experienceSectionHeading = "Experience";
        this.competencySectionHeading = "Competencies & Tools";

        // Add more locators as needed
    }

    async goto() {
        await this.page.goto('/');
        await expect(this.page).toHaveURL('/');
    }

    async getCurrentUrl() {
        return this.page.url();
    }

    async getTitle() {
        return this.expectedTitle;
    }

    async isMainSectionsVisible() {
        await expect(this.aboutSection).toBeVisible()
        await expect(this.servicesSection).toBeVisible();
        await expect(this.experienceSection).toBeVisible();
        await expect(this.competencySection).toBeVisible();
        await expect(this.trainingsSection).toBeVisible();
    }

    async getSectionHeadingText(section) {
        switch (section) {
            case 'about': 
                return this.aboutSectionHeading;
            case 'services':
                return this.servicesSectionHeading;
            case 'experience':
                return this.experienceSectionHeading;
            case 'competency':
        }
    }

    async sectionContainsText(sectionName, expectedText) {
        const section = this.page.getByTestId(`${sectionName}-section`);
        await expect(section).toContainText(expectedText);
    }

    async getItemListCount(sectionName) {
        const itemList = this.page.getByTestId(`${sectionName}-list`);
        return await itemList.count();
    }

    async getExperienceCount() {
        const experienceItems = this.page.getByTestId('exp-subheading');
        return await experienceItems.count();
    }

    async getLatestExperience() {
        const latestExperience = this.page.getByTestId('exp-subheading-list').first();
        return await latestExperience.textContent();
    }

    // Add more methods for actions/assertions as needed

}

export { HomePage };
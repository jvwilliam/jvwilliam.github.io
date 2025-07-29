import { expect } from '@playwright/test';

class HomePage { 

    /**
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        this.page = page;

        // Locators
        /** Section Locators */
        this.aboutSection = this.page.locator('section[data-testid="section-about"]');
        this.servicesSection = this.page.locator('section[data-testid="section-services"]')
        this.experienceSection = this.page.locator('section[data-testid="section-experience"]');
        this.competencySection = this.page.locator('section[data-testid="section-competency"]');
        this.trainingsSection = this.page.locator('section[data-testid="section-trainings"]');

        /** Item List Locators */
        this.competencyList = this.page.locator('section[data-testid="competency-section"] ul li');
        this.trainingsList = this.page.locator('section[data-testid="trainings-section"] ul li');

        //Trainings & Certifications
        this.certificateItem = this.page.locator('section[data-testid="section-certificate-item"]');
        this.trainingItem = this.page.locator('section[data-testid="section-trainings-item"]');

        /** Expected Values */
        // About Section
        this.expectedTitle = 'JV William | QA Engineer | Web App Testing Specialist';
        this.aboutSectionHeading = "contact@jvwilliam.com";
        //Services Section
        this.servicesSectionHeading = "Services Offered";
        //Experience Section
        this.experienceSectionHeading = "Experience";
        //Competency & Tools section
        this.competencySectionHeading = "Competencies & Tools";
        //Trainings & Certifications
        this.certificateItem = /Certified Tester Foundation Level/;
        this.trainingItem = /Web Application Pentesting/;

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
        const section = this.page.getByTestId(`section-${sectionName}`);
        await expect(section).toContainText(expectedText);
    }

    async getItemListCount(sectionName) {
        const itemList = this.page.getByTestId(sectionName);
        return await itemList.count();
    }

    async getLatestExperience() {
        const latestExperience = this.page.getByTestId('section-experience-workTitle').first();
        return await latestExperience.textContent();
    }

    async getLatestCertification() {
        const latestCertification = this.page.getByTestId('section-certificate-item').first();
        return await latestCertification.textContent();
    }

    async getLatestTraining() {
        const latestTraining = this.page.getByTestId('section-trainings-item').first();
        return await latestTraining.textContent();
    }

    // Add more methods for actions/assertions as needed

}

export { HomePage };
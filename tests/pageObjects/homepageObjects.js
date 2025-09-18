import { expect } from '@playwright/test';

export class HomePage { 
    /**
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        this.page = page;

        /** Set up locators */
        this.mainSections = {
            aboutSection: page.getByTestId('section-about'),
            servicesSection: page.getByTestId('section-services'),
            experienceSection: page.getByTestId('section-experience'),
            competencySection: page.getByTestId('section-competency'),
            trainingSection: page.getByTestId('section-trainings'),
        }

        this.expectedValues = {
            pageTitle: 'JV William | QA Engineer | Web App Testing Specialist',
            contactDetails: 'contact@jvwilliam.com',
            servicesSectionHeading: 'Services Offered',
            experienceSectionHeading: 'Experience',
            competencySectionHeading: 'Competencies & Tools',
            latestCertification: /Certified Tester Foundation Level/,
            latestTraining: /Web Application Pentesting/
        }

        
    }

    async getNavigationElements() {
        return {
            aboutSectionNavigation: this.page.getByTestId('nav-about'),
            servicesSectionNavigation: this.page.getByTestId('nav-services'),
            experienceSectionNavigation: this.page.getByTestId('nav-experience'),
            skillsSectionNavigation: this.page.getByTestId('nav-skills'),
            trainingSectionNavigation: this.page.getByTestId('nav-trainings'),
        }
    }

    async getMainSection() {
        return {
            aboutSection: this.page.getByTestId('section-about'),
            servicesSection: this.page.getByTestId('section-services'),
            experienceSection: this.page.getByTestId('section-experience'),
            competencySection: this.page.getByTestId('section-competency'),
            trainingSection: this.page.getByTestId('section-trainings')
        }
    }

    async getSectionHeadings() {
        return {
            aboutSectionHeading: this.page.getByTestId('section-about-heading'),
            serviceSectionHeading: this.page.getByTestId('section-services-heading'),
            experienceSectionHeading: this.page.getByTestId('section-experience-heading'),
            competencySectionHeading: this.page.getByTestId('section-skills-primaryHeading'),
            trainingSectionHeading: this.page.getByTestId('section-trainings-primaryHeading')
        }
    }

    async goto() {
        await this.page.goto('/');
        await expect(this.page).toHaveURL('/');
    }

    async getCurrentUrl() {
        return this.page.url();
    }

    async getPageTitle() {
        const pageTitle = await this.page.title();
        return pageTitle;
    }

    async checkTitle() {
        const title = await this.getPageTitle();
        expect(title).toBe(this.expectedValues.pageTitle);
    }

    async getExpectedPageTitle() {
        return this.expectedValues.pageTitle;
    }

    

    async isMainSectionsVisible() {
        for (const [sectionName, locator] of Object.entries(this.mainSections)) {
            console.log(`Checking ${sectionName}`);
            await expect(locator).toBeVisible();
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

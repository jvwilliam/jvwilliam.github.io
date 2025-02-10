
/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

const profileCards = document.getElementById('experience-container');

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

const experiences = [
    {
        "id" : 1,
        "companyName" : "Elevated Play Philippines Inc.",
        "position" : "Game Tester",
        "location" : "Makati · Philippines",
        "duration" : "May 2014 · Dec 2014",
        "description" : "This marked the beginning of my software testing career. After earning a Bachelor's degree in Information Technology, I started as a game tester, focusing on testing various mobile games across platforms such as Android and iOS. My responsibilities included executing pre-defined test plans and test cases to ensure functionality and quality."
    },
    {
        "id" : 2,
        "companyName" : "Elevated Play Philippines Inc.",
        "position" : "Resource Management Staff",
        "location" : "Makati · Philippines",
        "duration" : "Jan 2015 · Dec 2015",
        "description" : "After spending some time as a game tester. I applied for a lateral movement as a Resource Management Staff. As a Resource Management Staff or RMS, part of my responsibility is to ensure that the test build installed on the test devices are correct. As an RMS, we are also responsible for keeping the safety & security of the devices. As an RMS, we are also responsible for keeping the safety & security of the devices. You can say it's more like an IT role if compared to different companies."
    }, 
    {
        "id" : 3,
        "companyName" : "Elevated Play Philippines Inc.",
        "position" : "QA Tester III",
        "location" : "Makati · Philippines",
        "duration" : "Jan 2016 · Mar 2017",
        "description" : "As a QA Tester 3, I led a team of up to five skilled game testers, managing 2-3 projects simultaneously. My primary responsibilities included executing comprehensive test plans for mobile applications and games, utilizing QA tools and frameworks such as Jira and Appium to ensure quality and efficiency. I also mentored junior testers, conducted thorough reviews of their work to uphold standards, and verified the accuracy of test results to ensure project success."
    },
    {
        "id" : 4,
        "companyName" : "1902 Software Development Corporation",
        "position" : "Senior QA Tester · Web Application Testing",
        "location" : "Alabang · Philippines",
        "duration" : "Mar 2017 · Mar 2020",
        "description" : "Transitioning from mobile games and applications to web-based platforms, I have focused primarily on e-commerce projects built with Magento and WordPress (WooCommerce). This allowed me to expand my expertise in testing complex web applications, ensuring seamless user experiences, and optimizing the performance of online retail platforms. This transition also enabled me to delve into test automation using Selenium and later Cypress, as well as explore web application vulnerability testing to enhance overall software quality and security."
    },
    {
        "id" : 5,
        "companyName" : "500 Designs LLC",
        "position" : "Team Lead · Quality Management",
        "location" : "Irvine California · US (Remote)",
        "duration" : "Jun 2020 · May 2024",
        "description" : "My career highlight so far. At 500 Designs, I was able to apply the full breadth of my testing expertise. My most notable achievement was building a QA team from the ground up and establishing a robust QA framework that became the foundation for the team's and organization's success. In my role as Team Lead, I developed deep expertise in leadership and team management. I effectively drove success by setting clear objectives and key results for each team member, aligning their efforts with broader organizational goals to achieve outstanding outcomes."
    },
    {
        "id" : 6,
        "companyName" : "Norlinq LLC",
        "position" : "Test Engineer · Web Application Testing",
        "location" : "Abu Dhabi · United Arab Emirates",
        "duration" : "May 2024 · Present",
        "description" : "As the lead QA for a globally recognized international organization. I oversee the quality assurance lifecycle for high-impact features, ensuring seamless functionality and performance of web applications used by millions worldwide. My expertise lies in developing test strategies, creating and maintaining comprehensive end-to-end automation test suites, and collaborating across teams to uphold the rigorous standards of a high-profile organization."
    },
]

const coreCompetencies = [
    {
        "id": 1,
        "title": "Functional Testing & Test Automation"
    },
    {
        "id": 2,
        "title": "Test Engineering & Management"
    },
    {
        "id": 3,
        "title": "Team Management & Leadership"
    },
    {
        "id": 4,
        "title": "Web Application Security"
    },
]

const languages = [
    {
        "id": 1,
        "title" : "git",
        "class" : "fab fa-git-square"
    },
    {
        "id": 2,
        "title" : "HTML",
        "class" : "fab fa-html5"
    },
    {
        "id": 3,
        "title" : "CSS",
        "class" : "fab fa-css3-alt"
    },
    {
        "id": 4,
        "title" : "Figma",
        "class" : "fab fa-figma"
    },
    {
        "id": 5,
        "title" : "JavaScript",
        "class" : "fab fa-js-square"
    },
    {
        "id": 6,
        "title" : "Python",
        "class" : "fab fa-python"
    },
    {
        "id": 7,
        "title" : "Jira",
        "class" : "fab fa-jira"
    },
]

const platforms = [
    {
        "id": 1,
        "title" : "Android",
        "class" : "fab fa-android"
    },
    {
        "id": 2,
        "title" : "Apple",
        "class" : "fab fa-apple"
    },
    {
        "id": 3,
        "title" : "Linux",
        "class" : "fab fa-linux"
    },
    {
        "id": 4,
        "title" : "Windows",
        "class" : "fab fa-windows"
    },
    {
        "id": 5,
        "title" : "WordPress",
        "class" : "fab fa-wordpress"
    },
    {
        "id": 6,
        "title" : "Magento",
        "class" : "fab fa-magento"
    },
    {
        "id": 7,
        "title" : "Shopify",
        "class" : "fab fa-html5"
    },
]

dto = experiences.reverse();

dto.forEach(
    ({position, companyName, location, duration, description }) => {
        profileCards.innerHTML += `
            <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
                <div class="flex-grow-1">
                    <h3 class="mb-0">${position}</h3>
                    <div class="subheading mb-3">${companyName} · ${location}</div>
                    <p>${description}</p>
                </div>
                <div class="flex-shrink-0"><span class="text-primary">${duration}</span></div>
            </div>
        `
})




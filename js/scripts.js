/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

const workProfile = document.getElementById('experience-container');
const competencyList = document.getElementById('competency-list');
const languageList = document.getElementById('language-list');
const platformList = document.getElementById('platform-list');


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

fetch('../assets/data/profile.json')
  .then((res) => res.json())
  .then((data) => {
    // do stuff with the data

    const sortedWorkProfile = data['workProfile'].reverse();

    sortedWorkProfile.forEach(
        ({position, companyName, location, duration, description}) => {
            workProfile.innerHTML += `
                <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
                    <div class="flex-grow-1">
                        <h3 class="mb-0">${position}</h3>
                        <div class="subheading mb-3">${companyName} · ${location}</div>
                        <p>${description}</p>
                    </div>
                    <div class="flex-shrink-0"><span class="text-primary">${duration}</span></div>
                </div>           
            `
        }
    )

    const coreCompetencies = data['coreCompetencies'];
    coreCompetencies.forEach(
        ({title}) => {
            competencyList.innerHTML += `
            <li>
                <span class="fa-li"><i class="fas fa-check"></i></span>
                ${title}
            </li>
            `
        }
    )

    const programmingLang = data['programmingLang'];
    programmingLang.forEach(
        ({title, icon}) => {
            languageList.innerHTML += `
            <li class="list-inline-item" title="${title}"><i class="${icon}"></i></li>
            `
        }
    )

    const platforms = data['platforms'];
    platforms.forEach(
        ({title, icon}) => {
            platformList.innerHTML += `
            <li class="list-inline-item" title="${title}"><i class="${icon}"></i></li>
            `
        }
    )
  });





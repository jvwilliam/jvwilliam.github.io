/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

const workProfileContainer = document.getElementById('experience-container');
const competencyListContainer = document.getElementById('competency-list');
const languageListContainer = document.getElementById('language-list');
const platformListContainer = document.getElementById('platform-list');
const certContainer = document.getElementById('certificate-list');
const trainingContainer = document.getElementById('training-list');


// Utility: Safely escape HTML (for user-generated content)
function escapeHTML(str) {
    return str?.replace(/[&<>'"]/g, tag => ({'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;'}[tag])) || '';
}

function renderWorkProfile(workProfile = []) {
    let html = '';
    workProfile.slice().reverse().forEach(({position, companyName, location, duration, description}) => {
        html += `
            <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
                <div class="flex-grow-1">
                    <h3 class="mb-0" data-testid="exp-subheading">${escapeHTML(position)}</h3>
                    <div class="subheading mb-3">${escapeHTML(companyName)}${location ? ' · ' + escapeHTML(location) : ''}</div>
                    <p>${escapeHTML(description)}</p>
                </div>
                <div class="flex-shrink-0"><span class="text-primary">${escapeHTML(duration)}</span></div>
            </div>           
        `;
    });
    workProfileContainer.innerHTML = html;
}

function renderCoreCompetencies(coreCompetencies = []) {
    let html = '';
    coreCompetencies.forEach(({title}) => {
        html += `
        <li data-testid="competence-list">
            <span class="fa-li"><i class="fas fa-check" aria-hidden="true"></i></span>
            ${escapeHTML(title)}
        </li>
        `;
    });
    competencyListContainer.innerHTML = html;
}

function renderProgrammingLang(programmingLang = []) {
    let html = '';
    programmingLang.forEach(({title, icon}) => {
        html += `
        <li class="list-inline-item" title="${escapeHTML(title)}"><i class="${escapeHTML(icon)}" aria-label="${escapeHTML(title)}"></i></li>
        `;
    });
    languageListContainer.innerHTML = html;
}

function renderPlatforms(platforms = []) {
    let html = '';
    platforms.forEach(({title, icon}) => {
        html += `
        <li class="list-inline-item" title="${escapeHTML(title)}"><i class="${escapeHTML(icon)}" aria-label="${escapeHTML(title)}"></i></li>
        `;
    });
    platformListContainer.innerHTML = html;
}

function renderCertificates(certList = []) {
    let html = '';
    certList.forEach(({title, institute, year, url}) => {
        html += `
        <li data-testid="certificate-list">
            <span class="fa-li"><i class="fas fa-certificate text-warning" aria-hidden="true"></i></span>
            ${escapeHTML(title)}
            ${institute ? ' - ' : ''}
            ${url ? `<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(institute)} certificate">${escapeHTML(institute)}</a>` : escapeHTML(institute) || ''}
            ${year ? ` (${escapeHTML(year)})` : ''}
        </li>
        `;
    });
    certContainer.innerHTML = html;
}

function renderTrainings(trainingList = []) {
    let html = '';
    trainingList.slice().reverse().forEach(({title, institute, year, url}) => {
        html += `
        <li data-testid="training-list">
            <span class="fa-li"><i class="fas fa-certificate text-warning" aria-hidden="true"></i></span>
            ${escapeHTML(title)}
            ${institute ? ' - ' : ''}
            ${url ? `<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(institute)} training">${escapeHTML(institute)}</a>` : escapeHTML(institute)}
            ${year ? ` (${escapeHTML(year)})` : ''}
        </li>
        `;
    });
    trainingContainer.innerHTML = html;
}

window.addEventListener('DOMContentLoaded', event => {
    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    }
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

    // Fetch and render profile data
    fetch('../assets/data/profile.json')
      .then((res) => res.json())
      .then((data) => {
        renderWorkProfile(data['workProfile']);
        renderCoreCompetencies(data['coreCompetencies']);
        renderProgrammingLang(data['programmingLang']);
        renderPlatforms(data['platforms']);
        renderCertificates(data['certificate-list']);
        renderTrainings(data['trainings']);
      })
      .catch(error => {
        console.error('Failed to load profile data:', error);
        // Optionally show a user-friendly message in the UI
        if (workProfileContainer) workProfileContainer.innerHTML = '<p>Failed to load profile data.</p>';
      });
});





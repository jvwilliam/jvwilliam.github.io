/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

const workProfileContainer = document.getElementById('section-experience-container');
const competencyListContainer = document.getElementById('section-competency-list');
const languageListContainer = document.getElementById('section-language-list');
const platformListContainer = document.getElementById('section-platform-list');
const certContainer = document.getElementById('section-certificate-list');
const trainingContainer = document.getElementById('section-trainings-list');


// Utility: Safely escape HTML (for user-generated content)
function escapeHTML(str) {
    return str?.replace(/[&<>'"]/g, tag => ({'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;'}[tag])) || '';
}
// Section ID pattern - {section}-{sectionName}-{sectionPurporse}
function renderWorkProfile(workProfile = []) {
    let html = `
        <div class="section-intro">
            <h2 class="section-title" id="section-experience-primaryHeading" data-testid="section-experience-primaryHeading">Experience</h2>
            <p class="section-copy">A centered career timeline built for clarity: milestones, companies, dates, and impact in a minimal modern layout.</p>
        </div>
        <div class="timeline" aria-label="experience timeline">
    `;

    workProfile.slice().reverse().forEach(({position, companyName, location, duration, description}, index) => {
        const sideClass = index % 2 === 0 ? 'timeline-item left' : 'timeline-item right';
        html += `
            <article class="${sideClass}">
                <div class="timeline-marker" aria-hidden="true"></div>
                <div class="timeline-content">
                    <div class="timeline-header">
                        <div>
                            <div class="timeline-position">
                                <h3 id="section-experience-workTitle" data-testid="section-experience-workTitle">${escapeHTML(position)}</h3>
                            </div>
                            <div class="timeline-company" id="section-experience-companyName" data-testid="section-experience-companyName">${escapeHTML(companyName)}${location ? ' · ' + escapeHTML(location) : ''}</div>
                            <div><time class="timeline-date">${escapeHTML(duration)}</time></div>
                            </div>
                    </div>
                    <p>${escapeHTML(description)}</p>
                </div>
            </article>
        `;
    });

    html += '</div>';
    workProfileContainer.innerHTML = html;
}

function observeTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (!timelineItems.length) return;

    const observer = new IntersectionObserver((entries, observerRef) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observerRef.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -15% 0px',
        threshold: 0.2
    });

    timelineItems.forEach(item => observer.observe(item));
}

function renderExpertise(expertise = []) {
    let html = `
        <div class="section-intro">
            <h2 class="section-title" data-testid="section-expertise-heading">Expertise</h2>
            <p class="section-copy">Small teams often ship without dedicated QA — leading to production bugs, frustrated users, and costly last-minute fixes.</p>
        </div>
        <div class="expertise-cards-grid mb-5">
    `;
    
    expertise.forEach(({title, description, icon}) => {
        html += `
            <div class="expertise-card">
                <div class="expertise-card-icon">
                    <i class="${escapeHTML(icon)}"></i>
                </div>
                <h3 class="expertise-card-title">${escapeHTML(title)}</h3>
                <p class="expertise-card-description">${escapeHTML(description)}</p>
            </div>
        `;
    });
    
    html += '</div>';
    document.getElementById('section-expertise-container').innerHTML = html;
}

function renderCoreCompetencies(coreCompetencies = []) {
    let html = '';
    coreCompetencies.forEach(({title}) => {
        html += `
        <li id="section-competency-item" data-testid="section-competency-item">
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
        <li id="section-language-item" data-testid="section-language-item" class="tool-badge" title="${escapeHTML(title)}">
            <span class="tool-badge-icon" aria-hidden="true"><i class="${escapeHTML(icon)}"></i></span>
            <span class="tool-badge-label">${escapeHTML(title)}</span>
        </li>
        `;
    });
    languageListContainer.innerHTML = html;
}

function renderPlatforms(platforms = []) {
    let html = '';
    platforms.forEach(({title, icon}) => {
        html += `
        <li id="section-platform-item" data-testid="section-platform-item" class="tool-badge" title="${escapeHTML(title)}">
            <span class="tool-badge-icon" aria-hidden="true"><i class="${escapeHTML(icon)}"></i></span>
            <span class="tool-badge-label">${escapeHTML(title)}</span>
        </li>
        `;
    });
    platformListContainer.innerHTML = html;
}

function renderCertificates(certList = []) {
    let html = '';
    certList.forEach(({title, institute, year, url}) => {
        html += `
        <li id="section-certificate-item" data-testid="section-certificate-item">
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
        <li id=section-trainings-item" data-testid="section-trainings-item">
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
    // Fetch and render profile data
    fetch('../assets/data/profile.json')
      .then((res) => res.json())
      .then((data) => {
        renderWorkProfile(data['workProfile']);
        renderExpertise(data['expertise']);
        observeTimelineItems();
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

    // Typing animation for the heading
    const texts = [
        'Web App Testing Specialist',
        '10+ Years Experience in Testing',
        'Helping teams ship bug-free, secure web applications',
        'Shipping confidence through testing'
    ];
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    const typingSpeed = 50; // ms per character
    const deletingSpeed = 50;
    const pauseTime = 2000; // pause before deleting
    const animatedHeading = document.getElementById('animated-heading');

    function typeWriter() {
        const currentText = texts[currentTextIndex];
        if (isDeleting) {
            animatedHeading.textContent = currentText.substring(0, currentCharIndex--);
            if (currentCharIndex < 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                setTimeout(typeWriter, 500); // pause before next text
            } else {
                setTimeout(typeWriter, deletingSpeed);
            }
        } else {
            animatedHeading.textContent = currentText.substring(0, currentCharIndex++);
            if (currentCharIndex > currentText.length) {
                isDeleting = true;
                setTimeout(typeWriter, pauseTime);
            } else {
                setTimeout(typeWriter, typingSpeed);
            }
        }
    }

    // Start the animation after a short delay
    setTimeout(typeWriter, 1000);
});





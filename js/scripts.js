// Hamburger Menu Toggle
const hamburgerMenu = document.getElementById('hamburger-menu');
const navList = document.getElementById('nav-list');

if (hamburgerMenu && navList) {
  hamburgerMenu.addEventListener('click', function() {
    hamburgerMenu.classList.toggle('active');
    navList.classList.toggle('active');
  });

  // Close menu when a link is clicked
  const navLinks = navList.querySelectorAll('.nav-anchor');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      hamburgerMenu.classList.remove('active');
      navList.classList.remove('active');
    });
  });
}

const workProfileContainer = document.getElementById('section-experience-container');
const expertiseContainer = document.getElementById('section-expertise-container');
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
    if (!workProfileContainer) return;

    const visibleExperienceCount = 3;
    const orderedWorkProfile = workProfile.slice().reverse();

    let html = `
        <div class="section-intro">
            <h2 class="section-title" id="section-experience-primaryHeading" data-testid="section-experience-primaryHeading">Experience</h2>
            <p class="section-copy">A decade-long QA journey across web applications, test automation, team leadership, and release support for software teams with changing project demands.</p>
        </div>
        <div class="timeline" aria-label="experience timeline">
    `;

    orderedWorkProfile.forEach(({position, companyName, location, duration, description}, index) => {
        const sideClass = index % 2 === 0 ? 'timeline-item left' : 'timeline-item right';
        const isInitiallyHidden = index >= visibleExperienceCount;
        const itemClass = `${sideClass}${isInitiallyHidden ? ' timeline-item--hidden' : ''}`;
        const hiddenAttribute = isInitiallyHidden ? ' hidden' : '';

        html += `
            <article class="${itemClass}"${hiddenAttribute}>
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

    if (orderedWorkProfile.length > visibleExperienceCount) {
        html += `
            <div class="timeline-actions">
                <button class="timeline-show-more" type="button" id="section-experience-showMore" data-testid="section-experience-showMore" aria-controls="section-experience-container" aria-expanded="false">
                    Show More
                </button>
            </div>
        `;
    }

    workProfileContainer.innerHTML = html;
    setupExperienceShowMore();
}

function setupExperienceShowMore() {
    if (!workProfileContainer) return;

    const showMoreButton = document.getElementById('section-experience-showMore');
    if (!showMoreButton) return;

    showMoreButton.addEventListener('click', () => {
        const hiddenTimelineItems = workProfileContainer.querySelectorAll('.timeline-item[hidden]');

        hiddenTimelineItems.forEach(item => {
            item.hidden = false;
            item.classList.remove('timeline-item--hidden');
            item.classList.add('timeline-item--fade-in');
        });

        showMoreButton.setAttribute('aria-expanded', 'true');
        showMoreButton.closest('.timeline-actions')?.remove();
    });
}

function renderExpertise(expertise = []) {
    if (!expertiseContainer) return;

    let html = `
        <div class="section-intro">
            <h2 class="section-title" data-testid="section-expertise-heading">Expertise</h2>
            <p class="section-copy">I specialize in modern web application QA: validating critical user flows, building practical test automation, improving quality processes, and identifying risks before release.</p>
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
    expertiseContainer.innerHTML = html;
}

function renderProgrammingLang(programmingLang = []) {
    if (!languageListContainer) return;

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
    if (!platformListContainer) return;

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
    if (!certContainer) return;

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
    if (!trainingContainer) return;

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
    setupExperienceShowMore();

    // Fetch and render profile data
    fetch('/assets/data/profile.json')
      .then((res) => res.json())
      .then((data) => {
        renderWorkProfile(data['workProfile']);
        renderExpertise(data['expertise']);
        renderProgrammingLang(data['programmingLang'].toSorted((a, b) => a.title.localeCompare(b.title)));
        renderPlatforms(data['platforms'].toSorted((a, b) => a.title.localeCompare(b.title)));

         // Typing animation for the heading
        const texts = data['animatedText'].toSorted() || [];
        startTypingAnimation(texts);
        //renderCertificates(data['certificate-list']);
        //renderTrainings(data['trainings']);
      })
      .catch(error => {
        console.error('Failed to load profile data:', error);
      });

    function startTypingAnimation(texts = [], animatedHeading = document.getElementById('animated-heading')) {
        if (!animatedHeading) return;
        if (!texts.length) return;

        let currentTextIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        const typingSpeed = 50; // ms per character
        const deletingSpeed = 50;
        const pauseTime = 2000; // pause before deleting

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
    }
});

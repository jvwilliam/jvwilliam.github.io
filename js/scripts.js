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
const ctaSections = document.querySelectorAll('[data-cta-key]');
const mailtoPresetLinks = document.querySelectorAll('[data-mailto-key]');


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
            <p class="section-copy">Modern web application QA focused on reliable user experiences, smarter test automation, and lower release risks.</p>
        </div>
        <div class="expertise-cards-grid mb-5">
    `;

    const orderedExpertise = [...expertise].sort(
        (a, b) => Number(a.id) - Number(b.id)
    );

    const heroExpertise = document.getElementById('hero-expertise');
    const heroExpertiseList = document.getElementById('hero-expertise-list');
    if (heroExpertise && heroExpertiseList) {
        heroExpertiseList.replaceChildren();
        orderedExpertise.forEach(({title}) => {
            const item = document.createElement('li');
            item.textContent = title;
            heroExpertiseList.appendChild(item);
        });
        heroExpertise.hidden = orderedExpertise.length === 0;
    }
    
    orderedExpertise.forEach(({title, description, icon, isPlaceholder}, index) => {
        const modifiers = [
            index === 0 ? 'expertise-card--featured' : '',
            isPlaceholder ? 'expertise-card--placeholder' : ''
        ].filter(Boolean).join(' ');
        const iconMarkup = icon
            ? `<img src="${escapeHTML(icon)}" alt="" width="64" height="64">`
            : '';
        const placeholderIconClass = icon ? '' : ' expertise-card-icon--placeholder';

        html += `
            <article class="expertise-card ${modifiers}">
                <div class="expertise-card-header">
                    <div class="expertise-card-icon${placeholderIconClass}"${icon ? '' : ' aria-hidden="true"'}>
                        ${iconMarkup}
                    </div>
                    <h3 class="expertise-card-title">${escapeHTML(title)}</h3>
                </div>
                <p class="expertise-card-description">${escapeHTML(description)}</p>
            </article>
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

function buildMailtoHref(href, subject, body) {
    if (!href) return '';
    if (!subject && !body) return href;

    const [baseHref, queryString = ''] = href.split('?');
    const params = new URLSearchParams(queryString);

    if (subject) params.set('subject', subject);
    if (body) params.set('body', body);

    const renderedParams = params.toString();
    return renderedParams ? `${baseHref}?${renderedParams}` : baseHref;
}

function resolveMailtoPreset(item = {}, mailtoPresets = {}) {
    const preset = item.mailtoPreset ? mailtoPresets[item.mailtoPreset] : item;
    if (!preset?.href) return '';

    return buildMailtoHref(preset.href, preset.subject, preset.body);
}

function renderCtas(ctas = {}, mailtoPresets = {}) {
    if (!ctaSections.length) return;

    ctaSections.forEach(section => {
        const key = section.dataset.ctaKey;
        const cta = ctas[key];
        if (!cta) return;

        const heading = section.querySelector('[data-testid="section-cta-primaryHeading"]');
        const copy = section.querySelector('[data-testid="section-cta-copy"]');
        const link = section.querySelector('[data-testid="section-cta-contactLink"]');

        if (heading && cta.heading) heading.textContent = cta.heading;
        if (copy && cta.copy) copy.textContent = cta.copy;
        if (link && cta.linkLabel) link.textContent = cta.linkLabel;
        if (link) {
            const href = resolveMailtoPreset(cta, mailtoPresets);
            if (href) link.href = href;
        }
    });
}

function renderMailtoPresetLinks(links = {}, mailtoPresets = {}) {
    if (!mailtoPresetLinks.length) return;

    mailtoPresetLinks.forEach(link => {
        const key = link.dataset.mailtoKey;
        const linkConfig = links[key];
        if (!linkConfig) return;

        const href = resolveMailtoPreset(linkConfig, mailtoPresets);
        if (href) link.href = href;
        if (linkConfig.linkLabel) link.textContent = linkConfig.linkLabel;
    });
}

window.addEventListener('DOMContentLoaded', event => {
    setupExperienceShowMore();

    if (ctaSections.length || mailtoPresetLinks.length) {
        fetch('/assets/data/cta.json')
          .then((res) => res.json())
          .then((data) => {
            renderCtas(data.ctas, data.mailtoPresets);
            renderMailtoPresetLinks(data.links, data.mailtoPresets);
          })
          .catch(error => {
            console.error('Failed to load CTA data:', error);
          });
    }

    // Fetch and render profile data
    fetch('/assets/data/profile.json')
      .then((res) => res.json())
      .then((data) => {
        renderWorkProfile(data['workProfile']);
        renderExpertise(data['expertise']);
        renderProgrammingLang(data['programmingLang'].toSorted((a, b) => a.title.localeCompare(b.title)));
        renderPlatforms(data['platforms'].toSorted((a, b) => a.title.localeCompare(b.title)));

         // Crossfade the supporting hero text
        const texts = data['animatedText'].toSorted() || [];
        startCrossfadeAnimation(texts);
        //renderCertificates(data['certificate-list']);
        //renderTrainings(data['trainings']);
      })
      .catch(error => {
        console.error('Failed to load profile data:', error);
      });

    function startCrossfadeAnimation(texts = []) {
        const slots = [
            document.getElementById('animated-heading'),
            document.getElementById('animated-heading-next')
        ];
        const phrases = texts.filter(text => typeof text === 'string' && text.trim());
        if (slots.some(slot => !slot) || !phrases.length) return;

        const [firstSlot, secondSlot] = slots;
        firstSlot.textContent = phrases[0];
        firstSlot.classList.add('is-active');
        firstSlot.setAttribute('aria-hidden', 'false');
        secondSlot.textContent = '';
        secondSlot.classList.remove('is-active');
        secondSlot.setAttribute('aria-hidden', 'true');

        const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (phrases.length < 2 || motionPreference.matches) return;

        let activeSlotIndex = 0;
        let phraseIndex = 0;
        const fadeDuration = 400;
        const rotationInterval = 4500;

        const intervalId = window.setInterval(() => {
            const previousSlot = slots[activeSlotIndex];
            const nextSlotIndex = 1 - activeSlotIndex;
            const nextSlot = slots[nextSlotIndex];

            phraseIndex = (phraseIndex + 1) % phrases.length;
            nextSlot.textContent = phrases[phraseIndex];

            window.requestAnimationFrame(() => {
                nextSlot.classList.add('is-active');
                nextSlot.setAttribute('aria-hidden', 'false');
                previousSlot.classList.remove('is-active');
                previousSlot.setAttribute('aria-hidden', 'true');
            });

            window.setTimeout(() => {
                previousSlot.textContent = '';
            }, fadeDuration);

            activeSlotIndex = nextSlotIndex;
        }, rotationInterval);

        motionPreference.addEventListener('change', event => {
            if (!event.matches) return;

            window.clearInterval(intervalId);
            slots.forEach((slot, index) => {
                slot.textContent = index === 0 ? phrases[0] : '';
                slot.classList.toggle('is-active', index === 0);
                slot.setAttribute('aria-hidden', String(index !== 0));
            });
        });
    }
});

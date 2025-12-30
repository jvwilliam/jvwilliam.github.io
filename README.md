# Overview

As part of my continuous learning objectives, I've created this personal website and online resume, showcasing my professional experience, current skills, portfolio, interests and to practice and develop my programming and coding skills. This site serves as a digital representation of my career, providing easy access to my background, projects, and contact information.

## Features
- **About Me:** A brief introduction to my professional background and expertise.
- **Experience:** Details of my work history and key achievements.
- **Skills:** A Showcase of my technical and professional skills.
- **Trainings & Certifications:** A list highlighting my career interests and development.
- **Contact:** A link that directs to my LinkedIn and GitHub profile.
- **Automated Tests:** Automated assertions via Playwright integrated with GitHub actions.

## Tech Stack

| Component                 | Technology                |
|---------------------------|---------------------------|
|**Frontend**               | HTML, CSS, JavaScript     |
|**Framework/Libraries**    | Boostrap                  |
|**Hosting**                | GitHub Pages              |
|**Version Control**        | Git, GitHub               |
|**CI**                     | GitHub Actions            |

## Future Enhancements
- Add a blog section for sharing insights and experiences.
- Integrate a contact form with email handling.
- Improve SEO and performance optimization.
- Utilize API responses and add dynamic logic when asserting copies to reduce the need to update assertion scripts.

## Testing Stack
This project uses [Playwright](https://playwright.dev/) for automated end-to-end testing to ensure the website’s functionality and reliability. While this project is a static website, its main purpose is to demonstrate the integration of automated testing. The focus is on applying Page Object Model (POM) design patterns, exploring different class structures, and setting up Continuous Integration (CI) pipelines using GitHub Actions.

### Project Structure
- All Playwright tests are located in the `/e2e` directory.
- Test files follow the naming convention: `*.spec.js` or `*.spec.ts`.

### Installation

Install dependencies: 
``` 
npm install 
```

Install Playwright browsers: 
```
npx playwright install
```

### Running Tests

To run all tests: 
```
npx playwright test
```

To run test in headed mode: 
```
npx playwright --headed
```

To view the HTML test report
```
npx playwright show-report
```

### Continuous Integration
- Tests are automatically run in CI using GitHub Actions on each push and pull request.

### Support
For Playwright documentation, visit [playwright.dev/docs](https://playwright.dev/docs/intro).

## License
Licensed under [MIT](https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)

## Contact
Feel free to reach out to me on [LinkedIn](https://www.linkedin.com/in/jvwilliamandal/) or email me at [contact@jvwilliam.com](mailto:contact@jvwilliam.com)

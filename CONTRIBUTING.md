# Contributing

Thanks for contributing to Sidebar for WPBakery Page Builder! We're quite open to new feature requests, or any work you want to do.

Please read the following guidelines before making a contribution.

- [Submission Guidelines](#submission-guidelines)
- [Installation instruction](#installation-instruction)
- [Coding Rules](#coding-rules)

**NOTE: we have a [code of conduct](./CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.**

## Submission Guidelines

### Pull Requests

The codebase is maintained using the "contributor workflow" where everyone without exception contributes patch proposals using "pull requests". This facilitates social contribution, easy testing and peer review.

To contribute a patch, the workflow is as follows:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Commit your changes.
5. Push your branch to your fork.
6. Create a pull request (against the `main` branch).
7. Wait for your pull request to be reviewed.
8. Make changes if the reviewer requests them.
9. Get your pull request merged and wait for it to be released.

**NOTE: Keep the `main` branch tests passing at all times.**

### Creating Issues

When creating issues please follow the according template structure:
- [Bug report](./.github/ISSUE_TEMPLATE/bug_report.md)
- [Feature request](./.github/ISSUE_TEMPLATE/feature_request.md)
- [Custom](./.github/ISSUE_TEMPLATE/custom.md)

**NOTE: When you are creating an issue, please include as many details as possible. Fill out the according template and provide a clear and descriptive title.**

#### Tips for writing good issues

1. Search the issue tracker before opening an issue.
2. Ensure you're using the latest version of Sidebar for WPBakery Page Builder.
3. Use a clear and descriptive title for the issue to identify the problem.
4. Describe the exact steps which reproduce the problem in as many details as possible.
5. Provide specific examples to demonstrate the steps.
6. Describe the behavior you observed after following the steps and explain what exactly is the problem with that behavior.
7. Explain which behavior you expected to see instead and why.
8. Include screenshots and animated GIFs which show you following the described steps and clearly demonstrate the problem.
9. If the problem is related to performance or memory, include a profile of the page load.
11. If the problem is related to the editor, include a screenshot of the browser.

## Installation instruction

To set up a local dev environment following steps are required:

1. Fork this repository
2. Clone:
```sh
git clone git@github.com:[YOUR_USERNAME]/sidebar-navigation-for-wpbakery.git
```
3. Go into cloned repository folder:
```sh
cd sidebar-navigation-for-wpbakery
```
4. Install npm packages:
```sh
yarn install
```
5. Build project using [Gulp](https://gulpjs.com/):
```sh
yarn build
```
or watch changes:
```sh
yarn watch
```
6. Build for production:
```sh
yarn build-prod
```

## Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

- Your code should pass all tests.
- Your code should pass all linters.
- Your code should be well-documented.
- Your code should be well-formatted.
- Your code should be consistent with the existing codebase.
- Your code should be consistent with the code style (see below).
- Your code should be consistent with the [accessibility guidelines](https://wordpress.org/about/accessibility/).
- Your code should be consistent with the [security guidelines](https://wordpress.org/about/security/).
- Your code should be consistent with the [performance guidelines](https://make.wordpress.org/performance/handbook/measuring-performance/best-practices-for-performance-measurement/).
- Your code should be consistent with the [localization guidelines](https://developer.wordpress.org/apis/internationalization/localization/).
- Your code should be consistent with the [internationalization guidelines](https://developer.wordpress.org/apis/internationalization/internationalization-guidelines/).

### JavaScript code style check

For JavaScript, we are using [ESLint](https://eslint.org/) to ensure a consistent coding style.

To check your JS code against our code standards rules:

```sh
$ yarn lint
```

To automatically fix errors and warnings, run:

```sh
$ yarn lint --fix
```

### CSS code style check

For CSS, we are using [Stylelint](https://stylelint.io/) to ensure a consistent coding style.

To check your CSS code against our code standards rules:

```sh
$ yarn lint:scss
```

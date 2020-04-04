# CHANGE lOG

## 2.2.6
- Fix select "all open prs" bug. Add more tests

## 2.2.5
- Fix select pr continue bug. Add more tests

## 2.2.4
- Update circleci configuration file

## 2.2.3
- Update package.json to indicate correct minimum Node requirement

## 2.2.2
- Upgrade mocha and yargs to more recent versions

## 2.2.1
- Bump lodash from 4.17.11 to 4.17.15 address security issue

## 2.2.0
- Add `--owners` flag and default configuration value to restrict results to repos owned by specific orgs or individuals.

## 2.1.0
- Add `--all` flag and `all` pr question option. Both open a browser window with a list of all open prs.

## 2.0.3
- README updates to mention the permissions needed for Github personal access token.

## 2.0.2
- Refactored `getOpenPrs` to facilitate testing by dependency injection
- Added `getOpenPrs` test

## 2.0.1
- Specified projectName so the command works in other directories

## 2.0.0
- Switched to conf for configuration

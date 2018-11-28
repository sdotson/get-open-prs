# get-open-prs
[![CircleCI](https://circleci.com/gh/sdotson/get-open-prs.svg?style=svg&circle-token=dcee4082855c265ccf63c1c581bc3229b2a174ff)](https://circleci.com/gh/sdotson/get-open-prs)

## Installation
- Set an environment variable called `GITHUB_TEAM` with the Github usernames of your team members enclosed in a string and separated by spaces (e.g. `GITHUB_TEAM="user1 user2 user3 user4"`).
- Set an environment variable called `GITHUB_TOKEN` with your github api token.

### NPM
`npm install -g get-open-prs` to install globally and to be able to use the keyboard shortcut anywhere.

### Yarn
`yarn add get-open-prs --global` to install globally and use the shortcut anywhere. See https://yarnpkg.com/lang/en/docs/cli/global/ for more details.

## Instructions
- You can get the current open prs for your team by typing `gop` in any directory.
- After typing the `gop` command, a prompt will appear for you to select a specific pr to review. Once you hit enter, your default browser will open the pr.
- You'll then be given the option to continue reviewing other prs.

## Options
|Option|Description|Default|Required|
|----|---|---|---|
|`-v`|Verbose. Print out pull request details|`false`|`false`|
|`-t`|Team. Specify a space separated list of github usernames. Overrides environment variable.|`GITHUB_TEAM`|`false`|

## Screenshot
![screenshot](https://raw.githubusercontent.com/sdotson/get-open-prs/master/screenshot.png)

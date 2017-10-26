# get-open-prs
[![CircleCI](https://circleci.com/gh/sdotson/get-open-prs.svg?style=svg&circle-token=dcee4082855c265ccf63c1c581bc3229b2a174ff)](https://circleci.com/gh/sdotson/get-open-prs)
# Installation
- Set an environment variable called `GITHUB_TEAM` with the Github usernames of your team members enclosed in a string and separated by spaces (e.g. `GITHUB_TEAM="user1 user2 user3 user4"`).
- Set an environment variable called `GITHUB_TOKEN` with your github api token.
- `npm install -g` to install globally and to be able to use the keyboard shortcut anywhere.
- You can now get the current open prs for your team by typing `gop` in any directory.
- After typing the `gop` command, a prompt will appear for you to select a specific pr to review. Once you hit enter, your default browser will open the pr.
- You'll then be given the option to continue reviewing other prs.

![screenshot](https://raw.githubusercontent.com/sdotson/get-open-prs/master/screenshot.png)

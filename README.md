# get-open-prs
[![CircleCI](https://circleci.com/gh/sdotson/get-open-prs.svg?style=svg&circle-token=dcee4082855c265ccf63c1c581bc3229b2a174ff)](https://circleci.com/gh/sdotson/get-open-prs)

## Installation
1. `npm install -g get-open-prs` to install globally and to be able to use the keyboard shortcut anywhere.
2. The first time you run `get-open-prs`, you'll be prompted to set a default list of Github usernames and your Github token. You'll be able to update this later by running `get-open-prs --config` or overriding with `--usernames` or `--token` command options detailed below.

## Instructions
- You can get the current open prs for your team by typing `get-open-prs` in any directory.
- After typing the `get-open-prs` command, a prompt will appear for you to select a specific pr to review. Once you hit enter, your default browser will open the pr.
- You'll then be given the option to continue reviewing other prs.

## Options
|Option|Description|Default|Required|
|----|---|---|---|
|`-c, --config`|Set up default Github token and usernames|`null`|`false`|
|`-t, --token`|Token. Overrides any saved default Github token|`config or null`|`false`|
|`-u, --usernames`|Usernames. Overrides any saved default usernames|` config or null`|`false`|
|`-v, --verbose`|Verbose. Print out pull request details|`false`|`false`|

## Screenshot
![screenshot](https://raw.githubusercontent.com/sdotson/get-open-prs/master/screenshot.png)

# get-open-prs
[![CircleCI](https://circleci.com/gh/sdotson/get-open-prs.svg?style=svg&circle-token=dcee4082855c265ccf63c1c581bc3229b2a174ff)](https://circleci.com/gh/sdotson/get-open-prs)

## Installation
1. `npm install -g get-open-prs` to install globally and to be able to use the keyboard shortcut anywhere.
2. The first time you run `get-open-prs`, you'll be prompted to set a default list of Github usernames and your Github token. You'll be able to update this later by running `get-open-prs --config` or overriding with `--usernames` or `--token` command options detailed below.

## Instructions
- You can get the current open prs for your team by typing `get-open-prs` in any directory.
- After typing the `get-open-prs` command, a prompt will appear for you to select a specific pr to review. Once you hit enter, your default browser will open the pr.
- You'll then be given the option to continue reviewing other prs.
- Optionally, you can create an alias for `get-open-prs` if that's too many letters to type out. Simply edit `~/.bash_profile` or `~/.zprofile` (if you use zsh) and add the following:
```
alias gop="get-open-prs"
``
In the above, `gop` is the new shorter command. This could really be anything.

## Options
|Option|Description|Default|Required|
|----|---|---|---|
|`-c, --config`|Set up default Github token and usernames|`null`|`false`|
|`-t, --token`|Token. Overrides any saved default Github token|`config or null`|`false`|
|`-u, --usernames`|Usernames. Overrides any saved default usernames|` config or null`|`false`|
|`-v, --verbose`|Verbose. Print out pull request details|`false`|`false`|

## Examples

### Use default github and usernames configuration and get all prs
```
get-open-prs
```

### Change token or usernames configuration
```
get-open-prs --config
```

### Pass in usernames override
```
get-open-prs --usernames user1 user2 user3 user4
```

## Screenshot
![screenshot](https://raw.githubusercontent.com/sdotson/get-open-prs/master/screenshot.png)

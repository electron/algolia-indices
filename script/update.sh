#!/usr/bin/env bash

set -x            # print commands before execution
set -o errexit    # always exit on error
set -o pipefail   # honor exit codes when piping
set -o nounset    # fail on unset variables

# bootstrap
git clone "https://github.com/electron/algolia-search-index" project
cd project
npm install

# update stuff
npm update electron-apps
npm update electron-i18n
npm update electron-npm-packages

# bail if nothing changed
[[ `git status --porcelain` ]] || exit

# upload to algolia
npm run upload

# save changes in git
git add .
git config user.email electron@github.com
git config user.name electron-bot
git commit -am "update data sources"
git push origin master --follow-tags
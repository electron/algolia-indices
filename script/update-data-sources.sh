#!/usr/bin/env bash

set -v            # print commands before execution, but don't expand env vars in output
set -o errexit    # always exit on error
set -o pipefail   # honor exit codes when piping
set -o nounset    # fail on unset variables

# bootstrap
git clone "https://electron-bot:$GITHUB_TOKEN@github.com/electron/algolia-indices" module
cd module
git checkout hashi-the-debugger
npm ci

# update stuff
npm update electron-apps
npm update electron-i18n
npm update electron-npm-packages
# npm update electron-releases

npm run build
npm test

# bail if nothing changed
if [ "$(git status --porcelain)" = "" ]; then
  echo "no new content found; goodbye!"
  exit
else
  echo "Indices updated, uploading"
  # npm run upload
fi

# save changes in git
git config user.email electron@github.com
git config user.name electron-bot
git add .
git commit -am "feat: update data sources (auto-roll 🤖)"
git pull --rebase && git push origin hashi-the-debugger --follow-tags

workflow "Update data sources" {
  resolves = ["Fetch latest data sources"]
  on = "schedule(15 09 * * *)"
}

action "Fetch latest data sources" {
  uses = "actions/npm@master"
  args = "run update-data-sources"
  secrets = ["GH_TOKEN"]
}

workflow "Test and publish" {
  on = "push"
  resolves = ["Publish via semantic-release", "Upload Algolia Indices"]
}

action "Install dependencies" {
  uses = "actions/npm@master"
  args = "ci"
}

action "Run tests" {
  uses = "actions/npm@master"
  needs = ["Install dependencies"]
  args = "test"
}

action "Only publish master branch" {
  uses = "BinaryMuse/tip-of-branch@stable"
  needs = ["Run tests"]
  args = "master"
  secrets = ["GITHUB_TOKEN"]
}

action "Publish via semantic-release" {
  uses = "actions/npm@master"
  needs = ["Only publish master branch"]
  args = "run semantic-release"
  secrets = ["GH_TOKEN", "NPM_TOKEN"]
}

action "Upload Algolia Indices" {
  uses = "actions/npm@master"
  needs = ["Only publish master branch"]
  args = "run upload"
  secrets = ["ALGOLIA_API_KEY", "ALGOLIA_APPLICATION_ID"]
}

workflow "Update data sources" {
  on = "push"
  resolves = ["Fetch latest data sources"]
}

action "Fetch latest data sources" {
  uses = "actions/npm@master"
  args = "run update-data-sources"
  secrets = [
    "GITHUB_TOKEN",
  ]
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

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@master"
  needs = ["Run tests"]
  args = "branch master"
}

action "Publish via semantic-release" {
  uses = "actions/npm@master"
  needs = ["Filters for GitHub Actions"]
  args = "run semantic-release"
  secrets = ["GITHUB_TOKEN"]
}

action "Upload Algolia Indices" {
  uses = "actions/npm@master"
  needs = ["Filters for GitHub Actions"]
  args = "run upload"
}

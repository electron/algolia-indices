workflow "Update data sources" {
  on = "schedule(0 09 * * *)"
  resolves = ["Fetch latest data sources"]
}

action "Fetch latest data sources" {
  uses = "actions/npm@master"
  args = "run update-data-sources"
  env = {
    NODE_OPTIONS = "--max_old_space_size=4096"
  }
  secrets = [
    "GH_TOKEN"
  ]
}

workflow "Test and publish" {
  on = "push"
  resolves = ["Run tests"]
}

action "Install dependencies" {
  uses = "actions/npm@master"
  args = "ci"
}

action "Run tests" {
  uses = "actions/npm@master"
  needs = ["Install dependencies"]
  args = "test"
  env = {
    NODE_OPTIONS = "--max_old_space_size=4096"
  }
}

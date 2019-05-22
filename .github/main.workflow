// workflow "Update source content" {
//  on = "schedule(0 */6 * * *)"
//  resolves = ["Fetch latest source content"]
//}

// action "Fetch latest source content" {
//  uses = "actions/npm@master"
//  args = "run update-source-content"
//  env = {
//    NODE_OPTIONS = "--max_old_space_size=4096"
//  }
//  secrets = [
//    "CROWDIN_KEY",
//    "GH_TOKEN",
//  ]
//}

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

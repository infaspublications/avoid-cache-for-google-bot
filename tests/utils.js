const execSync = require('child_process').execSync

module.exports = {
  deployService() {
    execSync('npx serverless deploy --stage integrationtest', { stdio: 'inherit' })
  },

  removeService() {
    execSync('npx serverless remove --stage integrationtest', { stdio: 'inherit' })
  }
}

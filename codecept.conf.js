const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'http://localhost',
      show: false,
      browser: 'chromium'
    },
    AllureHelper: {
      require: './helpers/AllureHelper.js',
      url: 'http://localhost:5050/allure-docker-service',
      projectId: 'dev',
      outputDir: './allure-results',      
    },
    REST: {
      endpoint: 'http://localhost',
    },
  },
  include: {
    I: './steps_file.js',
    "codeceptioPage": "./pages/codeceptio.js",
    "testingChallengesPage": "./pages/testing.challenges.js"
  },
  name: 'CodeceptJSDemo',
  plugins: {
    // allure: {
    //     enabled: true,
    //     outputDir: './allure-results',
    // }
  }
}
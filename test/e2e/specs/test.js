// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'Page loads with no items': browser => {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.listing--no-items')
      .end()
  },

  'Shows load fixtures dialog on load with no items': browser => {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.listing--no-items .dialog')
      .assert.containsText('.listing--no-items .dialog', 'Would you like me to load')
      .end()
  },

  'Loads fixtures': browser => {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.listing--no-items .dialog')
      .assert.elementPresent('.listing--no-items .dialog button')
      .click('.listing--no-items .dialog button')
      .waitForElementVisible('.listing__items', 5000)
      .assert.elementCount('.item-card', 6)
      .end()
  },

  'Triggers form when item clicked': browser => {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .click('.listing--no-items .dialog button')
      .waitForElementVisible('.listing__items', 5000)
      .click('.item-card:first-child')
      .waitForElementVisible('.item-form', 5000)
      .assert.elementPresent('.item-form--show')
      .end()
  },

  'Triggers form when "Add" button pressed': browser => {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.sidebar .button__add')
      .click('.sidebar .button__add')
      .waitForElementVisible('.item-form', 5000)
      .assert.elementPresent('.item-form--show')
      .end()
  }
}

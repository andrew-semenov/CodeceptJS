const { I } = inject();

module.exports = {
  firstNameField: {css: '#firstname'},
  submitButton: {css: 'input[name="formSubmit"]'},

  open() {
    I.amOnPage('http://testingchallenges.thetestingmap.org/index.php')
    I.waitForElement(this.firstNameField, 5)
  },

  fillFirstNameField(firstName) {
    I.fillField(this.firstNameField, firstName)

    return this
  },

  submitForm() {
    I.click(this.submitButton)

    return this
  }, 

  assertCheckIsFound(text) {
    I.waitForText(text, 5, 'ul.values-description li')

    return this
  },

  async checkCookie(name) {
    const cookies = await I.grabCookie(name)
    const chars = cookies.value.split('_')
    return chars[7]
  }
}

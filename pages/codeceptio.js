const assert = require('assert')

const { I } = inject();

module.exports = {
  navbarSiteName: {css: 'span.site-name'},
  search: {css: '#algolia-search-input'},
  searchSuggestion: {css: 'div.algolia-docsearch-suggestion--title'},
  articleTitle: {css: 'div.article-title'},

  open() {
    I.amOnPage('http://codecept.io')
    I.waitForElement(this.navbarSiteName, 5)
  },

  searchText(text) {
    I.waitForElement(this.search, 5)
    I.fillField(this.search, text)
  },

  openSearchResult(text) {
    I.waitForElement(this.searchSuggestion, 5)
    I.click(this.searchSuggestion)
  },

  expandNavMenuItem(item){
    I.waitForElement(`button[aria-label="${item}"]`, 5)
    I.moveCursorTo(`button[aria-label="${item}"]`)
  },

  selectNavMenuSubItem(subItem){
    I.waitForText(subItem, 5, `//a[.="${subItem}"]`)
    I.click(subItem, `//a[.="${subItem}"]`)
  },

  async verifyPageByTitle(text) {
    I.waitForText(text, 5, this.articleTitle)
    const pageTitle = await I.grabTextFrom(this.articleTitle)
    I.say('Grabbed page title: ' + pageTitle)
    assert.equal(pageTitle, text)
  }
}

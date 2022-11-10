Feature('Codecept.io');

Scenario('Looking for a "Getting Started" page', async({ I, codeceptioPage }) => {
    const text = 'Getting Started'
    
    codeceptioPage.open()

    codeceptioPage.searchText(text)
    
    codeceptioPage.openSearchResult()

    codeceptioPage.verifyPageByTitle(text)
});

Scenario('Open a "Getting Started" page via navigation bar', async({ I, codeceptioPage }) => {
    const navMenuItem = 'Guides'
    const navMenuSubItem = 'Getting Started'
    
    codeceptioPage.open()

    codeceptioPage.expandNavMenuItem(navMenuItem)

    codeceptioPage.selectNavMenuSubItem(navMenuSubItem)

    codeceptioPage.verifyPageByTitle(navMenuSubItem)
});

Scenario.skip('Example of skipped test', async({ I }) => {});
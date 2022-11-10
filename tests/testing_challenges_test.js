Feature('Testing Challenge #1 - web testing');

Scenario('First Name input field', async({ I, testingChallengesPage }) => {
    testingChallengesPage.open()

    // Minimum value
    testingChallengesPage
    .fillFirstNameField('T')
    .submitForm()
    .assertCheckIsFound('Minimum value')

    // Average value and Non ASCII
    testingChallengesPage
    .fillFirstNameField('Тест')
    .submitForm()
    .assertCheckIsFound('Non ASCII')
    .assertCheckIsFound('Average value')

    // Maximum values and Other chars then alphabetic
    testingChallengesPage
    .fillFirstNameField('Test1Test2Test3Test4Test5Test6')
    .submitForm()
    .assertCheckIsFound('Other chars then alphabetic')
    .assertCheckIsFound('Maximum values')

    // More than maximum values and Space values
    testingChallengesPage
    .fillFirstNameField(' Test Test Test Test Test Test ')
    .submitForm()
    .assertCheckIsFound('More than maximum values')
    .assertCheckIsFound('Space values at the beginning')
    .assertCheckIsFound('Space values at the end')
    .assertCheckIsFound('Space in the middle')

    // Empty value
    testingChallengesPage
    .fillFirstNameField('')
    .submitForm()
    .assertCheckIsFound('Empty value')

    // Space
    testingChallengesPage
    .fillFirstNameField(' ')
    .submitForm()
    .assertCheckIsFound('Space')

    // Basic Sql injection
    testingChallengesPage
    .fillFirstNameField('Test\'test;')
    .submitForm()
    .assertCheckIsFound('Basic Sql injection')

    // Basic XSS and html tags
    testingChallengesPage
    .fillFirstNameField('<script>alert(document.domain)</script>')
    .submitForm()
    .assertCheckIsFound('Basic XSS')
    .assertCheckIsFound('You used html tags')

    // Page source
    testingChallengesPage
    .fillFirstNameField('dfjwGGe82H43g3uRiy53h')
    .submitForm()
    .assertCheckIsFound('You looked at the page source')

    // Missing css
    testingChallengesPage
    .fillFirstNameField('detailsoverviewnow.css')
    .submitForm()
    .assertCheckIsFound('Missing css')

    // cookie
    const cookieVal = await testingChallengesPage.checkCookie('TestingChallenge')
    testingChallengesPage
    .fillFirstNameField(cookieVal)
    .submitForm()
    .assertCheckIsFound('You looked at the cookie')
})

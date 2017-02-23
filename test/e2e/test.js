describe('WebdriverIO POC', function(){
  const browserUrl = browser.url('http://local.one.react.com:9696/')
  let dropDown = '#app > div > div.form-group > select'
  let oneOfAssignments = '#app > div > div.form-group > select > option:nth-child(5)'
  let performanceCard = '.summary-container.performance'
  let advancedBandLink = 'ul > li.rs-performance-breakdown-item.rs-bands-list-item-1 > p.perf-count > a'
  let backToSummary = '#app > div > div > div > a > button'
  let studentsCount = '#app > div > div > div > p > strong'
  let tableTitles = 'form > div > div > table > thead > tr > th'

  it('Open page and Select dropDown to see list of assignments', () => {
    browserUrl.click(dropDown)
    $(oneOfAssignments).waitForEnabled(3000)
  })

  it('Select one of assignments and wait for Studen Proficiency card', () => {
    browser.click(oneOfAssignments)
    browser.pause(500)
    $(performanceCard).waitForEnabled(5000)
  })

  it('Validate student proficiency card is there', () => {
    let cardText = $(performanceCard).getText()
    expect(cardText).toContain('Advanced (80-100%)')
  })

  it('Select first Band of Bands on performance card', () => {
    browser.click(advancedBandLink)
    browser.pause(500)
  })

  it('Validate correct number of students', () => {
    let numberOfStudents = $(studentsCount).getText()
    expect(numberOfStudents).toEqual('4')
  })

  it('Validate correct names of columns in table', () => {
    let tableCaptions = $$(tableTitles)
    expect(tableCaptions[0].getText()).toEqual('Students')
    expect(tableCaptions[1].getText()).toEqual('Classes')
    expect(tableCaptions[2].getText()).toEqual('Schools')
    expect(tableCaptions[3].getText()).toEqual('Percent Correct')
    expect(tableCaptions[4].getText()).toEqual('Points Correct')
  })

  it('User is able to go back on Summary report page', () => {
    browser.click(backToSummary)
    $(performanceCard).waitForEnabled(5000)
    browser.pause(500)
  })
  
});

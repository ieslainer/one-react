describe('WebdriverIO POC', function(){
  const browserUrl = browser.url('http://local.one.react.com:9696/');
  let dropDown = '#app > div > div.form-group > select'
  let oneOfAssignments = '#app > div > div.form-group > select > option:nth-child(5)'
  let summaryCard = '.summary-container.performance'
  let advancedBandLink = 'ul > li.rs-performance-breakdown-item.rs-bands-list-item-1 > p.perf-count > a'

  it('Open page and Select dropDown to see list of assignments', function () {
    browserUrl.click(dropDown)
    $(oneOfAssignments).waitForEnabled(3000)
  });

  it('Select one of assignments and wait for Studen Proficiency card', function () {
    browser.click(oneOfAssignments)
    $(summaryCard).waitForEnabled(5000)
  });

  it('Select first Band of Bands and check captions in table', function () {
    browser.click(advancedBandLink)
    let tableCaptions = $$('#app > div > div > form > div > div > table > thead > tr > th')
    expect(tableCaptions[0].getText()).toEqual('Students')
    expect(tableCaptions[1].getText()).toEqual('Classes')
    expect(tableCaptions[2].getText()).toEqual('Schools')
    expect(tableCaptions[3].getText()).toEqual('Percent Correct')
    expect(tableCaptions[4].getText()).toEqual('Points Correct')
  });
});

describe('WebdriverIO POC', function(){
  var browserUrl = browser.url('http://local.one.react.com:9696/');
  it('Open page and Select dropDown to see list of assignments', function () {
    var dropDown = '#app > div > div.form-group > select';
    var oneOfAssignments = '#app > div > div.form-group > select > option:nth-child(5)';
    browserUrl.click(dropDown)
    $(oneOfAssignments).waitForEnabled(3000)
    browser.click(oneOfAssignments)
  });

  it('Open page and Select dropDown to see list of assignments', function () {
        browserUrl
          .waitForEnabled('.summary-container .performance')
          .getText('#app > div > div.summary-columns > div > div > header > h1').then(function(res){
            console.log(res);
          });
    // browser.waitForEnabled('#app > div > div.summary-columns > div > div > header > h1', 5000);
  });
});

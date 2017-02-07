import React from 'react';
import {render} from 'react-dom';

import {Chart} from 'react-d3-core';
import {LineChart} from 'react-d3-basic';
import {Summary} from './summary.jsx';
import {Performance} from './performance.jsx';

class App extends React.Component {
  
  constructor() {
      super();
      this.state = {
        assessmentRefId: null      
      };
  }
  
  selectAssessent(refId){
    console.log("selectAssessent update ref: " + refId);
    this.setState({assessmentRefId : refId});
  }
  
  render () {
          
    return (
      <div>
        <p> 
          <button type="button" className="btn btn-default" onClick={ () => this.selectAssessent('ESC_CA17_OPT_G08U02L00_000') }>Online Pretest: Unit 2 RR</button>
          <button type="button" className="btn btn-default" onClick={ () => this.selectAssessent('ESC_CA17_OPT_G06U01L00_000') }>Online Pretest: Unit 1</button>
          <button type="button" className="btn btn-default" onClick={ () => this.selectAssessent('LTCA17_G06C00L00_OA_038') }>Grade 6 CAASPP ELA Practice Test 1</button>
        </p>
        <Summary refId={this.state.assessmentRefId}></Summary>
        <div className="summary-columns">
          <div>
            <Performance refId={this.state.assessmentRefId}></Performance>
          </div>
                  
        </div>
                
      </div>
    
    );
  }
}

render(<App/>, document.getElementById('app'));
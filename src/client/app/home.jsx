import React from 'react';
import {render} from 'react-dom';

import {Chart} from 'react-d3-core';
import {LineChart} from 'react-d3-basic';
import {Summary} from './summary.jsx';
import {Performance} from './performance.jsx';
import {Select} from './simple-select.jsx'
import {Router, Route, Link, browserHistory} from 'react-router';

export class Home extends React.Component {
  
  constructor() {
      super();
      this.state = {
        eventRefId: null,
        assignmentRefId: null      
      };
      
      this.updateAssignment = this.updateAssignment.bind(this)
  }
    
  updateAssignment(refId, eventRefId){
//    console.log("updateAssignment update ref: " + refId + " - eventRefId: " + eventRefId);
    this.setState({assignmentRefId : refId, eventRefId : eventRefId});
  }
  
  render () {    
    return (
            
      <div>
        <Select updateRefId={ this.updateAssignment } defaultId={this.props.params.id}></Select>        
        <Summary refId={this.state.assignmentRefId}></Summary>
        <div className="summary-columns">
          <div>
            <Performance refId={this.state.assignmentRefId} eventRefId={this.state.eventRefId}></Performance>
          </div>
                  
        </div>
                
      </div>
    
    );
  }
}
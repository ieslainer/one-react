import _ from 'lodash';
import React from 'react';
import {render} from 'react-dom';

export class Select extends React.Component {
  
  constructor(props) {
      console.log("Component Select");
      super(props);
      this.state = { 
        value: null,
        options: [],
        defaultId: props.defaultId
      };      
  }
  
  onChange(e) {
    this.setState({
      value: e.target.value,
      defaultId: e.target.value
    });
    let assignment = _.find(this.state.options, {resource_id: e.target.value});
    this.props.updateRefId(assignment.resource_id, assignment.event_refid);
  }
  
  componentWillMount(){
//    console.log("[Select] componentWillMount");
    if(_.isEmpty(this.state.options)){
      this.getAssignments();
    }
  }
  
  componentDidMount(){
//    console.log("[Select] componentDidMount");
  }
  
  componentWillReceiveProps(newProps) {
//    console.log("[Select] componentWillReceiveProps");
//    console.log("newProps", newProps);
//    this.setState({defaultId: newProps.defaultId});
  }
  
  
  componentWillUpdate(nextProps, nextState){
//    console.log("[Select] componentWillUpdate");
//    console.log("nextProps", nextProps);
//    console.log("nextState", nextState);
  }
  
    
  componentDidUpdate(){
//    console.log("[Select] componentDidUpdate");
  }
  
   

  getAssignments(){
//    console.log("[Select] getAssignments");    
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{\n  assignments {\n resource_id\n activity_id \n event_refid \n activity_name \nassignment_name \n student_tested_count \n student_included_count \n avg_points_correct \n avg_items_correct \n proficiency_avg \n basic_students_count \n } \n }'
      })
    })  
    .then((response) => {
        return response.json()
    })
    .then((response) => {
      console.log("res: " + response);
      let { headerInformation } = response; 
      let assignments = _.get(response, 'data.assignments');
      if(assignments){
        let list = _.map(assignments, function(assignment){
          return _.pick(assignment, ['resource_id', 'activity_id', 'event_refid', 'assignment_name']);
        }); 
        this.setState({ options: list });
        if(this.state.defaultId){
          let assignment = _.find(list, {resource_id: this.state.defaultId});
          this.props.updateRefId(assignment.resource_id, assignment.event_refid);
        }
      }       
      
    });
    
  }

  render () {
    console.log("[Select] render");
    return (
      <div className="form-group">
        <label htmlFor="select2" >Assignments: {this.state.defaultId}</label>
        <select value={this.state.defaultId} onChange={this.onChange.bind(this)} className="form-control">
          {this.state.options.map(option => {
            return <option value={option.resource_id} key={option.activity_id} >{option.assignment_name}</option>
          })}
        </select>
      </div>
    );
  }
}
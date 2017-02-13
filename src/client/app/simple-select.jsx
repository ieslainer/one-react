import React from 'react';
import {render} from 'react-dom';

const options = ["Select an Option", "First Option", "Second Option", "Third Option"];

export class Select extends React.Component {
  
  constructor() {
      console.log("Component Select");
      super();
      this.state = { 
        value: 'Select an Option',
        options: []
      };
  }
  
  onChange(e) {
    this.setState({
      value: e.target.value
    });
    this.props.updateRefId(e.target.value);
  }
  
  componentWillMount(){
    console.log("[Select] componentWillMount");
    if(_.isEmpty(this.state.options)){
      this.getAssignments();
    }
  }
  
  componentDidMount(){
    console.log("[Select] componentDidMount");
  }
  
  componentWillReceiveProps(newProps) {
    console.log("[Select] componentWillReceiveProps"); 
  }
  
  shouldComponentUpdate(nextProps, nextState){
    console.log("[Select] shouldComponentUpdate");
//    console.log("nextProps", nextProps);
//    console.log("nextState", nextState);
    return true;
  }
  
  componentWillUpdate(nextProps, nextState){
    console.log("[Select] componentWillUpdate");
//    console.log("nextProps", nextProps);
//    console.log("nextState", nextState);
    if(nextProps.refId != nextState.refId){
//      this.updateData();
    }
  }
  
  
  
  componentDidUpdate(){
    console.log("[Select] componentDidUpdate");
  }
  
   

  getAssignments(){
    console.log("[Select] getAssignments");
    
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{\n  assignments {\n resource_id\n activity_id \n event_refid \n activity_name \n student_tested_count \n student_included_count \n avg_points_correct \n avg_items_correct \n proficiency_avg \n basic_students_count \n } \n }'
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
          return _.pick(assignment, ['resource_id', 'activity_id', 'event_refid']);
        }); 
        console.log("List >", list);
        this.setState({ options: list });
      }       
      
    });
    
  }

  render () {
    console.log("[Select] render");
    return (
      <div className="form-group">
        <label htmlFor="select2" >Assignments</label>
        <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
          {this.state.options.map(option => {
//            console.log("option >> ", option );
            return <option value={option.resource_id} key={option.resource_id} >{option.resource_id}</option>
          })}
        </select>
      </div>
    );
  }
}

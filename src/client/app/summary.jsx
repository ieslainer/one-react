import React from 'react';
import {render} from 'react-dom';

export class Summary extends React.Component {
  
  constructor() {
      console.log("Component Summary");
      super();
      this.state = {
        title: null,
        header:{},
        refId : null      
      };
  }
  
  componentWillMount(){
    console.log("componentWillMount");
  }
  
  componentDidMount(){
    console.log("componentDidMount");
  }
  
  componentWillReceiveProps(newProps) {
    console.log("componentWillReceiveProps");
    console.log("need update view :" + (this.state.refId != newProps.refId));
    if(this.state.refId != newProps.refId){
      this.setState({refId: newProps.refId});
      this.updateData(newProps.refId);
    }  
  }
  
  shouldComponentUpdate(nextProps, nextState){
    console.log("shouldComponentUpdate");
//    console.log("nextProps", nextProps);
//    console.log("nextState", nextState);
    return true;
  }
  
  componentWillUpdate(nextProps, nextState){
    console.log("componentWillUpdate");
//    console.log("nextProps", nextProps);
//    console.log("nextState", nextState);
    if(nextProps.refId != nextState.refId){
//      this.updateData();
    }
  }
  
  
  
  componentDidUpdate(){
    console.log("componentDidUpdate");
  }

  updateData(refId){
    console.log("updateData ("+refId+")");
    
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{\nheader(resourceId: "'+refId+'") {\nclasscount\nschoolcount\nstudentcount   \ngradecount    \nlea_name    \nlea_refid    \nclassname    \nclass_id    \nschoolname    \nschool_refid    \ngrade    \nstaff_given_name    \nstaff_family_name   \nassessment_event_name \nin_progress \nnot_started \ncompleted \n}\n}' 
      })
    })  
//    fetch('http://localhost:3002/assessment/' + refId)
    .then((response) => {
        return response.json()
    })
    .then((response) => {
      console.log("res: ", response);
      let { headerInformation } = response; 
      let header = _.get(response, 'data.header') || _.get(response, 'data.summary');
      if(header){
        this.setState({ title: header.assessment_event_name, header: header });
      }       
      
    });
    
  }

  render () {
  
    if(!this.state.refId || !this.state.title){return <div></div>};
  
    return (
      <div className="summary-container ">
        <header>
          <div className="row">
            <div className="col-xs-9">
            <ul className="title">
                <li>Summary Report: {this.state.title}</li>
                <li></li>
              </ul>
            </div>
            <div className="col-xs-3">
              <ul className="end">
                <li>Jan 22, 2016 - Jan 22, 2017</li>
              </ul>
            </div>
          </div>
        </header>
        <section>
          <div className="row">
            <div className="col-xs-5">
              <ul>
                <li>Class: <span className="drkBld">{this.state.header.classname || 'All Classes' }</span></li>
                <li>Teacher: <span className="drkBld">{this.state.header.staff_given_name || 'All Teachers' }</span></li>
                <li>Grade: <span className="drkBld"> {this.state.header.grade} </span></li>
              </ul>
            </div>
            <div className="col-xs-4">
              <ul>
                <li>School: <span className="drkBld">{this.state.header.schoolname || 'All Schools' }</span></li>
                <li>District: <span className="drkBld">{this.state.header.lea_name}</span></li>
              </ul>
            </div>
            <div className="col-xs-3 end">
              <ul>
                <li>Not Started:
                  <p className="lozenge studentListLink">
                    <strong>{this.state.header.not_started}</strong>
                  </p>
                </li>
                <li>In Progress: 
                  <p className="lozenge studentListLink">
                    <strong>{this.state.header.in_progress}</strong>
                  </p>
                </li>
                <li>Completed:
                  <p className="lozenge studentListLink">
                    <strong>{this.state.header.completed}</strong>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section> 
      </div>
    );
  }
}
// export default Summary;
//render(<Summary/>, document.getElementById('summary'));
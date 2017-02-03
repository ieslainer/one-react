import React from 'react';
import {render} from 'react-dom';

export class Summary extends React.Component {
  
  constructor() {
      super();
      this.state = {
        title: null,
        header:{},
        refId : null      
      };
  }
  
  componentWillReceiveProps(newProps) {
    this.setState({refId: newProps.refId});
    
  }
  
  componentWillUpdate(nextProps, nextState){
    if(nextPros != nextState){
      this.updateData();
    }
  }

  updateData(){
    if(this.state.refId != null){
      console.log("call : " + this.state.refId);
      fetch('http://localhost:3002/assessment/' + this.state.refId)
      .then((response) => {
          return response.json()
      })
      .then((response) => {
        console.log("res: " + response);
        let { headerInformation } = response; 
        
         this.setState({ title: headerInformation.assessment, header: headerInformation.headers[0] });       
        
      });
    }
  }

  render () {
  
    if(!this.state.refId || !this.state.title){return <div></div>};
  
    return (
      <div className="summary-container ">
        <header>
          <div className="row">
            <div className="col-xs-9">
            <ul className="title">
                <li>Summary Report: {this.state.title} ({this.state.refId})</li>
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
                <li>Class: <span className="drkBld">{this.state.header.classRefId || 'All Classes' }</span></li>
                <li>Teacher: <span className="drkBld">{this.state.header.teacherGivenName || 'All Teachers' }</span></li>
                <li>Grade: <span className="drkBld"> {this.state.header.grade} </span></li>
              </ul>
            </div>
            <div className="col-xs-4">
              <ul>
                <li>School: <span className="drkBld">{this.state.header.schoolRefId || 'All Schools' }</span></li>
                <li>District: <span className="drkBld">{this.state.header.districtName}</span></li>
              </ul>
            </div>
            <div className="col-xs-3 end">
              <ul>
                <li>Not Started:
                  <p className="lozenge studentListLink">
                    <strong>0</strong>
                  </p>
                </li>
                <li>In Progress: 
                  <p className="lozenge studentListLink">
                    <strong>0</strong>
                  </p>
                </li>
                <li>Completed:
                  <p className="lozenge studentListLink">
                    <strong>0</strong>
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
import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

export class Breakdown extends React.Component {
  
  constructor(props) {
      console.log("Component Breakdown");
      super(props);
  }
  
  componentWillMount(){
//    console.log("[Breakdown] componentWillMount");
  }
  
  componentDidMount(){
//    console.log("[Breakdown] componentDidMount");
  }
  
  componentWillReceiveProps(newProps) {
//    console.log("[Breakdown] componentWillReceiveProps");    
  }
  
  
  componentWillUpdate(nextProps, nextState){
//    console.log("[Breakdown] componentWillUpdate");
  }
    
  componentDidUpdate(){
//    console.log("[Breakdown] componentDidUpdate");
  }

  
  render () {  
    return (
      <div className="summary-breakdown pull-left">
        <ul className="rs-performance-breakdown">
          <li className="rs-performance-breakdown-item rs-bands-list-item-1">
            <p className="perf-label">Advanced (80-100%)</p>
            <p className="perf-count">
              { (this.props.data['Advanced'] < 1) ? (
                '0% - ' + this.props.data['Advanced'] + ' student'
              ) : (
                <Link className="link" to={"/performance-list/"+this.props.refId+"/"+this.props.eventRefId}>
                   { Math.round((this.props.data['Advanced']*100)/this.props.total) + '% '}
                   { this.props.data['Advanced']} {(this.props.data['Advanced'] == 1) ? 'student': 'students'} 
                </Link>
              )}
            </p>
          </li>
          <li className="rs-performance-breakdown-item rs-bands-list-item-2">
            <p className="perf-label">Proficient (60-79%)</p>
            <p className="perf-count"> 
              { (this.props.data['Proficient'] < 1) ? (
                '0% - ' + this.props.data['Proficient'] + ' student'
              ) : (
                <Link className="link" to={"/performance-list/"+this.props.refId+"/"+this.props.eventRefId}>
                   { Math.round((this.props.data['Proficient']*100)/this.props.total) + '% ' }
                   { this.props.data['Proficient']} {(this.props.data['Proficient'] == 1) ? 'student': 'students'} 
                </Link>
              )}
            </p>
          </li>
          <li className="rs-performance-breakdown-item rs-bands-list-item-3">
            <p className="perf-label">Basic (40-59%)</p>
            <p className="perf-count">
              { (this.props.data['Basic'] < 1) ? (
                '0% - ' + this.props.data['Basic'] + ' student'
              ) : (
                <Link className="link" to={"/performance-list/"+this.props.refId+"/"+this.props.eventRefId}>                
                  { Math.round((this.props.data['Basic']*100)/this.props.total) + '% '}
                  { this.props.data['Basic']} {(this.props.data['Basic'] == 1) ? 'student': 'students'} 
                </Link>
              )}
            </p>
          </li>
          <li className="rs-performance-breakdown-item rs-bands-list-item-4">
            <p className="perf-label">Below Basic (20-39%)</p>
            <p className="perf-count">
              { (this.props.data['Below Basic'] < 1) ? (
                '0% - ' + this.props.data['Below Basic'] + ' student'
              ) : (
                <Link className="link" to={"/performance-list/"+this.props.refId+"/"+this.props.eventRefId}>
                  { Math.round((this.props.data['Below Basic']*100)/this.props.total) + '% '}
                  { this.props.data['Below Basic']} {(this.props.data['Below Basic'] == 1) ? 'student': 'students'} 
                </Link>
              )}
            </p>
          </li>
          <li className="rs-performance-breakdown-item rs-bands-list-item-5">
            <p className="perf-label">Far Below Basic (0-19%)</p>
            <p className="perf-count">
              { (this.props.data['Far Below Basic'] < 1) ? (
                '0% - ' + this.props.data['Far Below Basic'] + ' student'
              ) : (
                <Link className="link" to={"/performance-list/"+this.props.refId+"/"+this.props.eventRefId}>
                  { Math.round((this.props.data['Far Below Basic']*100)/this.props.total) + '% - '}
                  { this.props.data['Far Below Basic']} {(this.props.data['Far Below Basic'] == 1) ? 'student': 'students'} 
                </Link>
              )}
            </p>
          </li>
        </ul>
      </div>
    );
  }
}
import React from 'react';
import {render} from 'react-dom';

class Summary extends React.Component {

  componentWillMount(){
    fetch('http://localhost:3002/assessment/idppp')
    .then((response) => {
      console.log("res: " + response);
    });
  }

  render () {
    return (
      <div className="summary-container ">
        <header>
          <div className="row">
            <div className="col-xs-9">
            <ul className="title">
                <li>Summary Report: Online Pretest: Unit 1</li>
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
                <li>Class: <span className="drkBld">All Classes</span></li>
                <li>Teacher: <span className="drkBld">All Teachers</span></li>
                <li>Grade: <span className="drkBld">ALL</span></li>
              </ul>
            </div>
            <div className="col-xs-4">
              <ul>
                <li>School: <span className="drkBld">All Schools</span></li>
                <li>District: <span className="drkBld">Gilmartin Test District</span></li>
              </ul>
            </div>
            <div className="col-xs-3 end">
              <ul>
                <li>Not Started:
                  <p className="lozenge studentListLink">
                    <strong>69</strong>
                  </p>
                </li>
                <li>In Progress: 
                  <p className="lozenge studentListLink">
                    <strong>13</strong>
                  </p>
                </li>
                <li>Completed:
                  <p className="lozenge studentListLink">
                    <strong>24</strong>
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

render(<Summary/>, document.getElementById('summary'));
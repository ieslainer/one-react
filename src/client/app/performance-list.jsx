import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';


export class PerformanceList extends React.Component {
  
  constructor(props) {
      super(props);
      this.state = {
        eventRefId: props.params.eventRefId,
        assignmentRefId: props.params.assignmentRefId,
        students : []     
      };      
  }

  componentWillMount(){
//    console.log("[PerformanceList] componentWillMount");
    if(_.isEmpty(this.state.students)){
      this.getStudents(this.state.eventRefId);
    }
  }
  
  getStudents(eventRefId){
//    console.log("[PerformanceList] getStudents ("+eventRefId+")");    
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{\n students(eventRefId:"e6053c0d-0100-483c-afba-67b21d2e01a4") {\n   given_name\n   family_name\n   class_name\n  school_name\n   total_proficiency_score\n   total_points_correct\n }\n}'
      })
    })  
    .then((response) => {
        return response.json()
    })
    .then((response) => {
      console.log("res: ", response);
      let students = _.get(response, 'data.students');
      if(students){
        this.setState({ students: students });
      }             
    });
    
  }  
  
  render () {
//    console.log("[PerformanceList] render");
    return (            
      <div className="students-list">
        <div>
          <div className="lozenge-students-list">
            <Link to={"/summary/"+this.state.assignmentRefId}>
              <button className="btnPrimary-C-Sml-Rect" data-icon="<<"></button>
            </Link>   
            <p className="lozenge">Students : <strong>4</strong></p>
          </div>
          <form role="form" name="" onsubmit="return false" novalidate="">
            <div className="rs-bands-formasal listTable list-d3-override">
              <div className="d3-table-wrapper table-simple table-responsive hmh-table-dark rs-assessment-list-columns" options="vm.tableOptions" columns="vm.tableHeaders" body="vm.tableBody">
                <table className="d3-table table table-bordered table-striped">
                  <colgroup>
                    <col width="[object Object]" className="sorting" />
                    <col width="[object Object]" />
                    <col width="[object Object]" />
                    <col width="[object Object]" />
                    <col width="[object Object]" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th colspan="1" className="sortable sortable-active">
                        <div className="cell-content">
                          <span className="icon" hmh-icon="D"></span>Students
                        </div>
                      </th>
                      <th colspan="1" className="sortable">
                        <div className="cell-content">
                          <span className="icon" hmh-icon="D"></span>Classes
                        </div>
                      </th>
                      <th colspan="1" className="sortable">
                        <div className="cell-content">
                          <span className="icon" hmh-icon="D"></span>Schools
                        </div>
                      </th>
                      <th colspan="1" className="sortable">
                        <div className="cell-content">
                          <span className="icon" hmh-icon="D"></span>Percent Correct
                        </div>
                      </th>
                      <th colspan="1" className="sortable">
                        <div className="cell-content">
                          <span className="icon" hmh-icon="D"></span>Points Correct
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="cell-content">Bale, Bruce<div className="studentId">5a2fcd0b1a49428da11e53fbeb2db412</div></div>
                      </td>
                      <td>
                        <div className="cell-content">e2e_test_class_1407</div>
                      </td>
                      <td>
                        <div className="cell-content">School C</div>
                      </td>
                      <td>
                        <div className="cell-content">100%</div>
                      </td>
                      <td>
                        <div className="cell-content">20/20</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="cell-content">Potter, Harry<div className="studentId">eeead7efee884592859edfae075c3180</div></div>
                      </td>
                      <td>
                        <div className="cell-content">e2e_test_class1</div>
                      </td>
                      <td>
                        <div className="cell-content">School C</div>
                      </td>
                      <td>
                        <div className="cell-content">85%</div>
                      </td>
                      <td>
                        <div className="cell-content">17/20</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="cell-content">Tyler, Elizabeth<div className="studentId">69f49f1e85ad4856b5f1b47cadb18bf3</div></div>
                      </td>
                      <td>
                        <div className="cell-content">e2e_test_class_1407</div>
                      </td>
                      <td>
                        <div className="cell-content">School C</div>
                      </td>
                      <td>
                        <div className="cell-content">85%</div>
                      </td>
                      <td>
                        <div className="cell-content">17/20</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="cell-content">Wayne, Bruce<div className="studentId">e5e79f88e2774d4cb4860d2948bc9605</div></div>
                      </td>
                      <td>
                        <div className="cell-content">e2e_test_class1</div>
                      </td>
                      <td>
                        <div className="cell-content">School C</div>
                      </td>
                      <td>
                        <div className="cell-content">100%</div>
                      </td>
                      <td>
                        <div className="cell-content">20/20</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>          
            </div>
          </form>
        </div> 
      </div>
    );
  }
}

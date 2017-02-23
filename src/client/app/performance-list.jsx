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
        query: '{\n students(eventRefId:"'+eventRefId+'") {\n   given_name\n   family_name\n  student_personal_refid\n  class_name\n  school_name\n total_points\n  total_proficiency_score\n   total_points_correct\n }\n}'
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

    let listStudent = this.state.students.map(function(student){
      let percentage = (student.total_points_correct < 1) ? 0 : ( (student.total_points_correct * 100) / student.total_points);
      return (
        <tr>
          <td>
            <div className="cell-content">{student.given_name}, {student.family_name}<div className="studentId">{student.student_personal_refid}</div></div>
          </td>
          <td>
            <div className="cell-content">{student.class_name}</div>
          </td>
          <td>
            <div className="cell-content">{student.school_name}</div>
          </td>
          <td>
            <div className="cell-content">{percentage}%</div>
          </td>
          <td>
            <div className="cell-content">{student.total_points_correct}/{student.total_points}</div>
          </td>
        </tr>
      )
    });

    return (            
      <div className="students-list">
        <div>
          <div className="lozenge-students-list">
            <Link to={"/summary/"+this.state.assignmentRefId}>
              <button className="btnPrimary-C-Sml-Rect" data-icon="<<"></button>
            </Link>   
            <p className="lozenge">Students : <strong>{this.state.students.length}</strong></p>
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
                    {listStudent}
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

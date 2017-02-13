import _ from 'lodash';
import React from 'react';
import {render} from 'react-dom';
import {PieChart} from 'react-d3-basic';
import {Breakdown} from './breakdown.jsx';
import createFragment from 'react-addons-create-fragment';

const optionChart = {
  title: "Performance",
  width: 160,
  height: 160,
  margins: {top: 0, right: 0, bottom: 0, left: 0},
  radius:  70, // Math.min(this.width, this.height - 60) / 2,
  outerRadius: 60, //this.radius - 10,
  innerRadius: 0,
  value: function(d) {
    return (d) ? +d[1] : null;
  },
  name: function(d) {
    return (d) ? d[0] : null;
  },
  showLegend: false,
  series:  [{field: "Advanced", name: " ", color: "#277300"}, {field: "Proficient", name: " ", color: "#72be44"},
    {field: "Basic", name: " ", color: "#ffea41"}, { field: "Below Basic", name: " ", color: "#f7a165"},
    {field: "Far Below Basic", name: " ", color: "#ef4e45"}]   
};

export class Performance extends React.Component {
  
  
  
  constructor(props) {
      console.log("Component Performance");
      super(props);
       
      this.state = {
        title: null,
        header:{},
        refId : null,
        dataChart:{
          pie: null,
          leyend: null
        },
        performance:{
          average: null,
          itemsCorrect: null,
          itemsTotal: null,
          studentTotal: 0
        }     
      };
  }
  
  componentWillMount(){
//    console.log("[Performance] componentWillMount");
  }
  
  componentDidMount(){
//    console.log("[Performance] componentDidMount");
  }
  
  componentWillReceiveProps(newProps) {
//    console.log("[Performance] componentWillReceiveProps");
    if(this.state.refId != newProps.refId){
      this.setState({refId: newProps.refId});
      this.updateData(newProps.refId);
    }  
  }
  
  shouldComponentUpdate(nextProps, nextState){
//    console.log("[Performance] shouldComponentUpdate");
    return true;
  }
  
  componentWillUpdate(nextProps, nextState){
//    console.log("[Performance] componentWillUpdate");
  }
  
  
  
  componentDidUpdate(){
//    console.log("[Performance] componentDidUpdate");
  }

  updateData(refId){
    console.log("[Performance] updateData ("+refId+")");
        
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{\nsummary(resourceId: "'+refId+'") {\n   itemsCorrect\n   itemsTotal\n   average\n   bandSummaries {\n     name\n     uniqueStudents\n     numberOfScores\n     totalStudentScore\n     totalPointsAvailable\n     possibleStudentScore\n     \n   }\n }\n}'
      })
    })
    .then((response) => {
        return response.json()
    })
    .then((response) => {
      console.log("graphql: ", response);
      var performance = _.get(response, 'data.summary')
      
      if(performance){
        var totalStudent = 0;
        _.reduce(performance.bandSummaries, function(result, band){
          return totalStudent += band.uniqueStudents;
        });
        
        var dataPie = { pie: [], leyend: {} };
        _.each(performance.bandSummaries, function(band){
          dataPie.leyend[band.name] = band.uniqueStudents;
          dataPie.pie.push(createFragment({name: band.name, value: band.uniqueStudents }));
        });
        
        
        this.setState({ performance: {average: performance.average, itemsTotal: performance.itemsTotal, itemsCorrect: performance.itemsCorrect, studentTotal: totalStudent} });  
        this.setState({dataChart: {pie : dataPie.pie, leyend: dataPie.leyend} });
      }
      
    });

    /*
    var data = require('dsv?delimiter=,!./data/pie_test.csv');
    console.log("csv :", data);
    var data2 = [];
    _.each(data, function(obj){
      data2.push(createFragment(obj));
    });
    */
    
  }

  render () {    
    if(!this.state.refId || !this.state.dataChart.pie || !this.state.performance.average ){return <div></div>};
      
    return (
      <div className="summary-container performance">
        <header>
          <h1>STUDENT PROFICIENCY</h1>
        </header>
        <section>
          <div className='col-xs-8'>
            <h4>Bands</h4>
            <div className="one-graph">
              <PieChart
                title= {optionChart.title}
                data= {this.state.dataChart.pie}
                width= {optionChart.width}
                height= {optionChart.height}
                chartSeries = {optionChart.series}
                name = {optionChart.name}
                value = {optionChart.value}
                showLegend = {optionChart.showLegend}
                margins = {optionChart.margins}
                radius = {optionChart.radius}
                innerRadius = {optionChart.innerRadius}
                outerRadius= {optionChart.outerRadius}
              />
            </div>
            <Breakdown data={this.state.dataChart.leyend} total={this.state.performance.studentTotal}></Breakdown>
          </div>
          <div className='col-xs-4 performance-average'>
            <h4>Average</h4>

            <div className='label-figure pull-left'>
              <p></p>
              <p> {this.state.performance.average}%</p>
            </div>
            <div className='label-figure pull-left'>
              <p>Items Correct</p>
              <p> {this.state.performance.itemsCorrect}/{this.state.performance.itemsTotal} </p>
            </div>
            <h4>Students</h4>

            <div className='label-figure pull-left'>
              <p>Total</p>
              <p>{this.state.performance.studentTotal}</p>
            </div>

            <div className='clearfix'></div>
          </div>
        </section> 
      </div>
    );
  }
}
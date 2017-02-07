import _ from 'lodash';
import React from 'react';
import {render} from 'react-dom';
import {PieChart} from 'react-d3-basic';
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
  series:  [{field: "<5", name: " ", color: "#277300"}, {field: "5-13", name: " ", color: "#72be44"},
    {field: "14-17", name: " ", color: "#ffea41"}, { field: "18-24", name: " ", color: "#f7a165"},
    {field: "25-44", name: " ", color: "#ef4e45"}]   
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
/*
    fetch('http://localhost:3002/assessment/' + refId)
    .then((response) => {
        return response.json()
    })
    .then((response) => {
      console.log("res: " + response);
      let { headerInformation } = response; 
      
       this.setState({ title: headerInformation.assessment, header: headerInformation.headers[0] });       
      
    });
*/    

    var data = require('dsv?delimiter=,!./data/pie_test.csv');
    var data2 = [];
    _.each(data, function(obj){
      data2.push(createFragment(obj));
    });
    this.setState({dataChart: {pie : data2} });
  }

  render () {    
    if(!this.state.refId || !this.state.dataChart.pie ){return <div></div>};
      
    return (
      <div className="summary-container performance">
        <header>
          <h1>STUDENT PROFICIENCY</h1>
        </header>
        <section>
          <div className='col-xs-8'>
            <h4>Bands</h4>
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
          <div className='col-xs-4 performance-average'>
            <h4>Average</h4>

            <div className='label-figure pull-left'>
              <p></p>
              <p> 43%</p>
            </div>
            <div className='label-figure pull-left'>
              <p>Items Correct</p>
              <p> 8.67/20 </p>
            </div>
            <h4>Students</h4>

            <div className='label-figure pull-left'>
              <p>Total</p>
              <p>24</p>
            </div>

            <div className='clearfix'></div>
          </div>
        </section> 
      </div>
    );
  }
}
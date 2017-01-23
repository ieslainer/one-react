import React from 'react';
import {render} from 'react-dom';

import {Chart} from 'react-d3-core';
import {LineChart} from 'react-d3-basic';

class App extends React.Component {
  render () {
    
    var chartData = [
          {
              "age": 39,
              "index": 0
          },
          {
              "age": 38,
              "index": 1
          },
          {
              "age": 34,
              "index": 2
          },
          {
              "age": 12,
              "index": 3
          }
      ];
    var width = 700,
    height = 300,
    margins = {left: 100, right: 100, top: 50, bottom: 50},
    title = "User sample",
    chartSeries = [
      {
        field: 'BMI',
        name: 'BMI',
        color: '#ff7f0e'
      }
    ],
    // your x accessor
    x = function(d) {
      return d.index;
    };
  
    return (
    <div className="main-container">
      <h1>Hello World! 2</h1>
      <div className="one-nav"></div>
      <div className="one-detail">
        <Chart
          title={title}
          width={width}
          height={height}
          margins= {margins}>
          
          <LineChart
            showXGrid= {false}
            showYGrid= {false}
            margins= {margins}
            title={title}
            data={chartData}
            width={width}
            height={height}
            chartSeries={chartSeries}
            x={x}
          />
          
        </Chart>  
      </div>
    </div>
    );
  }
}

render(<App/>, document.getElementById('app'));

import React, { useState } from 'react';
import Plot from 'react-plotly.js';
class Stock extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            
            stockChartXValues: [],
            stockChartYValues: [],
            chart_title: '' ,
            showResults: false,
            tech:''
        }
        
        this.handleTech = this.handleTech.bind(this);
      };
      
      
      handleTech(event){
        console.log(event.target.value);
        this.fetchTech(event.target.value);
      }

      fetchTech(nam) {
        const PointToThis = this;
        //const API_KEY = "2KJIQB60TYPUCHRH";
        console.log(nam);
        /*{let api_call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.state.inputmajor}&apikey=${API_KEY}`;}*/
        let api_call = `https://www.alphavantage.co/query?function=${nam}&apikey=demo`
        let stockX = [];
        let stockY = [];
        fetch(api_call)
            .then(
                function(response){
                    return response.json();
                }
            )
            .then(
                function(data){
                    console.log(data.data);
                    
                    for (var key in data.data){
                        stockX.push(data.data[key]["date"]);
                        stockY.push(data.data[key]["value"]);
                      }
                      console.log(stockY);
                      PointToThis.setState({
                        chart_title: data.name,
                        chart_unit: data.unit,
                        stockChartXValues: stockX,
                        stockChartYValues: stockY,
                        showResults: true
                      });
                }
            )
    }
    
    render() {
        return (
          
            <div>
            <div className= "stk">Economic Indicators
      <label>
<br></br>
        <select value={this.tech} onChange={this.handleTech} className="button-50">
        <option value="--">---</option>
          <option value="INFLATION">Inflation</option>
          <option value="CONSUMER_SENTIMENT">Consumer Sentiment </option>
          <option value="RETAIL_SALES">Retail Sales</option>
          <option value="DURABLES">Durable Good Orders </option>
          <option value="UNEMPLOYMENT">Unemployment Rate</option>
        </select>
      </label>
      </div>

       
      { this.state.showResults ?<Plot
        data={[
          {
            x: this.state.stockChartXValues,
            y: this.state.stockChartYValues,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
            hoverinfo: 'text+y'
          }
          
        ]}
        layout={ {width: 720, height: 480, title: this.state.chart_title + "  (Unit: "+ this.state.chart_unit + ")"
        }} 
      /> : null }
        
            </div>
        )

    }
}
export default Stock;

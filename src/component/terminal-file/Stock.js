
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import "../../App.css"
class Stock extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
          stockChartXValues: [],
          stockChartYValues: [],
          techXValues:[],
          techYValues:[],
          inputmajor: '' ,
          finalinput: '' ,
          showResults: false,
          tech:''
        }
        this.handleMajor = this.handleMajor.bind(this);
       this.handleMinor = this.handleMinor.bind(this);
        this.handleMinor2 = this.handleMinor2.bind(this);
        this.handleTech = this.handleTech.bind(this);
      };
      
      handleMinor(event) {
        if (event.key === "Enter"){
          event.preventDefault();
        console.log(this.state.inputmajor);
        this.fetchStock();
        this.fetchTech(event.target.value);
        }
      }
      handleMinor2(event) {
        console.log(event.key);
        event.preventDefault();
        console.log(this.state.inputmajor);
        this.fetchStock();
        
        
      }
      handleMajor(event){
        this.setState({inputmajor: event.target.value});
      }

      handleTech(event){
        if (this.state.inputmajor!==""){
        console.log(event.target.value);
        this.fetchTech(event.target.value);}
      }
      

    fetchStock() {
        const PointToThis = this;
        console.log(PointToThis);
        console.log("This is", this.state.inputmajor);
        const API_KEY = "9TJ2PAC3H6JFX4UG";
        let api_call = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${this.state.inputmajor}&apikey=${API_KEY}`;
        //let api_call = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo`
        let stockX = [];
        let stockY = [];
        let name = this.inputmajor;
        console.log("wer", name);
        fetch(api_call)
            .then(
                function(response){
                    return response.json();
                }
            )
            .then(
                function(data){
                    console.log(data);
                    for (var key in data["Weekly Time Series"]){
                      stockX.push(key);
                      stockY.push (data["Weekly Time Series"][key]["4. close"]);
                    }
                    console.log(stockY);
                    PointToThis.setState({
                      stockChartXValues: stockX,
                      stockChartYValues: stockY,
                      techXValues: [],
                      techYValues: [],
                      showResults: true,
                      finalinput: PointToThis.state.inputmajor,
                    });
                }
            )
    }
    fetchTech(nam) {
      const PointToThis = this;
      const API_KEY = "2KJIQB60TYPUCHRH";
      let api_call = `https://www.alphavantage.co/query?function=${nam}&symbol=${this.state.inputmajor}&interval=weekly&time_period=10&series_type=open&apikey=${API_KEY}`
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
                  console.log(data);
                  for (var key in data["Technical Analysis: " + nam]){
                    stockX.push(key);
                    if (nam === "EMA"){
                    stockY.push (data["Technical Analysis: " + nam][key].EMA);}
                    if (nam === "SMA"){
                      stockY.push (data["Technical Analysis: " + nam][key].SMA);}
                    if (nam === "WMA"){
                        stockY.push (data["Technical Analysis: " + nam][key].WMA);
                      }
                    if (nam === "DEMA"){
                          stockY.push (data["Technical Analysis: " + nam][key].DEMA);
                        }
                    if (nam === "TRIMA"){
                            stockY.push (data["Technical Analysis: " + nam][key].TRIMA);}
                    if (nam === "KAMA"){
                            stockY.push (data["Technical Analysis: " + nam][key].KAMA);}  
                    if (nam === "T3"){
                              stockY.push (data["Technical Analysis: " + nam][key].T3);}  
                    if (nam === "RSI"){
                              stockY.push (data["Technical Analysis: " + nam][key].RSI);}             
                            
                  }
                  console.log(stockY);
                  PointToThis.setState({
                    techXValues: stockX,
                    techYValues: stockY,
                  });
              }
          )
  }
    render() {
      console.log(this.state.inputmajor)
        return (
          
          <div>
            <div className= "stk">Stock Market</div>
            <form>
            <input type="text" className="input-1" value={this.state.inputmajor} onChange={this.handleMajor} placeholder="Stock Symbol" onKeyPress={this.handleMinor}  />
            </form>
            <form onSubmit={this.handleMinor2}><button type="submit" className="button-59">Submit</button>
<br></br>
      <label className='tech_in'>
        Technical Indicators:   
        <select value={this.tech} onChange={this.handleTech} className="button-57">
        <option value="---">---</option>
          <option value="SMA">SMA</option>
          <option value="EMA">EMA</option>
          <option value="WMA">WMA</option>
          <option value="DEMA">DEMA</option>
          <option value="TRIMA">TRIMA</option>
          <option value="KAMA">KAMA</option>
          <option value="T3">T3</option>
          <option value="RSI">RSI</option>
        </select>
      </label>
      
        </form>
        
        { this.state.showResults ?<Plot
        data={[
          {
            x: this.state.stockChartXValues,
            y: this.state.stockChartYValues,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {
            x: this.state.techXValues,
            y: this.state.techYValues,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'blue'},
          }
        ]}
        layout={ {width: 640, height: 480, title: {text: this.state.finalinput+' Stock', font: {
          family: "Open Sans"} }
        
      
      
      } }
      /> : null }
        
            </div>
        )


    }
}
export default Stock;

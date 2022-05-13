
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
class Stock extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
          Symbol: '',
          FinalSymbol:'',
          AssetType: '',
          Name:'',
          Description:'',
          CIK: '' ,
          Exchange: '',
          Currency:'',
          Country:"",
          Sector:'',
          Industry:'',
          Address:'',
          FiscalYearEnd:'',
          LatestQuarter:'',
          MarketCapitalization:'',
          showResults: false
        }
        this.handleCO = this.handleCO.bind(this);
       this.handleCOMin = this.handleCOMin.bind(this);
        this.handleCOMin2 = this.handleCOMin2.bind(this);
      };
      
      handleCOMin(event) {
        if (event.key === "Enter"){
          event.preventDefault();
        console.log(this.state.Symbol);
        this.fetchStock();
        }
      }
      handleCOMin2(event) {
        console.log(event.key);
        event.preventDefault();
        console.log(this.state.Symbol);
        this.fetchStock();
        
      }
      handleCO(event){
        this.setState({Symbol: event.target.value});
      }


    fetchStock() {
        const PointToThis = this;
        console.log(PointToThis);
        console.log("I am", this.state.Symbol);
        const API_KEY = "EKM48VJFD5JEX1WR";
        let api_call = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${this.state.Symbol}&apikey=${API_KEY}`;
        //let api_call = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo`
        let stockX = '';
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
                    PointToThis.setState({
                    FinalSymbol: data["Symbol"],
                    AssetType: data["AssetType"],
                    Name: data["Name"],
                    Description:data["Description"],
                    CIK: data["CIK"],
                    Exchange: data["Exchange"],
                    Currency: data["Currency"],
                    Country: data["Country"],
                    Sector: data["Sector"],
                    Industry: data["Industry"],
                    Address: data["Address"],
                    FiscalYearEnd: data["FiscalYearEnd"],
                    LatestQuarter: data["LatestQuarter"],
                    MarketCapitalization: data["MarketCapitalization"],
                    showResults: true
                    });
                    console.log(PointToThis);
                }
            )
    }
    
    render() {
        return (
          
          <div>
           <div className= "stk">Company Overview</div>
            <form >
            <input type="text" className="input-1" value={this.state.Symbol} onChange={this.handleCO} placeholder="Stock Symbol" onKeyPress={this.handleCOMin}  />
            </form>
            <form onSubmit={this.handleCOMin2}><button type="submit" className="button-59">Submit</button>
        </form>
        { this.state.showResults ?<div>
          <p className="bold">Symbol: <span>{this.state.FinalSymbol}</span></p>
          <p className="bold">AssetType:<span> {this.state.AssetType}</span></p>
        <p className="bold">Name:<span> {this.state.Name}</span></p>
        <p className="bold">Description: <span>{this.state.Description}</span></p>
        <p className="bold">CIK: <span>{this.state.CIK}</span></p>
        <p className="bold">Exchange:<span> {this.state.Exchange}</span></p>
        <p className="bold">Currency:<span> {this.state.Currency}</span></p>
        <p className="bold">Country: <span>{this.state.Country}</span></p>
               <p className="bold">Sector:<span> {this.state.Sector}</span></p>     
               <p className="bold"> Industry:<span> {this.state.Industry}</span></p> 
               <p className="bold"> Address:<span> {this.state.Address}</span></p> 
               <p className="bold">  FiscalYearEnd:<span> {this.state.FiscalYearEnd}</span></p> 
               <p className="bold">   LatestQuarter:<span> {this.state.LatestQuarter}</span></p> 
               <p className="bold">   MarketCapitalization: <span>{this.state.MarketCapitalization}</span></p></div>
        : null}
            </div>
        )

    }
}
export default Stock;

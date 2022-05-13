
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
class Stock extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            news:[],
        }
        
        this.handleCO = this.handleCO.bind(this);
        this.handleCOMin = this.handleCOMin.bind(this);
        this.handleCOMin2 = this.handleCOMin2.bind(this);
      };
      

      handleCOMin(event) {
        if (event.key === "Enter"){
          event.preventDefault();
        console.log(this.state.Symbol);
        this.fetchNews(encodeURI(this.state.keyword));
        }
      }
      handleCOMin2(event) {
        console.log(event.key);
        event.preventDefault();
        var x = this.state.keyword;
        console.log(encodeURI(x))
        this.fetchNews(encodeURI(x));
        
      }
      handleCO(event){
        this.setState({keyword: event.target.value});
        console.log(this.state.keyword);
      }

      fetchNews(nam) {
        const PointToThis = this;
        const API_KEY = "pub_70829b480caae584d09b2505bcf6884d3e90";
        console.log(nam);
        let api_call = `https://newsdata.io/api/1/news?apikey=${API_KEY}&category=business&language=en&q=${nam}`
        if (nam === ""){
         api_call = `https://newsdata.io/api/1/news?apikey=${API_KEY}&category=business&language=en`
        }
        
        let newX = [];
        fetch(api_call)
            .then(
                function(response){
                    return response.json();
                }
            )
            .then(
                function(data){
                    console.log(data);
                    
                    for (var key in data["results"]){
                        newX.push(data["results"][key]);
                      }
                      console.log(newX);
                      PointToThis.setState({
                          news: newX})
                }
            )
        
    }
    
    render() {
        return (
          
            <div>
            <div className= "stk">Latest News</div>
    
      <form className='qwe'> 
    <input type="text" className="input-1" value={this.state.Symbol} onChange={this.handleCO} placeholder=" Optional Keyword" onKeyPress={this.handleCOMin}  />
    </form>
    <form onSubmit={this.handleCOMin2}><button type="submit" className="button-59">Submit</button></form>
      
    <div>
      {this.state.news.map(name =>  <a href={name.link} key = {name.title} className='text'><p >{name.title} </p> </a>)}
      	</div>
          </div>
      
        )

    }
}
export default Stock;

import React, { Component } from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';
let actions = require('../actions/index');

export class CryptoCcyList extends React.Component {
constructor(props) {
    super(props);
    this.state = {value: 'SGD'};
    this.logChange = this.logChange.bind(this);
  }
  componentWillMount(){
    this.props.fetchDev('SGD');
  }

  logChange(event) {
    console.log("Selected: " + event);
    this.props.fetchDev(event.target.value);
    this.setState({
        value:event.target.value
    })
} 

  renderDev(item,index){
    return (
        <div className='cryptoRow'>
                <div className='cryptoName'>{item.name}</div>
                <div className='cryptoPrice'>{`${item.currency} ${numeral(item.currPrice).format('0,0.00')}`}</div>
                <div className={`cryptoPrice ${item.isInt ? 'green' : 'red'}`}>{`${item.percent_change_24h}%`}</div>
         </div>
    )

  }

    render() {
    let {devs} = this.props;
    let options = [
    { value: 'SGD', label: 'SGD' },
    { value: 'AUD', label: 'AUD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' },
    { value: 'USD', label: 'USD' },
    { value: 'VND', label: 'VND' }
    ];

    let optionItems = options.map(function(product, index) {
        return (<option key={index} value={product.value}>{product.label}</option>);
    });

    let Currency = this.state.value;

    if(devs.isFetching == true){
      return <p>Loading</p>
    }
    else if(devs.isFetching == false && devs.devsArray.length >= 1){
      return(
      <div>
       <div className='dropdown'>
       <label>
          Pick your Currency:
          <select value={this.state.value} onChange={this.logChange}>
             {optionItems}
          </select>
        </label>
       </div>
        <div className="dev-list" >
         {devs.devsArray.map(this.renderDev)}
        </div>
    </div>
    )
    }
    else{
      return(
      <p>I dont know oooo</p>
      )
    }
  }
}

export default connect(
    (state)=>{
        return state
    },actions)(CryptoCcyList)

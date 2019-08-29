import React, { Component } from 'react';
import './App.css';
import './components/ItemCurrency'
import Currency from './models/Currency'
import ItemCurrency from './components/ItemCurrency'
import getExchangeRateCurrency from './services/ExchangeRateAPI'

class App extends Component {
  state = {
    base_currency : new Currency(),
    converted_currencies : []
  }

  componentDidMount() {
    var base_currency = this.setInitialBaseCurrency()
    var converted_currency = this.setInitialConvertedCurrency()
    
    getExchangeRateCurrency(base_currency, converted_currency).then( value => {
      this.bindCurrencyDataToState(base_currency, value)
    })
  }

  setInitialBaseCurrency() {
    var initial_currency = new Currency()
    initial_currency.code = "USD"
    initial_currency.currency = "United States Dollars"
    initial_currency.number = 10

    return initial_currency
  }

  setInitialConvertedCurrency() {
    var converted_currency = [new Currency()]
    converted_currency = [
      {code: "CAD", currency: "Canadian Dollar", number: null, active: false},
      {code: "USD", currency: "United States Dollar", number: null, active: false},
      {code: "GBP", currency: "Pound sterling", number: null, active: false},
      {code: "CHF", currency: "Swiss Franc", number: null, active: false},
      {code: "SGD", currency: "Singapore Dollar", number: null, active: false},
      {code: "INR", currency: "Indian Rupee", number: null, active: false},
      {code: "MYR", currency: "Malaysian Ringgit", number: null, active: false},
      {code: "JPY", currency: "Japanese Yen", number: null, active: false},
      {code: "KRW", currency: "South Korean won", number: null, active: false}
    ]
    return converted_currency
  }

  bindCurrencyDataToState(initial_currency, converted_currencies) {
    this.setState({
      base_currency : initial_currency,
      converted_currencies: converted_currencies
    })
  }

  render() {
    return (
      <div className="App">
        <div className="currency-container-converter">
          <div className="currency-header">
            <div className="currency">
              {this.state.base_currency.code} - {this.state.base_currency.currency}
            </div>
            <div className="currency-value">
              <div className="currency-code">{this.state.base_currency.code}</div>
              <div className="currency-number">{Number(this.state.base_currency.number).toFixed(2)}</div>
            </div>
          </div>
          <hr/>
          <div className="currency-converted-container">
            {this.renderConvertedCurrencies()}
          </div>
          <div className="add-currency">
            {this.renderAvailableCurrency()}       
          </div>
        </div>
      </div>
    );
  }

  renderAvailableCurrency() {
    var available_currencies = []
    this.state.converted_currencies.forEach((element,index) => {
      if (!element.active) {
        available_currencies.push(<option key={element.code} value={element.code}>{element.currency}</option>)
      }
    })

    return (
      <select defaultValue="-" onChange={this.addCurrencyToBoard(this.state.converted_currencies)}>
        <option key="-" disabled value="-">Add Currency</option>
        {available_currencies}
      </select>
    )
  }

  addCurrencyToBoard = converted_currencies => e => {
    var value = e.nativeEvent.target.value
    var new_state = converted_currencies
    var index = new_state.findIndex(x => x.code === value)
    new_state[index].active = true
    this.setState({
      converted_currencies: new_state
    })
  }

  removeCurrencyFromBoard = (converted_currencies,value) => e => {
    var new_state = converted_currencies
    var index = new_state.findIndex(x => x.code === value)
    new_state[index].active = false
    this.setState({
      converted_currencies: new_state
    })
  }

  renderConvertedCurrencies() {
    var card_items = []
    this.state.converted_currencies.forEach((currency,index) => {
      if (currency.active) {
        card_items.push(
          <ItemCurrency key={index} converted_currency={currency} base_currency={this.state.base_currency} on_close={this.removeCurrencyFromBoard(this.state.converted_currencies, currency.code)}/>
        )  
      }
    })
    return card_items
  }
}

export default App;

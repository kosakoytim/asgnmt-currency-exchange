import axios from 'axios'
import api_endpoint from './Constants'

var getExchangeRateCurrency  = function (base_currency, converted_currency) {
    return new Promise(function(resolve, reject) {
        axios.get(api_endpoint + base_currency.code)
            .then(res => {
                var new_converted_currency = converted_currency
                new_converted_currency.forEach((element,index) => {
                    new_converted_currency[index].number = res.data.rates[element.code]
                });
                resolve(new_converted_currency)
            }).catch(error => {
                reject(error)
            })
    })
}

export default getExchangeRateCurrency
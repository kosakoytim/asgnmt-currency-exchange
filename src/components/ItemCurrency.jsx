import React, { Component } from 'react';
import './item-currency.css'

class ItemCurrency extends Component {
    render() {
        return (
            <div className="container-item-currency">
                <div>
                    <div className="container-value">
                        <div className="code">{this.props.converted_currency.code}</div>
                        <div className="number">{Number(this.convertFromInitialBaseValues()).toFixed(2)}</div>
                    </div>
                    <div className="item-currency">
                        {this.props.converted_currency.code} - {this.props.converted_currency.currency}
                    </div>
                    <div className="base-currency">
                        1 {this.props.base_currency.code} = {this.props.converted_currency.code} {Number(this.props.converted_currency.number).toFixed(2)}
                    </div>
                </div>
                <div className="close" onClick={this.closeCard()}>
                    x
                </div>
            </div>
        )
    }

    closeCard = params => e => {
        this.props.on_close()
    }

    convertFromInitialBaseValues() {
        return this.props.converted_currency.number * this.props.base_currency.number
    }
}

export default ItemCurrency
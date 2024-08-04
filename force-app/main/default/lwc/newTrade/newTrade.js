// import {LightningElement} from 'lwc';

// export default class NewTrade extends LightningElement {
// }

import { LightningElement, track } from 'lwc';
import getRate from '@salesforce/apex/NewTradeController.getRate';
import createTrade from '@salesforce/apex/TradeController.createTrade';

export default class NewTrade extends LightningElement {
    @track sellCurrency;
    @track buyCurrency;
    @track sellAmount;
    @track buyAmount;
    @track rate;
    @track error;
    currencyOptions = [
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
        { label: 'GBP', value: 'GBP' }
        // Agrega más opciones según sea necesario
    ];

    handleSellCurrencyChange(event) {
        this.sellCurrency = event.target.value;
        this.calculateRate();
    }

    handleBuyCurrencyChange(event) {
        this.buyCurrency = event.target.value;
        this.calculateRate();
    }

    handleSellAmountChange(event) {
        this.sellAmount = event.target.value;
        this.calculateBuyAmount();
    }

    calculateRate() {
        if (this.sellCurrency && this.buyCurrency) {
            getRate({ sellCurrency: this.sellCurrency, buyCurrency: this.buyCurrency })
                .then(result => {
                    this.rate = result;
                    this.calculateBuyAmount();
                })
                .catch(error => {
                    this.error = 'Error fetching rate: ' + error.body.message;
                });
        }
    }

    calculateBuyAmount() {
        if (this.rate && this.sellAmount) {
            this.buyAmount = this.sellAmount * this.rate;
        }
    }

    handleCreate() {
        createTrade({
            sellCurrency: this.sellCurrency,
            buyCurrency: this.buyCurrency,
            sellAmount: this.sellAmount,
            buyAmount: this.buyAmount,
            rate: this.rate
        })
        .then(result => {
            this.error = undefined;
            // Lógica para redireccionar o actualizar la vista principal si es necesario
        })
        .catch(error => {
            this.error = 'Error creating trade: ' + JSON.stringify(error.body);
        });
    }

    handleCancel() {
        this.sellCurrency = '';
        this.buyCurrency = '';
        this.sellAmount = '';
        this.buyAmount = '';
        this.rate = '';
        this.error = undefined;
    }
}


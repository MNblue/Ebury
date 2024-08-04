// import {LightningElement} from 'lwc';

// export default class NewTrade extends LightningElement {
// }

import { LightningElement, track } from 'lwc';
import getRate from '@salesforce/apex/NewTradeController.getRate';

export default class NewTrade extends LightningElement {
    @track sellCurrency = '';
    @track buyCurrency = '';
    @track sellAmount = 0;
    @track buyAmount = 0;
    @track rate = 0;

    currencyOptions = [
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
        // Add more currency options here
    ];

    handleCurrencyChange(event) {
        if (event.target.name === 'sellCurrency') {
            this.sellCurrency = event.target.value;
        } else if (event.target.name === 'buyCurrency') {
            this.buyCurrency = event.target.value;
        }
    }

    handleAmountChange(event) {
        this.sellAmount = event.target.value;
    }

    handleGetRate() {
        getRate({ sellCurrency: this.sellCurrency, buyCurrency: this.buyCurrency })
            .then(result => {
                this.rate = result;
                this.buyAmount = this.sellAmount * this.rate;
            })
            .catch(error => {
                console.error('Error fetching rate:', error);
            });
    }
}

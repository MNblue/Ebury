// import {LightningElement} from 'lwc';

// export default class NewTrade extends LightningElement {
// }

import { LightningElement, track } from 'lwc';
import getRate from '@salesforce/apex/NewTradeController.getRate';

export default class NewTrade extends LightningElement {
    @track sellCurrency;
    @track buyCurrency;
    @track rate;
    @track error;
    
    currencyOptions = [
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
        { label: 'GBP', value: 'GBP' },
        // Agrega más opciones según sea necesario
    ];

    handleCurrencyChange(event) {
        const field = event.target.name;
        if (field === 'sellCurrency') {
            this.sellCurrency = event.detail.value;
        } else if (field === 'buyCurrency') {
            this.buyCurrency = event.detail.value;
        }
    }

    handleGetRate() {
        getRate({ sellCurrency: this.sellCurrency, buyCurrency: this.buyCurrency })
            .then(result => {
                this.rate = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = 'Error fetching rate: ' + error.body.message;
                this.rate = undefined;
            });
    }
}

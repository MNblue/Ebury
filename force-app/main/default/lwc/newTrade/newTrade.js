// import {LightningElement} from 'lwc';

// export default class NewTrade extends LightningElement {
// }

// import { LightningElement, track } from 'lwc';
// import getRate from '@salesforce/apex/NewTradeController.getRate';

// export default class NewTrade extends LightningElement {
//     @track sellCurrency;
//     @track buyCurrency;
//     @track rate;
//     @track error;
    
//     currencyOptions = [
//         { label: 'USD', value: 'USD' },
//         { label: 'EUR', value: 'EUR' },
//         { label: 'GBP', value: 'GBP' },
//         // Agrega más opciones según sea necesario
//     ];

//     handleCurrencyChange(event) {
//         const field = event.target.name;
//         if (field === 'sellCurrency') {
//             this.sellCurrency = event.detail.value;
//         } else if (field === 'buyCurrency') {
//             this.buyCurrency = event.detail.value;
//         }
//     }

//     handleGetRate() {
//         getRate({ sellCurrency: this.sellCurrency, buyCurrency: this.buyCurrency })
//             .then(result => {
//                 this.rate = result;
//                 this.error = undefined;
//             })
//             .catch(error => {
//                 this.error = 'Error fetching rate: ' + error.body.message;
//                 this.rate = undefined;
//             });
//     }
// }



// import { LightningElement, track } from 'lwc';
// import getRate from '@salesforce/apex/NewTradeController.getRate';

// export default class NewTrade extends LightningElement {
//     @track sellCurrency = '';
//     @track buyCurrency = '';
//     @track sellAmount = 0;
//     @track rate;
//     @track buyAmount = 0;
//     @track error;

//     currencyOptions = [
//         { label: 'USD', value: 'USD' },
//         { label: 'EUR', value: 'EUR' },
//         { label: 'GBP', value: 'GBP' },
//         // Add more options as needed
//     ];

//     handleCurrencyChange(event) {
//         const field = event.target.name;
//         if (field === 'sellCurrency') {
//             this.sellCurrency = event.detail.value;
//         } else if (field === 'buyCurrency') {
//             this.buyCurrency = event.detail.value;
//         }
//         this.getRate(); // Fetch the rate when either currency changes
//     }

//     handleSellAmountChange(event) {
//         this.sellAmount = event.detail.value;
//         this.calculateBuyAmount();
//     }

//     getRate() {
//         if (this.sellCurrency && this.buyCurrency) {
//             getRate({ sellCurrency: this.sellCurrency, buyCurrency: this.buyCurrency })
//                 .then(result => {
//                     this.rate = result;
//                     this.error = undefined;
//                     this.calculateBuyAmount();
//                 })
//                 .catch(error => {
//                     this.error = 'Error fetching rate: ' + error.body.message;
//                     this.rate = undefined;
//                     this.buyAmount = 0;
//                 });
//         }
//     }

//     calculateBuyAmount() {
//         if (this.rate && this.sellAmount) {
//             this.buyAmount = this.sellAmount * this.rate;
//         } else {
//             this.buyAmount = 0;
//         }
//     }

//     handleCreate() {
//         // Logic to create trade
//         createTrade({
//             sellCurrency: this.sellCurrency,
//             buyCurrency: this.buyCurrency,
//             sellAmount: this.sellAmount,
//             buyAmount: this.buyAmount,
//             rate: this.rate
//         })
//         .then(() => {
//             // Reset fields after successful creation
//             this.handleCancel();
//             // Optionally, you can display a success message or redirect
//         })
//         .catch(error => {
//             this.error = 'Error creating trade: ' + error.body.message;
//         });
//     }

//     handleCancel() {
//         // Logic to cancel trade
//         this.sellCurrency = '';
//         this.buyCurrency = '';
//         this.sellAmount = 0;
//         this.rate = undefined;
//         this.buyAmount = 0;
//         this.error = undefined;
//     }
// }

import { LightningElement, track } from 'lwc';
import getRate from '@salesforce/apex/NewTradeController.getRate';
import createTrade from '@salesforce/apex/TradeController.createTrade';

export default class NewTrade extends LightningElement {
    @track sellCurrency = '';
    @track buyCurrency = '';
    @track sellAmount = 0;
    @track rate;
    @track buyAmount = 0;
    @track error;

    currencyOptions = [
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
        { label: 'GBP', value: 'GBP' },
        // Add more options as needed
    ];

    handleCurrencyChange(event) {
        const field = event.target.name;
        if (field === 'sellCurrency') {
            this.sellCurrency = event.detail.value;
        } else if (field === 'buyCurrency') {
            this.buyCurrency = event.detail.value;
        }
        this.getRate(); // Fetch the rate when either currency changes
    }

    handleSellAmountChange(event) {
        this.sellAmount = event.detail.value;
        this.calculateBuyAmount();
    }

    getRate() {
        if (this.sellCurrency && this.buyCurrency) {
            getRate({ sellCurrency: this.sellCurrency, buyCurrency: this.buyCurrency })
                .then(result => {
                    this.rate = result;
                    this.error = undefined;
                    this.calculateBuyAmount();
                })
                .catch(error => {
                    this.error = 'Error fetching rate: ' + error.body.message;
                    this.rate = undefined;
                    this.buyAmount = 0;
                });
        }
    }

    calculateBuyAmount() {
        if (this.rate && this.sellAmount) {
            this.buyAmount = this.sellAmount * this.rate;
        } else {
            this.buyAmount = 0;
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
        .then(() => {
            // Reset fields after successful creation
            this.handleCancel();
            // Optionally, you can display a success message or redirect
        })
        .catch(error => {
            this.error = 'Error creating trade: ' + error.body.message;
        });
    }

    handleCancel() {
        this.sellCurrency = '';
        this.buyCurrency = '';
        this.sellAmount = 0;
        this.rate = undefined;
        this.buyAmount = 0;
        this.error = undefined;
    }
}

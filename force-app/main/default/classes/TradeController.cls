public with sharing class TradeController {
    @AuraEnabled
    public static void createTrade(String sellCurrency, String buyCurrency, Decimal sellAmount, Decimal buyAmount, Decimal rate) {
        // Asegúrate de que tienes un objeto o lógica para crear el registro de un trade
        Trade__c newTrade = new Trade__c(
            Sell_Currency__c = sellCurrency,
            Buy_Currency__c = buyCurrency,
            Sell_Amount__c = sellAmount,
            Buy_Amount__c = buyAmount,
            Rate__c = rate
        );
        insert newTrade;
    }
}

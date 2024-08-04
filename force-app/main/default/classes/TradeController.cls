public with sharing class TradeController {

    @AuraEnabled
    public static Trade__c createTrade(String sellCurrency, String buyCurrency, Decimal sellAmount, Decimal buyAmount, Decimal rate) {
        // Crear una nueva instancia del objeto Trade__c
        Trade__c newTrade = new Trade__c(
            Sell_Currency__c = sellCurrency,
            Buy_Currency__c = buyCurrency,
            Sell_Amount__c = sellAmount,
            Buy_Amount__c = buyAmount,
            Rate__c = rate,
            Booked_Date__c = Date.today()
        );

        // Insertar el nuevo Trade
        insert newTrade;

        // Enviar notificación
        TradeNotificationUtil.sendNotification(newTrade);

        return newTrade;
    }
}

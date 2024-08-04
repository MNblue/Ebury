trigger TradeTrigger on Trade__c (after insert) {
    for (Trade__c trade : Trigger.new) {
        TradeNotificationUtil.sendNotification(trade);
    }
}

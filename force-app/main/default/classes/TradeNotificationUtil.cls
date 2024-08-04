// public class TradeNotificationUtil {
//     public static void sendNotification(Trade__c trade) {
//         String content = 'A new trade has been created with the following data:\n' +
//                          'Sell Currency: ' + trade.Sell_Currency__c + '\n' +
//                          'Sell Amount: ' + trade.Sell_Amount__c + '\n' +
//                          'Buy Currency: ' + trade.Buy_Currency__c + '\n' +
//                          'Buy Amount: ' + trade.Buy_Amount__c + '\n' +
//                          'Rate: ' + trade.Rate__c + '\n' +
//                          'Booked Date: ' + trade.Booked_Date__c + '\n' +
//                          'Link to the trade: ' + '/' + trade.Id;

//         // Obtener el grupo "Trade reviewers"
//         Group tradeReviewersGroup;
//         try {
//             tradeReviewersGroup = [SELECT Id FROM Group WHERE Name = 'Trade reviewers' LIMIT 1];
//         } catch (Exception e) {
//             throw new CustomException('The group "Trade reviewers" does not exist.');
//         }

//         // Obtener los miembros del grupo
//         List<GroupMember> groupMembers = [SELECT UserOrGroupId FROM GroupMember WHERE GroupId = :tradeReviewersGroup.Id];
        
//         // Crear una lista de correos electrónicos
//         List<Messaging.SingleEmailMessage> emails = new List<Messaging.SingleEmailMessage>();

//         for (GroupMember member : groupMembers) {
//             Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
//             email.setSubject('New Trade Created');
//             email.setPlainTextBody(content);
//             email.setTargetObjectId(member.UserOrGroupId);
//             email.setSaveAsActivity(false);
//             emails.add(email);
//         }

//         // Enviar todos los correos electrónicos
//         Messaging.sendEmail(emails);
//     }

//     // Excepción personalizada para manejar errores específicos
//     public class CustomException extends Exception {}
// }
public class TradeNotificationUtil {
    public static void sendNotification(Trade__c trade) {
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        
        // Configurar destinatarios y contenido
        mail.setToAddresses(new String[] {'example@example.com'}); // Cambia esto a los destinatarios reales
        mail.setSubject('New Trade Created');
        mail.setPlainTextBody(
            'A new trade has been created with the following data:\n\n' +
            'Sell Currency: ' + trade.Sell_Currency__c + '\n' +
            'Sell Amount: ' + trade.Sell_Amount__c + '\n' +
            'Buy Currency: ' + trade.Buy_Currency__c + '\n' +
            'Buy Amount: ' + trade.Buy_Amount__c + '\n' +
            'Rate: ' + trade.Rate__c + '\n' +
            'Booked Date: ' + trade.Booked_Date__c + '\n' +
            'Link to the trade: ' + 'URL_to_Trade_Record' // Añade el enlace al registro de comercio aquí
        );

        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
    }
}

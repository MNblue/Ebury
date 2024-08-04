// @isTest
// public class TradeNotificationUtilTest {
//     @isTest
//     static void testSendNotification() {
//         // Crear un nuevo registro Trade__c de prueba
//         Trade__c trade = new Trade__c(
//             Sell_Currency__c = 'USD',
//             Sell_Amount__c = 100,
//             Buy_Currency__c = 'EUR',
//             Buy_Amount__c = 90,
//             Rate__c = 0.9,
//             Booked_Date__c = Date.today()
//         );
        
//         insert trade;

//         // Configurar el mensaje de correo electrónico de prueba
//         Test.startTest();
//         TradeNotificationUtil.sendNotification(trade);
//         Test.stopTest();

//         // Verificar que se haya enviado un correo electrónico
//         // En lugar de consultar la base de datos, se puede verificar que el correo electrónico fue enviado en el contexto de la prueba
//         List<Messaging.SingleEmailMessage> sentEmails = [SELECT Id, Subject FROM Messaging.SingleEmailMessage WHERE Subject = 'New Trade Created'];
//         System.assertEquals(1, sentEmails.size(), 'Se debe haber enviado un correo electrónico');
//     }
// }

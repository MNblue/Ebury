@isTest
public class NewTradeControllerTest {
    @isTest
    static void testGetRate() {
        // Crear datos de prueba si es necesario
        Trade__c trade = new Trade__c(
            Sell_Currency__c = 'USD',
            Sell_Amount__c = 100,
            Buy_Currency__c = 'EUR',
            Buy_Amount__c = 90,
            Rate__c = 0.9,
            Booked_Date__c = Date.today()
        );
        insert trade;

        // Ejecutar método de prueba
        Test.startTest();
        // Llama al método que quieres probar aquí
        // Ejemplo: TradeController.getRate();
        Test.stopTest();

        // Verificar resultados
        // Aquí colocas las aserciones para verificar el resultado
        // Ejemplo: System.assertEquals(expectedValue, actualValue);
    }
}

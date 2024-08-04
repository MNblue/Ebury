// public with sharing class NewTradeController {

//     @AuraEnabled
//     public static Decimal getRate(String sellCurrency, String buyCurrency) {
//         // TODO: get rate from fixer.io and return it to the LCW
//         return null;
//     } d5d5054aef502f9820d88bb6

public with sharing class NewTradeController {

    @AuraEnabled
    public static Decimal getRate(String sellCurrency, String buyCurrency) {
        // Define the base URL for the ExchangeRate-API
        String baseUrl = 'https://v6.exchangerate-api.com/v6/d5d5054aef502f9820d88bb6/latest/' + sellCurrency;

        // Create an Http object to send the request
        HttpRequest request = new HttpRequest();
        request.setEndpoint(baseUrl);
        request.setMethod('GET');

        // Send the request
        Http http = new Http();
        HttpResponse response = http.send(request);

        // Check the response status
        if (response.getStatusCode() == 200) {
            // Parse the JSON response to get the rate
            Map<String, Object> result = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            if (result.containsKey('error')) {
                throw new CalloutException('Error from ExchangeRate-API: ' + result.get('error'));
            }
            Map<String, Object> rates = (Map<String, Object>) result.get('conversion_rates');
            Decimal rate = (Decimal) rates.get(buyCurrency);

            return rate;
        } else {
            // Handle errors
            throw new CalloutException('Error from ExchangeRate-API: ' + response.getStatus());
        }
    }
}

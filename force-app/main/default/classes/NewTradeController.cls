// public with sharing class NewTradeController {

//     @AuraEnabled
//     public static Decimal getRate(String sellCurrency, String buyCurrency) {
//         // TODO: get rate from fixer.io and return it to the LCW
//         return null;
//     } 9ceaa34010beca6a8d0fbbb3764e82bd

public with sharing class NewTradeController {

    @AuraEnabled
    public static Decimal getRate(String sellCurrency, String buyCurrency) {
        // Define the base URL for the Fixer.io API
        String baseUrl = 'http://data.fixer.io/api/latest?base=' + sellCurrency + '&symbols=' + buyCurrency + '&access_key=9ceaa34010beca6a8d0fbbb3764e82bd';

        // Create an Http object to send the request
        HttpRequest request = new HttpRequest();
        request.setEndpoint(baseUrl);
        request.setMethod('GET');

        // Create an Http object and send the request
        Http http = new Http();
        HttpResponse response = http.send(request);

        // Check the response status
        if (response.getStatusCode() == 200) {
            // Parse the JSON response to get the rate
            Map<String, Object> result = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            Map<String, Object> rates = (Map<String, Object>) result.get('rates');
            Decimal rate = (Decimal) rates.get(buyCurrency);

            return rate;
        } else {
            // Handle errors
            throw new CalloutException('Error from Fixer.io API: ' + response.getStatus() + ' ' + response.getBody());
        }
    }
}
